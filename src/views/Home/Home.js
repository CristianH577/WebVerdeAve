

import { useEffect } from 'react';
import addLangText from '../../lang/Home/Home.json'
import { useNavigate, useOutletContext } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import AOS from 'aos'
import 'aos/dist/aos.css';

import dia from '../../assets/imgs/home/dia.webp'
import noche from '../../assets/imgs/home/noche.webp'
import buho from '../../assets/imgs/home/buho.webp'
import ave from '../../assets/imgs/home/ave.webp'

import banner_analyze from '../../assets/imgs/home/banner_analyze.webp'
import banner_design from '../../assets/imgs/home/banner_design-sf.webp'
import banner_graf from '../../assets/imgs/home/banner_graf-sf.webp'

import nextui from '../../assets/imgs/home/logos/nextui.webp'
import react from '../../assets/imgs/home/logos/react.webp'
import tailwind from '../../assets/imgs/home/logos/tailwind.webp'

import php from '../../assets/imgs/home/logos/php.webp'
import python from '../../assets/imgs/home/logos/python.webp'

import css from '../../assets/imgs/home/logos/css.webp'
import gimp from '../../assets/imgs/home/logos/gimp.webp'
import autocad from '../../assets/imgs/home/logos/autocad.webp'

import SlideContentHome from './components/SlideContentHome.js';
import CardHome from './components/CardHome.js';
import { Divider, Image } from '@nextui-org/react';



function Home() {
  const navigate = useNavigate()
  const context = useOutletContext()
  const langText = {
    // ...context.langText[context.lang],
    icon_of: context.langText[context.lang].icon_of,
    img_of: context.langText[context.lang].img_of,
    ...addLangText[context.lang]
  }

  const slider_items = [
    {
      id: 'web',
      icons: [react, tailwind, nextui],
      img: banner_design,
      span_text_class: 'text-secondary-600',
      bg: ' from-secondary-300/90 to-secondary/80',
      button_color: 'primary',
      link: '/web',
    },
    {
      id: 'apis',
      icons: [python, php],
      img: banner_analyze,
      span_text_class: 'text-danger-600',
      bg: ' from-danger-300/90 to-danger/80',
      button_color: 'warning',
      link: '/apis',
    },
    {
      id: 'graf',
      icons: [css, gimp, autocad],
      img: banner_graf,
      span_text_class: 'text-success-400',
      bg: ' from-success-300/90 to-success/80',
      button_color: 'secondary',
      link: '/',
    },
  ]

  const cards_items = [
    {
      id: 'web',
      link: '/web',
    },
    {
      id: 'showroom',
      link: '/web/showroom',
    },
    {
      id: 'analyze',
      link: '/apis/analyze',
    },
    {
      id: 'databases',
      link: '/apis/databases',
    },
    {
      id: 'design',
      link: '/design',
    },
  ]


  useEffect(() => {
    AOS.init({
      duration: 200,
      delay: 100
    })
  }, [])



  return (
    <main
      className='bg-no-repeat bg-cover bg-center bg-fixed'
      style={{ backgroundImage: `url(${context.dark ? noche : dia})` }}
    >
      <div className='center items-center gap-8 bg-gradient-to-b from-slate-500/50 to-background backdrop-blur-sm'>

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
          className='w-full h-screen sm:h-[400px] shadow-lg'
        >
          {slider_items.map(e =>
            <SwiperSlide key={e.id} className='!h-auto'>
              <SlideContentHome
                {...e}
                onMore={navigate}
                langText={langText}
              />
            </SwiperSlide>
          )}

        </Swiper>

        <div className='flex flex-col items-center ' data-aos="zoom-in">
          <Image
            src={context.dark ? buho : ave}
            removeWrapper
            className='w-64'
          />

          <div className='text-center'>
            <p className='font-bold text-[20vw] sm:text-8xl'>VerdeAve</p>

            <Divider />

            <div className='uppercase flex justify-around text-[10vw] sm:text-5xl'>
              {langText.logo_title.split('').map((e, i) =>
                <p key={i}>{e}</p>
              )}
            </div>
          </div>
        </div>


        {/* cartas */}
        <section className='my-8 max-w-[2600px] space-y-16 md:px-4 lg:px-8'>
          {cards_items.map((card, i) =>
            <CardHome
              key={card.id}
              {...card}
              i={i}
              langText={langText}
              onExlore={navigate}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
