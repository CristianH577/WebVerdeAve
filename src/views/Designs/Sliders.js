import React, { useEffect, useState } from 'react';
import './Sliders.css'

import addLangText from '../../lang/Designs/Sliders.json'
import { useOutletContext } from 'react-router-dom';

import { Divider, Image, Spinner, CheckboxGroup, Checkbox, RadioGroup, Radio } from "@nextui-org/react";

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


function Sliders() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const imgs = require.context('../../assets/imgs/sliders', true)

    const preferences = ['pagination', 'loop', 'autoplay', 'zoom', 'vertical']
    const controls = ['buttons', 'scroll', 'keyboard', 'mouse']
    const pagination = ['bullets', 'bar', 'fraction', 'progressbar', 'preview']
    const effectsRadios = ['cube', 'flip', 'coverflow', 'cards', 'creative']

    const [custom, setCustom] = useState({
        reload: false,
        preferences: ['pagination'],
        controls: ['buttons', 'scroll'],
        pagination: 'bullets',
        thumbs: null,
    })
    const [refSwiper, setRefSwiper] = useState(null);
    const [customIdx, setCustomIdx] = useState(0);

    const [effects, setEffects] = useState({
        reload: false,
        effect: 'cube',
    })


    const sectionClass = 'w-full mb-8 flex flex-col items-center gap-8'
    const sectionTittleClass = 'text-5xl break-all text-center'
    const dividerClass = 'w-3/4 max-w-[1200px] my-8'


    useEffect(() => {
        if (custom.reload) {
            setTimeout(() => {
                setCustom({ ...custom, reload: false })
                setCustomIdx(0)
            }, 500)
        }
    }, [custom])

    useEffect(() => {
        if (effects.reload) {
            setTimeout(() => {
                setEffects({ ...effects, reload: false })
            }, 500)
        }
    }, [effects])


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.sliders}
            </div>

            <section className={sectionClass}>
                <div className={sectionTittleClass}>{langText.customs.title}</div>

                <div className='w-full flex justify-center items-center max-lg:flex-col gap-4'>

                    <div className='bg-content1 xs:rounded-lg p-4 max-xs:px-2 shadow-medium'>
                        <CheckboxGroup
                            label={langText.customs.preferences.label}
                            orientation="horizontal"
                            className='mb-6 max-xs:items-center'
                            classNames={{
                                wrapper: 'max-w-[100vw] max-xs:justify-center'
                            }}
                            defaultValue={custom.preferences}
                            onValueChange={e => {
                                if (e.includes('loop') && custom.pagination === 'preview') {
                                    setCustom({ ...custom, preferences: e, pagination: 'bullets', reload: true })
                                } else {
                                    setCustom({ ...custom, preferences: e, reload: true })
                                }
                            }}
                        >
                            {preferences.map((e) =>
                                <Checkbox
                                    key={e}
                                    value={e}
                                    className='capitalize'
                                >
                                    {langText.customs.preferences.checks[e]}
                                </Checkbox>
                            )}
                        </CheckboxGroup>

                        <CheckboxGroup
                            label={langText.customs.controls.label}
                            orientation="horizontal"
                            className='mb-6 max-xs:items-center'
                            classNames={{
                                wrapper: 'max-w-[100vw] max-xs:justify-center'
                            }}
                            defaultValue={custom.controls}
                            onValueChange={e => setCustom({ ...custom, controls: e, reload: true })}
                        >
                            {controls.map((e) =>
                                <Checkbox
                                    key={e}
                                    value={e}
                                    className='capitalize'
                                >
                                    {langText.customs.controls.checks[e]}
                                </Checkbox>
                            )}
                        </CheckboxGroup>

                        {custom.preferences.includes('pagination') &&
                            <RadioGroup
                                label={langText.customs.pagination.label}
                                orientation="horizontal"
                                className='mb-6 max-xs:items-center'
                                classNames={{
                                    wrapper: ' max-xs:justify-center'
                                }}
                                onValueChange={(e) => setCustom({ ...custom, pagination: e, reload: true })}
                                value={custom.pagination}
                            >
                                {pagination.map((e) =>
                                    <Radio
                                        key={e}
                                        value={e}
                                        className='capitalize'
                                        isDisabled={e === 'preview' && custom.preferences.includes('loop')}
                                    >
                                        {langText.customs.pagination.checks[e]}
                                    </Radio>
                                )}
                            </RadioGroup>
                        }
                    </div>

                    {!custom.reload
                        ?
                        <div className='w-full max-w-[400px] '>
                            <Swiper
                                onSwiper={setRefSwiper}
                                modules={[Navigation, Pagination, Autoplay, Mousewheel, Keyboard, Scrollbar, Zoom]}
                                spaceBetween={10}
                                slidesPerView={1}
                                centeredSlides={true}
                                className='w-full max-w-[400px] max-h-[400px] xs:rounded-lg shadow-medium bg-content1 xs:!px-2 !m-0'
                                wrapperClass='items-center h-full'

                                //preferences
                                loop={custom.preferences.includes('loop')}
                                zoom={custom.preferences.includes('zoom')}
                                autoplay={{
                                    enabled: custom.preferences.includes('autoplay'),
                                    delay: 1000,
                                    disableOnInteraction: false,
                                }}
                                direction={custom.preferences.includes('vertical') ? 'vertical' : 'horizontal'}
                                onSlideChange={() => !custom.preferences.includes('loop') && setCustomIdx(refSwiper.activeIndex)}

                                //controls
                                navigation={custom.controls.includes('buttons')}
                                mousewheel={custom.controls.includes('scroll')}
                                keyboard={custom.controls.includes('keyboard')}
                                grabCursor={custom.controls.includes('mouse')}
                                allowTouchMove={custom.controls.includes('mouse')}

                                //pagination
                                scrollbar={{
                                    enabled: custom.preferences.includes('pagination') && custom.pagination === 'bar',
                                    draggable: true,
                                }}
                                pagination={{
                                    enabled: (custom.preferences.includes('pagination') && custom.pagination !== 'bar'),
                                    type: custom.pagination,
                                }}
                            >
                                {[...Array(5)].map((e, idx) =>
                                    <SwiperSlide key={idx} className='py-4 min-xs:px-4 '>
                                        <div className="swiper-zoom-container">
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                alt={langText.slide + (idx + 1)}
                                                src={imgs(`./gato${idx + 1}.png`)}
                                                className="max-xs:rounded-none object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>

                            <Swiper
                                className={
                                    'w-full max-w-[400px] xs:rounded-lg shadow-medium bg-content1 mt-2 swiper-thumbs '
                                    + ((!custom.preferences.includes('pagination') || custom.pagination !== 'preview') ? '!hidden' : '')
                                }
                                wrapperClass='items-center h-full'

                                modules={[Mousewheel]}
                                spaceBetween={0}
                                slidesPerView={3}
                                mousewheel
                                grabCursor
                            >
                                {[...Array(5)].map((e, idx) =>
                                    <SwiperSlide
                                        key={idx + 1}
                                        onClick={() => {
                                            refSwiper.slideTo(idx, 0)
                                            setCustomIdx(idx)
                                        }}
                                        className={'hover:opacity-100 ' + (customIdx === idx ? '' : 'opacity-50')}
                                    >
                                        <Image
                                            alt={langText.slide + (idx + 1)}
                                            src={imgs(`./gato${idx + 1}.png`)}
                                            className="rounded-none object-cover"
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                        :
                        <div className='relative'>
                            <Spinner color='danger' size='lg' className='absolute m-auto w-full h-full z-20' />
                            <Image
                                shadow="sm"
                                radius="lg"
                                removeWrapper
                                src={imgs(`./gato1.png`)}
                                className="max-xs:rounded-none object-cover w-full max-w-[400px]"
                            />
                        </div>
                    }
                </div>
            </section>

            <Divider className={dividerClass} />

            <section className={sectionClass} id='parallax'>
                <div className={sectionTittleClass}>
                    {langText.parallax.title}
                </div>

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

                    className='w-full max-w-[400px] max-h-[500px] xs:max-h-[400px] xs:rounded-lg shadow-medium '
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
                                <LoremIpsum avgSentencesPerParagraph={3} random={false} />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </section>

            <Divider className={dividerClass} />

            <section className={sectionClass}>
                <div className={sectionTittleClass}>{langText.effects.title}</div>

                <div className='bg-content1 xs:rounded-lg p-4 shadow-medium'>
                    <RadioGroup
                        label={langText.effects.title}
                        orientation="horizontal"
                        className='mb-6 max-xs:items-center'
                        classNames={{
                            wrapper: 'max-xs:justify-center'
                        }}
                        onValueChange={e => setEffects({ ...effects, effect: e, reload: true })}
                        value={effects.effect}
                    >
                        {effectsRadios.map((e) =>
                            <Radio key={e} value={e} className='capitalize' >
                                {langText.effects.checks[e]}
                            </Radio>
                        )}
                    </RadioGroup>
                </div>

                {!effects.reload
                    ?
                    <Swiper
                        modules={[Navigation, Pagination, Mousewheel, EffectCube, EffectFlip, EffectCoverflow, EffectCards, EffectCreative]}
                        spaceBetween={10}
                        slidesPerView={effects.effect === 'coverflow' ? 2 : 1}
                        centeredSlides={true}

                        loop={true}
                        mousewheel={true}
                        navigation={true}
                        pagination={true}
                        grabCursor={true}

                        effect={effects.effect}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: [0, 0, -400],
                            },
                            next: {
                                translate: ['100%', 0, 0],
                            },
                        }}
                        className={'w-full max-w-[500px]' + (effects.effect === 'coverflow' ? 'w-[90vw]' : '')}
                        wrapperClass='items-center'
                    >
                        {[...Array(5)].map((e, idx) =>
                            <SwiperSlide key={idx} className='' >
                                <Image
                                    alt={langText.slide + idx}
                                    src={imgs(`./gato${idx + 1}.png`)}
                                    className="max-xs:rounded-none object-cover"
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    :
                    <div className='relative'>
                        <Spinner color='danger' size='lg' className='absolute m-auto w-full h-full z-20' />
                        <Image
                            shadow="sm"
                            radius="lg"
                            removeWrapper
                            src={imgs(`./gato1.png`)}
                            className="max-xs:rounded-none object-cover w-full max-w-[500px]"
                        />
                    </div>
                }
            </section>

            <Divider className={dividerClass} />

            <section className={sectionClass}>
                <div className={sectionTittleClass}>{langText.adapt.title}</div>

                <Swiper
                    modules={[Navigation, Pagination, Mousewheel]}
                    spaceBetween={10}
                    slidesPerView={1}

                    loop={true}
                    mousewheel={true}
                    navigation={true}
                    pagination={true}
                    grabCursor={true}

                    className='w-full max-w-[1200px] h-full xs:rounded-lg shadow-medium bg-content1 xs:!px-2'

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
                        <SwiperSlide key={idx} className='py-4 !flex justify-center' >
                            <Image
                                shadow="sm"
                                radius="lg"
                                alt={langText.slide + idx}
                                src={imgs(`./gato${idx + 1}.png`)}
                                className="max-xs:rounded-none"
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
            </section>

        </main>
    );
}

export default Sliders;
