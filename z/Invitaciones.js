import React from 'react';
import './test.css'
// import { useOutletContext } from 'react-router-dom';

// import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
// import { Card, CardHeader, CardFooter, CardBody } from "@nextui-org/react";

import noche from '../../assets/imgs/noche.jpg'
// import img_test from '../../assets/imgs/test/test.jpg'

// import calabaza from '../../assets/imgs/test/calabaza.png'
// import cereza from '../../assets/imgs/test/cereza.png'
// import fresa from '../../assets/imgs/test/fresa.png'

// import cel from '../../assets/imgs/test/cel.png'
// import tab from '../../assets/imgs/test/tab.png'
// import net from '../../assets/imgs/test/net.png'
// import pc from '../../assets/imgs/test/pc.png'

// import paleta1 from '../../assets/imgs/test/paleta1.jfif'
// import paleta2 from '../../assets/imgs/test/paleta2.jfif'

// import { GiPartyPopper } from "react-icons/gi";
import { GiFlowerTwirl } from "react-icons/gi";
import { TiBell } from "react-icons/ti";

import borde from '../../assets/imgs/test/borde.png'



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
                className={
                    'center items-center gap-8 py-8'
                    + ' bg-gradient-to-b from-slate-500/50 to-background backdrop-blur-sm'
                }
            >

                {/* <div className={context.titleClass}>Test</div> */}

                {/* <div className='grid grid-cols-2 gap-4 items-end'>
                    {[tab, pc, cel, net].map((e, i) =>
                        <div className='flex justify-center'>
                            <Image
                                key={i}
                                src={e}
                            />
                        </div>
                    )}
                </div> */}

                {/* <div className='flex gap-2 p-8'>
                    {[paleta1,paleta2].map((e, i) =>
                            <Image
                                key={i}
                                src={e}
                                className=' w-[300px] h-[400px]'
                            />
                    )}
                </div> */}

                {/* <div className='bg-content2 p-2 font-[champagne_limousines] w-[400px]'>
                    <div className='border-x-2 border-warning p-2'>
                        <div className='border-x-2 border-warning px-8 py-4 flex flex-col items-center'>
                            <div className='uppercase '>invitacion 2024</div>

                            <div className='text-warning  my-4'>
                                <GiPartyPopper size={150} />
                            </div>

                            <div className='uppercase text-center flex flex-col'>
                                <span>te invitamos a pasar</span>
                                <span>esta celebracion con nosotros</span>
                            </div>


                            <div className='flex flex-col items-center text-8xl my-2 font-["campana_script"]'>
                                <span>Nuestro</span>
                                <span className='text-warning'>Evento</span>
                            </div>

                            <div className='grid grid-cols-3 text-xl text-warning  text-center items-center'>
                                <span>DIA</span>
                                <span className='border-x border-warning flex flex-col'>
                                    <span>MES</span>
                                    <span>XX</span>
                                </span>
                                <span className='px-2'>0:00 PM</span>
                            </div>

                            <div className='uppercase text-center mt-2 '>
                                lugar, direccion, ciudad, CP 0000
                            </div>
                            <div className='uppercase text-center'>
                                +00 000 000 0000
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className='w-[600px] h-[800px] bg-gradient-to-b from-primary to-secondary relative rounded-lg p-1 font-[comfortaa] text-secondary-200'>
                    <div className='absolute h-full w-full flex flex-col justify-between opacity-50 text-warning'>
                        <GiFlowerTwirl size={200} />

                        <div className='flex justify-end w-full'>
                            <GiFlowerTwirl size={250} />
                        </div>
                    </div>

                    <div
                        className='h-full w-full bg-no-repeat bg-contain bg-center bg-local relative center items-center'
                        style={{ backgroundImage: `url(${borde})` }}
                    >

                        {/* <div className='flex gap-4 items-center text-xl  '>
                            <TiBell size={50} className='rotate-[30deg]' />
                            Te invito a mi evento
                            <TiBell size={50} className='rotate-[-30deg]' />
                        </div> */}
                        <div className='text-2xl uppercase font-bold italic'>
                            Te invitamos
                        </div>

                        <div className='text-7xl font-[calinastiya] text-center my-6 text-purple-200 flex flex-col'  >
                            {/* Nombre & Nombre */}
                            <span>Mi Nombre</span>
                            <span>&</span>
                            <span>Tu Nombre</span>
                        </div>

                        <Divider className='w-1/2 mb-4' />

                        <div className='flex gap-4 items-center text-xl uppercase text-2xl font-bold italic '>
                            <TiBell size={50} className='rotate-[30deg]' />
                            A Nuestra Boda
                            <TiBell size={50} className='rotate-[-30deg]' />
                        </div>

                        {/* <div className='uppercase text-2xl font-bold italic'>
                            Nuestra Boda
                        </div> */}


                        <div className='center items-center mt-8'>
                            <span>NN de Mes de AAAA</span>
                            <span>Lugar | Hora</span>
                            <span>Direccion</span>
                        </div>

                        <div className='max-w-[60%] text-center mt-8'>
                            Confirmar Asistencia Email@Ejemplo.com | 000 000 0000
                        </div>
                    </div>
                </div>

            </div >
        </main >
    );
}

export default Test;
