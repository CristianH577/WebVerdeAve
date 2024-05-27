

import { Divider } from "@nextui-org/react";

import { GiFlowerTwirl } from "react-icons/gi";
import { TiBell } from "react-icons/ti";

import borde from '../../../../../assets/imgs/design/tarjetas/borde.png'


function TarjetaModel2() {

    return (
        <div className='w-full max-w-[600px] h-[800px] bg-gradient-to-b from-primary to-secondary relative rounded-lg p-1 font-[comfortaa] text-secondary-200'>
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
                <div className='text-2xl uppercase font-bold italic'>
                    Te invitamos
                </div>

                <div className='text-7xl font-[calinastiya] text-center my-6 text-purple-200 flex flex-col'  >
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
    );
}

export default TarjetaModel2;
