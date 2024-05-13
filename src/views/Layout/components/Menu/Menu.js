import { useEffect, useState } from 'react';
import './Menu.css'
import addLangText from '../../../../lang/Layout/components/Menu/Menu.json'

import { useLocation, useNavigate } from "react-router-dom";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, ButtonGroup, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Image, NavbarMenu, } from "@nextui-org/react";
import { Link as LinkNextUI } from "@nextui-org/react";

import ave from '../../../../assets/imgs/ave.png'
import buho from '../../../../assets/imgs/buho.png'
import { ChevronDown, MoonIcon, SunIcon, ChevronRight, ChevronLeft } from '../../../../assets/icons.js';
import { Cards, Forms, Galleries, Maps, Sliders, Bag, Tables, More } from '../../../../assets/icons.js';
import { Game, Analyze, Databases } from '../../../../assets/icons.js';

import MenuMovilDropItems from './components/MenuMovilDropItems.js';
import MenuMovilListItems from './components/MenuMovilListItems.js';


function Menu({ darkMode, lang, setLang }) {
  const langText = {
    ...addLangText[lang]
  }

  const navigate = useNavigate()
  const location = useLocation()
  const [menuModel, setMenuModel] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const icons = {
    ChevronDown: <ChevronDown size={25} />,
    ChevronRight: <ChevronRight size={30} />,
    ChevronLeft: <ChevronLeft size={30} />,

    moon: <MoonIcon className='text-[#eae4d9]' />,
    sun: <SunIcon className='text-warning' />,

    cards: <Cards />,
    forms: <Forms />,
    galeries: <Galleries />,
    maps: <Maps />,
    sliders: <Sliders />,
    showroom: <Bag />,
    tables: <Tables />,
    more: <More />,

    analyze: <Analyze />,
    databases: <Databases />,
    game: <Game />,
  }

  const menu_items = ['home', 'designs', 'apis', 'prices']
  const sub_menus = {
    designs: [
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
      'game'
    ],
  }


  const handleDropdown = (e, name) => {
    var set = name
    if (!e) set = false
    setIsDropdownOpen(set)
  }


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
      isMenuOpen={isMenuOpen}
      className='bg-content1 shadow transition-all'
      classNames={{
        item: [
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
        ],
      }}
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
            src={ave}
            alt='logo'
            width={50}
            className={'cursor-pointer hover:scale-110 rounded-full bg-custom ' + (darkMode.value ? '!opacity-0  w-0' : 'opacity-100')}
            onClick={() => navigate('/')}
          />
          <Image
            src={buho}
            alt='logo'
            width={50}
            className={'cursor-pointer hover:scale-110 rounded-full bg-custom ' + (darkMode.value ? 'opacity-100' : '!opacity-0 w-0')}
            onClick={() => navigate('/')}
          />
        </NavbarBrand>
      </NavbarContent>


      {/* menu */}
      <NavbarContent className="hidden items-center sm:flex gap-4 " justify="center">
        {menu_items.map(item => sub_menus[item] === undefined
          ? <NavbarItem
            key={item}
            isActive={location.pathname.includes(item)}
          >
            <LinkNextUI color="foreground" className='gap-1 cursor-pointer flex hover:text-warning' onClick={() => navigate('/' + item)} >
              {langText.menu_items[item].label}
            </LinkNextUI>
          </NavbarItem>

          : <ButtonGroup
            key={item}
            className='dropdown-buttongroup h-full'
            onMouseEnter={() => {
              handleDropdown(true, item)
            }}
          >
            <NavbarItem
              key={item}
              isActive={location.pathname.includes(item)}
            >
              <LinkNextUI color="foreground" className='gap-1 cursor-pointer flex hover:text-warning' onClick={() => navigate('/' + item)} >
                {langText.menu_items[item].label}
              </LinkNextUI>
            </NavbarItem>

            <Dropdown
              className={(darkMode.value ? 'dark' : '')}
              isOpen={isDropdownOpen === item}
              name={item}
              onOpenChange={e => {
                handleDropdown(e, item)
              }}
            >
              <NavbarItem
                isActive={location.pathname.includes(item)}
              >
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent hover:text-warning "
                    radius="sm"
                    variant="light"
                    size='lg'
                    color='foreground'
                    isIconOnly
                  >
                    {icons.ChevronDown}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>

              <DropdownMenu
                aria-label="drop1"
                className=" dark:text-white "
                itemClasses={{
                  base: "gap-4"
                }}
              >
                {sub_menus[item].map((sub) =>
                  <DropdownItem
                    key={sub}
                    description={langText.sub_menus[item][sub].desc}
                    onClick={() => navigate('/' + item + '/' + sub)}
                    className={location.pathname.includes(sub) ? 'bg-primary-100' : ''}
                    startContent={icons[sub]}
                  >
                    {langText.sub_menus[item][sub].label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
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
            {darkMode.value ? icons.moon : icons.sun}
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

        <NavbarItem className='sm:hidden'>
          <Button
            isIconOnly
            variant='light'
            aria-label="Modelo de menu"
            size='sm'
            color='default'
            className='rounded-full'
            onClick={() => setMenuModel(!menuModel)}
          >
            {menuModel ? langText.menuModel.drop : langText.menuModel.list}
          </Button>
        </NavbarItem>
      </NavbarContent>


      {/* menu movil */}
      <NavbarMenu
        style={{ zIndex: '1000' }}
        className='p-0 shadow-inner !h-full'
      >
        {menuModel
          ? <MenuMovilDropItems
            items={menu_items}
            sub_menus={sub_menus}
            icons={icons}
            lang={lang}
            navigate={navigate}
            location={location}
          />
          : <MenuMovilListItems
            items={menu_items}
            sub_menus={sub_menus}
            icons={icons}
            lang={lang}
            navigate={navigate}
            location={location}
          />
        }
      </NavbarMenu>

    </Navbar >
  );
}

export default Menu;