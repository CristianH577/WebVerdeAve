
import { useEffect, useState } from 'react';
import addLangText from '../../../../lang/Web/Cards/CardExample.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Skeleton, } from '@nextui-org/react';
import { LoremIpsum } from 'react-lorem-ipsum';

import ave from '../../../../assets/imgs/cards/ave.webp'

import { PiArrowUpFill, PiArrowLeftFill, PiArrowRightFill } from "react-icons/pi";


function CardExample() {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang],
    }

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])


    return (
        <section className='flex flex-col justify-center items-center gap-4 lg:flex-row w-full'>

            {/* diseño */}
            <Card shadow="sm" className='space-y-2 overflow-visible bg-content1 xs:w-[250px] w-full max-xs:rounded-none shadow-lg hover:shadow-warning focus:shadow-success min-[500px]:mt-12 min-[500px]:mx-24' >
                <CardHeader className=" p-0 relative flex flex-col items-center">
                    <Skeleton
                        className='xs:max-w-[250px] w-full h-[100vw] xs:h-[250px] xs:rounded-lg shadow-sm'
                        hidden={!isLoading}
                    />
                    <Image
                        shadow="lg"
                        width="100%"
                        className=" object-cover bg-content3 max-xs:rounded-none"
                        classNames={{
                            zoomedWrapper: 'max-xs:rounded-none'
                        }}
                        alt={langText.img_alt}
                        src={ave}
                        isZoomed
                        hidden={isLoading}
                    />

                    <div className='absolute z-10 -top-12 flex flex-col items-center max-[500px]:hidden' hidden={isLoading}>
                        <p className='text-lg'>{langText.header_label}</p>
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
                            <h1 className='text-3xl text-success' >{langText.title}</h1>
                            <h2 className='text-lg text-neutral-400'>{langText.subtitle}</h2>
                        </div>

                        <div className='text-medium line-clamp-4 overflow-hidden hover:overflow-y-scroll'>
                            <LoremIpsum avgSentencesPerParagraph={4} random={false} />
                        </div>
                    </div>

                    <div className='absolute z-10 right-[95%] flex items-center max-[500px]:hidden' hidden={isLoading}>
                        <p className='pe-3 text-lg'>{langText.body_label}</p>
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
                        <p className="text-default-500" hidden={isLoading}>{langText.additional}</p>

                        <Button
                            className='bg-success-200'
                            onPress={() => {
                                setIsLoading(true)
                                setTimeout(() => setIsLoading(false), 1000);
                            }}
                            isLoading={isLoading}
                        >
                            {langText.load}
                        </Button>
                    </div>

                    <div className='absolute z-10 left-[95%] flex items-center max-[500px]:hidden' hidden={isLoading}>
                        <PiArrowRightFill size={32} className='text-success-400 animate-shakeXRight' />
                        <p className='ps-3 text-lg'>{langText.footer_label}</p>
                    </div>
                </CardFooter>
            </Card>

            <Divider className='w-2/3 lg:hidden mt-8' />
            <Divider orientation='vertical' className='h-96 hidden lg:block' />

            {/* caracteristicas */}
            <article className='flex flex-col gap-4 p-2 lg:gap-8'>
                <ol className='list-disc ms-6'>
                    <b>{langText.caract_label}</b>
                    {langText.caract_items.map((e, i) =>
                        <li key={i}>{e}</li>
                    )}
                </ol>

                <div className='gap-4 grid sm:grid-cols-3 lg:flex justify-between'>
                    <ol className='list-disc ms-6'>
                        <b>{langText.header_label}</b>
                        {langText.header_items.map((e, i) =>
                            <li key={i}>{e}</li>
                        )}
                    </ol>

                    <ol className='list-disc ms-6'>
                        <b>{langText.body_label}</b>
                        {langText.body_items.map((e, i) =>
                            <li key={i}>{e}</li>
                        )}
                    </ol>

                    <ol className='list-disc ms-6'>
                        <b>{langText.footer_label}</b>
                        {langText.footer_items.map((e, i) =>
                            <li key={i}>{e}</li>
                        )}
                    </ol>
                </div>
            </article>
        </section>
    );
}

export default CardExample;
