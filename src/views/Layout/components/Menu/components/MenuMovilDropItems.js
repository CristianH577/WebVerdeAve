import { useState } from 'react';
import addLangText from '../../../../../lang/Layout/components/Menu/Menu.json'

import { Button, Accordion, AccordionItem } from "@nextui-org/react";

import { ChevronRight } from '../../../../../assets/icons.js';


function MenuMovilDropItems({ items, sub_menus, icons, lang, navigate, location }) {
    const langText = {
        ...addLangText[lang]
    }

    const [showSubmenu, setShowSubmenu] = useState([])

    const handleShowSubmenu = item => {
        var set = item.target.name
        if (showSubmenu[0] === set) set = []
        setShowSubmenu([set])
    }

    // function TitleCustom({ item }) {
    //     return <div className='flex justify-between'>
    //         <div className={'ps-4 ' + (langText.menu_items[item]?.desc ? 'py-2' : 'py-4')}>
    //             <p className={location.pathname.includes(item) ? 'text-danger' : ''}>
    //                 {langText.menu_items[item].label}
    //             </p>


    //             <p className='text-small text-neutral-500'>
    //                 {langText.menu_items[item]?.desc}
    //             </p>
    //         </div>

    //         {sub_menus.hasOwnProperty(item) && (
    //             <Button
    //                 isIconOnly
    //                 radius='none'
    //                 className='w-1/6 h-auto bg-transparent hover:text-danger'
    //                 name={item}
    //                 onPress={handleShowSubmenu}
    //             >
    //                 <ChevronRight size={30} className={'transition ' + (showSubmenu.includes(item) ? 'rotate-90' : '')} />
    //             </Button>
    //         )}
    //     </div>
    // }


    return (
        <Accordion
            className='p-0 last:border-b-1 border-divider'
            hideIndicator
            selectedKeys={showSubmenu}
            itemClasses={{
                base: 'hover:bg-neutral-100 data-[open=true]:bg-neutral-200',
                trigger: 'py-0',
                content: 'py-0',
            }}
        >
            {items.map(item =>
                <AccordionItem
                    key={item}
                    aria-label={langText.menu_items[item].label}
                    // title={<TitleCustom item={item} />}
                    title={
                        <div className='flex justify-between'>
                            <div className={'ps-4 ' + (langText.menu_items[item]?.desc ? 'py-2' : 'py-4')}>
                                <p className={location.pathname.includes(item) ? 'text-danger' : ''}>
                                    {langText.menu_items[item].label}
                                </p>


                                <p className='text-small text-neutral-500'>
                                    {langText.menu_items[item]?.desc}
                                </p>
                            </div>

                            {sub_menus.hasOwnProperty(item) && (
                                <Button
                                    isIconOnly
                                    radius='none'
                                    className='w-1/6 h-auto bg-transparent hover:text-danger'
                                    name={item}
                                    onPress={handleShowSubmenu}
                                >
                                    <ChevronRight size={30} className={'transition ' + (showSubmenu.includes(item) ? 'rotate-90' : '')} />
                                </Button>
                            )}
                        </div>
                    }
                    onPress={() => navigate("/" + item)}
                >
                    {sub_menus.hasOwnProperty(item) && (
                        <Accordion
                            hideIndicator
                            selectedKeys={[]}
                            className='p-0'
                            itemClasses={{
                                base: 'hover:bg-neutral-300',
                                trigger: 'py-1 ps-4',
                            }}
                        >
                            {sub_menus[item].map(sub =>
                                <AccordionItem
                                    key={item + "_" + sub}
                                    aria-label={langText.sub_menus[item][sub].label}
                                    title={langText.sub_menus[item][sub].label}
                                    subtitle={langText.sub_menus[item][sub]?.desc}
                                    classNames={{
                                        title: location.pathname.includes(sub) ? 'text-danger' : ''
                                    }}
                                    startContent={icons[sub]}
                                    onPress={() => navigate('/' + item + '/' + sub)}
                                >
                                </AccordionItem>
                            )}
                        </Accordion>
                    )}
                </AccordionItem>
            )}
        </Accordion>
    );

}

export default MenuMovilDropItems;
