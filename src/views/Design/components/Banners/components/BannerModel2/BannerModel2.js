import './BannerModel2.css'
import { createRef, useState } from 'react';

// import { Button,  } from '@nextui-org/react'
import { Divider, Image } from '@nextui-org/react'

import { CSSTransition } from 'react-transition-group'

import banner_img from '../../../../../../assets/imgs/design/banners/banner2-400.webp'
import { IoLogoCss3 } from "react-icons/io";
import { IoHeartCircleOutline, IoFilterCircleOutline, IoPeopleCircleOutline } from "react-icons/io5";


function BannerModel2() {
    const [open,] = useState(true)
    const bannerRef = createRef()

    const color1 = '#0a2748'
    const color2 = '#071839'
    const color3 = '#26a9de'


    function SvgTop({ className, size, width, height }) {
        return <svg
            className={" " + className}
            viewBox="0 0 32 16"
            width={size || width || 32}
            height={size / 2 || height || 16}
            strokeWidth={.1}
            stroke="transparent"
        >
            <path
                // className={`fill-[${color3}]`}
                fill={color3}
                d="M 0,0 -1,4 L 10,14 Q 13,16 16,14 L 32,0"
            />
            <path
                fill={color2}
                d="M 0,0 -1,3 L 10,14 Q 13,16 16,14 L 31,0"
            />
            <path
                fill={color1}
                d="M 0,0 -1,0 L 10,10 Q 13,12 16,10 L 27,0"
            />
        </svg>
    }
    function SvgBottom({ className, size, width, height }) {
        // const test = 'fill-' + fill

        return <svg
            className={" " + className}
            viewBox="0 0 32 16"
            width={size || width || 32}
            height={size / 2 || height || 16}
            strokeWidth={.1}
            stroke="transparent"
        >
            <path
                fill={color3}
                d="M -1,3 -1,4 L 10,14 Q 13,16 16,14 L 32,1 32,0 16,14 Q 13,16 10,14"
            />

            <linearGradient id="gradient-content2">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--nextui-content1))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--nextui-content2))' }} />
            </linearGradient>
            <path
                // className={`fill-${fill || 'content1'}`}
                // className={test || 'fill-content1'}
                // className='fill-content2 '
                fill="url(#gradient-content2)"
                // fill="transparent"
                d="M 0,17 -1,4 L 10,14 Q 13,16 16,14 L 32,1 33,17"
            />
        </svg>
    }


    return (
        <div className='flex flex-col items-center gap-4 max-xs:hidden ' >
            {/* <Button onClick={() => setOpen(!open)}>
                Abrir
            </Button> */}

            <div className='flex flex-col items-center relative pt-6 '>
                <CSSTransition
                    nodeRef={bannerRef}
                    in={open}
                    classNames={"css-banner2"}
                    timeout={500}
                    unmountOnExit
                >
                    <div ref={bannerRef} className='w-[400px] bg-gradient-to-r from-content1 to-content2 flex flex-col items-center shadow max-w-screen min-[400px]:rounded-xl'>
                        <div className="h-[500px] w-full bg-content1 relative overflow-hidden min-[400px]:rounded-xl">
                            <Image
                                src={banner_img}
                                radius='none'
                                className='object-cover w-full h-full'
                                classNames={{
                                    wrapper: 'h-full !max-w-none overflow-hidden'
                                }}
                            />

                            <SvgTop size={400} className={' absolute top-0 z-10  min-[400px]:rounded-xl '} />

                            <SvgBottom size={400} className={' absolute bottom-0 z-10'} />

                            <div className='absolute top-3 text z-20 right-[45%] flex flex-col items-center text-white'>
                                <IoLogoCss3 size={48} />
                                <div className='text-center'>
                                    <p className='font-semibold'>Css Profesional</p>

                                    <Divider className='bg-neutral-600' />

                                    <div className='uppercase text-xs flex justify-around'>
                                        {"personalizable".split('').map((e, i) =>
                                            <p key={i}>{e}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='content flex flex-col items-center gap-8 mt-8 mb-4 break-all'>
                            <h1 className='uppercase text-7xl font-bold mb-4 '>
                                Titulo
                            </h1>

                            <p className='text-xs px-6 text-center'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <div className="w-[60%] rounded-full text-5xl flex justify-evenly items-center py-1 dark:text-[#26a9de] dark:bg-[#0a2748] text-[#0a2748] bg-[#26a9de] transition-all">
                                <IoHeartCircleOutline />
                                <IoPeopleCircleOutline />
                                <IoFilterCircleOutline />
                            </div>
                        </div>
                    </div>
                </CSSTransition>

                {/* barra de arriba */}
                {/* <span className='h-6 w-[450px] rounded-lg bg-white absolute top-0 z-30 '
                    style={{
                        boxShadow: 'inset 0px -5px 10px black, 0px 5px 5px rgb(0,0,0,.3)'
                    }}
                /> */}

                {/* barra de abajo */}
                {/* <span className='h-6 w-[450px] rounded-lg bg-white'
                    style={{
                        boxShadow: 'inset 0px -5px 10px black, 0px 5px 5px rgb(0,0,0,.3)'
                    }}
                /> */}
            </div>
        </div>
    );
}

export default BannerModel2;
