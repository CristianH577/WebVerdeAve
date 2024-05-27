
import { useState, useEffect, useMemo } from 'react';
import './MakeGalery.css'

import addLangText from '../../../../lang/Web/Galeries/components/MakeGalery.json'
import { useOutletContext } from 'react-router-dom';

import { Button } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image, CardHeader } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useAsyncList } from "@react-stately/data";

import { Fire, Star, Delete, Check, Edit, Heart, Award, Droplet } from '../../../../assets/icons.js';


function MakeGalery({ model, data }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const r = parseInt(model.results)
    const design = model.design
    const display = model.display
    const pagination = model.pagination
    const totalPages = Math.ceil(data.totalArticles / r)
    const [page, setPage] = useState(1)
    const [showLoader, setShowLoader] = useState(false)
    const [refSwiper, setRefSwiper] = useState(null)
    const artImgs = require.context('../../../../assets/imgs/web/galeries', true)

    const icons = {
        Fire: <Fire size={48} fill='red' />,

        Delete: <Delete size={20} />,
        Check: <Check size={24} />,
        Edit: <Edit size={20} />,
    }
    const labels = [
        <Star className='text-warning' size={32} />,
        <Heart className='text-danger' size={32} />,
        <Award className='text-success' size={32} />,
        <Droplet className='text-primary' size={32} />,
    ]

    const listPages = useMemo(() => {
        const start = (page - 1) * r
        const end = start + r

        return data.articles.slice(start, end)
        // eslint-disable-next-line
    }, [page])

    let list = useAsyncList({
        async load({ cursor }) {
            var newItems = []
            var next = []

            if (cursor) {
                setPage((prev) => prev + 1)
            }

            if (cursor) {
                newItems = cursor

                const start = ((page + 1) * r)
                const end = ((page + 2) * r)
                next = data.articles.slice(start, end)
            }
            else {
                newItems = data.articles.slice(0, r)
                next = data.articles.slice(r, r * 2)
            }

            return {
                items: newItems,
                cursor: next,
            }
        },
        async sort({ items, sortDescriptor }) {
            var next = []

            if (page === false) {
                next = data.articles.slice(r, r * 2)
            }
            else {
                next = data.articles.slice((page + 1) * r, (page + 2) * r)
            }

            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column]
                    let second = b[sortDescriptor.column]
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1
                    }

                    return cmp
                }),
                cursor: next,
            }
        },
    })


    const breakpointsCard = {
        640: {
            slidesPerView: 2,
        },
        // 768: {
        //     slidesPerView: 2,
        // },
        992: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        },
        1400: {
            slidesPerView: 5,
        },
        1800: {
            slidesPerView: 6,
        },
        2000: {
            slidesPerView: 7,
        },
        2400: {
            slidesPerView: 9,
        },
    }
    const breakpoints = {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        // 992: {
        //     slidesPerView: 5,
        // },
        1200: {
            slidesPerView: 4,
        },
        // 1400: {
        //     slidesPerView: 7,
        // },
        1800: {
            slidesPerView: 5,
        },
        2000: {
            slidesPerView: 6,
        },
        2400: {
            slidesPerView: 8,
        },
    }

    const makeContent = () => {
        var content = <></>

        switch (display) {
            case 'grid':
                content =
                    <div className="flex max-sm:flex-col gap-4 flex-wrap justify-center" >
                        {getArticles()}
                    </div >
                break;

            case 'list':
                if (design !== 'table') {
                    content =
                        < div className="gap-4 flex flex-col items-center">
                            {getArticles()}
                        </div >
                } else {
                    const cols = ["img", "title", "text", "label", "actions"]

                    content =
                        <Table
                            aria-label="Tabla de galeria"
                            className='w-[100vw] min-[360px]:w-[90vw] max-w-[1000px] '
                            classNames={{
                                wrapper: 'h-full max-[360px]:px-0',
                                table: 'min-w-[100vw] max-w-[1000px] md:min-w-0',
                            }}
                            hideHeader={true}
                            isStriped={true}
                        >
                            <TableHeader >
                                {cols.map(col =>
                                    <TableColumn key={col} >{langText.cols[col]}</TableColumn>
                                )}
                            </TableHeader>

                            {getArticles()}

                        </Table >
                }
                break;

            case 'slider':
                content =
                    <div className='w-screen '>
                        <Swiper
                            onSwiper={setRefSwiper}
                            modules={[Navigation, Mousewheel]}
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={pagination === 'paginas'}
                            mousewheel={true}
                            navigation={true}
                            grabCursor={true}
                            breakpoints={design === 'card' ? breakpointsCard : breakpoints}
                            className='min-[360px]:max-w-[90%] h-full bg-content1 rounded-lg border shadow '
                            autoHeight={true}
                        >
                            {getArticles()}
                        </Swiper>
                    </div >
                break;

            default:
                break;
        }

        return content
    }

    const getArticles = () => {
        var array = []
        var articles = <></>

        if (pagination === 'none') {
            array = data.articles
        }
        else if (pagination === 'pages') {
            array = listPages
        }
        else if (['solicitude', 'infinite'].includes(pagination)) {
            array = list.items
        }


        if (display === 'slider') {
            articles = array.map((article) =>
                <SwiperSlide
                    key={article.key}
                    className='p-2 !flex justify-center'
                >
                    {
                        design === 'button' ? DesignButton(article)
                            : design === 'label' ? DesignLabel(article)
                                : design === 'card' ? DesignCard(article)
                                    : DesignDefault(article)
                    }
                </SwiperSlide>
            )

            // paginacion
            if (pagination === 'solicitude') {
                (page < totalPages) &&
                    articles.push(
                        <SwiperSlide
                            key='solicitude'
                            className='p-2 !flex justify-center !w- !h-full'
                        >
                            <div className="flex w-full justify-center items-center">
                                <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore} className='h-full' >
                                    {list.isLoading
                                        ? <Spinner color="warning" size="sm" />
                                        : langText.loadMore
                                    }

                                </Button>
                            </div>
                        </SwiperSlide>
                    )
            }
            else if (pagination === 'infinite') {
                (page < totalPages) &&
                    articles.push(
                        <SwiperSlide
                            key='infinite'
                            className='p-2 !flex justify-center !w- !h-full'
                        >
                            <div className="flex w-full justify-center mt-4" id='loader'>
                                <Spinner color="danger" />
                            </div>
                        </SwiperSlide>)
            }
        }
        else if (design === 'table') {
            articles =
                <TableBody
                    items={array}
                    emptyContent={langText.search.noResults}
                    className='body'
                >
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) =>
                                <TableCell className={columnKey === 'text' ? 'min-w-[200px] max-w-[400px]' : ''}>
                                    {makeCell(item, columnKey)}
                                </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
        }
        else {
            articles = array.map(article =>
                design === 'button' ? DesignButton(article)
                    : design === 'label' ? DesignLabel(article)
                        : design === 'card' ? DesignCard(article)
                            : DesignDefault(article)
            )
        }

        return articles
    }

    const DesignDefault = (article) => {
        return <Image
            key={article.key}
            shadow="sm"
            radius="lg"
            width="100%"
            alt={article.title || langText.card.title + ' ' + article.key}
            src={artImgs(`./galeries (${article.key}).webp`)}
            className="w-[360px] h-[360px] object-contain bg-content2 p-2 max-[360px]:rounded-none"
        />
    }
    const DesignButton = (article) => {
        return <Card
            shadow="sm"
            key={'design' + article.key}
            isPressable
            data-display={display}
            className='data-[display=list]:min-[360px]:flex-row data-[display=list]:items-center max-w-[700px] max-[360px]:rounded-none'
            classNames={{
                footer: display === 'list' && 'flex-col',
            }}
        >
            <CardBody className="overflow-visible p-0 ">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={article.title || langText.card.title + ' ' + article.key}
                    src={artImgs(`./galeries (${article.key}).webp`)}
                    className={"h-[360px] object-contain bg-content2 p-2 max-[360px]:rounded-none " + (display === 'list' ? 'w-full' : 'w-[360px]')}
                />
            </CardBody>
            <CardFooter className="text-2xl justify-center" >
                <b>{article.title || langText.card.title + ' ' + article.key}</b>
                {display === 'list' && (
                    <>
                        <div className='text-neutral-500'>{article.subtitle || langText.card.subtitle + ' ' + article.key}</div>
                        <div>{article.text}</div>
                    </>
                )}
            </CardFooter>
        </Card>
    }
    const DesignLabel = (article) => {
        return <Card key={article.key} shadow="sm" className='max-[360px]:rounded-none'>
            <CardBody className="overflow-visible p-8 flex justify-center ">
                <Image
                    radius="lg"
                    width='100%'
                    alt={article.title || langText.card.title + ' ' + article.key}
                    src={artImgs(`./galeries (${article.key}).webp`)}
                    className="w-[360px] h-[360px] object-contain p-2 "
                />
                <div className=' rounded-lg absolute top-[10px] left-[10px] z-10 p-2 opacity-90'>{labels[Math.floor(Math.random() * labels.length)]}</div>
                <div className=' rounded absolute bottom-[10px] right-[10px] z-10 flex items-center justify-center font-semibold opacity-70 text-2xl' >{article.title || langText.card.title + ' ' + article.key}</div>
            </CardBody>
        </Card>
    }
    const DesignCard = (article) => {
        return <Card
            key={article.key}
            shadow="sm"
            className='max-w-[360px] justify-between data-[display=list]:max-w-[800px] data-[display=list]:sm:flex-row data-[display=list]:min-[360px]:mx-2 max-[360px]:rounded-none'
            data-display={display}
            classNames={{
                header: display === 'list' ? 'w-auto' : 'shadow ',
                footer: display === 'list' ? 'sm:flex-row border-t border-neutral-500' : '',
            }}
        >
            <CardHeader className='p-0' >
                <Image
                    width="100%"
                    alt={article.title || langText.card.title + ' ' + article.key}
                    src={artImgs(`./galeries (${article.key}).webp`)}
                    className="w-[360px] h-[360px] object-contain bg-content2 p-2 max-[360px]:rounded-none"
                />
            </CardHeader>

            <div className={display === 'list' ? 'flex flex-col jusify-beetween py-2 min-[360px]:px-2' : ''}>
                <CardBody className="justify-between gap-4 ">
                    <div>
                        <p className="text-lg font-semibold">{article.title || langText.card.title + ' ' + article.key}</p>
                        <p className="text-md">{article.subtitle || langText.card.subtitle + ' ' + article.key}</p>
                        <p className="text-small text-default-500">{article.text}</p>
                    </div>

                    <RadioGroup
                        className='clasificacion items-start'
                        orientation="horizontal"
                    >
                        {[...Array(5)].map((e, i) =>
                            <Radio key={i} value={i} classNames={{ wrapper: 'hidden' }}>
                                {icons.Star}
                            </Radio>
                        )}
                    </RadioGroup>
                </CardBody>

                <CardFooter className="flex-col max-[360px]:px-0">
                    <div className='w-full flex flex-col justify-around sm:flex-row gap-2'>
                        <Button
                            color='danger'
                            className='max-[360px]:rounded-none '
                        >
                            {icons.Delete}
                        </Button>
                        {display === 'list' &&
                            <Button
                                color='primary'
                                className='max-[360px]:rounded-none '
                            >
                                {icons.Edit}
                            </Button>
                        }

                        <Button
                            color='success'
                            className='max-[360px]:rounded-none '
                        >
                            {icons.Check}
                        </Button>
                    </div>
                </CardFooter>
            </div>
        </Card>
    }

    const makeCell = (item, columnKey) => {
        var cellContent = <></>

        switch (columnKey) {
            case "img":
                cellContent =
                    <Image
                        shadow="sm"
                        className=" h-[360px] object-contain bg-content2 p-2 max-[360px]:rounded-none"
                        src={artImgs(`./galeries (${item.key}).webp`)}
                        alt={item.title}
                        width={'100%'}
                        classNames={{
                            wrapper: 'w-[360px]'
                        }}
                    />
                break;
            case "title":
                cellContent = <div className='w-max font-bold text-xl'>{item.title}</div>
                break;
            case "text":
                cellContent = <div >{item.text}</div>
                break;
            case "label":
                cellContent = <div >{labels[Math.floor(Math.random() * labels.length)]}</div>
                break;
            case "actions":
                cellContent =
                    <div className="relative flex flex-col items-center gap-4 ">
                        <Tooltip color="danger" content={langText.actions.delete} placement='left-start' >
                            <span className="text-danger cursor-pointer active:opacity-50">
                                {icons.Delete}
                            </span>
                        </Tooltip>
                        <Tooltip color="primary" content={langText.actions.edit} placement='left-start'>
                            <span className=" text-primary cursor-pointer active:opacity-50">
                                {icons.Edit}
                            </span>
                        </Tooltip>
                        <Tooltip color="success" content={langText.actions.approve} placement='left-start'>
                            <span className=" text-success cursor-pointer active:opacity-50">
                                {icons.Check}
                            </span>
                        </Tooltip>
                    </div>
                break;

            default:
                break;
        }

        return cellContent
    }

    const mekePagination = () => {
        var mekePagination = <></>

        if (pagination === 'pages') {
            mekePagination =
                <div className="flex w-full justify-center">
                    <Pagination
                        showControls
                        loop
                        showShadow
                        color="secondary"
                        page={page}
                        total={totalPages}
                        onChange={(page) => {
                            setPage(page)
                            if (display !== 'slider') {
                                window.scroll(0, 0)
                            }else {
                                refSwiper && refSwiper.slideTo(0,0)
                            }
                        }}
                        boundaries={-1}
                        className='my-4 '
                    />
                </div>
        }
        else if (display !== 'slider') {
            if (pagination === 'solicitude') {
                mekePagination =
                    (page < totalPages) &&
                    <div className="flex w-full justify-center mt-4">
                        <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}
                        >
                            {list.isLoading
                                ? <Spinner color="warning" size="sm" />
                                : langText.loadMore
                            }

                        </Button>
                    </div>
            }
            else if (pagination === 'infinite') {
                mekePagination =
                    (page < totalPages) &&
                    <div className="flex w-full justify-center mt-4" id='loader'>
                        <Spinner color="danger" />
                    </div>
            }
        }

        return mekePagination
    }


    // eslint-disable-next-line
    pagination === 'infinite' && useEffect(list.loadMore, [showLoader])
    useEffect(() => {
        if (pagination === 'infinite') {
            const more = document.querySelector('#loader')
            function callback(entries, observer) {
                if (entries[0].isIntersecting) {
                    setShowLoader(true)
                    setTimeout(() => {
                        setShowLoader(false)
                    }, 1000)
                } else {
                    setShowLoader(false)
                }
            }
            var observer = new IntersectionObserver(callback, {})
            more && observer.observe(more)
        }
    })


    return (
        <section >
            <div className='text-2xl mb-4 w-full text-center'>{langText.totalE}: {data.totalArticles}</div>

            {makeContent()}

            {mekePagination()}
        </section>
    );
}

export default MakeGalery;
