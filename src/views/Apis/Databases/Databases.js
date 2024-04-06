import React, { useEffect, useState } from 'react';

import addLangText from '../../../lang/Apis/Databases/Databases.json'
import { useOutletContext } from 'react-router-dom';

import { Button, ButtonGroup, Divider, Link } from "@nextui-org/react";
import { Input, Tooltip } from "@nextui-org/react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomTable from '../../../components/CustomTable.js'

import { postAPI, getAPI } from '../../../libs/api.js';
import { name, surname, username, fullname } from 'react-lorem-ipsum';

import { Delete, Check, Edit, Reset } from '../../../assets/icons.js';


function Databases({ user, setUser }) {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
        ...addLangText[lang]
    }

    const icons = {
        Delete: <Delete size={16} />,
        Check: <Check size={20} />,
        Edit: <Edit size={16} />,
        Reset: <Reset />,
    }

    const [isLoading, setIsLoading] = useState(false)
    const [edit, setEdit] = useState(false)


    // tables-----------------------------------------------------------------------------
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
            labels: {},
            name: "Tabla " + table,
            // idUser: user.id
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

        const newTableUser = { ...newTable }
        newTableUser.rows = []

        switch (table) {
            case 1:
                setTable1(newTable)
                setUser({ ...user, table1: newTable })
                break;
            case 2:
                setTable2(newTable)
                setUser({ ...user, table2: newTable })
                break;
            case 3:
                setTable3(newTable)
                setUser({ ...user, table3: newTable })
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
        setUser({ id: user.id })
        getAPI('es/Databases_Controller/deleteUser?idUser=' + user.id, false)
    }
    const makeCell = (row, col) => {
        var cellContent = <></>

        if (col.includes('actions')) {
            const table = parseInt(col.split("_")[1])
            const id = row['id_' + table]

            cellContent =
                <div className="flex items-center gap-4 justify-center">
                    <Tooltip color="danger" content={langText.actions.delete} >
                        <span
                            className="text-danger cursor-pointer active:opacity-50"
                            onClick={() => setEdit({ key: 'deleteRow', id: id, table: table })}
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
                                        setEdit({ key: 'editRow', row: row, table: table })
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
    const updateTable = async (table) => {
        setIsLoading(table)

        const getData = await getAPI('es/Databases_Controller/getRows?table=' + table + '&idUser=' + user.id, lang)

        if (getData.bool) {
            var newTable = {}
            const newRows = getData.value.map(row => {
                row.key = row['id_' + table]
                return row
            })
            switch (table) {
                case 1:
                    newTable = { ...table1 }
                    newTable.rows = newRows
                    setTable1(newTable)
                    break;
                case 2:
                    newTable = { ...table2 }
                    newTable.rows = newRows
                    setTable2(newTable)
                    break;
                case 3:
                    newTable = { ...table3 }
                    newTable.rows = newRows
                    setTable3(newTable)
                    break;

                default:
                    break;
            }
        }

        setIsLoading(false)
    }


    // filas-----------------------------------------------------------------------------
    const cleanValuesRow = {
        col1: '',
        col2: '',
        col3: '',
        col4: '',
    }
    const [defaultValuesRow, setDefaultValuesRow] = useState(cleanValuesRow)

    const handleAddRow = async (e) => {
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
        newRow.idUser = user.id
        const addRow = await postAPI(newRow, 'es/Databases_Controller/addRow', lang)

        if (addRow.bool) {
            updateTable(edit.table.key)
        }

        setEdit(false)
        setIsLoading(false)
    }
    const handleDeleteRow = async () => {
        setIsLoading(true)

        const deleteRow = await getAPI('es/Databases_Controller/deleteRow?table=' + edit.table + '&id=' + edit.id, lang)

        if (deleteRow.bool) {
            updateTable(edit.table)
        }

        setEdit(false)
        setIsLoading(false)
    }
    const handleEditRow = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const formData = new FormData(e.target)

        const newRow = { ...edit.row }
        var table = 0
        for (const entry of formData.entries()) {
            const [key, val] = entry
            newRow[key] = val
            table = parseInt(key.split('_')[1])
        }
        newRow.table = table

        const update = await postAPI(newRow, 'es/Databases_Controller/updateRow', lang)

        if (update.bool) {
            updateTable(table)
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
    useEffect(() => {
        if (user.table1) setTable1(user.table1)
        if (user.table2) setTable2(user.table2)
        if (user.table3) setTable3(user.table3)
        // eslint-disable-next-line
    }, [])


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.databases}
            </div>

            <ButtonGroup variant='shadow' className='buttongroup-xs' id='consola'>
                <Button
                    isIconOnly
                    onClick={handleResetTables}
                >
                    {icons.Reset}
                </Button>
                <Button
                    color='secondary'
                    onClick={() => setEdit({ key: 'addTable' })}
                    isDisabled={typeof edit === 'object' || (table1.enabled && table2.enabled && table3.enabled)}
                >
                    {langText.createTable}
                </Button>
            </ButtonGroup>

            {edit.key === 'addTable' && (
                <form
                    onSubmit={handleAddTable}
                    className='bg-content1 py-4 xs:px-4 rounded-lg flex flex-col gap-4 items-center my-6 shadow-medium form-xs xs:min-w-[300px] max-w-[600px]'
                >
                    <div>{langText.createTable}:</div>

                    <Input
                        name={'name'}
                        label={langText.nameOfTable}
                        className='form-input'
                        maxLength={50}
                        autoComplete='off'

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
                                autoComplete='off'

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
                                    autoComplete='off'

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
                                    autoComplete='off'
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
                                color='warning'
                                className='hover:!text-white'
                                onClick={() => updateTable(item.key)}
                                isDisabled={typeof edit === 'object' || Boolean(isLoading)}
                                isLoading={isLoading === item.key}
                            >
                                {langText.actions.refresh}
                            </Button>
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


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={context.dark ? 'dark' : 'light'}
            />

        </main >
    );
}

export default Databases;
