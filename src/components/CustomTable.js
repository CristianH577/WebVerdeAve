import { useEffect, useMemo, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

import { Spinner, Button } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

import { useAsyncList } from "@react-stately/data";

// formato de DATA
// const data = {
//     "cols": [
//         "col1_1",
//         "col2_1",
//         "col3_1",
//         "col4_1",
//         "actions_1"
//     ],
//     "rows": [
//         {
//             "col1_1": "Amanda",
//             "col2_1": "Ford",
//             "col3_1": "gray-elephant",
//             "col4_1": "Emily Y. Woods",
//             "id": 0.8564299291711062
//         }
//     ],
//     // opcional
//     "key": 1,
//     "totalRows": 1,
//     "name": "Tabla 1",
//     "labels": {
//         "col1_1": "Nombre",
//         "col2_1": "Apellido",
//         "col3_1": "Usuario",
//         "col4_1": "Asociado",
//         "actions_1": ""
//     },
// }

function CustomTable({ data, preferences, selectedRows, setSelectedRows, ariaLabel, makeCell, refresh, className, color, sortDefault }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }

    const r = preferences.results ? preferences.results : 10
    const modelo = preferences.model ? preferences.model[0] : 'none'
    const checks = preferences.checks ? preferences.checks : []
    const select = preferences.select
        ? preferences.select
        : checks.includes('multiple', 'single')
            ? checks.includes('multiple')
                ? 'multiple'
                : 'none'
            : checks.includes('single')
                ? 'single'
                : 'none'

    const [currentData, setCurrentData] = useState({ ...data })
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [see, setSee] = useState(false)
    const [sortDescriptor, setSortDescriptor] = useState(sortDefault
        ? sortDefault
        : {
            column: '',
            direction: '',
        }
    )


    const tableHeaders = data.cols.reduce((prev, val) => {
        const obj = {
            key: val,
            label: data.labels ? data.labels[val] : val,
        }
        prev.push(obj)
        return prev
    }, [])


    const listPages = useMemo(() => {
        var newItems = []

        if (modelo === 'none') {
            newItems = currentData.rows
        } else {
            const start = (page - 1) * r
            const end = start + r

            newItems = currentData.rows.slice(start, end)
        }

        return newItems
        // eslint-disable-next-line
    }, [page, currentData])

    let list = useAsyncList({
        async load({ cursor }) {
            var newItems = []
            var next = []
            var listRows = currentData.rows

            if (cursor) {
                setPage((prev) => prev + 1)
            }

            if (cursor) {
                newItems = cursor

                const start = ((page + 1) * r)
                const end = ((page + 2) * r)
                next = listRows.slice(start, end)
            }
            else {
                newItems = listRows.slice(0, r)
                next = listRows.slice(r, r * 2)
            }

            setHasMore(page < Math.ceil(listRows.length / r))
            setIsLoading(false)

            return {
                items: newItems,
                cursor: next,
            }
        },
        async sort({ items, sortDescriptor }) {
            setIsLoading(true)
            setPage(1)

            var newItems = []
            var next = []

            var listRows = currentData.rows.sort((a, b) => {
                let first = a[sortDescriptor.column]
                let second = b[sortDescriptor.column]
                let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                if (sortDescriptor.direction === "descending") {
                    cmp *= -1
                }

                return cmp
            })

            newItems = listRows.slice(0, r)
            next = listRows.slice(r, r * 2)

            setTimeout(() => {
                setIsLoading(false)
            }, 2000)

            return {
                items: newItems,
                cursor: next,
            }
        },
    })


    const bottomContent = () => {
        var bottomContent = <></>

        if (modelo === 'pages') {
            bottomContent =
                <div className="flex w-full justify-center">
                    {Math.ceil(currentData.rows.length / r) > 1 &&
                        < Pagination
                            isCompact
                            showControls
                            showShadow
                            color={color ? color : 'secondary'}
                            page={page}
                            total={Math.ceil(currentData.rows.length / r)}
                            onChange={(page) => setPage(page)}
                        />
                    }
                </div>
        }
        else if (modelo === 'solicitude') {
            bottomContent =
                hasMore &&
                <div className="flex w-full justify-center">
                    <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}
                    >
                        {list.isLoading && <Spinner color="warning" size="sm" />}
                        {langText.table.loadMore}
                    </Button>
                </div>
        }
        else if (modelo === 'infinite') {
            bottomContent =
                hasMore &&
                <div className="flex w-full justify-center" id='loader'>
                    <Spinner color="danger" />
                </div>
        }

        return bottomContent
    }
    const handleSortDescriptor = (sort) => setSortDescriptor(sort)
    const handleSortPages = () => {
        setIsLoading(true)

        const rowsSorted = currentData.rows.sort((a, b) => {
            let first = a[sortDescriptor.column]
            let second = b[sortDescriptor.column]
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

            if (sortDescriptor.direction === "descending") {
                cmp *= -1
            }

            return cmp;
        })

        setCurrentData({
            ...currentData,
            rows: rowsSorted
        })
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }


    useEffect(() => {
        if (modelo === 'infinite') {
            const more = document.querySelector('#loader')
            function callback(entries, observer) {
                if (entries[0].isIntersecting) {
                    setSee(true)
                    setTimeout(() => {
                        setSee(false)
                    }, 1000)
                } else {
                    setSee(false)
                }
            }
            var observer = new IntersectionObserver(callback, {})
            more && observer.observe(more)
        }
        // eslint-disable-next-line
    }, [])
    // eslint-disable-next-line
    useEffect(handleSortPages, [sortDescriptor])
    useEffect(() => {
        setCurrentData(data)
        setPage(1)
        refresh && setSortDescriptor({ column: 'id', direction: '', })
        // eslint-disable-next-line
        modelo && ['solicitude', 'infinite'].includes(modelo) && setIsLoading(true)

        // eslint-disable-next-line
    }, [data])
    // eslint-disable-next-line
    useEffect(list.loadMore, [see])
    useEffect(() => {
        list.reload()
        // eslint-disable-next-line
    }, [isLoading])


    return (
        <div className={className && className}>
            {checks.includes('Dcount') && (
                <div className='font-semibold mb-2 flex flex-row gap-4 me-6 justify-end max-sm:justify-center' >
                    <div>{langText.table.columns}: {currentData.cols.length}</div>
                    <div>{langText.table.rows}: {currentData.rows.length}</div>
                </div>
            )}

            <Table
                aria-label={ariaLabel ? ariaLabel : 'Tabla'}
                className={'max-w-[95vw] min-xs:max-w-[90vw] ' + (checks.includes('fixed') && 'h-[500px]')}
                classNames={{
                    wrapper: 'max-xs:rounded-none max-xs:px-0 ' + (color ? 'bg-' + color + '-100' : ''),
                    th: 'max-xs:!rounded-none ' + (color ? 'bg-' + color + '-200' : ''),
                    td: 'before:max-xs:!rounded-none ',
                }}

                color={preferences.color && preferences.color[0]}

                hideHeader={!checks.includes('headers')}
                isStriped={checks.includes('striped')}

                isHeaderSticky={checks.includes('sticky')}

                sortDescriptor={checks.includes('sort') && (['none', 'pages'].includes(modelo) ? sortDescriptor : list.sortDescriptor)}

                onSortChange={checks.includes('sort') && (['none', 'pages'].includes(modelo) ? handleSortDescriptor : list.sort)}

                bottomContent={bottomContent()}
                bottomContentPlacement={modelo === 'infinite' ? 'inside' : 'outside'}

                selectionMode={select}
                selectedKeys={selectedRows && selectedRows}
                onSelectionChange={setSelectedRows && setSelectedRows}
            >
                <TableHeader columns={tableHeaders}>
                    {(column) =>
                        <TableColumn
                            key={column.id}
                            allowsSorting={checks.includes('sort')}
                            className={preferences.capitalize ? 'capitalize' : null}
                        >
                            {column.label}
                        </TableColumn>}
                </TableHeader>

                <TableBody
                    emptyContent={!isLoading ? langText.search.noResults : '         '}
                    isLoading={isLoading}
                    loadingContent={<Spinner label={langText.search.loading + "..."} />}
                    items={['solicitude', 'infinite'].includes(modelo) ? list.items : listPages}
                >
                    {item =>
                        <TableRow key={item.key} >
                            {data.cols.map(col =>
                                col !== 'key' && (
                                    <TableCell
                                        key={item.key + col}
                                    >
                                        {makeCell
                                            ? makeCell(item, col)
                                            : ['', null, undefined].includes(getKeyValue(item, col))
                                                ? langText.table.null
                                                : [true, false].includes(getKeyValue(item, col))
                                                    ? getKeyValue(item, col) ? 'True' : 'False'
                                                    : getKeyValue(item, col)
                                        }
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    }

                </TableBody>
            </Table >
        </div>
    );
}

export default CustomTable;
