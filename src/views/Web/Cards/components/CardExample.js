
import { useEffect, useState } from 'react';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Skeleton, } from '@nextui-org/react';
import ave from '../../../../assets/imgs/cards/ave.webp'

import { LoremIpsum } from 'react-lorem-ipsum';

import { PiArrowUpFill, PiArrowLeftFill, PiArrowRightFill } from "react-icons/pi";

function CardExample() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <section className='flex flex-col items-center gap-4 lg:flex-row w-full'>
            {/* diseño */}
            <Card shadow="sm" className='space-y-2 overflow-visible bg-content1 xs:w-[250px] w-full max-xs:rounded-none shadow-lg hover:shadow-warning focus:shadow-success min-[500px]:mt-12 min-[500px]:mx-24' >
                <CardHeader className=" p-0 relative flex flex-col items-center">
                    <Skeleton
                        className='xs:max-w-[250px] w-full h-[100vw] xs:h-[250px] xs:rounded-lg shadow-sm'
                        hidden={!isLoading}
                    />
                    <Image
                        shadow="sm"
                        width="100%"
                        className=" object-cover bg-content3 max-xs:rounded-none"
                        classNames={{
                            zoomedWrapper: 'max-xs:rounded-none'
                        }}
                        alt={"imagen de encabezado"}
                        src={ave}
                        isZoomed
                        hidden={isLoading}
                    />

                    <div className='absolute z-10 -top-12 flex flex-col items-center max-[500px]:hidden' hidden={isLoading}>
                        <p className='text-lg'>Encabezado</p>
                        <PiArrowUpFill size={32} className='text-success-400 animate-shakeYTop' />
                    </div>
                </CardHeader>

                <CardBody className="space-y-2 overflow-visible relative flex justify-center">
                    <div className="space-y-2" hidden={!isLoading}>
                        <Skeleton className='w-1/2 h-unit-xl rounded-lg' />
                        <Skeleton className='w-1/3 h-unit-lg rounded-lg' />
                        <Skeleton className='w-full h-unit-24 rounded-lg' />
                    </div>

                    <div className="space-y-2" hidden={isLoading}>
                        <div>
                            <h1 className='text-3xl text-success' >Titulo</h1>
                            <h2 className='text-lg text-neutral-400'>Subitulo</h2>
                        </div>

                        <div className='text-medium line-clamp-4 overflow-hidden hover:overflow-y-scroll'>
                            <LoremIpsum avgSentencesPerParagraph={4} random={false} />
                        </div>
                    </div>

                    <div className='absolute z-10 right-[95%] flex items-center max-[500px]:hidden' hidden={isLoading}>
                        <p className='pe-3 text-lg'>Cuerpo</p>
                        <PiArrowLeftFill size={32} className='text-success-400 animate-shakeXLeft' />
                    </div>
                </CardBody>

                <Divider className='w-2/3 self-center ' />

                <CardFooter className="justify-center overflow-visible relative">
                    <div className='text-small flex justify-between w-full items-center'>
                        <Skeleton
                            className='w-1/3 h-unit-md rounded-lg shadow-sm'
                            hidden={!isLoading}
                        />
                        <p className="text-default-500" hidden={isLoading}>Adicional</p>

                        <Button
                            className='bg-success-200'
                            onPress={() => {
                                setIsLoading(true)
                                setTimeout(() => setIsLoading(false), 1000);
                            }}
                            isLoading={isLoading}
                        >
                            Cargar
                        </Button>
                    </div>

                    <div className='absolute z-10 left-[95%] flex items-center max-[500px]:hidden' hidden={isLoading}>
                        <PiArrowRightFill size={32} className='text-success-400 animate-shakeXRight' />
                        <p className='ps-3 text-lg'>Pie</p>
                    </div>
                </CardFooter>
            </Card>

            <Divider className='w-2/3 lg:hidden mt-8' />
            <Divider orientation='vertical' className='h-96 hidden lg:block' />

            {/* caracteristicas */}
            <article className='flex flex-col gap-4 p-2 lg:gap-8'>
                <ol className='list-disc ms-6'>
                    <b>Caracteristicas</b>
                    <li>Diseño responsive</li>
                    <li>Espaciado del contenido</li>
                    <li>Secciones marcadas</li>
                    <li>Esqueleto de cargado</li>
                    <li>Resaltado de interaccion</li>
                </ol>

                <div className='gap-4 grid sm:grid-cols-3 lg:flex justify-between'>
                    <ol className='list-disc ms-6'>
                        <b>Encabezado</b>
                        <li>Imagen optimizada</li>
                        <li>Imagen escalable</li>
                    </ol>

                    <ol className='list-disc ms-6'>
                        <b>Cuerpo</b>
                        <li>Tamaño de texto optimo</li>
                        <li>Resaltado por importancia</li>
                        <li>Texto recortado para mantener forma</li>
                    </ol>

                    <ol className='list-disc ms-6'>
                        <b>Pie</b>
                        <li>Contenido adicional util</li>
                        <li>Nexo a otra contenido o presentacion</li>
                    </ol>
                </div>
            </article>
        </section>
    );
}

export default CardExample;
