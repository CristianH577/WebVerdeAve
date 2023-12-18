import React, { useState, useEffect } from 'react';
import addLangText from '../../../lang/layout/footer.json'

import { Button, ButtonGroup, Divider, Tooltip, Link } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";

import { ArrowDownUp, WhatsApp, Youtube, Linkedin, GitHub, Discord } from '../../../assets/icons.js';


function Footer({ dark, lang }) {
    const langText = {
        ...addLangText[lang]
    }

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const icons = {
        arrowdu: <ArrowDownUp />,
        WhatsApp: <WhatsApp size={20} />,
    }

    const sections = [
        {
            key: 'sections',
            elements: [
                'disenos',
                'databases',
                'analisis',
            ],
        },
        {
            key: 'contact',
            elements: [
                'email',
                'cel',
                'direc',
            ],
        },
    ]
    const contact = {
        // email: 'cristian.herrera07@hotmail.com',
        email: <a href='mailto:cristian.herrera07@hotmail.com'>cristian.herrera07@hotmail.com</a>,
        cel: '+54 381 315 6907',
        direc: 'S.M. de Tucumán (Capital), Tucumán, Argentina',
    }

    const size = 32
    const socials = [
        {
            key: 'Whatsapp',
            icon: <WhatsApp size={size} />,
            link: 'https://api.whatsapp.com/send?phone=543813156907&text=Hola.%20Quiero%20contactarme%20por%20los%20servicios%20de%20programacion.',
            color: '25D366',
            className: 'hover:text-[#25D366]',
        },
        {
            key: 'GitHub',
            icon: <GitHub size={size} />,
            link: 'https://github.com/CristianH577',
            color: '6e5494',
            className: 'hover:text-[#6e5494]',
        },
        {
            key: 'Linkedin',
            icon: <Linkedin size={size} />,
            link: 'https://www.linkedin.com/in/cristian-herrera-931344230/',
            color: '0e76a8',
            className: 'hover:text-[#0e76a8]',
        },
        {
            key: 'Discord',
            icon: <Discord size={size} />,
            link: 'https://discord.com/users/kotar1142',
            color: '5865F2',
            className: 'hover:text-[#5865F2]',
        },
        {
            key: 'Youtube',
            icon: <Youtube size={size} />,
            link: 'https://www.youtube.com/@Cristian-gw9lq',
            color: 'FF0000',
            className: 'hover:text-[#FF0000]',
        },
    ]


    const movePage = () => {
        const total = document.documentElement.scrollHeight
        const current = window.scrollY
        const windowH = window.innerHeight
        var y = 0
        if (current < (total - windowH) / 2) {
            y = total
        }
        window.scroll(0, y)
    }


    // eslint-disable-next-line
    useEffect(() => {
        setLoading(false)
    })


    return (
        <footer className='mt-auto bg-content1 shadow-inner'>
            {!loading &&
                <div className={'flex justify-center py-6 mb-2 shadow-lg ' + (dark ? 'border-b border-neutral-600' : '')}>
                    <div className='flex justify-evenly flex-wrap w-full max-w-[800px]'>
                        {socials.map(e =>
                            <Tooltip
                                key={e.key}
                                content={e.key} size='lg'
                                offset={-6}
                                className={dark ? 'text-white' : ''}
                                classNames={{
                                    base: 'shadow-none bg-transparent'
                                }}
                            >
                                <Button
                                    isIconOnly
                                    size='lg'
                                    className={'text-foreground ' + e.className}
                                    href={e.link}
                                    color='transparent'
                                    as={Link}
                                    isExternal
                                >
                                    {e.icon}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </div>
            }

            <div className='flex flex-col justify-evenly sm:flex-row px-6 sm:px-none sm:py-3'>
                {sections.map((section, i) =>
                    <div key={section.key} className='flex flex-col sm:flex-row'>
                        {i !== 0 &&
                            <>
                                <Divider className='w-auto mx-1' />
                                <Divider orientation="vertical" className='h-auto' />
                            </>
                        }
                        <div className='py-3 text-center sm:text-start sm:ps-4'>
                            <div className='font-semibold'>
                                {langText.sections[section.key].label}:
                            </div>

                            {section.elements.map((e, i) => {
                                switch (section.key) {
                                    case 'sections':
                                        return <div key={e} onClick={() => navigate('/' + e)} className='cursor-pointer hover:text-primary sm:ps-3 break-all'>
                                            {langText.sections[section.key].elements[e]}
                                        </div>
                                    case 'contact':
                                        return <div key={e} className='sm:ps-3 break-all'>
                                            {langText.sections[section.key].elements[e]}: {contact[e]}
                                        </div>

                                    default:
                                        return null
                                }

                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className='flex justify-center py-1 text-neutral-500 gap-2'>
                <div>2023</div>
                <div>©VerdeAve Inc.</div>
            </div>

            {!loading &&
                <ButtonGroup variant='ghost' className=' opacity-25 hover:opacity-100 fixed bottom-[10px] right-[10px] z-10' >
                    <Button
                        isIconOnly
                        color='success'
                        href={'https://api.whatsapp.com/send?phone=543813156907&text=Hola.%20Quiero%20contactarme%20por%20los%20servicios%20de%20programacion.'}
                        as={Link}
                        isExternal
                    >
                        {icons.WhatsApp}
                    </Button>
                    <Button isIconOnly color='primary' onClick={movePage}>
                        {icons.arrowdu}
                    </Button>
                </ButtonGroup>
            }

        </footer>
    );
}

export default Footer;
