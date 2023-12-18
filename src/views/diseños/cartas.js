import React, { useState } from 'react';
import addLangText from '../../lang/diseños/cards.json'
import { useOutletContext } from 'react-router-dom';

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";

import { LoremIpsum } from 'react-lorem-ipsum';

import { Bookmark, Circle1, Circle2, Circle3 } from '../../assets/icons.js';
import img_ejemplo from '../../assets/imgs/cartas-ejemplo.jpg';


function Cartas() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const [isActive, setisActive] = useState(false)
    const [marked, setmarked] = useState(false)
    const [count, setCount] = useState(0)

    const icons = {
        bookmark: <Bookmark className={marked ? "[&>path]:stroke-primary" : "stroke-foreground"} fill={marked ? "currentColor" : "primary"} />,
        circle1: <Circle1 size={54} />,
        circle2: <Circle2 size={36} />,
        circle3: <Circle3 className="text-foreground/80" size={22} />,
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.cartas}</div>
            

            <div className='mx-4 max-w-[800px] flex flex-col sm:flex-row gap-4 items-center'>
                <Image
                    src={img_ejemplo}
                    alt={langText.card.imgExample}
                    className='w-full'
                    width={300}
                    classNames={{
                        wrapper: 'flex items-center'
                    }}
                />

                <div>
                    <div className='text-bolder text-2xl'>{langText.card.title}</div>
                    <div className='ms-6'><LoremIpsum random={false} /></div>
                </div>
            </div>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card className="max-w-[400px] max-[360px]:rounded-none">
                <CardHeader className="flex gap-3">
                    <Image
                        alt={langText.card.imgExample}
                        src={img_ejemplo}
                        height={40}
                        radius="sm"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">{langText.card.title}</p>
                        <p className="text-small text-default-500">{langText.card.subtext}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <LoremIpsum random={false} />
                </CardBody>
                <Divider />
                <CardFooter className='justify-end'>
                    <Link
                        isExternal
                        showAnchorIcon
                    >
                        Link
                    </Link>
                </CardFooter>
            </Card>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card className="py-4 max-[360px]:rounded-none carta" >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{langText.card.title}</p>
                    <small className="text-default-500">{langText.card.subtext}</small>
                    <h4 className="font-bold text-large">{langText.card.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt={langText.card.imgExample}
                        className="object-cover rounded-xl"
                        src={img_ejemplo}
                        width={270}
                    />
                </CardBody>
            </Card>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card
                isFooterBlurred
                radius="lg"
                className="border-none bg-transparent max-w-[400px]"
            >
                <Image
                    alt={langText.card.imgExample}
                    className="object-cover"
                    src={img_ejemplo}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-white/80">Lorem Ipsum</p>
                    <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                        {langText.actions.action}
                    </Button>
                </CardFooter>
            </Card>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card className="max-w-[340px] max-[360px]:rounded-none">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src={img_ejemplo} />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{langText.card.title}</h4>
                            <h5 className="text-small tracking-tight text-default-400">@{langText.card.subtext}</h5>
                        </div>
                    </div>
                    <Button
                        className={isActive ? "bg-transparent text-foreground border-default-200" : ""}
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isActive ? "bordered" : "solid"}
                        onPress={() => setisActive(!isActive)}
                    >
                        {isActive ? langText.inactive : langText.active}
                    </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <LoremIpsum random={false} />
                    <span className="pt-2">
                        #loremipsum
                        <span className="py-2" aria-label="computer" role="img">
                            💻
                        </span>
                    </span>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">N</p>
                        <p className=" text-default-400 text-small">{langText.card.label}</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">NNN</p>
                        <p className="text-default-400 text-small">{langText.card.label}</p>
                    </div>
                </CardFooter>
            </Card>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[600px] max-[360px]:rounded-none"
                shadow="sm"
            >
                <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                        <div className="relative col-span-6 md:col-span-4">
                            <Image
                                alt={langText.card.imgExample}
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src={img_ejemplo}
                                width="100%"
                            />
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-8">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                    <h3 className="font-semibold text-foreground/90">{langText.card.title}</h3>
                                    <p className="text-small text-foreground/80">{langText.card.subtext}</p>
                                    <h1 className="text-large font-medium mt-2">{langText.progress}</h1>
                                </div>
                                <Button
                                    isIconOnly
                                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                    radius="full"
                                    variant="light"
                                    onPress={() => setmarked((v) => !v)}
                                >
                                    {icons.bookmark}
                                </Button>
                            </div>

                            <div className="flex flex-col mt-3 gap-1">
                                <Progress
                                    aria-label={langText.progress}
                                    classNames={{
                                        indicator: "bg-default-800 dark:bg-white",
                                        track: "bg-default-500/30",
                                    }}
                                    color="default"
                                    size="sm"
                                    value={49}
                                />
                                <div className="flex justify-between">
                                    <p className="text-small">{langText.start}</p>
                                    <p className="text-small text-foreground/50">{langText.final}</p>
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-evenly">
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    {icons.circle3}
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    {icons.circle2}
                                </Button>
                                <Button
                                    isIconOnly
                                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    {icons.circle1}
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    {icons.circle2}
                                </Button>
                                <Button
                                    isIconOnly
                                    className="data-[hover]:bg-foreground/10"
                                    radius="full"
                                    variant="light"
                                >
                                    {icons.circle3}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card className="h-[300px] max-[360px]:rounded-none">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">{langText.card.subtext}</p>
                    <h4 className="text-white font-medium text-large">{langText.card.title}</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt={langText.card.imgExample}
                    src={img_ejemplo}
                    className="z-0 w-full h-full object-cover max-[360px]:rounded-none"
                />
            </Card>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card shadow="sm" isPressable onPress={() => setCount(count + 1)}>
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={langText.card.imgExample}
                        src={img_ejemplo}
                        className="w-full object-cover h-[140px]"
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>{langText.card.title}</b>
                    <p className="text-default-500 ms-2">{count}</p>
                </CardFooter>
            </Card>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Card isFooterBlurred className="max-h-[500px] max-w-[500px] max-[360px]:rounded-none">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">{langText.card.subtext}</p>
                    <h4 className="text-white/90 font-medium text-xl">{langText.card.title}</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt={langText.card.imgExample}
                    src={img_ejemplo}
                    className="z-0 w-full h-full object-cover max-[360px]:rounded-none"
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 max-[360px]:rounded-none">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt={langText.card.imgExample}
                            src={img_ejemplo}
                            className="rounded-full w-10 h-11 bg-black"
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Lorem Ipsum</p>
                            <p className="text-tiny text-white/60">Fusce eget accumsan venenatis gravida ultricies quam pharetra.</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm">{langText.actions.action}</Button>
                </CardFooter>
            </Card>

        </main>
    );
}

export default Cartas;
