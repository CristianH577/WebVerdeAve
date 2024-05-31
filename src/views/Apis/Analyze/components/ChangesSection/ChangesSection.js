import { useEffect, useState } from 'react';

import addLangText from '../../../../../lang/Apis/Analyze/components/ChangesSection/ChangesSection.json'
import { useOutletContext } from 'react-router-dom';

import { Button } from "@nextui-org/react";

import { postFAPI } from '../../../../../libs/fastapi.js';

import CustomTable from '../../../../../components/CustomTable.js'
import ErrorBoundary from '../../../../../components/ErrorBoundary.js'
import FormEditHeaders from './components/FormEditHeaders.js';
import FormEditTypes from './components/FormEditTypes.js';
import FormEditRows from './components/FormEditRows.js';
import BarSearch from './components/BarSearch.js';

import { Reset } from '../../../../../assets/icons.js';
import { BsArrowUpCircle } from "react-icons/bs";



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


    const checkResponse = (check, response, set) => {
        if (response.bool && typeof response.value === 'object') {
            const newData = {
                ...dataEdited,
                editing: true,
            }

            var bool = true
            check.forEach(key => {
                if (response.value.hasOwnProperty(key)) {
                    newData[key] = response.value[key]
                } else {
                    bool = false
                }
            })

            // if (bool) setDataEdited(newData)
            if (bool) set(newData)
        }
    }

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

            checkResponse(['cols', 'rows', 'dtypes', 'labels'], response, setDataEdited)
        }

        setEdit(false)
        setIsLoading(false)
    }

    // dtype
    const getDtype = async () => {
        setIsLoading(true)
        setEdit('dtype')

        const response = await postFAPI('analyze/getDtype', dataEdited.rows, lang)

        checkResponse(['dtypes', 'labels'], response, setDataEdited)

        setEdit(false)
        setIsLoading(false)
    }

    const handleEditDtype = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const form_values = new FormData(e.target)

        var new_Dtypes = {}
        for (const entry of form_values.entries()) {
            const [key, val] = entry
            if (val !== dataEdited.dtypes[key]) new_Dtypes[key] = val
        }

        if (Object.entries(new_Dtypes).length !== 0) {
            const data = {
                rows: dataEdited.rows,
                dtypes: new_Dtypes,
            }
            const response = await postFAPI('analyze/changeDtype', data, lang)

            checkResponse(['rows', 'dtypes', 'labels'], response, setDataEdited)
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
            const data = {
                rows: dataEdited.rows,
                new_values: newRowsValues,
            }

            const response = await postFAPI('analyze/editRows', data, lang)

            checkResponse(['rows'], response, setDataEdited)
        }

        setSelectedRows([])
        setNewRowsValues({})
        setEdit(false)
        setIsLoading(false)
    }

    const handleDelete = () => {
        setIsLoading(true)
        var newRows = false

        if (selectedRows === 'all') {
            newRows = []
        } else if (selectedRows?.size) {
            const selected = [...new Set(selectedRows)].map(Number)
            newRows = dataEdited.rows.filter(row => {
                if (selected.includes(row.key)) return false
                return row
            })
        }

        if (newRows) setDataEdited({
            ...dataEdited,
            editing: true,
            rows: newRows,
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
            const data = {
                rows: dataEdited.rows,
                filters: filters,
            }
            const response = await postFAPI('analyze/filter', data, lang)

            checkResponse(['rows'], response, setDataFiltered)
        }

        setIsLoading(false)
    }

    const makeCellFilter = (row, col) => {
        const val = row[col] || ''
        var content = <span>{val}</span>

        if (row.hl && row.hl.includes(col)) {
            content = <div className='p-1 bg-warning-400 dark:bg-warning-200 rounded'>
                {val}
            </div>
        }
        return content
    }

    const handleResetFilters = () => {
        setDataFiltered(false)
        setFilters(filtersDefault)
        setSelectedRows([])
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
                        <BsArrowUpCircle />
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
                <ErrorBoundary lang={context.lang}>
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
                <ErrorBoundary lang={context.lang}>
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
                <ErrorBoundary lang={context.lang}>
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
                data={dataFiltered || dataEdited}
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
