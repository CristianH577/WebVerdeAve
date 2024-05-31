
import './MenuMovilListItems.css'
import { createRef, useState } from 'react';

import { Button, Listbox, ListboxItem } from "@nextui-org/react";

import { CSSTransition } from 'react-transition-group'

import { CgPushChevronRight, CgPushChevronLeft } from "react-icons/cg";


function MenuMovilListItems({ items, sub_menus, icons, navigate, location, langText }) {


    const list_item_class = 'rounded-none border-x-0 w-full p-0 last:border-b border-b-divider ps-4 hover:!bg-neutral-200'

    const [showSubmenu, setShowSubmenu] = useState(false)
    const menuRef = createRef()
    const subMenuRef = createRef()


    return (
        <>
            <CSSTransition
                nodeRef={menuRef}
                in={!showSubmenu}
                classNames={"css-menu"}
                timeout={500}
                unmountOnExit
            >
                <Listbox
                    ref={menuRef}
                    aria-label='Menú Móvil'
                    variant='faded'
                    className=' p-0 '
                    classNames={{
                        list: 'gap-0'
                    }}
                >
                    {items.map((item) =>
                        <ListboxItem
                            key={item}
                            endContent={sub_menus[item] && (
                                <Button
                                    isIconOnly
                                    radius='none'
                                    className='w-1/6 h-full bg-transparent hover:text-danger  '
                                    onClick={() => setShowSubmenu(item)}
                                >
                                    <CgPushChevronRight size={30} />
                                </Button>
                            )}
                            description={langText.menu_items[item]?.desc || ' '}
                            onClick={() => navigate("/" + item)}

                            className={list_item_class}
                            classNames={{
                                title: 'text-lg ' + (location.pathname.includes(item) ? 'text-danger' : ''),
                                wrapper: 'ps-2 ' + (langText.menu_items[item]?.desc ? 'py-2' : 'py-4')
                            }}
                        >
                            {langText.menu_items[item].label}
                        </ListboxItem>
                    )}
                </Listbox>
            </CSSTransition>


            {items.map((item) => sub_menus[item] && (
                <CSSTransition
                    nodeRef={subMenuRef}
                    key={'submenu_' + item}
                    in={showSubmenu === item}
                    classNames={"css-submenu"}
                    timeout={500}
                    unmountOnExit
                >
                    < Listbox
                        aria-label={langText.submenu_of + langText.menu_items[item].label}
                        ref={subMenuRef}
                        variant='faded'
                        classNames={{
                            base: '!p-0 mb-[15vh]',
                            list: 'gap-0',
                        }}
                    >
                        <ListboxItem
                            onClick={() => setShowSubmenu(false)}
                            textValue='Salir'
                            className={list_item_class + ' py-2 hover:!text-danger'}
                        >
                            <CgPushChevronLeft size={30} />
                        </ListboxItem>

                        {sub_menus[item].map(sub =>
                            <ListboxItem
                                key={sub}
                                description={langText.sub_menus[item][sub]?.desc}
                                onClick={() => navigate('/' + item + '/' + sub)}
                                className={list_item_class}
                                classNames={{
                                    title: 'text-lg ' + (location.pathname.includes(sub) ? 'text-danger' : ''),
                                    wrapper: 'py-2'
                                }}
                                startContent={icons[sub]}
                            >
                                {langText.sub_menus[item][sub].label}
                            </ListboxItem>
                        )}
                    </Listbox>
                </CSSTransition>
            ))}
        </>
    );
}

export default MenuMovilListItems;
