import React from 'react';

import { Image } from "@nextui-org/react";


function CardModel1({ img, img_alt, title, content }) {

    return (
        <div className='mx-4 max-w-[800px] flex flex-col sm:flex-row gap-4 items-center'>
            <Image
                src={img}
                alt={img_alt}
                className='w-full'
                width={300}
                classNames={{
                    wrapper: 'flex items-center'
                }}
            />

            <div>
                <div className='text-bolder text-2xl'>
                    {title}
                </div>
                <div className='ms-6'>{content}</div>
            </div>
        </div>
    );
}

export default CardModel1;
