import { useEffect, useState } from 'react';
import langText from '../../lang/general.json'

import { Outlet } from "react-router-dom";
import useDarkMode from "use-dark-mode";

import { Skeleton } from "@nextui-org/react";

import Menu from './components/Menu/Menu.js';
import Footer from './components/Footer.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Layout() {
  const darkMode = useDarkMode(false)
  const [lang, setLang] = useState('es')
  const [load, setLoad] = useState(false)


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
        lang={lang}
        setLang={setLang}
      />

      {load
        ? <Outlet
          context={{
            dark: darkMode.value,
            lang: lang,
            langText: langText,
            mainClass: 'sm:mx-8 my-8 flex flex-col items-center xs:px-2',
            titleClass: 'custom-title text-9xl mb-8 break-all text-center capitalize',
          }}
        />
        : <Skeleton className='w-full h-96 m-auto'>Cargando...</Skeleton>
      }

      <Footer dark={darkMode.value} lang={lang} />


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode.value ? 'dark' : 'light'}
      />

    </div>
  );
}

export default Layout;
