import { useEffect, useState } from 'react';

import addLangText from '../../../lang/Apis/Databases/Databases.json'
import { useOutletContext } from 'react-router-dom';

import { postAPI, getAPI } from '../../../libs/api.js';

import { Button, ButtonGroup, Spinner } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

import ErrorBoundary from '../../../components/ErrorBoundary.js'
import FormAddTable from './components/FormAddTable.js';
import FormAddRow from './components/FormAddRow.js';
import FormEditRow from './components/FormEditRow.js';

import { Delete, Check, Edit, Reset } from '../../../assets/icons.js';
import MakeTable from './components/MakeTable.js';



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
    const [tables, setTables] = useState([])

    const handleAddTable = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const formData = new FormData(e.target)

        var table_key = tables.length + 1

        const newTable = {
            key: table_key,
            cols: [],
            rows: [],
            labels: {},
            name: "Tabla " + table_key,
        }

        for (const entry of formData.entries()) {
            const [key, val] = entry
            if (val !== '') {
                if (key === 'name') {
                    newTable.name = val
                } else {
                    const k = key + "_" + table_key
                    newTable.cols.push(k)
                    newTable.labels[k] = val
                }
            }
        }

        const col_actions = 'actions_' + table_key
        newTable.cols.push(col_actions)
        newTable.labels[col_actions] = ""

        const newTables = [...tables]
        newTables.push(newTable)

        setTables(newTables)
        setUser({ ...user, tables: newTables })

        setEdit(false)
        setIsLoading(false)
    }

    const handleResetTables = async () => {
        setEdit(false)
        setTables([])
        setUser({ id: user.id })
        setIsLoading(false)
        await getAPI('es/Databases_Controller/deleteUser?id=' + user.id, lang)
    }

    const makeCell = (row, col) => {
        var cellContent = <></>

        if (col.includes('actions')) {
            const table_key = parseInt(col.split("_")[1])
            const id = row['id_' + table_key]

            cellContent =
                <div className="flex items-center gap-4 justify-center">
                    <Tooltip color="danger" content={langText.actions.delete} >
                        <span
                            className="text-danger cursor-pointer active:opacity-50"
                            onClick={() => handleDeleteRow(table_key, id)}
                        >
                            {icons.Delete}
                        </span>
                    </Tooltip>

                    <Tooltip color="primary" content={langText.actions.edit} >
                        <span
                            className=" text-primary cursor-pointer active:opacity-50"
                            onClick={() => {
                                setEdit(false)

                                setTimeout(() => {
                                    setEdit({ key: 'editRow', row: row, table_key: table_key })
                                }, 100)

                                setTimeout(() => {
                                    document.getElementById("form_edit_row").scrollIntoView()
                                }, 200);
                            }}
                        >
                            {icons.Edit}
                        </span>
                    </Tooltip>
                </div>
        } else {
            cellContent = <div>{row[col]}</div>
        }

        return cellContent
    }

    const updateTable = async (table_key) => {
        setIsLoading(table_key)

        const response = await getAPI('es/Databases_Controller/getRows?table=' + table_key + '&id=' + user.id, lang)

        if (response.bool && Array.isArray(response.value)) {
            const newRows = response.value.map(row => {
                row.key = row['id_' + table_key]
                return row
            })

            const newTables = tables.map(table => {
                if (table.key === table_key) table.rows = newRows
                return table
            })

            setTables(newTables)
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }


    // rows-----------------------------------------------------------------------------
    const handleAddRow = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsLoading(true)

        const form_values = new FormData(e.target)

        form_values.append('table', edit.table.key)
        form_values.append('id_user', user.id)

        const response = await postAPI('es/Databases_Controller/addRow', form_values, lang)

        if (response.bool) updateTable(edit.table.key)

        setEdit(false)

        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }

    const handleDeleteRow = async (table_key, id) => {

        const deleteRow = await getAPI('es/Databases_Controller/deleteRow?table=' + table_key + '&id=' + id, lang)

        if (deleteRow.bool) await updateTable(table_key)

        setEdit(false)
    }

    const handleEditRow = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        var table = edit.table_key

        setIsLoading(table)

        const form_data = new FormData(e.target)

        form_data.append('table', table)
        form_data.append('id_user', user.id)
        form_data.append('id_' + table, edit.row['id_' + table])

        const response = await postAPI('es/Databases_Controller/updateRow', form_data, lang)

        if (response.bool) await updateTable(table)

        setEdit(false)
    }


    // user-----------------------------------------------------------------------------
    const getUser = async () => {
        setIsLoading(true)

        if (!user) {
            for (let i = 0; i < 3; i++) {
                const newId = Math.floor(Math.random() * (10000) + 1)

                const response = await getAPI('es/Databases_Controller/validateIdUser?id=' + newId, lang)

                if (response.bool) {
                    if (typeof response.value === 'object') {
                        i = 3
                    } else {
                        if (!response.value) {
                            i = 3
                            setUser({
                                id: newId
                            })
                        }
                    }
                } else {
                    break
                }
            }
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            if (user?.tables) {
                setTables([...user.tables])
            }
        } else {
            setTimeout(() => {
                getUser()
            }, 500);
        }
        // eslint-disable-next-line
    }, [])


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.databases}
            </div>

            {(!user && isLoading) && (
                <Spinner />
            )}

            {(!user && !isLoading) && (
                <p className='p-2 border border-danger rounded-lg bg-content2 text-danger'>
                    No hay conexion a la base de datos o hubo un problema para acceder a esta.
                </p>
            )}

            {user && (
                <ButtonGroup variant='shadow' className='buttongroup-xs mt-4' id='consola'  >
                    <Button
                        isIconOnly
                        onClick={handleResetTables}
                    >
                        {icons.Reset}
                    </Button>

                    <Button
                        color='secondary'
                        onClick={() => setEdit({ key: 'addTable' })}
                        isDisabled={typeof edit === 'object' || tables.length === 3}
                    >
                        {langText.createTable}
                    </Button>
                </ButtonGroup>
            )}


            {edit.key === 'addTable' && (
                <FormAddTable
                    onSubmit={handleAddTable}
                    isLoading={isLoading}
                    edit={edit}
                    setEdit={setEdit}
                    totalTables={tables.length}
                />
            )}

            {edit.key === 'addRow' && (
                <FormAddRow
                    onSubmit={handleAddRow}
                    isLoading={isLoading}
                    edit={edit}
                    setEdit={setEdit}
                />
            )}

            {edit.key === 'editRow' && (
                <FormEditRow
                    onSubmit={handleEditRow}
                    isLoading={isLoading}
                    edit={edit}
                    setEdit={setEdit}
                    labels={tables.find(table => table.key === edit.table_key).labels}
                />
            )}


            {tables.map(table =>
                <ErrorBoundary>
                    <MakeTable
                        table={table}
                        isLoading={isLoading}
                        makeCell={makeCell}
                        updateTable={updateTable}
                        setEdit={setEdit}
                    />
                </ErrorBoundary>
            )}

        </main >
    );
}

export default Databases;
