import React from 'react';

import { Card, CardFooter, Image, Button } from "@nextui-org/react";


function CardModel4({ img, img_alt, button_title, text }) {

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none bg-transparent max-w-[400px]"
        >
            <Image
                alt={img_alt}
                className="object-cover"
                src={img}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{text}</p>
                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                    {button_title}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CardModel4;
