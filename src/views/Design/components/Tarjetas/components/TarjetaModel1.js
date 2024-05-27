
import { GiPartyPopper } from "react-icons/gi";


function TarjetaModel1() {

    return (
        <div className='bg-gradient-to-b from-content2 to-content1 p-2 font-[champagne_limousines] w-full max-w-[400px] h-fit'>
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
        </div>
    );
}

export default TarjetaModel1;
