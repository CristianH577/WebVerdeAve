import React from 'react';

import addLangText from '../../lang/Home/Home.json'
import { useNavigate, useOutletContext } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Image } from "@nextui-org/react";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";


import dia from '../../assets/imgs/dia.jpg'
import noche from '../../assets/imgs/noche.jpg'

import banner_analyze from '../../assets/imgs/home/banner_analyze.jpg'
import banner_design from '../../assets/imgs/home/banner_desing.jpg'
import banner_graf from '../../assets/imgs/home/banner_graf.png'

import card_analyze from '../../assets/imgs/home/card_analyze.jpg'
import card_desing from '../../assets/imgs/home/card_desing.jpg'
import card_database from '../../assets/imgs/home/card_database.jpg'
import card_ecom from '../../assets/imgs/home/card_ecom.jpg'

import nextui from '../../assets/imgs/home/nextui.png'
import react from '../../assets/imgs/home/react.png'
import tailwind from '../../assets/imgs/home/tailwind.png'

import php from '../../assets/imgs/home/php.png'
import python from '../../assets/imgs/home/python.png'

import css from '../../assets/imgs/home/css.png'
import gimp from '../../assets/imgs/home/gimp.png'
import autocad from '../../assets/imgs/home/autocad.png'

import BannerCard from './components/BannerCard';



function Home() {
  const navigate = useNavigate()
  const context = useOutletContext()
  const langText = {
    ...context.langText[context.lang],
    ...addLangText[context.lang]
  }

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

  const slider_items = [
    {
      bg_image: banner_design,
      title: langText.banners.design_web,
      logos: [react, tailwind, nextui],
      bg_gradient: 'from-blue-400 to-primary dark:from-primary dark:to-blue-800'
    },
    {
      bg_image: banner_analyze,
      title: langText.banners.analyze,
      logos: [python, php],
      bg_gradient: 'from-yellow-400 to-warning dark:from-warning dark:to-yellow-800'
    },
    {
      bg_image: banner_graf,
      title: langText.banners.design_graf,
      logos: [css, gimp, autocad],
      bg_gradient: 'from-purple-400 to-secondary dark:from-secondary dark:to-purple-800'
    },
  ]


  return (
    <main
      className='bg-no-repeat bg-cover bg-center bg-fixed'
      style={{ backgroundImage: `url(${context.dark ? noche : dia})` }}

    >
      <div className='center items-center gap-8 bg-gradient-to-b from-slate-500/50 to-background backdrop-blur-sm'>
        <div className='custom-title min-h-[250px] w-full max-xs:break-all center text-center sm:px-4 text-8xl md:text-9xl' id='home-banner'>
          {langText.title} VerdeAve!
        </div>


        <section className='w-full'>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              enabled: true,
              delay: 3000,
              disableOnInteraction: false,
            }}
            wrapperClass='items-center '
            centeredSlides

            navigation={true}
          >
            {slider_items.map((e, i) =>
              <SwiperSlide key={i} className='!flex justify-center'>
                <BannerCard
                  bg_image={e.bg_image}
                  title={e.title}
                  logos={e.logos}
                  bg_gradient={e.bg_gradient}
                />
              </SwiperSlide>
            )}

          </Swiper>
        </section>


        {/* cartas */}
        <section className='my-8 grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 xs:px-2 lg:px-8 max-w-[2600px]'>
          {articles.map(art =>
            <Card key={art.key} isFooterBlurred className="w-full h-[300px] max-xs:rounded-none max-w-[600px] ">
              <CardHeader className="absolute z-10 top-0 flex-col items-start card-header rounded-none bg-gradient-to-r from-slate-500/80 to-slate-500/10 ">
                <p className="text-tiny text-neutral-900 opacity-60 uppercase font-bold">
                  {langText.articles[art.key].subtitle}
                </p>
                <h4 className="text-white/90 font-semibold text-4xl italic">
                  {langText.articles[art.key].title}
                </h4>
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
