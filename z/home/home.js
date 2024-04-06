import React from 'react';
import './home.css'

import addLangText from '../../lang/home/home.json'
import { useNavigate, useOutletContext } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Image } from "@nextui-org/react";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";


import banner_analyze from '../../assets/imgs/home/banner_analyze.jpg'
import banner_design from '../../assets/imgs/home/banner_desing.jpg'
import banner_ecom from '../../assets/imgs/home/banner_ecom.jpg'

import card_analyze from '../../assets/imgs/home/card_analyze.jpg'
import card_desing from '../../assets/imgs/home/card_desing.jpg'
import card_database from '../../assets/imgs/home/card_database.jpg'
import card_ecom from '../../assets/imgs/home/card_ecom.jpg'


function Home() {
  const navigate = useNavigate()
  const context = useOutletContext()
  const langText = {
    ...context.langText[context.lang],
    ...addLangText[context.lang]
  }

  const sliderItems = [
    banner_design,
    banner_analyze,
    banner_ecom,
  ]
  const articles = [
    {
      key: 'designs',
      img: card_desing,
      navigate: '/designs'
    },
    {
      key: 'ecommerce',
      img: card_ecom,
      navigate: '/designs/showroom'
    },
    {
      key: 'analyze',
      img: card_analyze,
      navigate: '/analyze'
    },
    {
      key: 'databases',
      img: card_database,
      navigate: '/databases'
    },
  ]


  return (
    <main className=' flex flex-col items-center' id='home'>
<div  id='home-banner'>
      <div className='h-[300px] w-full font-bold text-5xl break-all center text-center'>
        {langText.title}!
      </div>


      <section className='w-screen '>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          className='bg-t '
          loop={true}
          // autoplay={{
          //   enabled: true,
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
          centeredSlides={true}

          navigation={true}
        >
          {sliderItems.map((e, i) =>
            <SwiperSlide key={i} className='!flex justify-center'>
              <Image
                radius="none"
                // width='100%'
                alt={langText.slide + i}
                src={e}
                className='object-fill xl:object-cover max-h-[300px]'
              />
            </SwiperSlide>
          )}
        </Swiper>
      </section>


      <section className='my-8 grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 xs:px-2 lg:px-8'>
        {articles.map(art =>
          <Card key={art.key} isFooterBlurred className="w-full h-[300px] max-xs:rounded-none max-w-[600px] ">
            <CardHeader className="absolute z-10 top-0 flex-col items-start card-header rounded-none">
              <p className="text-tiny text- opacity-60 uppercase font-bold">{langText.articles[art.key].subtitle}</p>
              <h4 className=" font-semibold text-4xl">{langText.articles[art.key].title}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={langText.imgOf + langText.articles[art.key].title}
              className="z-0 w-full h-full object-cover max-[360px]:rounded-none"
              src={art.img}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 max-[360px]:rounded-none">
              <div className="flex flex-grow gap-2 items-center">
                <Image
                  alt={langText.iconOf + langText.articles[art.key].title}
                  className="rounded-full w-10 h-11 bg-black"
                  src={art.img}
                />
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">{langText.articles[art.key].footer_text}</p>
                  <p className="text-tiny text-white/60">{langText.articles[art.key].footer_subtext}</p>
                </div>
              </div>
              <Button radius="full" size="sm" className='hover:bg-primary-300' onClick={() => navigate(art.navigate)}>{langText.explore}</Button>
            </CardFooter>
          </Card>
        )}
      </section>
      </div>
    </main>
  );
}

export default Home;
