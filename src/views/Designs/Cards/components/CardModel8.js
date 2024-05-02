

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";


function CardModel8({ img, img_alt, title, count, setCount }) {

    return (
        <Card shadow="sm" isPressable onPress={() => setCount(count + 1)}>
            <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={img_alt}
                    src={img}
                    className="w-full object-cover h-[140px]"
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
                <b>{title}</b>
                <p className="text-default-500 ms-2">{count}</p>
            </CardFooter>
        </Card>
    );
}

export default CardModel8;
