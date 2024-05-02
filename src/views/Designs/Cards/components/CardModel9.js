

import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";


function CardModel9({ img, img_alt, title, subtext, button_title, sub_img_alt, sub_img, footer_title, footer_text }) {

    return (
        <Card isFooterBlurred className="max-h-[500px] max-w-[500px] max-[360px]:rounded-none">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{subtext}</p>
                <h4 className="text-white/90 font-medium text-xl">{title}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt={img_alt}
                src={img}
                className="z-0 w-full h-full object-cover max-[360px]:rounded-none"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 max-[360px]:rounded-none">
                <div className="flex flex-grow gap-2 items-center">
                    <Image
                        alt={sub_img_alt}
                        src={sub_img}
                        className="rounded-full w-10 h-11 bg-black"
                    />
                    <div className="flex flex-col">
                        <p className="text-tiny text-white/60">{footer_title}</p>
                        <p className="text-tiny text-white/60">{footer_text}</p>
                    </div>
                </div>
                <Button radius="full" size="sm">{button_title}</Button>
            </CardFooter>
        </Card>
    );
}

export default CardModel9;
