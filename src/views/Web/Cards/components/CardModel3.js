

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

function CardModel3({ img, img_alt, title_card, subtext, title_img }) {

    return (
        <Card className="max-xs:w-full py-4 max-[360px]:rounded-none " >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{title_card}</p>
                <small className="text-default-500">{subtext}</small>
                <h4 className="font-bold text-large">{title_img}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-center">
                <Image
                    alt={img_alt}
                    className="object-cover rounded-xl"
                    src={img}
                    width={270}
                />
            </CardBody>
        </Card>
    );
}

export default CardModel3;
