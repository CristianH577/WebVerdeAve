import React from 'react';

import addLangText from '../../../../lang/Designs/Sliders/components/SliderAdapt.json'
import { useOutletContext } from 'react-router-dom';

import { Image } from "@nextui-org/react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



function SliderAdapt(props) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const imgs = require.context('../../../../assets/imgs/designs/sliders', true)



    return (
        <section className={props.section_class}>
            <div className={props.title_class}>
                {langText.title}
            </div>

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
    );
}

export default SliderAdapt;
