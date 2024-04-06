import React from 'react';
import './test.css'
// import { useOutletContext } from 'react-router-dom';

import { Image, Divider } from "@nextui-org/react";
import { Card, CardHeader, CardFooter, CardBody } from "@nextui-org/react";

import noche from '../../assets/imgs/noche.jpg'

// import ave1 from '../../assets/imgs/test/ave1.jpg'
// import ave2 from '../../assets/imgs/test/ave2.jpg'
// import ave3 from '../../assets/imgs/test/ave3.jpg'
// import ave4 from '../../assets/imgs/test/ave4.jpg'
// import img_test from '../../assets/imgs/test/test.jpg'

import calabaza from '../../assets/imgs/test/calabaza.png'
import cereza from '../../assets/imgs/test/cereza.png'
import fresa from '../../assets/imgs/test/fresa.png'


function Test() {
    // const context = useOutletContext()
    // const [isLoading, setIsLoading] = useState(false)

    // const imgs = require.context('../../assets/imgs/sliders', true)


    return (
        <main
            className='bg-no-repeat bg-cover bg-center bg-fixed '
            style={{ backgroundImage: `url(${noche})` }}

        >
            <div
                className='center items-center gap-8 bg-gradient-to-b from-slate-500/50 to-background backdrop-blur-sm py-24'
            >

                {/* <div className={context.titleClass}>Test</div> */}

                {/* <div className='flex flex-wrap justify-center p-16 gap-4'>
                    {[ave1, ave2, ave3, ave4].map((e, i) =>
                        <Image
                            key={i}
                            src={e}
                            radius='full'
                            className='max-w-[200px]'
                        />
                    )}
                </div> */}

                {/* <Card className='bg-gradient-to-b from-stone-400/90 to-stone-600'>
                    <CardHeader>
                        <Image
                            src={calabaza}
                            className='max-w-[200px] bg-white'
                        />
                    </CardHeader>

                    <CardBody className='text-center'>
                        <div className='font-[cursive] text-xl'>Calabaza</div>
                        <div className='font-bold text-5xl'>$99,99</div>
                    </CardBody>


                    <CardFooter className='justify-center text-neutral-500'>
                        <div className='border-t border-neutral-500 pt-1'>dd/mm/aaa - dd/mm/aaa</div>
                    </CardFooter>
                </Card> */}


                {/* <div className='border bg-gradient-to-r from-slate-500/50 to-white/60 rounded-xl flex items-center p-6'>
                    <div className=''>
                        <div className=''>
                            <div className='text-neutral-500 pt-1'>dd/mm/aaa</div>
                            <div className='text-2xl italic'>Lorem Ipsum dolor </div>
                            <div className='font-[cursive] font-bold text-6xl pb-4 pt-2 ps-4'>Cereza</div>
                            <div className='max-w-[350px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.</div>
                        </div>

                        <Divider className='my-6 bg-lime-500/40' />

                        <div className='center gap-2 '>
                            {[...Array(4)].map((e, i) =>
                                <div key={i} className='grid grid-cols-12  '>
                                    <div className=' col-span-3 font-bold bg-lime-400/90 rounded-s-xl border p-1 ps-2'>Lorem Ipsum</div>
                                    <div className=' col-span-9 border border-s-0 p-1 px-2 rounded-e-xl'>Lorem ipsum dolor sit amet consectetur adipiscing elit</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='relative py-14 px-12  '>
                        <Image
                            src={cereza}
                            className='max-w-[200px] bg-gradient-to-b from-warning to-danger shadow-lg shadow-purple-600'
                        />
                        <span className='bg-gradient-to-b from-success to-green-600 rounded-full center items-center py-4 px-3 absolute z-10 top-2 right-2 shadow'>
                            <div className='text-blue-900 italic text-small'>10% off</div>
                            <div className='text-3xl'>$89,99</div>
                            <div className=' text-small line-through'>$99,99</div>
                        </span>
                    </div>
                </div> */}


                {/* <div className='border bg-white rounded-xl flex items-center p-6 gap-8'>
                    <div className=''>
                        <Image
                            src={fresa}
                            className='max-w-[400px] bg-gradient-to-b from-slate-300 to-slate-900/50 shadow-lg '
                        />
                    </div>


                    <div className='text-black '>
                        <div className='flex gap-2'>
                            <div className='text-6xl uppercase text-danger'>Fruta </div>
                            <div className=' font-bold text-6xl uppercase'>Fresa</div>
                        </div>
                        <div>
                            <div className='max-w-[350px] text-small font-[helvetica]'>Lorem ipsum dolor sit - Amet consectetur adipiscing: elit, quisque faucibus, ex, sapien, vitae</div>
                        </div>

                        <div className='border border-black p-1 mt-2'>
                            <div className='font-semibold'>Lorem ipsum</div>
                            <div className=''>Quisque faucibus</div>
                            <div className=''>In id cursus mi pretium</div>

                            <div className='grid grid-cols-5 border-y-2 border-black '>
                                <div className='col-span-3'></div>
                                <div className='text-center'>Elit</div>
                                <div className='text-center'>Vitae</div>
                            </div>

                            <div className='grid grid-cols-5 border-y border-black py-1'>
                                <div className='col-span-3'>Lorem ipsum dolor</div>
                                <div className='text-center'>-</div>
                                <div className='text-center'>-</div>
                            </div>

                            <div className='grid grid-cols-5 border-b border-black py-1'>
                                <div className='col-span-3'>Lorem ipsum dolor</div>
                                <div className='text-center'>-</div>
                                <div className='text-center'>-</div>

                                <div className='col-span-3'>Lorem ipsum dolor</div>
                                <div className='text-center'>-</div>
                                <div className='text-center'>-</div>
                            </div>

                            <div className='border-t border-black py-1'>
                                Tempus leo eu aenean sed
                            </div>

                            <div className=''></div>
                        </div>

                        <div className='text-neutral-500 text-xs'>Lorem ipsum dolor sit amet consectetur</div>

                    </div>

                </div> */}




                {/* <div className='border bg-gradient-to-r from-slate-500/50 to-white/60 rounded-xl flex items-center p-6 mx-28'>
                    <div className=''>

                        <div className='flex'>
                            <div>
                                <div className='text-neutral-500 pt-1'>dd/mm/aaa</div>
                                <div className='text-2xl italic'>Lorem Ipsum dolor </div>
                                <div className='font-[cursive] font-bold text-6xl pb-4 pt-2 ps-4'>Cereza</div>
                                <div className='max-w-[350px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.</div>
                            </div>


                            <div className='relative pt-14 px-12  '>
                                <Image
                                    src={cereza}
                                    className='max-w-[200px] bg-gradient-to-b from-warning to-danger shadow-lg shadow-purple-600'
                                />
                                <span className='bg-gradient-to-b from-success to-green-600 rounded-full center items-center py-4 px-3 absolute z-10 top-2 right-2 shadow'>
                                    <div className='text-blue-900 italic text-small'>10% off</div>
                                    <div className='text-3xl'>$89,99</div>
                                    <div className=' text-small line-through'>$99,99</div>
                                </span>
                            </div>
                        </div>

                        <Divider className='my-6 bg-lime-500/40' />

                        <div className='center gap-2 '>
                            {[...Array(4)].map((e, i) =>
                                <div key={i} className='grid grid-cols-12  '>
                                    <div className=' col-span-3 font-bold bg-lime-400/90 rounded-s-xl border p-1 ps-2'>Lorem Ipsum</div>
                                    <div className=' col-span-9 border border-s-0 p-1 px-2 rounded-e-xl'>Lorem ipsum dolor sit amet consectetur adipiscing elit</div>
                                </div>
                            )}
                        </div>
                    </div>

                </div> */}




            </div >
        </main >
    );
}

export default Test;
