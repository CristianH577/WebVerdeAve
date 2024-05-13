import { useState, useEffect } from 'react';
import addLangText from '../../../lang/Layout/components/Footer.json'

import { Button, ButtonGroup, Divider, Tooltip, Link } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";

import { ArrowDownUp, WhatsApp, Youtube, Linkedin, GitHub, Discord, Instagram } from '../../../assets/icons.js';


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
                'home',
                'designs',
                'apis',
                'prices',
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
        {
            key: 'Instagram',
            icon: <Instagram size={size} />,
            link: 'https://www.instagram.com/verde_ave/',
            color: 'e1306c',
            className: 'hover:text-[#e1306c]',
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

            {/* socials */}
            {!loading &&
                <div className={'flex justify-center py-6 mb-2 shadow-lg ' + (dark ? 'border-b border-neutral-600' : '')}>
                    <div className='flex justify-evenly flex-wrap w-full max-w-[800px]'>
                        {socials.map(e =>
                            <Tooltip
                                key={e.key}
                                content={e.key} size='lg'
                                offset={0}
                                className={dark ? 'dark text-foreground ' : ''}
                                classNames={{
                                    base: 'shadow-transparent bg-transparent',
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
                                    id={e.key}
                                >
                                    {e.icon}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </div>
            }

            <div className='center items-center'>
                <div className='flex flex-col justify-evenly sm:flex-row sm:px-none sm:py-3 max-w-[1500px]'>
                    {sections.map((section, i) =>
                        <div key={section.key} className='flex flex-col sm:flex-row'>
                            {i !== 0 &&
                                <>
                                    <Divider className='w-auto ' />
                                    <Divider orientation="vertical" className='h-auto mx-4' />
                                </>
                            }

                            <div className='py-3 text-center sm:text-start '>
                                <div className='font-semibold'>
                                    {langText[section.key].label}:
                                </div>

                                {section.elements.map((e, i) => {
                                    switch (section.key) {
                                        case 'sections':
                                            return <div key={e} onClick={() => navigate('/' + e)} className='cursor-pointer hover:text-primary sm:ps-3 break-all'>
                                                {langText[section.key].elements[e]}
                                            </div>
                                        case 'contact':
                                            return <div key={e} className='sm:ps-3 max-[250px]:break-all'>
                                                {langText[section.key].elements[e]}: {contact[e]}
                                            </div>

                                        default:
                                            return null
                                    }

                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex justify-center items-center py-1 text-neutral-500 gap-2'>
                <p>2023</p>
                <p>©VerdeAve Inc.</p>
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
