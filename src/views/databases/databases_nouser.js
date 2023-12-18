import React, { useEffect, useState } from 'react';

import addLangText from '../../lang/databases/databases.json'
import { useOutletContext } from 'react-router-dom';

import { Button, ButtonGroup, Divider, Link } from "@nextui-org/react";
import { Input, Tooltip } from "@nextui-org/react";

import 'react-toastify/dist/ReactToastify.css';

import CustomTable from '../../components/custom_table'

import { name, surname, username, fullname } from 'react-lorem-ipsum';


import { Delete, Check, Edit, Reset } from '../../assets/icons.js';


function DatabasesNoUser() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [edit, setEdit] = useState(false)

    const icons = {
        Delete: <Delete size={16} />,
        Check: <Check size={20} />,
        Edit: <Edit size={16} />,
        Reset: <Reset />,
    }


    // tablas-----------------------------------------------------------------------------
    const [table1, setTable1] = useState({
        enabled: false,
    })
    const [table2, setTable2] = useState({
        enabled: false,
    })
    const [table3, setTable3] = useState({
        enabled: false,
    })

    const tables = [
        {
            key: 1,
            table: table1,
        },
        {
            key: 2,
            table: table2,
        },
        {
            key: 3,
            table: table3,
        },
    ]

    const cleanValuesTable = {
        name: '',
        col1: '',
        col2: '',
        col3: '',
        col4: '',
    }
    const [defaultValuesTable, setDefaultValuesTable] = useState(cleanValuesTable)

    const handleAddTable = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const formData = new FormData(e.target)

        var table = 1
        if (table1.enabled) {
            table = 2
        }
        if (table2.enabled) {
            table = 3
        }

        const newTable = {
            enabled: true,
            key: table,
            cols: [],
            rows: [],
            totalRows: 0,
            labels: {},
            name: "Tabla " + table,
        }

        for (const entry of formData.entries()) {
            const [key, val] = entry
            if (key === 'name') {
                if (val !== '') newTable.name = val
            } else if (val !== '') {
                const k = key + "_" + table
                newTable.cols.push(k)
                newTable.labels[k] = val
            }
        }

        newTable.cols.push('actions_' + table)
        newTable.labels['actions_' + table] = ""

        switch (table) {
            case 1:
                setTable1(newTable)
                break;
            case 2:
                setTable2(newTable)
                break;
            case 3:
                setTable3(newTable)
                break;

            default:
                break;
        }

        setEdit(false)
        setIsLoading(false)
    }
    const handleResetTables = () => {
        setEdit(false)
        setTable1({ enabled: false })
        setTable2({ enabled: false })
        setTable3({ enabled: false })
    }

    const makeCell = (row, col) => {
        var cellContent = <></>

        if (col.includes('actions')) {
            cellContent =
                <div className="flex items-center gap-4 justify-center">
                    <Tooltip color="danger" content={langText.actions.delete} >
                        <span
                            className="text-danger cursor-pointer active:opacity-50"
                            onClick={() => setEdit({ key: 'deleteRow', id: row.id, table: row.table })}
                        >
                            {icons.Delete}
                        </span>
                    </Tooltip>

                    <Tooltip color="primary" content={langText.actions.edit} >
                        <a href='#consola'>
                            <span
                                className=" text-primary cursor-pointer active:opacity-50"
                                onClick={() => {
                                    setEdit(false)
                                    setTimeout(() => {
                                        setEdit({ key: 'editRow', row: row, table: row.table })
                                    }, 100)
                                }}
                            >
                                {icons.Edit}
                            </span>
                        </a>
                    </Tooltip>
                </div>
        } else {
            cellContent = <div>{row[col]}</div>
        }

        return cellContent
    }


    // filas-----------------------------------------------------------------------------
    const cleanValuesRow = {
        col1: '',
        col2: '',
        col3: '',
        col4: '',
    }
    const [defaultValuesRow, setDefaultValuesRow] = useState(cleanValuesRow)

    const handleAddRow = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const formData = new FormData(e.target)

        const newRow = {}
        for (const entry of formData.entries()) {
            const [key, val] = entry
            newRow[key] = val
        }
        newRow.table = edit.table.key
        newRow.id = Math.random()

        const newTable = { ...edit.table }
        newTable.rows.push(newRow)
        newTable.totalRows = newTable.rows.length

        switch (edit.table.key) {
            case 1:
                // newTable = { ...table1 }
                // newTable.rows.push(newRow)
                // newTable.totalRows = table1.totalRows + 1
                setTable1(newTable)
                break;
            case 2:
                // newTable = { ...table2 }
                // newTable.rows.push(newRow)
                // newTable.totalRows = table2.totalRows + 1
                setTable2(newTable)
                break;
            case 3:
                // newTable = { ...table3 }
                // newTable.rows.push(newRow)
                // newTable.totalRows = table3.totalRows + 1
                setTable3(newTable)
                break;

            default:
                break;
        }

        setEdit(false)
        setIsLoading(false)
    }
    const handleDeleteRow = () => {
        setIsLoading(true)

        const table = tables[edit.table - 1].table
        const newTable = { ...table }
        newTable.rows = table.rows.filter(row => row.id !== edit.id)
        newTable.totalRows = table1.totalRows - 1

        switch (edit.table) {
            case 1:
                setTable1(newTable)
                break;
            case 2:
                setTable2(newTable)
                break;
            case 3:
                setTable3(newTable)
                break;

            default:
                break;
        }

        setEdit(false)
        setIsLoading(false)
    }
    const handleEditRow = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const formData = new FormData(e.target)

        const newRow = { ...edit.row }
        for (const entry of formData.entries()) {
            const [key, val] = entry
            newRow[key] = val
        }
        newRow.table = edit.table

        const table = tables[edit.table - 1].table
        const rowIdx = table.rows.findIndex(row => row.id === edit.row.id)
        const newRows = [...table.rows]
        newRows[rowIdx] = newRow

        switch (edit.table) {
            case 1:
                setTable1({ ...table1, rows: newRows })
                break;
            case 2:
                setTable2({ ...table2, rows: newRows })
                break;
            case 3:
                setTable3({ ...table3, rows: newRows })
                break;

            default:
                break;
        }

        setEdit(false)
        setIsLoading(false)
    }


    useEffect(() => {
        if (edit && edit.key.includes('delete')) handleDeleteRow()
        setDefaultValuesTable(cleanValuesTable)
        setDefaultValuesRow(cleanValuesRow)
        // eslint-disable-next-line
    }, [edit])


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.databases}</div>

            <ButtonGroup variant='shadow' className='buttongroup-xs' id='consola'>
                <Button
                    isIconOnly
                    onClick={handleResetTables}
                >
                    {icons.Reset}
                </Button>

                <Button
                    color='warning'
                    className='text-white'
                    onClick={() => setEdit({ key: 'addTable' })}
                    isDisabled={typeof edit === 'object' || (table1.enabled && table2.enabled && table3.enabled)}
                >
                    {langText.createTable}
                </Button>
            </ButtonGroup>

            {edit.key === 'addTable' && (
                <form
                    onSubmit={handleAddTable}
                    className='bg-content1 py-4 xs:px-4 rounded-lg flex flex-col gap-4 items-center my-6 shadow-medium form-xs xs:min-w-[300px]'
                >
                    <div>{langText.createTable}:</div>

                    <Input
                        name={'name'}
                        label={langText.nameOfTable}
                        className='form-input'
                        maxLength={50}

                        value={defaultValuesTable.name}
                        onValueChange={(e) => {
                            const newValues = { ...defaultValuesTable }
                            newValues.name = e
                            setDefaultValuesTable(newValues)
                        }}

                        isClearable
                        onClear={() => {
                            const newValues = { ...defaultValuesTable }
                            newValues.name = ''
                            setDefaultValuesTable(newValues)
                        }}
                    />

                    <div className='center gap-4 sm:flex-row w-full'>
                        {[...Array(4)].map((e, i) =>
                            <Input
                                key={'col' + (i + 1)}
                                name={'col' + (i + 1)}
                                label={langText.databasesLabels['col' + (i + 1)]}
                                className='form-input'
                                maxLength={50}

                                value={defaultValuesTable['col' + (i + 1)]}
                                onValueChange={(e) => {
                                    const newValues = { ...defaultValuesTable }
                                    newValues['col' + (i + 1)] = e
                                    setDefaultValuesTable(newValues)
                                }}

                                isClearable
                                onClear={() => {
                                    const newValues = { ...defaultValuesTable }
                                    newValues['col' + (i + 1)] = ''
                                    setDefaultValuesTable(newValues)
                                }}
                            />
                        )}
                    </div>

                    <div className='center gap-4 sm:flex-row max-xs:w-full'>
                        <Button
                            isIconOnly
                            isDisabled={isLoading}
                            className='button-xs max-sm:w-full'
                            onClick={() => setDefaultValuesTable(cleanValuesTable)}
                        >
                            {icons.Reset}
                        </Button>

                        <Button
                            color='danger'
                            isDisabled={isLoading}
                            className='button-xs'
                            onClick={() => setEdit(false)}
                        >
                            {langText.actions.cancel}
                        </Button>

                        <Button
                            color='warning'
                            isDisabled={isLoading}
                            className='button-xs text-white'
                            onClick={() => setDefaultValuesTable({
                                name: '',
                                col1: langText.form.name,
                                col2: langText.form.surname,
                                col3: langText.form.user,
                                col4: langText.form.asociated,
                            })}
                        >
                            {langText.actions.autocomplete}
                        </Button>

                        <Button
                            type='submit'
                            color='secondary'
                            isLoading={isLoading && edit.key === 'addTable'}
                            className='button-xs'
                        >
                            {langText.createTable}
                        </Button>
                    </div>
                </form>
            )}


            {edit.key === 'addRow' && (
                <form
                    onSubmit={handleAddRow}
                    className='bg-content1 py-4 xs:px-4 rounded-lg flex flex-col gap-4 items-center my-6 shadow-medium form-xs xs:min-w-[300px]'
                >
                    <div>{langText.addToTable}: {edit.table.name}</div>

                    <div className='center gap-4 sm:flex-row w-full'>
                        {edit.table.cols.map((col, i) =>
                            !col.includes('actions') && (
                                < Input
                                    key={col}
                                    name={col}
                                    label={edit.table.labels[col]}
                                    maxLength={50}

                                    value={defaultValuesRow['col' + (i + 1)]}
                                    onValueChange={(e) => {
                                        const newValues = { ...defaultValuesRow }
                                        newValues['col' + (i + 1)] = e
                                        setDefaultValuesRow(newValues)
                                    }}

                                    isClearable
                                    onClear={() => {
                                        const newValues = { ...defaultValuesRow }
                                        newValues['col' + (i + 1)] = ''
                                        setDefaultValuesRow(newValues)
                                    }}
                                />
                            )
                        )}
                    </div>

                    <div className='center gap-4 sm:flex-row max-xs:w-full'>
                        <Button
                            isIconOnly
                            isDisabled={Boolean(isLoading)}
                            className='button-xs max-sm:w-full'
                            onClick={() => setDefaultValuesRow(cleanValuesRow)}
                        >
                            {icons.Reset}
                        </Button>

                        <Button
                            color='danger'
                            isDisabled={Boolean(isLoading)}
                            className='button-xs'
                            onClick={() => setEdit(false)}
                        >
                            {langText.actions.cancel}
                        </Button>

                        <Button
                            color='warning'
                            isDisabled={Boolean(isLoading)}
                            className='button-xs text-white'
                            onClick={() => setDefaultValuesRow({
                                col1: name(),
                                col2: surname(),
                                col3: username(),
                                col4: fullname(),
                            })}
                        >
                            {langText.actions.autocomplete}
                        </Button>

                        <Button
                            type='submit'
                            color='secondary'
                            isDisabled={Boolean(isLoading) || !edit.key.includes('addRow')}
                            isLoading={Boolean(isLoading) && edit.key.includes('addRow')}
                            className='button-xs'
                        >
                            {langText.actions.add}
                        </Button>
                    </div>
                </form>
            )}
            {edit.key === 'editRow' && (
                <form
                    onSubmit={handleEditRow}
                    className='bg-content1 py-4 xs:px-4 rounded-lg flex flex-col gap-4 items-center my-6 shadow-medium form-xs xs:min-w-[300px]'
                >
                    <div>{langText.editRow}:</div>

                    <div className='center gap-4 sm:flex-row w-full'>
                        {Object.keys(edit.row).map(col =>
                            col.includes('col') && (
                                < Input
                                    key={col}
                                    name={col}
                                    label={edit.table === 1 ? table1.labels[col] : edit.table === 2 ? table2.labels[col] : table3.labels[col]}
                                    defaultValue={edit.row[col]}
                                    className='form-input'
                                    maxLength={50}
                                />
                            )
                        )}
                    </div>

                    <div className='center gap-4 sm:flex-row max-xs:w-full'>
                        <Button
                            color='danger'
                            onClick={() => setEdit(false)}
                            isDisabled={Boolean(isLoading)}
                            className='button-xs'
                        >
                            {langText.actions.cancel}
                        </Button>

                        <Button
                            type='submit'
                            color='primary'
                            isDisabled={Boolean(isLoading)}
                            isLoading={isLoading && edit.key.includes('editRow')}
                            className='button-xs'
                        >
                            {langText.actions.save}
                        </Button>
                    </div>
                </form>
            )}


            {tables.map(item =>
                item.table.enabled && (
                    <section key={item.key} className=' w-full center items-center'>
                        <Divider className='mt-8 mb-4 w-3/4' />

                        <div className='text-center' >{item.table.name}</div>

                        <ButtonGroup variant='ghost' className='buttongroup-xs mt-2' id='consola'>
                            <Button
                                href="#consola"
                                as={Link}
                                color='primary'
                                onClick={() => setEdit({ key: 'addRow', table: item.table })}
                                isDisabled={typeof edit === 'object' || Boolean(isLoading)}
                            >
                                {langText.actions.add}
                            </Button>
                        </ButtonGroup>

                        <CustomTable
                            data={item.table}
                            preferences={{
                                model: ['pages'],
                                checks: ['headers', 'strip'],
                            }}
                            makeCell={makeCell}
                            ariaLabel={'Bases de datos: Tabla 1'}
                            className={'mt-4 w-full max-w-[800px]'}
                        />
                    </section>
                )
            )}

        </main >
    );
}

export default DatabasesNoUser;
