

import addLangText from '../../lang/Home/Home.json'
import { useNavigate, useOutletContext } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import dia from '../../assets/imgs/dia.jpg'
import noche from '../../assets/imgs/noche.jpg'

import banner_analyze from '../../assets/imgs/home/banner_analyze.png'
import banner_design from '../../assets/imgs/home//banner_desing-sf.png'
import banner_graf from '../../assets/imgs/home/banner_graf-sf.png'

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

import SlideContentHome from './components/SlideContentHome';
import CardHome from './components/CardHome';



function Home() {
  const navigate = useNavigate()
  const context = useOutletContext()
  const langText = {
    ...context.langText[context.lang],
    ...addLangText[context.lang]
  }

  const slider_items = [
    {
      ...langText.banners.designs,
      icons: [react, tailwind, nextui],
      img: banner_design,
      span_text_class: 'text-secondary-600',
      bg: ' from-secondary-300/90 to-secondary/80',
      button_color: 'primary',
      link: '/designs',
    },
    {
      ...langText.banners.apis,
      icons: [python, php],
      img: banner_analyze,
      span_text_class: 'text-danger-600',
      bg: ' from-danger-300/90 to-danger/80',
      button_color: 'warning',
      link: '/apis',
    },
    {
      ...langText.banners.graf,
      icons: [css, gimp, autocad],
      img: banner_graf,
      span_text_class: 'text-success-400',
      bg: ' from-success-300/90 to-success/80',
      button_color: 'secondary',
    },
  ]

  const cards_items = [
    {
      img: card_desing,
      link: '/designs',
      ...langText.cards.designs
    },
    {
      img: card_ecom,
      link: '/designs/showroom',
      ...langText.cards.ecommerce
    },
    {
      img: card_analyze,
      link: '/apis/analyze',
      ...langText.cards.analyze
    },
    {
      img: card_database,
      link: '/apis/databases',
      ...langText.cards.databases
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
            navigation={true}
            autoplay={{
              enabled: true,
              delay: 3000,
              disableOnInteraction: false,
            }}

          >
            {slider_items.map((e, i) =>
              <SwiperSlide key={i} className='!h-auto'>
                <SlideContentHome
                  {...e}
                  onMore={navigate}
                />
              </SwiperSlide>
            )}

          </Swiper>
        </section>


        {/* cartas */}
        <section className='my-8 grid gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 xs:px-2 lg:px-8 max-w-[2600px]'>
          {cards_items.map((card, i) =>
            <CardHome
              key={i}
              {...card}
              onExplore={navigate}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
