import React from 'react';

import { Card, CardHeader, Image } from "@nextui-org/react";


function CardModel7({ img, img_alt, title, subtext }) {

    return (
        <Card className="h-[300px] max-[360px]:rounded-none">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{subtext}</p>
                <h4 className="text-white font-medium text-large">{title}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt={img_alt}
                src={img}
                className="z-0 w-full h-full object-cover max-[360px]:rounded-none"
            />
        </Card>
    );
}

export default CardModel7;
