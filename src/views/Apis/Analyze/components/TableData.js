import React, { useEffect, useMemo, useState } from 'react';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

import { Spinner, Button } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

import { useAsyncList } from "@react-stately/data";


function TableData({ data, preferences, filters, selectedRows }) {
    const r = parseInt(preferences.results)
    const modelo = preferences.model[0]
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [see, setSee] = useState(false)
    const [items, setItems] = useState([])
    const [highlights, setHighlights] = useState({})
    const [totalResults, setTotalResults] = useState(data.totalRows)
    // const [selectedRows, setSelectedRows] = useState([])


    const handleFilter = (array, filter) => {
        selectedRows && selectedRows.set([])
        var arrayFiltered = []

        var cols = filters.cols
        if (cols.length === 0) cols = data.cols

        arrayFiltered = array.filter(row => {
            const highlight = []

            for (let j = 0; j < cols.length; j++) {
                const col = cols[j]
                const cell = row[col]
                var bool = false

                if (filter === true) {
                    const num = parseInt(filters.cond)

                    if (!isNaN(cell)) {
                        switch (filters.cond_simbol) {
                            case '=':
                                if (cell === num) bool = true
                                break;
                            case '!=':
                                if (cell !== num) bool = true
                                break;
                            case '<':
                                if (cell < num) bool = true
                                break;
                            case '>':
                                if (cell > num) bool = true
                                break;
                            case '<=':
                                if (cell <= num) bool = true
                                break;
                            case '>=':
                                if (cell >= num) bool = true
                                break;

                            default:
                                break;
                        }
                    }
                }
                else {
                    if (['', null, undefined].includes(cell)) {
                        if (filter === 'null') bool = true
                    }
                    else if (isNaN(cell)) {
                        if (cell.includes(filter)) bool = true
                    }
                }

                if (bool) highlight.push(col)

            }

            if (highlight.length !== 0) {
                highlights[row.id] = highlight
                return row
            }

            return false
        })

        return arrayFiltered
    }

    const [sort, setSort] = useState({ column: 'id', direction: 'ascending' })
    const [sortLoading, setSortLoading] = useState(false)
    const handleSorter = (array, sortData) => {
        const arraySorted = array.sort((a, b) => {
            let first = a[sortData.column]
            let second = b[sortData.column]
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

            if (sortData.direction === "descending") {
                cmp *= -1
            }

            return cmp
        })

        return arraySorted
    }
    const handleSort = (e) => {
        setSortLoading(true)
        if (e !== sort) setSort(e)
        setTimeout(() => {
            setSortLoading(false)
        }, 2000);
    }

    const listPages = useMemo(() => {
        const start = modelo === 'page_unique' ? 0 : (page - 1) * r
        const end = modelo === 'page_unique' ? data.rows.length : start + r

        var newItems = data.rows.slice(start, end)

        if (sortLoading) newItems = handleSorter(newItems, sort)

        return newItems
        // eslint-disable-next-line
    }, [page, sort])
    let list = useAsyncList({
        async load({ cursor, filterText }) {
            var newItems = []
            var next = []
            var listRows = data.rows

            if (filterText) {
                listRows = handleFilter(listRows, filterText)
                setTotalResults(listRows.length)
            } else {
                setHighlights({})
                setTotalResults(data.totalRows)
            }

            if (cursor) {
                setPage((prev) => prev + 1)
            }

            setHasMore(page < Math.ceil(listRows.length / r))

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

            return {
                items: newItems,
                cursor: next,
            }
        },
        async sort({ items, sortDescriptor }) {
            var next = []

            if (page === 1) {
                next = data.rows.slice(r, r * 2)
            }
            else {
                next = data.rows.slice((page + 1) * r, (page + 2) * r)
            }

            return {
                items: handleSorter(items, sortDescriptor),
                cursor: next,
            }
        },
    })


    const tableHeaders = data.cols.reduce((prev, val) => {
        const obj = {
            key: val,
            label: val,
        }
        prev.push(obj)
        return prev
    }, [])
    const bottomContent = () => {
        var bottomContent = <></>

        if (modelo === 'pages') {
            bottomContent =
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={Math.ceil(totalResults / r)}
                        onChange={(page) => setPage(page)}
                    />
                </div>
        }
        else if (modelo === 'solicitude') {
            bottomContent =
                hasMore &&
                <div className="flex w-full justify-center">
                    <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}
                    >
                        {list.isLoading && <Spinner color="warning" size="sm" />}
                        Cargar Mas
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


    // eslint-disable-next-line
    useEffect(() => {
        if (['page_unique', 'pages'].includes(modelo)) {
            setItems(listPages)
        }
        else if (['solicitude', 'infinite'].includes(modelo)) {
            setItems(list.items)
        }
    })
    // eslint-disable-next-line
    useEffect(list.loadMore, [see])
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
    })
    useEffect(() => {
        if (filters) {
            setPage(1)
            var filt = filters.filterText
            if (filters.cond) filt = true
            list.setFilterText(filt)
        }
        // eslint-disable-next-line
    }, [filters])


    return (
        <div>
            <div className='font-semibold flex flex-row gap-4 mb-1 mt-2 me-6 justify-end max-[360px]:justify-center' >
                <div>Columnas: {data.cols.length}</div>
                <div>Filas: {totalResults}</div>
            </div>

            <Table
                aria-label="Tabla de analyze de datos"
                className='max-w-[95vw] min-[360px]:max-w-[90vw] '
                classNames={{
                    wrapper: 'max-[360px]:rounded-none max-[360px]:px-0',
                    th: 'max-[360px]:!rounded-none ',
                    td: 'before:max-[360px]:!rounded-none ',
                }}

                hideHeader={!preferences.checks.includes('headers')}
                isStriped={preferences.checks.includes('striped')}

                isHeaderSticky={preferences.checks.includes('sticky')}

                sortDescriptor={preferences.checks.includes('sort') && (['page_unique', 'pages'].includes(modelo) ? sort : list.sortDescriptor)}

                onSortChange={preferences.checks.includes('sort') && (['page_unique', 'pages'].includes(modelo) ? handleSort : list.sort)}

                bottomContent={bottomContent()}
                bottomContentPlacement={modelo === 'infinite' ? 'inside' : 'outside'}

                selectionMode={filters ? "multiple" : "single"}
                selectedKeys={selectedRows && selectedRows.values}
                onSelectionChange={selectedRows && selectedRows.set}
            >
                <TableHeader columns={tableHeaders}>
                    {(column) =>
                        <TableColumn
                            key={column.id}
                            allowsSorting={preferences.checks.includes('sort')}
                        >
                            {column.label}
                        </TableColumn>}
                </TableHeader>

                <TableBody
                    emptyContent={"Sin resultados"}
                >
                    {items.map(item =>
                        <TableRow key={item.id} >
                            {data.cols.map(col =>
                                <TableCell key={item.id + col} className={highlights[item.id] && highlights[item.id].includes(col) && 'text-warning'}>
                                    {['', null, undefined].includes(getKeyValue(item, col))
                                        ? 'null'
                                        : getKeyValue(item, col)
                                    }
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        </div>
    );
}

export default TableData;
