import React, { useEffect, useState } from 'react';
import langText from '../../lang/general.json'

import { Outlet } from "react-router-dom";
import useDarkMode from "use-dark-mode";

import { Skeleton } from "@nextui-org/react";

import Menu from './components/Menu.js';
import Footer from './components/Footer.js';


function Layout() {
  const darkMode = useDarkMode(false)
  const [lang, setLang] = useState('es')
  const [load, setLoad] = useState(false)


  const titleClass = 'font-bold text-7xl mb-8 break-words w-full text-center capitalize'


  useEffect(() => {
    setTimeout(() => {
      setLoad(true)
    }, 1000);
  }, [])


  return (
    <div
      className={
        'flex flex-col min-h-screen text-foreground bg-background overflow-x-hidden'
        + (darkMode.value ? ' dark' : ' light')
      }
    >
      <Menu
        darkMode={darkMode}
        lang={{ value: lang, set: setLang }}
      />

      {load
        ?
        <Outlet
          context={{
            dark: darkMode.value,
            lang: lang,
            langText: langText,
            mainClass: 'sm:mx-8 my-8 flex flex-col items-center xs:px-2',
            titleClass: 'custom-title text-9xl mb-8 break-all text-center capitalize',
          }}
        />
        : <Skeleton className={titleClass + ' mt-4'}>Cargando...</Skeleton>
      }

      <Footer dark={darkMode.value} lang={lang} />

    </div>
  );
}

export default Layout;
