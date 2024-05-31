import { useEffect, useState } from 'react';
import './SliderCustom.css'
import addLangText from '../../../../lang/Web/Sliders/components/SliderCustom.json'
import { useOutletContext } from 'react-router-dom';

import { Image, Spinner, CheckboxGroup, Checkbox, RadioGroup, Radio } from "@nextui-org/react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay, Mousewheel, Keyboard, Scrollbar, Zoom } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import 'swiper/css/parallax';
import 'swiper/css/grid';



function SliderCustom(props) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang]
    }

    const imgs = require.context('../../../../assets/imgs/web/sliders', true)

    const preferences = ['pagination', 'loop', 'autoplay', 'zoom', 'vertical']
    const controls = ['buttons', 'scroll', 'keyboard', 'mouse']
    const pagination = ['bullets', 'bar', 'fraction', 'progressbar', 'preview']

    const [custom, setCustom] = useState({
        reload: false,
        preferences: ['pagination'],
        controls: ['buttons', 'scroll'],
        pagination: 'bullets',
        thumbs: null,
    })
    const [refSwiper, setRefSwiper] = useState(null);
    const [customIdx, setCustomIdx] = useState(0);


    useEffect(() => {
        if (custom.reload) {
            setTimeout(() => {
                setCustom({ ...custom, reload: false })
                setCustomIdx(0)
            }, 500)
        }
    }, [custom])


    return (
        <section className={props.section_class}>
            <h2 className={props.title_class}>
                {langText.title}
            </h2>

            <div className='w-full flex justify-center items-center max-lg:flex-col gap-4'>

                <div className='bg-content1 xs:rounded-lg p-4 max-xs:px-2 shadow-medium max-w-screen'>
                    <CheckboxGroup
                        label={langText.preferences.label}
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
                                {langText.preferences.checks[e]}
                            </Checkbox>
                        )}
                    </CheckboxGroup>

                    <CheckboxGroup
                        label={langText.controls.label}
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
                                {langText.controls.checks[e]}
                            </Checkbox>
                        )}
                    </CheckboxGroup>

                    {custom.preferences.includes('pagination') &&
                        <RadioGroup
                            label={langText.pagination.label}
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
                                    {langText.pagination.checks[e]}
                                </Radio>
                            )}
                        </RadioGroup>
                    }
                </div>

                {!custom.reload
                    ? <div className='w-full max-w-[400px] '>
                        <Swiper
                            onSwiper={setRefSwiper}
                            modules={[Navigation, Pagination, Autoplay, Mousewheel, Keyboard, Scrollbar, Zoom]}
                            spaceBetween={10}
                            slidesPerView={1}
                            centeredSlides={true}
                            className={'w-full max-w-[400px] max-h-[400px] xs:rounded-lg shadow-medium bg-content1 xs:!px-2 !m-0 '
                                + ((custom.preferences.includes('pagination') && ['bullets', 'fraction'].includes(custom.pagination)) ? '!pb-6 ' : '')
                            }
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
                            scrollbar={
                                (custom.preferences.includes('pagination') && custom.pagination === 'bar') && {
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
                                            src={imgs(`./gato${idx + 1}.webp`)}
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
                                        src={imgs(`./gato${idx + 1}.webp`)}
                                        className="rounded-none object-cover"
                                    />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                    : <div className='relative'>
                        <Spinner color='danger' size='lg' className='absolute m-auto w-full h-full z-20' />
                        <Image
                            shadow="sm"
                            radius="lg"
                            alt={langText.slide}
                            removeWrapper
                            src={imgs(`./gato1.webp`)}
                            className="max-xs:rounded-none object-cover w-full max-w-[400px]"
                        />
                    </div>
                }
            </div>
        </section>
    );
}

export default SliderCustom;
