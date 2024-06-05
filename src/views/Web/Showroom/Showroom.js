import { useEffect, useMemo, useState } from 'react';

import addLangText from '../../../lang/Web/Showroom.json'
import { useOutletContext } from 'react-router-dom';

import { Input, Button, Pagination, useDisclosure } from '@nextui-org/react';
import { Card, CardBody, CardFooter, Image, CardHeader } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

import ErrorBoundary from '../../../components/ErrorBoundary.js';
import SearchBar from './components/SearchBar.js'
import FiltersModal from './components/FiltersModal.js';

import { BsStarFill, BsBag } from "react-icons/bs";

import articles_data from '../../../assets/files/showroom.json'


function Showroom() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const contextImgs = require.context('../../../assets/imgs/showroom', true)


    const [data, setData] = useState({ articles: [...articles_data.articles] })

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
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
            <ErrorBoundary lang={context.lang}>
                <SearchBar
                    handleSearch={handleSearch}
                    setPreferences={setPreferences}
                    preferences={preferences}
                    onOpen={onOpen}
                    handleSort={handleSort}
                    handleReset={handleReset}
                    total={data.articles.length}
                />
            </ErrorBoundary>

            {/* articulos */}
            <ErrorBoundary lang={context.lang}>
                <section className='mt-4 flex flex-col items-center w-full '>
                    <div className={' gap-6 md:px-2 ' + (preferences.list ? 'center items-center ' : 'grid grid-cols-1 sm:grid-cols-2 min-[932px]:grid-cols-3 2xl:grid-cols-4')}>
                        {listPages.map(art =>
                            <Card
                                key={art.name + art.key}
                                shadow="sm"
                                className='xs:max-w-[300px] justify-between data-[display=list]:sm:max-w-[800px] data-[display=list]:sm:flex-row data-[display=list]:xs:mx-2 max-xs:rounded-none shadow-lg hover:shadow-warning focus:shadow-success'
                                data-display={preferences.list ? 'list' : 'grid'}
                                classNames={{
                                    header: preferences.list ? 'w-auto' : '',
                                    footer: preferences.list ? 'md:flex-row border-t border-neutral-500' : '',
                                }}
                            >
                                <CardHeader className='p-0' >
                                    <Image
                                        width="100%"
                                        alt={langText.card.article + art.name}
                                        src={contextImgs(`./${art.category}/${art.name}.webp`)}
                                        className="xs:w-[300px] xs:h-[300px] object-contain bg-content2 p-2 max-xs:rounded-none shadow-lg"
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
                                                    <BsStarFill className='text-default' />
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
                                            <BsBag />
                                        </Button>
                                    </CardFooter>
                                </div>
                            </Card>
                        )}
                    </div>

                    {total_pages === 0
                        ? <div className='text-muted text-4xl'>{langText.search.noResults}</div>
                        : <Pagination
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={total_pages}
                            onChange={(page) => setPage(page)}
                            className='my-4'
                        />
                    }
                </section>
            </ErrorBoundary>


            <ErrorBoundary lang={context.lang}>
                <FiltersModal
                    articles_data={articles_data}
                    handleFilterInput={handleFilterInput}
                    preferences={preferences}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleFilterSelect={handleFilterSelect}
                    handleReset={handleReset}
                />
            </ErrorBoundary>

        </main >
    );
}

export default Showroom;