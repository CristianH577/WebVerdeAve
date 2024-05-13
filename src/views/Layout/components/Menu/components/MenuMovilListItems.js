import { createRef, useState } from 'react';
import './MenuMovilListItems.css'
import addLangText from '../../../../../lang/Layout/components/Menu/Menu.json'
import addLangText2 from '../../../../../lang/Layout/components/Menu/components/MenuMovilListItems.json'

import { Button, Listbox, ListboxItem} from "@nextui-org/react";

import { CSSTransition } from 'react-transition-group'


function MenuMovilListItems({ items, sub_menus, icons, lang, navigate, location }) {
    const langText = {
        ...addLangText[lang],
        ...addLangText2[lang]
    }


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
                    aria-label={langText.menu_list}
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
                                    className='w-1/6 h-auto bg-transparent hover:text-danger'
                                    onClick={() => setShowSubmenu(item)}
                                >
                                    {icons.ChevronRight}
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
                        {/* back */}
                        <ListboxItem
                            onClick={() => setShowSubmenu(false)}
                            textValue='Salir'
                            className={list_item_class + ' py-2 hover:!text-danger'}
                        >
                            <Button
                                isIconOnly
                                color='transparent'
                            >
                                {icons.ChevronLeft}
                            </Button>
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
