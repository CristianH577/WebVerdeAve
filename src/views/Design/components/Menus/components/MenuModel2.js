import { Divider, } from "@nextui-org/react";

import { BsWhatsapp, BsPinMap } from "react-icons/bs";
import { SVGMora, SVGNaranja, SVGSandia, SVGFrutilla, SVGFrutillaMora, SVGEnredadera } from '../../../../../assets/imgs/design/menus/SvgsMenus';

function MenuModel2() {

    const fill = 'hsl(var(--nextui-success-400))'
    const size = 200

    return (
        <div className='w-full max-w-[800px] h-fit bg-gradient-to-tl dark:bg-gradient-to-br from-content3 to-content1 p-8 md:rounded-lg space-y-4 font-["menulis"]'>
            < div className='flex justify-center gap-4' >
                <SVGEnredadera fillLeaf={'hsl(var(--nextui-success-400))'} className='w-full h-auto' />
                <h1 className='text-7xl text- font-extrabold uppercase text-center border-[20px] border- p-4 ' style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--nextui-success)),hsl(var(--nextui-success-200))) 1' }} >
                    Menu
                </h1>
                <SVGEnredadera fillLeaf={'hsl(var(--nextui-success-400))'} className='w-full h-auto rotate-180' />
            </div >

            <div className='flex gap-8 items-center '>
                <SVGSandia fill={fill} size={size} />

                <div className='flex flex-col items-center w-full gap-2'>
                    <h2 className='text-5xl text-success-300 font-semibold'>Categoria 1</h2>

                    <div className='flex gap-8 w-full items-center justify-evenly '>
                        <div className='font-bold text-3xl space-y-2 uppercase '>
                            <div className='flex justify-between gap-2'>
                                <p>Oferta</p>
                                <p className='text-success-600'> $4,99</p>
                            </div>

                            <div className='flex justify-between gap-2'>
                                <p>Especial </p>
                                <p className='text-success-600'>$9,99</p>
                            </div>
                        </div>

                        <ol className='w-full '>
                            {[...Array(5)].map((e, i) =>
                                <li key={i} className='flex gap-2'>
                                    Nombre {i + 1}
                                    <Divider className='flex-1 self-center' />
                                    $19,99
                                </li>
                            )}
                        </ol>

                    </div>
                </div>
            </div>

            <div className='flex gap-8 items-center '>
                <div className='flex flex-col items-center  w-full gap-2'>
                    <h2 className='text-5xl text-success-300 font-semibold'>Categoria 2</h2>

                    <div className='flex gap-8 w-full items-center justify-evenly '>
                        <div className='font-bold text-3xl space-y-2 uppercase '>
                            <div className='flex justify-between gap-2'>
                                <p>Oferta</p>
                                <p className='text-success-600'> $4,99</p>
                            </div>

                            <div className='flex justify-between gap-2'>
                                <p>Especial </p>
                                <p className='text-success-600'>$9,99</p>
                            </div>
                        </div>

                        <ol className='w-full '>
                            {[...Array(5)].map((e, i) =>
                                <li key={i} className='flex gap-2'>
                                    Nombre {i + 1}
                                    <Divider className='flex-1 self-center' />
                                    $19,99
                                </li>
                            )}
                        </ol>

                    </div>
                </div>

                <SVGNaranja fill={fill} size={size} />
            </div>

            <div className='flex justify-between pt-4 gap-4' >
                <div className=' w-[255px] flex items-end justify-center relative'>
                    <SVGFrutillaMora fill={fill} size={180} className='absolute -top-10' />

                    <div className='bg-gradient-to-t from-success-200 to-success rounded-lg px-2 h-[90%] flex items-end pb-8'>
                        <p className='text-5xl font-bold text-center '>Agregado Doble $1,99</p>
                    </div>
                </div>


                <div>
                    <div className='flex gap-4 items-center'>
                        <SVGFrutilla fill={fill} size={150} />

                        <div className='flex flex-col items-center w-full gap-2'>
                            <h2 className='text-5xl text-success-300 font-semibold'>Agregado 1</h2>

                            <ol className='w-full'>
                                {[...Array(3)].map((e, i) =>
                                    <li key={i} className='flex gap-2'>
                                        Opcion {i + 1}
                                        <Divider className='flex-1 self-center' />
                                        $2,99
                                    </li>
                                )}
                            </ol>
                        </div>
                    </div>

                    <div className='flex gap-4 items-center'>
                        <div className='flex flex-col items-center w-full gap-2'>
                            <h2 className='text-5xl text-success-300 font-semibold break-keep'>Agregado 2</h2>

                            <ol className='w-full '>
                                {[...Array(3)].map((e, i) =>
                                    <li key={i} className='flex gap-2'>
                                        Opcion {i + 1}
                                        <Divider className='flex-1 self-center' />
                                        $2,99
                                    </li>
                                )}
                            </ol>
                        </div>

                        <SVGMora fill={fill} size={150} />
                    </div>
                </div>
            </div>

            <div className='flex justify-center gap-8 p-2 bg-success-200 rounded-lg !mt-8'>
                <div className='flex items-center gap-2'>
                    <BsPinMap size={24} className='text-' />
                    Direccion, Provincia
                </div>
                <div className='flex items-center gap-2'>
                    <BsWhatsapp size={24} className='text-' />
                    381 999 9999
                </div>
            </div>
        </div >
    );
}

export default MenuModel2;
