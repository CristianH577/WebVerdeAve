import { useState } from 'react';
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


  return (
    <div
      className={
        'flex flex-col min-h-screen text-foreground bg-background overflow-hidden'
        + (darkMode.value ? ' dark' : ' light')
      }
    >
      <Menu
        darkMode={darkMode}
        lang={lang}
        setLang={setLang}
      />

      {document.readyState === 'complete'
        ? <Outlet
          context={{
            dark: darkMode.value, 
            lang: lang,
            langText: langText,
            mainClass: 'flex flex-col items-center py-8 ',
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
