import React, { createRef, useEffect, useState } from 'react';
import './menu.css'
import addLangText from '../../../lang/layout/menu.json'

import { useLocation, useNavigate } from "react-router-dom";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, ButtonGroup, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Image, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link as LinkNextUI } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";

import { CSSTransition } from 'react-transition-group'

import ave from '../../../assets/imgs/ave.png'
import buho from '../../../assets/imgs/buho.png'
import { ChevronDown, MoonIcon, SunIcon, ChevronRight, ChevronLeft } from '../../../assets/icons.js';
import { Cards, Forms, Galleries, Maps, Sliders, Bag, Tables, More } from '../../../assets/icons.js';


function Menu({ darkMode, lang }) {
  const langText = {
    ...addLangText[lang.value]
  }

  const navigate = useNavigate()
  const location = useLocation()
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [menuModel, setMenuModel] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const refCss = createRef()

  const icons = {
    ChevronDown: <ChevronDown size={20} />,
    ChevronRight: <ChevronRight size={20} />,
    ChevronLeft: <ChevronLeft size={20} />,

    moon: <MoonIcon className='text-[#eae4d9]' />,
    sun: <SunIcon className='text-warning' />,

    cartas: <Cards />,
    formularios: <Forms />,
    galerias: <Galleries />,
    mapas: <Maps />,
    presentaciones: <Sliders />,
    showroom: <Bag />,
    tablas: <Tables />,
    mas: <More />,
  }

  const menuItems = ['inicio', 'disenos', 'databases', 'analisis']
  const subMenus = {
    disenos: [
      "cartas",
      "formularios",
      "galerias",
      "mapas",
      "presentaciones",
      "showroom",
      "tablas",
      "mas"
    ]
  }

  const hoverCustom = darkMode.value ? 'hover:bg-[#eae4d9]' : 'hover:bg-[#92c5fc]'


  const menuDrop = <>
    {menuItems.map(item => subMenus[item] === undefined
      ?
      <NavbarMenuItem
        key={item}
        data-active={[item].includes(location.pathname.split('/')[1])}
        className='data-[active=true]:font-semibold border-y border-neutral-300 hover:border-transparent'
      >
        <LinkNextUI
          color='foreground'
          className={"w-full gap-1 cursor-pointer rounded px-2 py-1  max-xs:rounded-none h-[42px] " + hoverCustom}
          size="lg"
          onClick={() => navigate("/" + item)}
        >
          {langText.menuItems[item].label}
        </LinkNextUI>
      </NavbarMenuItem>

      :
      <Accordion
        key={item}
        variant="splitted"
        className=' px-0 border-y border-neutral-300 hover:border-transparent'
        itemClasses={{
          base: "px-0 group-[.is-splitted]:px-0 group-[.is-splitted]:shadow-none group-[.is-splitted]:rounded group-[.is-splitted]:bg-unset data-[open=true]:bg-content1 max-xs:!rounded-none ",
          heading: 'data-[open=true]:border-b border-neutral-300',
          trigger: 'py-1 px-2 rounded hover:opacity-80 max-xs:rounded-none ' + hoverCustom + (location.pathname.includes(item) ? ' font-semibold' : ''),
          content: 'mx-3 border-top max-xs:mx-0 ',
        }}
      >
        <AccordionItem
          aria-label={langText.menuItems[item].label}
          title={langText.menuItems[item].label}
          className={(darkMode.value ? 'data-[open=true]:bg-[#eae4d9]' : 'data-[open=true]:bg-[#92c5fc]')}
        >
          <LinkNextUI
            color='foreground'
            className="w-full gap-1 cursor-pointer hover:bg-background rounded px-2 py-1 data-[active=true]:font-semibold max-xs:rounded-none"
            size="lg"
            onClick={() => navigate('/' + item)}
            data-active={[item].includes(location.pathname.split('/')[1]) && !location.pathname.split('/')[2]}
          >
            {langText.menuItems[item].label}
          </LinkNextUI>
          {subMenus[item].map(sub =>
            <LinkNextUI
              key={sub}
              color='foreground'
              className="w-full gap-1 cursor-pointer hover:bg-background rounded px-2 py-1 data-[active=true]:font-semibold max-xs:rounded-none"
              size="lg"
              onClick={() => navigate('/' + item + '/' + sub)}
              data-active={location.pathname.includes(sub)}
            >
              {langText.menuItems[item].elements[sub].label}
            </LinkNextUI>
          )}
        </AccordionItem>
      </Accordion>
    )}
  </>

  const menuList = <>
    <Listbox
      aria-label="Menu Lista"
      variant='faded'
      className={'max-xs:!px-0 transition ease-in !duration-1000 ' + (showSubmenu ? 'opacity-0' : '')}
    >
      {menuItems.map((item) =>
        <ListboxItem
          key={item}
          endContent={subMenus[item] &&
            <Button
              isIconOnly
              onClick={() => setShowSubmenu(item)}
              className='hover:bg-warning'
              size='sm'
            >
              {icons.ChevronRight}
            </Button>
          }
          description={langText.menuItems[item].desc}
          onClick={() => navigate("/" + item)}

          className='max-xs:rounded-none max-xs:border-x-0 max-xs:w-full'
          classNames={{
            title: 'text-lg ' + (location.pathname.includes(item) && 'font-semibold')
          }}
        >
          {langText.menuItems[item].label}
        </ListboxItem>
      )}
    </Listbox>

    {menuItems.map((item) => subMenus[item] && (
      <CSSTransition
        key={'submenu' + item}
        nodeRef={refCss}
        in={showSubmenu === item}
        appear
        timeout={1000}
        classNames={"css-menu"}
      >
        < Listbox
          aria-label={"Submenu de " + langText.menuItems[item].label}
          ref={refCss}
          variant='faded'
          className='absolute top-0 left-0 max-w-0 px-0 py-2 opacity-0 max-xs:!px-0 '
          style={{ zIndex: '2000' }}
        >
          <ListboxItem
            onClick={() => setShowSubmenu(false)}
            textValue='Salir'
            className='max-xs:rounded-none max-xs:border-x-0 max-xs:w-full '
          >
            <Button
              isIconOnly
              color='transparent'
            >
              {icons.ChevronLeft}
            </Button>
          </ListboxItem>
          {subMenus[item].map(sub =>
            <ListboxItem
              key={sub}
              description={langText.menuItems[item].elements[sub].desc}
              onClick={() => navigate('/' + item + '/' + sub)}
              className='max-xs:rounded-none max-xs:border-x-0 max-xs:w-full '
              classNames={{
                title: 'text-lg ' + (location.pathname.includes(sub) && 'font-semibold'),
              }}
              startContent={icons[sub]}
            >
              {langText.menuItems[item].elements[sub].label}
            </ListboxItem>
          )}
        </Listbox>
      </CSSTransition>
    ))
    }
  </>


  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMenuOpen(false)
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
      onMenuOpenChange={() => setShowSubmenu(false)}
      className='bg-content1 shadow'
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
        <NavbarBrand>
          <Image
            src={darkMode.value ? buho : ave}
            alt='logo'
            width={50}
            className='cursor-pointer hover:scale-110 rounded-full bg-custom'
            onClick={() => navigate('/')}
          />
        </NavbarBrand>
      </NavbarContent>


      {/* menu */}
      <NavbarContent className="hidden items-center sm:flex gap-4 " justify="center">
        {menuItems.map(item => subMenus[item] === undefined
          ?
          <NavbarItem
            key={item}
            isActive={location.pathname.includes(item)}
          >
            <LinkNextUI color="foreground" className='gap-1 cursor-pointer flex hover:text-warning' onClick={() => navigate('/' + item)} >
              {langText.menuItems[item].label}
            </LinkNextUI>
          </NavbarItem>

          :
          <ButtonGroup key={item} className='dropdown-buttongroup h-full' >
            <NavbarItem
              key={item}
              isActive={location.pathname.includes(item)}
            >
              <LinkNextUI color="foreground" className='gap-1 cursor-pointer flex hover:text-warning' onClick={() => navigate('/' + item)} >
                {langText.menuItems[item].label}
              </LinkNextUI>
            </NavbarItem>

            <Dropdown className={(darkMode.value ? 'dark' : '')}>
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
                {subMenus[item].map((sub) =>
                  <DropdownItem
                    key={sub}
                    description={langText.menuItems[item].elements[sub].desc}
                    onClick={() => navigate('/' + item + '/' + sub)}
                    className={location.pathname.includes(sub) ? 'bg-primary-100' : ''}
                    startContent={icons[sub]}
                  >
                    {langText.menuItems[item].elements[sub].label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        )}
      </NavbarContent>


      {/* configuraciones */}
      <NavbarContent justify="end" className='caca gap-0'>
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
            color='default'
            className='rounded-full uppercase '
            onClick={() => lang.value === 'es' ? lang.set('en') : lang.set('es')}
          >
            {lang.value}
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
        className='max-xs:px-0 shadow-inner !h-full'
      >
        {menuModel ? menuDrop : menuList}
      </NavbarMenu>

    </Navbar >
  );
}

export default Menu;