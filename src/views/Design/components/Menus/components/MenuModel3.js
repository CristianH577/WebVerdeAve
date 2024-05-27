
import { Divider, Image, } from "@nextui-org/react";

import { loremIpsum } from 'react-lorem-ipsum';

import { SVGKiwiHalf, SVGMancha2, SVGOrangeHalf } from '../../../../../assets/imgs/design/menus/SvgsMenus';
import img_main from '../../../../../assets/imgs/design/menus/granada.webp'

import { GiFruitTree, GiFruiting } from "react-icons/gi";
import { SiAdafruit } from "react-icons/si";
import { PiPlantBold } from "react-icons/pi";


function MenuModel3() {

    return (
        <div className='flex flex-wrap items-center justify-center gap-4' >
            {/* portada */}
            <div
                className='w-full max-w-[800px] md:rounded-lg font-["menulis"] p-8 text-center'
                style={{
                    background: 'radial-gradient(circle, hsl(var(--nextui-success)), hsl(var(--nextui-success-200)))'
                }}
            >
                <h2 className='text-lg'>El Lugar</h2>

                {/* header */}
                <div className='w-full relative flex items-center justify-center font-["calvera"]'>
                    <h1
                        className='text-[250px]'
                        style={{
                            background: 'linear-gradient(to top, hsl(var(--nextui-danger)), white)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        MENU
                    </h1>

                    <span className='absolute flex items-center justify-center w-full '>
                        <div className='relative flex items-center justify-center'>
                            <h2 className='text-[80px] font-extrabold uppercase absolute z-10 -bottom-[20px]' >
                                FRUTA
                            </h2>

                            <SVGMancha2
                                from='hsl(var(--nextui-danger-300)/.8)'
                                to='hsl(var(--nextui-danger-100)/.8)'
                                style={{
                                    transform: 'scaleX(.6) scaleY(1.4)'
                                }}
                            />
                        </div>
                    </span>
                </div>

                {/* body */}
                <div className='flex items-end relative'>
                    <div>
                        <p>Abrimos</p>
                        <h3 className='text-5xl font-bold'>9HS</h3>
                    </div>

                    <Image src={img_main} className='mx-4' />

                    <div>
                        <p>Cerramos</p>
                        <h3 className='text-5xl font-bold'>15HS</h3>
                    </div>

                    <GiFruitTree size={64} className='text-danger-200/80 absolute top-14 left-10' />
                    <SiAdafruit size={64} className='text-danger-200/80 absolute top-0 right-10' />
                </div>

                {/* footer */}
                <div className='p-12 relative '>
                    <div className='text-lg'>
                        <p>Direccion, Ciudad, Provincia</p>
                        <p className='text-warning'>Efectivo - Debito - Credito</p>
                        <p>381 999 9999</p>
                    </div>
                    <PiPlantBold size={64} className='text-danger-200/80 absolute top-5 left-10' />
                    <GiFruiting size={64} className='text-danger-200/80 absolute bottom-2 right-10' />
                </div>

                <p className='text-danger-200 font-semibold'>
                    La calidad tiene precio.
                </p>
            </div>


            {/* primera hoja */}
            <div
                className='w-full max-w-[800px] md:rounded-lg font-["menulis"]'
                style={{
                    background: 'radial-gradient(circle, hsl(var(--nextui-success)), hsl(var(--nextui-success-200)))'
                }}
            >
                {/* header */}
                <div className='font-["calvera"] font-bold flex flex-col justify-center relative overflow-hidden md:rounded-lg'>

                    <SVGOrangeHalf size={350} className='absolute -top-[35%] -left-[20%]' />
                    <SVGKiwiHalf size={350} className='absolute -top-[35%] -right-[15%] ' />

                    <span className='flex items-center px-16'>
                        <Divider className='flex-1 h-4 rounded-full' />
                        <p
                            className='text-[80px] px-8'
                            style={{
                                background: 'linear-gradient(to top, hsl(var(--nextui-danger)), white)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >EL</p>
                        <Divider className='flex-1 h-4 rounded-full' />
                    </span>

                    <div className='flex justify-center items-end relative '>
                        <GiFruiting size={64} className='text-danger-600/80 absolute bottom-[40px] left-[20%]' />
                        <h1
                            className='text-[120px]'
                            style={{
                                background: 'linear-gradient(to top, hsl(var(--nextui-danger)), white)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >MENU</h1>
                    </div>
                </div>

                {/* body */}
                <div className='px-8 pb-8'>

                    <article className='border-2 border-white rounded-lg'>
                        {/* title */}
                        <div className='flex items-center p-8'>
                            <Divider className='flex-1 h-4 rounded-full bg-gradient-to-t from-danger-100/80 to-danger-300/80' />
                            <span className='relative flex items-center justify-center'>
                                <h2 className='text-[40px] font-extrabold uppercase text-center z-10 px-10' >
                                    PRINCIPALES
                                </h2>

                                <SVGMancha2
                                    from='hsl(var(--nextui-danger-300)/.8)'
                                    to='hsl(var(--nextui-danger-100)/.8)'
                                    className='absolute '
                                    style={{
                                        transform: 'scaleX(.6) scaleY(1.2)'
                                    }}
                                />
                            </span>
                            <Divider className='flex-1 h-4 rounded-full bg-gradient-to-t from-danger-100/80 to-danger-300/80' />
                        </div>

                        {/* items */}
                        <div className='grid grid-cols-2 px-8 py-4 gap-4 gap-x-12'>
                            {[...Array(5)].map((e, i) =>
                                <div key={i} >
                                    <div className='flex justify-between'>
                                        <b>Nombre {i + 1}</b>
                                        <b>$9,99</b>
                                    </div>

                                    <p className='text-start text-sm text-neutral-300'>{loremIpsum({ avgSentencesPerParagraph: 2 })}</p>
                                </div>
                            )}
                        </div>
                    </article>


                    <div className='grid grid-cols-5 grid-rows-5 gap-2 mt-2'>
                        {/* ofertas */}
                        <article className='col-span-3 row-span-2 border-2 border-white rounded-lg p-4'>
                            {/* title */}
                            <span className='relative flex items-center justify-center py-4'>
                                <h2 className='text-[30px] font-extrabold uppercase text-center z-10 px-10' >
                                    OFERTAS
                                </h2>

                                <SVGMancha2
                                    from='hsl(var(--nextui-danger-300)/.8)'
                                    to='hsl(var(--nextui-danger-100)/.8)'
                                    className='absolute '
                                    style={{
                                        transform: 'scaleX(.3) scaleY(.9)'
                                    }}
                                />
                            </span>

                            {/* items */}
                            <div className='space-y-2 mt-4'>
                                {[...Array(2)].map((e, i) =>
                                    <div key={i} >
                                        <div className='flex justify-between'>
                                            <b>Nombre {i + 1}</b>
                                            <b>$3,99</b>
                                        </div>

                                        <p className='text-start text-sm text-neutral-300'>{loremIpsum({ avgSentencesPerParagraph: 2 })}</p>
                                    </div>
                                )}
                            </div>
                        </article>

                        {/* mas comprados */}
                        <article className='col-span-2 row-span-5 border-2 border-white rounded-lg p-4 flex flex-col justify-evenly'>
                            {/* title */}
                            <div>
                                <h2 className='text-[50px] font-extrabold uppercase text-center z-10 px-10' >
                                    mas
                                </h2>

                                <span className='relative flex items-center justify-center py-4'>
                                    <h2 className='text-[30px] font-extrabold uppercase text-center z-10 px-10' >
                                        comprados
                                    </h2>

                                    <SVGMancha2
                                        from='hsl(var(--nextui-danger-300)/.8)'
                                        to='hsl(var(--nextui-danger-100)/.8)'
                                        className='absolute '
                                        style={{
                                            transform: 'scaleX(.45) scaleY(.7)'
                                        }}
                                    />
                                </span>
                            </div>

                            {/* items */}
                            <div className='space-y-2 mt-4'>
                                {[...Array(4)].map((e, i) =>
                                    <div key={i} >
                                        <div className='flex justify-between'>
                                            <b>Nombre {i + 1}</b>
                                            <b>$8,99</b>
                                        </div>

                                        <p className='text-start text-sm text-neutral-300'>{loremIpsum({ avgSentencesPerParagraph: 2 })}</p>
                                    </div>
                                )}
                            </div>

                        </article>

                        {/* otros */}
                        <article className='col-span-3 row-span-3 border-2 border-white rounded-lg p-4'>
                            {/* title */}
                            <span className='relative flex items-center justify-center py-4'>
                                <h2 className='text-[30px] font-extrabold uppercase text-center z-10 px-10' >
                                    OTROS
                                </h2>

                                <SVGMancha2
                                    from='hsl(var(--nextui-danger-300)/.8)'
                                    to='hsl(var(--nextui-danger-100)/.8)'
                                    className='absolute '
                                    style={{
                                        transform: 'scaleX(.3) scaleY(.9)'
                                    }}
                                />
                            </span>

                            {/* items */}
                            <div className='space-y-2'>
                                {[...Array(3)].map((e, i) =>
                                    <div key={i} >
                                        <div className='flex justify-between'>
                                            <b>Nombre {i + 1}</b>
                                            <b>$6,99</b>
                                        </div>

                                        <p className='text-start text-sm text-neutral-300'>{loremIpsum({ avgSentencesPerParagraph: 2 })}</p>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default MenuModel3;
