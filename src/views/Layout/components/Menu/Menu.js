
import { useEffect, useState } from 'react';
import addLangText from '../../../../lang/Layout/Menu.json'

import { useLocation, useNavigate } from "react-router-dom";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, Image, NavbarMenu, } from "@nextui-org/react";

import MenuMovilListItems from './components/MenuMovilListItems.js';
import DropdownCustom from './components/DropdownCustom.js';

import ave from '../../../../assets/imgs/layout/ave-64.webp'
import buho from '../../../../assets/imgs/layout/buho-64.webp'
import { BsBag, BsPostcard, BsColumns, BsMap, BsThreeDots } from "react-icons/bs";
import { PiSunDimFill, PiMoonFill } from "react-icons/pi";
import { FaWpforms, FaChessBoard } from "react-icons/fa";
import { PiSlideshow } from "react-icons/pi";
import { GoTable } from "react-icons/go";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineDatabase } from "react-icons/ai";
import { GrAnalytics } from "react-icons/gr";



function Menu({ darkMode, lang, setLang }) {
  const langText = {
    ...addLangText[lang]
  }

  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const icons = {
    cards: <BsPostcard />,
    forms: <FaWpforms />,
    galeries: <BsColumns />,
    maps: <BsMap />,
    sliders: <PiSlideshow size={16} />,
    showroom: <BsBag size={16} />,
    tables: <GoTable size={16} />,
    more: <BsThreeDots />,

    analyze: <GrAnalytics />,
    databases: <AiOutlineDatabase />,
    game: <IoGameControllerOutline />,
    make_board: <FaChessBoard />,
  }

  const menu_items = ['home', 'web', 'apis', 'design']
  const sub_menus = {
    web: [
      "cards",
      "forms",
      "galeries",
      "maps",
      "sliders",
      "showroom",
      "tables",
      "more"
    ],
    apis: [
      'databases',
      'analyze',
      'game',
      'make_board'
    ],
  }

  const items_class = [
    "flex",
    "relative",
    "h-full",
    "items-center",
    "data-[active=true]:after:content-['']",
    "data-[active=true]:after:absolute",
    "data-[active=true]:after:bottom-0",
    "data-[active=true]:after:left-0",
    "data-[active=true]:after:right-0",
    "data-[active=true]:after:h-[2px]",
    "data-[active=true]:after:rounded-[2px]",
    "data-[active=true]:after:bg-red-500",
  ]




  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMenuOpen(false)
      setIsDropdownOpen(false)
    })
  }, [])
  useEffect(() => {
    var href = 'ave-circle.ico'
    if (darkMode.value) href = 'buho-circle.ico'
    document.querySelector('#document-icon').href = href
  }, [darkMode.value])
  useEffect(() => {
    var overflow = 'scroll'
    if (isMenuOpen) overflow = 'hidden'
    document.querySelector('html').style = 'overflow-y:' + overflow + ";"
  }, [isMenuOpen])



  return (
    <Navbar
      id='nav-main'
      isMenuOpen={isMenuOpen}
      className='shadow-lg transition-all bg-content1'
      classNames={{
        item: items_class,
      }}

      onMouseLeave={() => setIsDropdownOpen(false)}
    >

      {/* logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label='Abrir/cerrar menu'
          className="sm:hidden "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand className='sm:justify-center '>
          <Image
            src={darkMode.value ? buho : ave}
            alt='logo'
            width={52}
            removeWrapper
            className={'cursor-pointer hover:scale-110 rounded-full bg-custom '}
            onClick={() => navigate('/')}
          />
        </NavbarBrand>
      </NavbarContent>


      {/* menu */}
      <NavbarContent className="hidden items-center sm:flex gap-4 " justify="center">
        {menu_items.map(item =>
          < NavbarItem
            key={item}
            isActive={location.pathname.includes(item)}
            className='hover:bg-content3 px-2 cursor-pointer'
            onClick={() => navigate('/' + item)}
            onMouseEnter={() => setIsDropdownOpen(item)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {langText.menu_items[item].label}
            {sub_menus[item] !== undefined && (
              <DropdownCustom
                item={item}
                icons={icons}
                location={location}
                langText={langText}
                navigate={navigate}
                isDropdownOpen={isDropdownOpen}
                darkMode={darkMode.value}
                sub_menus={sub_menus}
                setIsDropdownOpen={setIsDropdownOpen}
              />
            )}
          </NavbarItem>
        )}
      </NavbarContent>


      {/* configuraciones */}
      <NavbarContent justify="end" className='sm:!justify-center gap-0 '>
        <NavbarItem>
          <Button
            isIconOnly
            variant='light'
            aria-label="Modo oscuro"
            size='sm'
            color='default'
            className='rounded-full'
            onClick={!darkMode.value ? darkMode.enable : darkMode.disable}
          >
            {darkMode.value
              ? <PiMoonFill size={24} className='text-[#eae4d9]' />
              : <PiSunDimFill size={24} className='text-warning' />
            }
          </Button>
        </NavbarItem>

        <NavbarItem >
          <Button
            isIconOnly
            variant='light'
            aria-label="Lenguage"
            size='sm'
            className='rounded-full uppercase text-foreground'
            onClick={() => lang === 'es' ? setLang('en') : setLang('es')}
          >
            {lang}
          </Button>
        </NavbarItem>
      </NavbarContent>


      {/* menu movil */}
      <NavbarMenu
        style={{ zIndex: '1000' }}
        className='p-0 shadow-inner !h-full'
      >
        <MenuMovilListItems
          items={menu_items}
          sub_menus={sub_menus}
          icons={icons}
          navigate={navigate}
          location={location}
          langText={langText}
        />
      </NavbarMenu>

    </Navbar >
  );
}

export default Menu;