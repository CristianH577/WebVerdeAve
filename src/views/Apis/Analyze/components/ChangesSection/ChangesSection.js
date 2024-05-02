import { useEffect, useState } from 'react';

import addLangText from '../../../../../lang/Apis/Analyze/components/ChangesSection/ChangesSection.json'
import { useOutletContext } from 'react-router-dom';

import { Button } from "@nextui-org/react";

import CustomTable from '../../../../../components/CustomTable'
import ErrorBoundary from '../../../../../components/ErrorBoundary'

import { postFAPI } from '../../../../../libs/fastapi';

import { ArrowUp, Reset } from '../../../../../assets/icons';
import FormEditHeaders from './components/FormEditHeaders';
import FormEditTypes from './components/FormEditTypes';
import FormEditRows from './components/FormEditRows';
import BarSearch from './components/BarSearch';


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
    const filtersDefault = {
        text: '',
        num: '',
        cond_simbol: '==',
        cols: '',
    }
    const [filters, setFilters] = useState(filtersDefault)


    // headers
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

            const data = {
                rows: dataEdited.rows,
                new_keys: new_keys,
            }
            const response = await postFAPI('analyze/editHeaders', data, lang)

            if (response.bool && typeof response.value === 'object') {
                const newData = {
                    ...dataEdited,
                    editing: true,
                }

                var bool = true
                const check = ['cols', 'rows', 'dtypes', 'labels']
                check.forEach(key => {
                    if (response.value.hasOwnProperty(key)) {
                        newData[key] = response.value[key]
                    } else {
                        bool = false
                    }
                })

                if (bool) setDataEdited(newData)
            }
        }

        setEdit(false)
        setIsLoading(false)
    }

    // dtype
    const getDtype = async () => {
        setIsLoading(true)
        setEdit('dtype')
        console.log(typeof dataEdited.rows)
        console.log( dataEdited.rows)

        const data={
            rows: dataEdited.rows
        }
        const response = await postFAPI('analyze/getDtype', data, lang)
        console.log(response)

        // if (response.bool && typeof response.value === 'object') {
        //     const dtypes = response.value?.dtypes
        //     const labels = response.value?.labels

        //     if (dtypes && labels) {
        //         const newData = {
        //             ...dataEdited,
        //             editing: true,
        //             dtypes: dtypes,
        //             labels: labels,
        //         }

        //         setDataEdited(newData)
        //     }

        // }

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

            const response = await postFAPI('analyze/changeDtype', form_data, lang)

            if (response.bool && typeof response.value === 'object') {
                const value = response.value
                const dtypes = value?.dtypes
                const labels = value?.labels
                const rows = JSON.parse(value?.rows)

                if (typeof dtypes === 'object' && typeof labels === 'object' && Array.isArray(rows)) {
                    const newData = {
                        ...dataEdited,
                        editing: true,
                        dtypes: dtypes,
                        labels: labels,
                        rows: rows,
                    }

                    setDataEdited(newData)
                }
            }
        }

        setEdit(false)
        setIsLoading(false)
    }

    // rows
    const handleEditRows = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        if (Object.keys(newRowsValues).length !== 0) {
            const form_data = new FormData()
            form_data.append('rows', JSON.stringify(dataEdited.rows))
            form_data.append('new_values', JSON.stringify(newRowsValues))
            const response = await postFAPI('analyze/editRows', form_data, lang)

            if (response.bool && typeof response.value === 'string') {
                const rows = JSON.parse(response.value)

                if (Array.isArray(rows)) {
                    const newData = {
                        ...dataEdited,
                        editing: true,
                        rows: rows,
                    }

                    setDataEdited(newData)
                }

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
            const response = await postFAPI('analyze/filter', form_data, lang)

            if (response.bool && typeof response.value === 'string') {
                const rows = JSON.parse(response.value)

                if (Array.isArray(rows)) {
                    const newData = {
                        ...dataEdited,
                        rows: rows,
                    }

                    setDataFiltered(newData)
                }
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

            {/* convierto data editada en principal */}
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


            {/* actions menu */}
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

                {dataEdited?.dtypes
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
                <ErrorBoundary>
                    <FormEditHeaders
                        onSubmit={handleEditHeaders}
                        isLoading={isLoading}
                        onCancel={() => setEdit(false)}
                        errors={errors}
                        headers={dataEdited.cols}
                    />
                </ErrorBoundary>
            )}


            {edit === 'types' && (
                <ErrorBoundary>
                    <FormEditTypes
                        onSubmit={handleEditDtype}
                        isLoading={isLoading}
                        onCancel={() => setEdit(false)}
                        cols={dataEdited.cols}
                        types={dataEdited.dtypes}
                    />
                </ErrorBoundary>
            )}

            {edit === 'editRows' && (
                <ErrorBoundary>
                    <FormEditRows
                        onSubmit={handleEditRows}
                        isLoading={isLoading}
                        onCancel={() => setEdit(false)}
                        data={{
                            ...dataEdited,
                            rows: dataEdited.rows.filter(row => {
                                if ([...new Set(selectedRows)].includes(row.key.toString())) return row
                                return false
                            })
                        }}
                        newRowsValues={newRowsValues}
                    />
                </ErrorBoundary>
            )}


            {/* buscador */}
            <BarSearch
                filters={filters}
                setFilters={setFilters}
                isLoading={isLoading}
                cols={dataEdited.cols}
                onSearch={getDataFilter}
                onReset={handleResetFilters}
            />


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
