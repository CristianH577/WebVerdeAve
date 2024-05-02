import { createRef, useEffect, useMemo, useState } from 'react';
import './Showroom.css'

import addLangText from '../../lang/Designs/Showroom.json'
import { useOutletContext } from 'react-router-dom';

import { Input, Button, Pagination, ButtonGroup } from '@nextui-org/react';
import { Card, CardBody, CardFooter, Image, CardHeader } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";

import { CSSTransition } from 'react-transition-group'

import { Search, Bag, List, Grid, Star, Reset } from '../../assets/icons';

import articles_data from '../../assets/files/showroom.json'


function Showroom() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    const icons = {
        Search: <Search />,
        Bag: <Bag />,
        Grid: <Grid size={22} />,
        List: <List size={22} />,
        Star: <Star className='text-default' />,
        Reset: <Reset />
    }
    const filters = [
        {
            key: 'results',
            items: ['1', '4', '5', '10'],
        },
        {
            key: 'category',
            items: [...articles_data.categories],
        },
        {
            key: 'marca',
            items: [...articles_data.marcas, ...articles_data.fruits_marcas],
        },
        {
            key: 'rank',
            items: ['0', '1', '2', '3', '4', '5'],
        },
    ]
    const contextImgs = require.context('../../assets/imgs/showroom', true)


    const filtersRef = createRef()
    const [data, setData] = useState({ articles: [...articles_data.articles] })
    const [showFilters, setShowfilters] = useState(false)
    const preferences_default = {
        list: false,
        results: ['10'],
        orderUp: true,
        search: '',
        category: [],
        marca: [],
        rank: [],
        min: '',
        max: '',
    }
    const [preferences, setPreferences] = useState(preferences_default)


    // pagination
    const total_pages = Math.ceil(data.articles.length / parseInt(preferences.results[0]))
    const [page, setPage] = useState(1)
    const listPages = useMemo(() => {
        const start = (page - 1) * parseInt(preferences.results[0])
        const end = start + parseInt(preferences.results[0])

        return data.articles.slice(start, end)
        // eslint-disable-next-line
    }, [page, data, preferences])


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
        const articles_new = articles_data.articles.filter(art => {
            var bool = false
            if (Object.values(art).toString().includes(preferences.search)) {
                bool = true
            }
            if (preferences.category.length !== 0 && !preferences.category.includes(art.category)) {
                bool = false
            }
            if (preferences.marca.length !== 0 && !preferences.marca.includes(art.marca)) {
                bool = false
            }
            if (preferences.rank.length !== 0 && !preferences.rank.includes(String(art.rank))) {
                bool = false
            }
            if (preferences.min !== '' && preferences.min > art.price) {
                bool = false
            }
            if (preferences.max !== '' && preferences.max < art.price) {
                bool = false
            }
            if (bool) {
                return art
            } else {
                return false
            }
        })

        setData({
            ...data,
            articles: articles_new,
        })
    }
    const handleFilterSelect = (e) => {
        const name = e.target.name
        var value = [e.target.value]

        if (name === 'results') {
            if (!value.includes("")) preferences.results = value
        } else {
            if (value.includes("")) value = []
            preferences[name] = value
        }
        setPreferences({ ...preferences })

        handleSearch()
    }
    const handleFilterInput = (e) => {
        const name = e.target.name
        var value = e.target.value

        preferences[name] = value
        setPreferences({ ...preferences })

        handleSearch()
    }

    const handleReset = () => {
        setData({ articles: [...articles_data.articles] })
        setPreferences(preferences_default)
    }


    useEffect(() => {
        setPage(1)
    }, [data])
    useEffect(() => {
        window.scroll(0, 0)
    }, [page])


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.showroom}
            </div>

            {/* buscador */}
            <section className='w-full max-w-[500px]'>
                <div className='flex max-xs:flex-col gap-2 xs:items-center'>
                    <Input
                        type='search'
                        classNames={{
                            inputWrapper: "max-xs:rounded-none max-xs:border-x-0",
                        }}
                        placeholder={langText.search.search + '...'}
                        endContent={<span className='cursor-pointer hover:text-warning' onClick={handleSearch}>{icons.Search}</span>}
                        variant="bordered"

                        name='search'
                        value={preferences.search}
                        onValueChange={e => setPreferences({ ...preferences, search: e })}
                        onKeyUp={e => {
                            if (e.key === 'Enter') handleSearch()
                        }}
                    />

                    <ButtonGroup>
                        <Button
                            color={showFilters ? 'default' : (preferences.category.length !== 0 || preferences.marca.length !== 0 || preferences.rank.length !== 0 || preferences.min !== '' || preferences.max !== '') ? 'warning' : 'primary'}
                            className="lg:hidden max-xs:rounded-none"
                            onClick={() => setShowfilters(!showFilters)}
                        >
                            {langText.search.filters}
                        </Button>
                        <Button
                            isIconOnly
                            className="lg:rounded-xl"
                            onClick={handleReset}
                        >
                            {icons.Reset}
                        </Button>
                    </ButtonGroup>
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

            <div className='flex flex-col gap-4 lg:flex-row w-full max-w-[1500px]'>

                {/* filtros */}
                <CSSTransition nodeRef={filtersRef} in={showFilters} appear timeout={300} classNames={"filters-trans-lg"}  >
                    <div ref={filtersRef} className='w-full flex justify-center flex-wrap gap-4 lg:justify-start lg:flex-nowrap lg:flex-col lg:max-w-[200px] overflow-hidden max-h-0 lg:max-h-[100vh]'>
                        {filters.map(filter =>
                            <Select
                                key={filter.key}
                                variant='underlined'
                                label={langText.filters[filter.key].label}
                                size='sm'
                                className={'max-w-[200px] ' + (context.dark ? 'dark' : '')}
                                name={filter.key}
                                selectedKeys={preferences[filter.key]}
                                onChange={handleFilterSelect}
                                aria-label={langText.search.filter + " " + filter.key}
                                classNames={{
                                    popoverContent: (context.dark ? 'dark text-foreground' : ''),
                                }}
                            >
                                {filter.key !== 'results' && (
                                    <SelectSection showDivider className={preferences[filter.key].length === 0 ? 'hidden' : ''}>
                                        <SelectItem className='capitalize' key=''>
                                            {langText.filters.remove}
                                        </SelectItem>
                                    </SelectSection>
                                )}
                                {filter.items.map(item =>
                                    <SelectItem key={item} className='capitalize' value={item}>
                                        {langText.filters[filter.key].items ? langText.filters[filter.key].items[item] : item}
                                    </SelectItem>
                                )}
                            </Select>
                        )}

                        <div className='max-w-[200px] flex'>
                            <Input
                                type='number'
                                label='Precio Min'
                                startContent='$'
                                placeholder='-'
                                className=''
                                size='sm'
                                variant='underlined'
                                classNames={{
                                    inputWrapper: 'rounded-e-none',
                                }}

                                name='min'
                                value={preferences.min}
                                onChange={handleFilterInput}
                            />
                            <Input
                                type='number'
                                label='Precio Max'
                                startContent='$'
                                placeholder='-'
                                size='sm'
                                variant='underlined'
                                classNames={{
                                    inputWrapper: 'rounded-e-none',
                                }}

                                name='max'
                                value={preferences.max}
                                onChange={handleFilterInput}
                            />
                        </div>
                    </div>
                </CSSTransition>


                {/* articulos */}
                <div className='mt-4 flex flex-col items-center w-full'>
                    <div className={' gap-4 ' + (preferences.list ? 'center items-center ' : 'grid gap-4 grid-cols-1 sm:grid-cols-2 min-[932px]:grid-cols-3 2xl:grid-cols-4')}>
                        {listPages.map(art =>
                            <Card
                                key={art.name + art.key}
                                shadow="sm"
                                className='xs:max-w-[300px] justify-between data-[display=list]:sm:max-w-[800px] data-[display=list]:sm:flex-row data-[display=list]:xs:mx-2 max-xs:rounded-none'
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
                                        src={contextImgs(`./${art.category}/${art.name}.png`)}
                                        className="xs:w-[300px] xs:h-[300px] object-contain bg-content2 p-2 max-xs:rounded-none"
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
                                                {langText.filters.category.items[art.category]}
                                            </p>
                                            <p className="text-small text-default-500">
                                                Stock: {art.stock}
                                            </p>
                                        </div>

                                        <RadioGroup
                                            className='clasificacion'
                                            orientation="horizontal"
                                            defaultValue={5 - art.rank}
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

                                    <CardFooter className="flex max-xs:flex-col gap-2 max-xs:px-0 justify-center">
                                        <Input
                                            placeholder="0.00"
                                            readOnly
                                            className='sm:max-w-[100px]'
                                            classNames={{
                                                inputWrapper: ' h-auto max-xs:rounded-none'
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

                    {total_pages === 0
                        ?
                        <div className='text-muted text-4xl'>{langText.search.noResults}</div>
                        :
                        <Pagination
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={total_pages}
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