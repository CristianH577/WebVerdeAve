import React from 'react';

import { Image } from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";


function BannerCard(props) {

    return (
        <Card
            className='bg-no-repeat bg-cover bg-center max-w-[600px] max-xs:rounded-none w-full'
            style={{ backgroundImage: `url(${props.bg_image})` }}
        >
            <div className='bg-slate-800/50 min-h-[300px] flex flex-col items-center'>
                <CardHeader className={'text-5xl text-center sm:rounded-lg  justify-center italic drop-shadow-lg font-[fantasy]  max-xs:rounded-none bg-gradient-to-b ' + props.bg_gradient}>
                    {props.title}
                </CardHeader>

                <CardBody className='xs:flex-row justify-evenly items-center gap-8  p-10'>
                    {props.logos.map((f, k) =>
                        <Image
                            key={k}
                            src={f}
                            style={{
                                maxWidth: (360 / props.logos.length) + 'px'
                            }}
                        />
                    )}
                </CardBody>
            </div>
        </Card>
    );
}

export default BannerCard;
