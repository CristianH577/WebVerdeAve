import React, { useEffect, useState } from 'react';

import addLangText from '../../../lang/Apis/Analyze/ChangesSection.json'
import { useOutletContext } from 'react-router-dom';

import { Button, ButtonGroup, Input, Select, SelectItem } from "@nextui-org/react";

import CustomTable from '../../../components/CustomTable'

import { postFAPI } from '../../../libs/fastapi';

import { Search, ArrowUp, Reset } from '../../../assets/icons';


function ChangesSection({ data, setData }) {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
        ...addLangText[lang]
    }

    const [dataEdited, setDataEdited] = useState(data)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [edit, setEdit] = useState(false)
    const [errors, setErrors] = useState({})
    const [newRowsValues, setNewRowsValues] = useState({})

    const [dataFiltered, setDataFiltered] = useState(false)
    const condSelects = ['==', '!=', '<', '>', '<=', '>=']
    const filtersDefault = {
        text: '',
        num: '',
        cond_simbol: '==',
        cols: '',
    }
    const [filters, setFilters] = useState(filtersDefault)


    const handleEditHeaders = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const form_values = new FormData(e.target)
        const new_cols = Array.from(form_values.values())

        var error = false
        if (new_cols.includes('')) {
            error = { editHeaders: langText.form.nullVals }
        } else {
            const duplicated = new Set(new_cols)
            if (duplicated.size !== new_cols.length) {
                error = { editHeaders: langText.form.duplicateVals }
            } else {
                if (JSON.stringify(dataEdited.cols) === JSON.stringify(new_cols)) error = true
            }
        }

        if (error) {
            setErrors(error)
            setIsLoading(false)
            return false
        } else {
            setErrors({})

            const new_keys = {}
            for (const entry of form_values.entries()) {
                const [key, val] = entry
                if (val !== key) new_keys[key] = val
            }

            const form_data = new FormData()
            form_data.append('rows', JSON.stringify(dataEdited.rows))
            form_data.append('new_keys', JSON.stringify(new_keys))
            const response = await postFAPI('editHeaders', form_data, lang)

            if (response.bool) {
                var val = response.value

                const newData = {
                    ...dataEdited,
                    ...val,
                    editing: true,
                }

                newData.rows = JSON.parse(val.rows)

                setDataEdited(newData)
            }
        }

        setEdit(false)
        setIsLoading(false)
    }

    const getDtype = async () => {
        setIsLoading(true)
        setEdit('dtype')

        const form_data = new FormData()
        form_data.append('rows', JSON.stringify(dataEdited.rows))
        const response = await postFAPI('getDtype', form_data, lang)

        if (response.bool) {
            const val = response.value

            const newData = {
                ...dataEdited,
                ...val,
                editing: true,
            }

            setDataEdited(newData)
        }

        setEdit(false)
        setIsLoading(false)
    }
    const handleEditDtype = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const form_values = new FormData(e.target)

        var new_Dtypes = false
        for (const entry of form_values.entries()) {
            const [key, val] = entry
            if (val !== dataEdited.dtypes[key]) {
                if (new_Dtypes === false) new_Dtypes = {}
                new_Dtypes[key] = val
            }
        }

        if (!!new_Dtypes) {
            const form_data = new FormData()
            form_data.append('rows', JSON.stringify(dataEdited.rows))
            form_data.append('dtypes', JSON.stringify(new_Dtypes))
            const response = await postFAPI('changeDtype', form_data, lang)

            if (response.bool) {
                const val = response.value

                const newData = {
                    ...dataEdited,
                    ...val,
                    editing: true,
                }

                newData.rows = JSON.parse(val.rows)

                setDataEdited(newData)
            }
        }

        setEdit(false)
        setIsLoading(false)
    }

    const makeCellEdit = (row, col) => {
        const dtypes = dataEdited.dtypes
        var type = 'string'

        if (!!dtypes) {
            if (dtypes[col].includes('int')) type = 'number'
            if (dtypes[col].includes('float')) type = 'number'
            if (dtypes[col].includes('date')) type = 'date'
        }

        return <Input
            type={type}
            defaultValue={row[col]}
            className='min-w-[100px]'
            name={col + '-' + row.key}
            onValueChange={(e) => {
                if (newRowsValues[row.key]) {
                    newRowsValues[row.key][col] = e
                } else {
                    newRowsValues[row.key] = { [col]: e }
                }
            }}
        />
    }
    const handleEditRows = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        if (Object.keys(newRowsValues).length !== 0) {
            const form_data = new FormData()
            form_data.append('rows', JSON.stringify(dataEdited.rows))
            form_data.append('new_values', JSON.stringify(newRowsValues))
            const response = await postFAPI('editRows', form_data, lang)

            if (response.bool) {
                const val = response.value

                const newData = {
                    ...dataEdited,
                    rows: JSON.parse(val.rows),
                    editing: true,
                }

                setDataEdited(newData)
            }
        }

        setSelectedRows([])
        setNewRowsValues({})
        setEdit(false)
        setIsLoading(false)
    }

    const handleDelete = () => {
        setIsLoading(true)
        var newRows = []

        var selected = false
        if (selectedRows.size) {
            selected = [...new Set(selectedRows)].map(Number)
        } else if (dataFiltered !== false) {
            selected = dataFiltered.rows.reduce((prev, val) => prev = [...prev, val.key], [])
        }

        if (selected) {
            newRows = dataEdited.rows.filter(row => {
                if (selected.includes(row.key)) return false
                return row
            })
        }

        setDataEdited({
            ...dataEdited,
            rows: newRows,
            editing: true,
        })

        setIsLoading(false)
    }

    const handleResetEdit = () => {
        setDataEdited(data)
        setEdit(false)
        handleResetFilters()
    }

    const getDataFilter = async () => {
        setIsLoading(true)
        setSelectedRows([])

        if (filters.text !== '' || filters.num !== '') {

            const form_data = new FormData()
            form_data.append('rows', JSON.stringify(dataEdited.rows))
            form_data.append('filters', JSON.stringify(filters))
            const response = await postFAPI('filter', form_data, lang)

            if (response.bool) {
                const val = response.value

                const newData = {
                    ...dataEdited,
                    rows: JSON.parse(val.rows),
                }

                setDataFiltered(newData)
            }
        }

        setIsLoading(false)
    }
    const makeCellFilter = (row, col) => {
        var content = <span>{row[col]}</span>

        if (row.hl && row.hl.includes(col)) {
            content = <div className='p-1 bg-warning-400 dark:bg-warning-200 rounded'>
                {row[col]}
            </div>
        }
        return content
    }
    const handleResetFilters = () => {
        setDataFiltered(false)
        setFilters(filtersDefault)
    }

    const handleSetData = () => {
        setData({ ...dataEdited, editing: false, edited: true })
        setDataEdited({ ...dataEdited, editing: false })
        setDataFiltered(false)
    }


    useEffect(() => {
        setSelectedRows([])
        handleResetFilters()
        // eslint-disable-next-line
    }, [dataEdited])


    return (
        <section className='mx-auto my-4 flex flex-col items-center'>

            {dataEdited.editing && (
                <div className='font-semibold text-2xl break-all max-sm:text-center px-2 mb-6'>
                    {langText.editData}: {dataEdited.name}({langText.edited})
                    <Button
                        isIconOnly
                        color='warning'
                        size='sm'
                        variant='ghost'
                        className='ms-2'
                        onClick={handleSetData}
                    >
                        <ArrowUp />
                    </Button>
                </div>
            )}


            {/* actions */}
            <div className='flex max-sm:flex-wrap xs:gap-2 justify-center max-xs:w-full' >
                <Button
                    color='primary'
                    onClick={() => setEdit('headers')}
                    isDisabled={Boolean(edit)}
                    isLoading={isLoading && edit === 'headers'}
                    className='button-xs'
                >
                    {langText.changeHeaders}
                </Button>

                {dataEdited.dtypes
                    ? <Button
                        color='secondary'
                        className='button-xs '
                        onClick={() => setEdit('types')}
                        isDisabled={Boolean(edit)}
                        isLoading={isLoading && edit === 'types'}
                    >
                        {langText.changeTypes}
                    </Button>
                    : <Button
                        color='secondary'
                        className='button-xs '
                        onClick={getDtype}
                        isDisabled={Boolean(edit)}
                        isLoading={isLoading && edit === 'dtype'}
                    >
                        {langText.dtypes}
                    </Button>
                }

                <Button
                    color='success'
                    className='button-xs text-white'
                    onClick={() => setEdit('editRows')}
                    isDisabled={Boolean(edit) ? true : !(selectedRows.size || selectedRows === 'all')}
                >
                    {langText.actions.edit}
                </Button>

                <Button
                    color='danger'
                    className='button-xs'
                    onClick={handleDelete}
                    isDisabled={Boolean(edit) ? true : !(selectedRows.size || selectedRows === 'all')}
                >
                    {langText.actions.delete}
                </Button>

                <Button
                    isIconOnly
                    className='button-xs'
                    isDisabled={Boolean(edit)}
                    onClick={handleResetEdit}
                >
                    <Reset />
                </Button>
            </div>


            {edit === 'headers' && (
                <form className='mt-4 text-center bg-content1 rounded-lg p-4 form-xs' onSubmit={handleEditHeaders}>
                    <div className='text-xl mb-4'>{langText.editHeaders}</div>

                    <div className='mb-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                        {dataEdited.cols.map(col =>
                            <Input key={col} defaultValue={col} name={col} className='input-xs' />
                        )}
                    </div>
                    {errors.editHeaders && <div className='text-danger mb-4'>* {errors.editHeaders} *</div>}

                    <div className='flex flex-col gap-4 sm:flex-row justify-center'>
                        <Button
                            color='danger'
                            onClick={() => setEdit(false)}
                        >
                            {langText.actions.cancel}
                        </Button>

                        <Button
                            type='submit'
                            color='primary'
                            isLoading={isLoading}
                        >
                            {langText.actions.save}
                        </Button>
                    </div>
                </form>
            )}

            {edit === 'types' && (
                <form className='mt-4 text-center bg-content1 rounded-lg p-4 w-full form-xs' onSubmit={handleEditDtype}>
                    <div className='text-xl mb-4 break-all px-2'>{langText.editTypes}</div>

                    <div className='mb-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                        {dataEdited.cols.map(col =>
                            <Select
                                key={col}
                                defaultSelectedKeys={[dataEdited.dtypes[col]]}
                                name={col}
                                label={col}
                                className='form-select'
                            >
                                <SelectItem key='string'>
                                    string
                                </SelectItem>
                                <SelectItem key='object'>
                                    object
                                </SelectItem>
                                <SelectItem key='int64'>
                                    int64
                                </SelectItem>
                                <SelectItem key='float64'>
                                    float64
                                </SelectItem>
                                <SelectItem key='datetime64'>
                                    datetime64
                                </SelectItem>
                            </Select>
                        )}
                    </div>
                    <div className='text-neutral-500 text-sm mb-2'>
                        *{langText.warningNoSelect}*
                    </div>

                    <div className='center gap-4 sm:flex-row '>
                        <Button
                            color='danger'
                            className='button-xs'
                            onClick={() => setEdit(false)}
                        >
                            {langText.actions.cancel}
                        </Button>

                        <Button
                            type='submit'
                            color='primary'
                            className='button-xs'
                            isLoading={isLoading}
                        >
                            {langText.actions.save}
                        </Button>
                    </div>
                </form>
            )}

            {edit === 'editRows' && (
                <form className='mt-6 bg-success-50 p-4 rounded-lg form-xs w-full' onSubmit={handleEditRows}>
                    <div className='text-xl mb-2 break-all text-center'>{langText.editRows}</div>

                    <CustomTable
                        aria-label={langText.tableAriaEdit}
                        data={{
                            ...dataEdited,
                            rows: dataEdited.rows.filter(row => {
                                if ([...new Set(selectedRows)].includes(row.key.toString())) return row
                                return false
                            })
                        }}
                        preferences={{
                            model: ['solicitude'],
                            results: 20,
                            checks: ['headers', 'sort', 'Dcount'],
                        }}
                        color='success'
                        makeCell={makeCellEdit}
                    />

                    <div className='center gap-4 sm:flex-row mt-4'>
                        <Button
                            color='danger'
                            onClick={() => setEdit(false)}
                            className='form-button'
                        >
                            {langText.actions.cancel}
                        </Button>

                        <Button
                            type='submit'
                            color='primary'
                            isLoading={isLoading}
                            className='form-button'
                        >
                            {langText.actions.save}
                        </Button>
                    </div>
                </form>
            )}


            {/* buscador */}
            <div className='mb-2 mt-8 center items-center gap-2 sm:flex-row form-xs'>
                <Input
                    className="form-input"
                    placeholder={langText.search.search + "..."}
                    variant="bordered"
                    size='sm'
                    classNames={{
                        inputWrapper: "rounded-lg ",
                    }}

                    value={filters.text}
                    isDisabled={filters.num !== ''}
                    onValueChange={e => {
                        setFilters({ ...filters, text: e })
                    }}

                    isClearable
                    onClear={() => {
                        setFilters({ ...filters, text: '' })
                    }}
                />

                <Input
                    type="number"
                    label={langText.condition}
                    variant="bordered"
                    size='sm'
                    className="form-input "
                    classNames={{
                        label: 'text-neutral-400 font-normal ',
                    }}
                    endContent={
                        <div className="flex items-center h-full">
                            <label className="sr-only" htmlFor="currency">
                                {langText.form.currency}
                            </label>
                            <select
                                className="outline-none border-0 bg-transparent text-default-400 text-small cursor-pointer"
                                id="currency"
                                name="currency"
                                onChange={e => setFilters({ ...filters, cond_simbol: e.target.value })}
                                value={filters.cond_simbol}
                            >
                                {condSelects.map(e => <option key={e}>{e}</option>)}
                            </select>
                        </div>
                    }

                    value={filters.num}
                    isDisabled={filters.text !== ''}
                    onValueChange={e => {
                        setFilters({ ...filters, num: e })
                    }}
                />

                <Select
                    label={langText.table.columns}
                    selectionMode="single"
                    className="form-select "
                    variant="bordered"
                    size='sm'

                    selectedKeys={filters.cols ? [filters.cols] : []}
                    onSelectionChange={e => {
                        const val = e.size ? [...new Set(e)][0] : ''
                        setFilters({ ...filters, cols: val })
                    }}
                >
                    {dataEdited.cols.map((col) => (
                        <SelectItem key={col} value={col}>
                            {col}
                        </SelectItem>
                    ))}
                </Select>

                <ButtonGroup variant="ghost" size='lg' isDisabled={isLoading}>
                    <Button
                        isIconOnly
                        onClick={getDataFilter}
                    >
                        <Search />
                    </Button>

                    <Button
                        isIconOnly
                        onClick={handleResetFilters}
                    >
                        <Reset />
                    </Button>
                </ButtonGroup>

            </div>


            <CustomTable
                ariaLabel={langText.tableAria}
                data={dataFiltered ? dataFiltered : dataEdited}
                preferences={{
                    model: ['solicitude'],
                    results: 20,
                    checks: ['headers', 'sort', 'Dcount', 'multiple'],
                }}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                className={'mt-4'}
                makeCell={dataFiltered ? makeCellFilter : false}
            />

        </section>
    );
}

export default ChangesSection;
