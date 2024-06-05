import { useState, useEffect } from 'react';
import addLangText from '../../../lang/Layout/Footer.json'

import { Button, ButtonGroup, Card, Divider, Image, Tooltip } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";

import { IoLogoGithub, IoLogoLinkedin, IoLogoYoutube, IoLogoInstagram } from "react-icons/io5";
import { BsArrowDownUp } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa6";

import qr_wp from '../../../assets/imgs/layout/qr-wp.webp'


function Footer({ dark, lang }) {
    const langText = {
        ...addLangText[lang]
    }

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const contact = {
        email: <a href='mailto:cristian.herrera07@hotmail.com'>cristian.herrera07@hotmail.com</a>,
        cel: '+54 381 315 6907',
        direc: 'S.M. de Tucumán (Capital), Tucumán, Argentina',
    }

    const size = 42
    const socials = [
        {
            key: 'GitHub',
            icon: <IoLogoGithub size={size} />,
            link: 'https://github.com/CristianH577',
            color: '6e5494',
            className: 'hover:text-[#6e5494]',
        },
        {
            key: 'Linkedin',
            icon: <IoLogoLinkedin size={size} />,
            link: 'https://www.linkedin.com/in/cristian-herrera-931344230/',
            color: '0e76a8',
            className: 'hover:text-[#0e76a8]',
        },
        {
            key: 'Discord',
            icon: <FaDiscord size={size} />,
            link: 'https://discord.com/users/kotar1142',
            color: '5865F2',
            className: 'hover:text-[#5865F2]',
        },
        {
            key: 'Youtube',
            icon: <IoLogoYoutube size={size} />,
            link: 'https://www.youtube.com/@Cristian-gw9lq',
            color: 'FF0000',
            className: 'hover:text-[#FF0000]',
        },
        {
            key: 'Instagram',
            icon: <IoLogoInstagram size={size} />,
            link: 'https://www.instagram.com/verde_ave/',
            color: 'e1306c',
            className: 'hover:text-[#e1306c]',
        },
    ]


    const handleExternalUrl = e => {
        const href = e.target.dataset.href

        if (typeof window !== 'undefined' && window.electron && window.electron.isElectron) {
            window.electron.openExternal(href)
        } else {
            window.open(href, '_blank')
        }
    }
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
                                className={'bg-content3 ' + (dark ? 'dark text-foreground ' : '')}
                                classNames={{
                                    base: 'shadow-transparent bg-transparent',
                                }}
                            >
                                <Button
                                    id={e.key}
                                    isIconOnly
                                    color='transparent'
                                    size='lg'
                                    className={'text-foreground ' + e.className}
                                    data-href={e.link}
                                    onPress={handleExternalUrl}
                                >
                                    {e.icon}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </div>
            }

            <div className='center items-center'>
                <div className='flex flex-col max-md:items-center gap-2 md:flex-row max-w-[1500px] md:py-4'>
                    <div className='flex flex-col max-md:items-center '>
                        <div className='font-semibold'>
                            {langText.sections.label}:
                        </div>
                        {['home', 'web', 'apis', 'design',].map(e =>
                            <div key={e} onClick={() => navigate('/' + e)} className='cursor-pointer hover:text-primary sm:ps-3 break-all'>
                                {langText.sections.elements[e]}
                            </div>
                        )}
                    </div>

                    <Divider className='w-3/4 md:hidden' />
                    <Divider orientation="vertical" className='h-auto md:mx-4' />

                    <div className='flex flex-col max-md:items-center '>
                        <div className='font-semibold'>
                            {langText.contact.label}:
                        </div>
                        {['email', 'cel', 'direc',].map(e =>
                            <div key={e} className='sm:ps-3 max-[250px]:break-all'>
                                {langText.contact.elements[e]}: {contact[e]}
                            </div>
                        )}
                    </div>

                    <Divider className='w-3/4 md:hidden' />
                    <Divider orientation="vertical" className='h-auto md:mx-4' />

                    <Card
                        isPressable
                        className='w-fit self-center shadow-lg hover:scale-90'
                        data-href='https://api.whatsapp.com/send?phone=543813156907&text=Hola.%20Quiero%20contactarme%20por%20los%20servicios%20de%20programacion.'
                        onPress={handleExternalUrl}
                    >
                        <Image src={qr_wp} className='h-[150px]' classNames={{ wrapper: 'bg-content3 border-3 border-divider dark:border-background ' }} />
                    </Card>
                </div>
            </div>

            <div className='flex justify-center items-center py-1 text-neutral-500 gap-2'>
                <p>2023</p>
                <span className='relative ps-4'>
                    <p className='text-2xl absolute left-0 -top-[1px]'>© </p>
                    <p>VerdeAve Inc.</p>
                </span>
            </div>

            {!loading &&
                <ButtonGroup id='footer_btn' variant='ghost' className=' opacity-25 hover:opacity-100 fixed bottom-[10px] right-[10px] z-10' >
                    <Button isIconOnly color='primary' onClick={movePage}>
                        <BsArrowDownUp size={24} />
                    </Button>
                </ButtonGroup>
            }

        </footer >
    );
}

export default Footer;
