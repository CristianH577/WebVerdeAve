import React from 'react';

import { useOutletContext } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Mousewheel, Parallax } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';


import { LoremIpsum } from 'react-lorem-ipsum';

import bg_parallax from '../../../../assets/imgs/designs/sliders/gato5.png'


function SliderParallax(props) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }


    return (
        <section className={props.section_class} id='parallax'>
            <div className={props.title_class}>
                Parallax
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

                className='w-full max-w-[500px] max-h-[600px] xs:max-h-[400px] xs:rounded-lg shadow-medium '
            >

                <div
                    slot="container-start"
                    className="bg-cover bg-center w-[150%] h-full top-0 left-0 absolute"
                    data-swiper-parallax="-23%"
                    style={{ backgroundImage: `url(${bg_parallax})` }}
                ></div>
                {[...Array(5)].map((e, idx) =>
                    <SwiperSlide key={idx} className='p-8 text-neutral-900' >
                        <div className="text-5xl font-bold" data-swiper-parallax="-300">
                            {langText.slide + ' ' + (idx + 1)}
                        </div>
                        <div className="text-3xl my-2 ps-2" data-swiper-parallax="-200">
                            {langText.card.subtitle}
                        </div>
                        <div className="max-w-[400px] text-2xl leading-8" data-swiper-parallax="-100">
                            <LoremIpsum avgSentencesPerParagraph={3} random={false} />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    );
}

export default SliderParallax;
