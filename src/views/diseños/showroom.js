import React, { createRef, useEffect, useMemo, useState } from 'react';
import './showroom.css'

import addLangText from '../../lang/diseños/showroom.json'
import { useOutletContext } from 'react-router-dom';

import { Input, Button, Pagination } from '@nextui-org/react';
import { Card, CardBody, CardFooter, Image, CardHeader } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { CSSTransition } from 'react-transition-group'

import { Search, Bag, List, Grid, Star } from '../../assets/icons';

import json from '../../assets/files/showroom.json'


function Showroom() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    const icons = {
        Search: <Search className="text-default-300" />,
        Bag: <Bag />,
        Grid: <Grid size={22} />,
        List: <List size={22} />,
        Star: <Star className='text-default' />
    }
    const dataDefault = {
        articles: json.articles
    }
    const filters = [
        {
            key: 'results',
            items: ['1', '4', '5', '10'],
        },
        {
            key: 'category',
            items: ['fruta', 'otros'],
        },
    ]


    const contextImgs = require.context('../../assets/imgs/showroom', true)
    const filtersRef = createRef()
    const [data, setData] = useState(dataDefault)
    const [preferences, setPreferences] = useState({
        list: false,
        results: '4',
        orderUp: true,
        search: '',
        category: '',
    })
    const [showFilters, setShowfilters] = useState(false)


    // pagination
    const r = parseInt(preferences.results)
    const totalPages = Math.ceil(data.articles.length / r)
    const [page, setPage] = useState(1)
    const listPages = useMemo(() => {
        const start = (page - 1) * r
        const end = start + r

        return data.articles.slice(start, end)
        // eslint-disable-next-line
    }, [page, preferences, data])


    const handleSort = () => {
        setPreferences({ ...preferences, orderUp: !preferences.orderUp })

        const arraySorted = [...data.articles].sort((a, b) => {
            let first = a.key
            let second = b.key
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

            if (preferences.orderUp) {
                cmp *= -1
            }

            return cmp
        })

        setData({
            ...data,
            articles: arraySorted
        })
    }
    const handleSearch = () => {
        const newArticles = dataDefault.articles.filter(art => Object.values(art).toString().includes(preferences.search))
        setData({
            ...data,
            articles: newArticles,
        })
    }
    const handleFilters = (e) => {
        const value = e.target.value
        const name = e.target.name

        if (name !== 'results') {
            const newArticles = dataDefault.articles.filter(art => art[name] === value)
            data.articles = newArticles
        }

        if (value) {
            const newPreferences = { ...preferences }
            newPreferences[name] = value

            setPreferences(newPreferences)
        }
    }


    useEffect(() => {
        setPage(1)
    }, [data])
    useEffect(() => {
        window.scroll(0, 0)
    }, [page])


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.showroom}</div>

            {/* buscador */}
            <section className='w-full max-w-[500px]'>
                <div className='flex max-[360px]:flex-col gap-2'>
                    <Input
                        type='search'
                        classNames={{
                            inputWrapper: "max-[360px]:rounded-none max-[360px]:border-x-0",
                        }}
                        placeholder={langText.search.search + '...'}
                        endContent={<span className='cursor-pointer' onClick={handleSearch}>{icons.Search}</span>}
                        variant="bordered"
                        onChange={e => preferences.search = e.target.value}
                        onKeyUp={e => e.key === 'Enter' && handleSearch()}
                    />

                    <Button
                        className="lg:hidden max-[360px]:rounded-none"
                        onClick={() => setShowfilters(!showFilters)}
                    >
                        {langText.search.filters}
                    </Button>
                </div>

                <div className="flex justify-between items-center px-4 mt-2  flex-wrap">
                    <span className="text-default-400 text-md"> {langText.search.total + ': ' + data.articles.length}</span>

                    <div className='flex items-center'>
                        <Button
                            className="text-default-400 text-md px-0"
                            size='sm'
                            variant='transparent'
                            onClick={handleSort}
                        >
                            {langText.search.order}: <span className='text-xl'>{preferences.orderUp ? '↓' : '↑'}</span>
                        </Button>

                        <Button
                            className="text-default-400 "
                            isIconOnly
                            size='sm'
                            variant='transparent'
                            onClick={() => setPreferences({ ...preferences, list: !preferences.list })}
                        >
                            {preferences.list ? icons.Grid : icons.List}
                        </Button>
                    </div>
                </div>
            </section>

            <div className='flex flex-col gap-4 lg:flex-row w-full '>

                {/* filtros */}
                <CSSTransition nodeRef={filtersRef} in={showFilters} appear timeout={300} classNames={"filters-trans-lg"}  >
                    <div ref={filtersRef} className='w-full mt-4 flex justify-center flex-wrap gap-4 lg:flex-nowrap lg:flex-col lg:justify-start lg:max-w-[200px] overflow-hidden max-h-0 lg:max-h-[100vh]'>
                        {filters.map(filter =>
                            <Select
                                key={filter.key}
                                variant='underlined'
                                label={langText.filters[filter.key].label}
                                size='sm'
                                className={'max-w-[200px] ' + (context.dark ? 'dark' : null)}
                                name={filter.key}
                                defaultSelectedKeys={preferences[filter.key] ? [preferences[filter.key]] : []}
                                onChange={handleFilters}
                                aria-label={langText.search.filter + " " + filter.key}
                                classNames={{
                                    innerWrapper: "innerWrapper capitalize",
                                    // base: "base",
                                    // label: "label",
                                    // trigger: "trigger",
                                    // mainWrapper: "mainWrapper",
                                    // selectorIcon: "selectorIcon",
                                    // value: "value",
                                    // listboxWrapper: "listboxWrapper "+ (context.dark ? 'bg-cotent1' : null),
                                    // listbox: "listbox",
                                    // popoverContent: "popoverContent",
                                    // helperWrapper: "helperWrapper",
                                    // description: "description",
                                }}
                            >
                                {filter.items.map(item =>
                                    <SelectItem key={item} className='capitalize'>
                                        {langText.filters[filter.key].items ? langText.filters[filter.key].items[item] : item}
                                    </SelectItem>
                                )}
                            </Select>
                        )}
                    </div>
                </CSSTransition>


                {/* articulos */}
                <div className='mt-4 flex flex-col items-center w-full'>
                    <div className={'flex gap-4 ' + (preferences.list ? 'flex-col justify-center items-center' : 'flex-wrap justify-center w-auto lg:justify-start')}>
                        {listPages.map(art =>
                            <Card
                                key={art.name + art.key}
                                shadow="sm"
                                className='xs:max-w-[300px] justify-between data-[display=list]:sm:max-w-[800px] data-[display=list]:sm:flex-row data-[display=list]:min-[360px]:mx-2 max-[360px]:rounded-none'
                                data-display={preferences.list ? 'list' : 'grid'}
                                classNames={{
                                    header: preferences.list ? 'w-auto' : 'shadow',
                                    footer: preferences.list ? 'md:flex-row border-t border-neutral-500' : '',
                                }}
                            >
                                <CardHeader className='p-0' >
                                    <Image
                                        width="100%"
                                        alt={langText.card.article + art.name}
                                        src={contextImgs(`./${art.name}.png`)}
                                        className="w-screen xs:w-[300px] xs:h-[300px] object-contain bg-white p-2 max-xs:rounded-none"
                                    />
                                </CardHeader>

                                <div className={preferences.list ? 'flex flex-col jusify-beetween py-2 min-[360px]:px-2' : ''}>
                                    <CardBody className="justify-between min-h-[200px] w-full">
                                        <div>
                                            <p className="text-lg font-semibold capitalize">
                                                {art.name}
                                            </p>
                                            <p className="text-small text-default-500 ms-1">
                                                {art.desc}
                                            </p>
                                            <p className="text-md mt-1">
                                                {art.marca}
                                            </p>
                                            <p className="text-small text-default-500 capitalize">
                                                {langText.artCategory[art.category]}
                                            </p>
                                            <p className="text-small text-default-500">
                                                Stock: {art.stock}
                                            </p>
                                        </div>

                                        <RadioGroup
                                            className='clasificacion'
                                            orientation="horizontal"
                                            defaultValue={art.rank}
                                        >
                                            {[...Array(5)].map((s, i) =>
                                                <Radio
                                                    key={i}
                                                    value={i}
                                                    classNames={{ wrapper: 'hidden' }}
                                                >
                                                    {icons.Star}
                                                </Radio>
                                            )}
                                        </RadioGroup>
                                    </CardBody>

                                    <CardFooter className="flex max-xs:flex-col gap-2 max-xs:px-0">
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            readOnly
                                            classNames={{
                                                inputWrapper: 'max-[360px]:rounded-none'
                                            }}
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">$</span>
                                                </div>
                                            }
                                            defaultValue={art.price}
                                        />

                                        <Button
                                            color='primary'
                                            className='button-xs'
                                        >
                                            {langText.actions.action}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            color='secondary'
                                            className='button-xs'
                                        >
                                            {icons.Bag}
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        )}
                    </div>

                    {totalPages === 0
                        ?
                        <div className='text-muted text-4xl'>{langText.search.noResults}</div>
                        :
                        <Pagination
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={totalPages}
                            onChange={(page) => setPage(page)}
                            className='my-4'
                        />

                    }
                </div>
            </div >

        </main >
    );
}

export default Showroom;
