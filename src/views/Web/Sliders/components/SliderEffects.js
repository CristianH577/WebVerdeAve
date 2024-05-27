import { useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';
import addLangText from '../../../../lang/Web/Sliders/components/SliderEffects.json'

import { Image, Spinner, RadioGroup, Radio } from "@nextui-org/react";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectCube, EffectFlip, EffectCoverflow, EffectCards, EffectCreative } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';



function SliderEffects(props) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang]
    }

    const imgs = require.context('../../../../assets/imgs/web/sliders', true)


    const effectsRadios = ['cube', 'flip', 'coverflow', 'cards', 'creative']

    const [effects, setEffects] = useState({
        reload: false,
        effect: 'cube',
    })


    useEffect(() => {
        if (effects.reload) {
            setTimeout(() => {
                setEffects({ ...effects, reload: false })
            }, 500)
        }
    }, [effects])


    return (
        <section className={props.section_class + ' flex flex-col items-center'}>
            <div className={props.title_class}>
                {langText.title}
            </div>

            <div className='bg-content1 xs:rounded-lg p-4 shadow-medium max-w-screen '>
                <RadioGroup
                    label={langText.title}
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
                            {langText.checks[e]}
                        </Radio>
                    )}
                </RadioGroup>
            </div>

            {!effects.reload
                ? <Swiper
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
                    className={'w-full max-w-[500px] ' + (effects.effect === 'coverflow' ? 'w-[90vw]' : '')}
                    wrapperClass='items-center'
                >
                    {[...Array(5)].map((e, idx) =>
                        <SwiperSlide key={idx} className='' >
                            <Image
                                alt={langText.slide + idx}
                                src={imgs(`./gato${idx + 1}.webp`)}
                                className="max-xs:rounded-none object-cover"
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
                : <div className='relative'>
                    <Spinner color='danger' size='lg' className='absolute m-auto w-full h-full z-20' />
                    <Image
                        shadow="sm"
                        radius="lg"
                        removeWrapper
                        src={imgs(`./gato1.webp`)}
                        className="max-xs:rounded-none object-cover w-full max-w-[500px] "
                    />
                </div>
            }
        </section>
    );
}

export default SliderEffects;
