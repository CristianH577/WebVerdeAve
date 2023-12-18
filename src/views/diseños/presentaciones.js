import React, { useState } from 'react';
import './presentaciones.css'

import addLangText from '../../lang/diseños/presentaciones.json'
import { useOutletContext } from 'react-router-dom';

import { Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay, Mousewheel, Keyboard, Scrollbar, Zoom, Parallax } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import 'swiper/css/parallax';
import 'swiper/css/grid';

import { LoremIpsum } from 'react-lorem-ipsum';

import { EffectCube, EffectFlip, EffectCoverflow, EffectCards, EffectCreative } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';


function Presentaciones() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    const imgs = require.context('../../assets/imgs/presentaciones', true)

    const preferencias = ['paginacion', 'bucle', 'autoplay', 'zoom']
    const controlls = ['botones', 'rueda', 'teclado', 'raton']
    const pagination = ['puntos', 'barra', 'fraccion', 'progreso']
    const paginationDicc = {
        puntos: 'bullets',
        barra: '',
        fraccion: 'fraction',
        progreso: 'progressbar',
    }

    const [reload, setReload] = useState(false)
    const [preferenciasChecks, setPreferenciasChecks] = useState(['paginacion'])
    const [controllsChecks, setControllsChecks] = useState(['botones'])
    const [paginationRadio, setPaginationRadio] = useState('puntos')

    const [reloadEffects, setReloadEffects] = useState(false)
    const effectsRadios = ['cubo', 'flip', 'flow', 'carta', 'fondo']
    const effectsDicc = {
        cubo: 'cube',
        flip: 'flip',
        flow: 'coverflow',
        carta: 'cards',
        fondo: 'creative',
    }
    const [effectsRadio, setEffectsRadio] = useState('cubo')

    const sectionTittleClass = 'text-5xl mb-8 break-all text-center'


    const handleReload = () => {
        setReload(true)
        setTimeout(() => {
            setReload(false)
        }, 500)
    }
    const handleReloadEffects = () => {
        setReloadEffects(true)
        setTimeout(() => {
            setReloadEffects(false)
        }, 1000)
    }

    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.sliders}</div>

            <section className='w-full mb-8 flex flex-col items-center'>
                <div className={sectionTittleClass}>{langText.customs.title}</div>

                <div className='bg-content1 min-[360px]:rounded-lg p-4 shadow-medium mb-8'>
                    <CheckboxGroup
                        label={langText.customs.prefs.label}
                        orientation="horizontal"
                        className='mb-6'
                        defaultValue={preferenciasChecks}
                        onValueChange={setPreferenciasChecks}
                    >
                        {preferencias.map((e) =>
                            <Checkbox key={e} value={e} className='capitalize' onValueChange={handleReload}>
                                {langText.customs.prefs.checks[e]}
                            </Checkbox>
                        )}
                    </CheckboxGroup>

                    <CheckboxGroup
                        label={langText.customs.controls.label}
                        orientation="horizontal"
                        className='mb-6'
                        defaultValue={controllsChecks}
                        onValueChange={setControllsChecks}
                    >
                        {controlls.map((e) =>
                            <Checkbox
                                key={e}
                                value={e}
                                className='capitalize'
                                onValueChange={() => ['rueda', 'teclado', 'raton'].includes(e) ? handleReload() : null}
                            >
                                {langText.customs.controls.checks[e]}
                            </Checkbox>
                        )}
                    </CheckboxGroup>

                    {preferenciasChecks.includes('paginacion') &&
                        <RadioGroup
                            label={langText.customs.pagination.label}
                            orientation="horizontal"
                            className='mb-6'
                            onValueChange={(v) => {
                                setPaginationRadio(v)
                                handleReload()
                            }}
                            value={paginationRadio}
                        >
                            {pagination.map((e) =>
                                <Radio key={e} value={e} className='capitalize' >
                                    {langText.customs.pagination.checks[e]}
                                </Radio>
                            )}
                        </RadioGroup>
                    }
                </div>

                {!reload
                    ?
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, Mousewheel, Keyboard, Scrollbar, Zoom]}
                        spaceBetween={10}
                        slidesPerView={1}
                        centeredSlides={true}
                        className='w-full min-[360px]:w-[90%] max-w-[800px] h-full min-[360px]:rounded-lg shadow-medium bg-content1'
                        wrapperClass='items-center h-full'

                        //preferencias
                        loop={preferenciasChecks.includes('bucle')}
                        zoom={preferenciasChecks.includes('zoom')}
                        autoplay={{
                            enabled: preferenciasChecks.includes('autoplay'),
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        // direction={'vertical'}

                        //controlls
                        navigation={controllsChecks.includes('botones')}
                        mousewheel={controllsChecks.includes('rueda')}
                        keyboard={controllsChecks.includes('teclado')}
                        grabCursor={controllsChecks.includes('raton')}
                        allowTouchMove={controllsChecks.includes('raton')}

                        //paginacion
                        scrollbar={{
                            enabled: preferenciasChecks.includes('paginacion') && paginationRadio === 'barra',
                            draggable: true,
                        }}
                        pagination={{
                            enabled: (preferenciasChecks.includes('paginacion') && paginationRadio !== 'barra'),
                            type: paginationDicc[paginationRadio],
                        }}
                    >
                        {[...Array(5)].map((e, idx) =>
                            <SwiperSlide key={idx} className='py-4 min-[360px]:px-4 '>
                                <div className="swiper-zoom-container">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        alt={langText.slide + idx}
                                        src={imgs(`./gato${idx + 1}.png`)}
                                        className="max-[360px]:rounded-none object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                    :
                    <Spinner className='my-4' />
                }
            </section>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <section className='w-full mb-8 flex flex-col items-center' id='parallax'>
                <div className={sectionTittleClass}>{langText.parallax.title}</div>

                <Swiper
                    modules={[Navigation, Pagination, Mousewheel, Parallax]}
                    spaceBetween={10}
                    slidesPerView={1}
                    centeredSlides={true}

                    mousewheel={true}
                    navigation={true}
                    pagination={true}
                    parallax={true}
                    grabCursor={true}

                    className='w-full min-[360px]:w-[90%] max-w-[800px] min-[360px]:rounded-lg shadow-medium '
                >

                    <div
                        slot="container-start"
                        className="parallax-bg "
                        data-swiper-parallax="-23%"
                    ></div>
                    {[...Array(5)].map((e, idx) =>
                        <SwiperSlide key={idx} className='p-8 text-neutral-900' >
                            <div className="title" data-swiper-parallax="-300">
                                {langText.slide + ' ' + (idx + 1)}
                            </div>
                            <div className="subtitle" data-swiper-parallax="-200">
                                {langText.card.subtitle}
                            </div>
                            <div className="text" data-swiper-parallax="-100">
                                <LoremIpsum />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </section>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <section className='w-full mb-8 flex flex-col items-center'>
                <div className={sectionTittleClass}>{langText.effects.title}</div>

                <div className='bg-content1 min-[360px]:rounded-lg p-4 shadow-medium mb-8'>
                    <RadioGroup
                        label={langText.effects.title}
                        orientation="horizontal"
                        className='mb-6'
                        onValueChange={(v) => {
                            setEffectsRadio(v)
                            handleReloadEffects()
                        }}
                        value={effectsRadio}
                    >
                        {effectsRadios.map((e) =>
                            <Radio key={e} value={e} className='capitalize' >
                                {langText.effects.checks[e]}
                            </Radio>
                        )}
                    </RadioGroup>
                </div>

                {!reloadEffects
                    ?
                    <Swiper
                        modules={[Navigation, Pagination, Mousewheel, EffectCube, EffectFlip, EffectCoverflow, EffectCards, EffectCreative]}
                        spaceBetween={10}
                        slidesPerView={effectsRadio === 'flow' ? 2 : 1}
                        centeredSlides={true}

                        loop={true}
                        mousewheel={true}
                        navigation={true}
                        pagination={true}
                        grabCursor={true}

                        effect={effectsDicc[effectsRadio]}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: [0, 0, -400],
                            },
                            next: {
                                translate: ['100%', 0, 0],
                            },
                        }}
                        className={'w-full max-w-[500px]' + (effectsRadio === 'flow' ? 'w-[90vw]' : '')}
                        wrapperClass='items-center'
                    >
                        {[...Array(5)].map((e, idx) =>
                            <SwiperSlide key={idx} className='' >
                                <Image
                                    alt={langText.slide + idx}
                                    src={imgs(`./gato${idx + 1}.png`)}
                                    className="max-[360px]:rounded-none object-cover"
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    :
                    <Spinner className='my-4' />
                }
            </section>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <section className='w-full mb-8 flex flex-col items-center'>
                <div className={sectionTittleClass}>{langText.adapt.title}</div>

                <Swiper
                    modules={[Navigation, Pagination, Mousewheel]}
                    spaceBetween={0}
                    slidesPerView={1}
                    centeredSlides={true}

                    loop={true}
                    mousewheel={true}
                    navigation={true}
                    pagination={true}
                    grabCursor={true}

                    className='w-full min-[360px]:w-[90%] max-w-[1200px] h-full min-[360px]:rounded-lg shadow-medium bg-content1'
                    wrapperClass='items-center'

                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {[...Array(5)].map((e, idx) =>
                        <SwiperSlide key={idx} className='py-4 min-[360px]:px-4' >
                            <Image
                                shadow="sm"
                                radius="lg"
                                alt={langText.slide + idx}
                                src={imgs(`./gato${idx + 1}.png`)}
                                className="max-[360px]:rounded-none object-cover"
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
            </section>
        </main>
    );
}

export default Presentaciones;
