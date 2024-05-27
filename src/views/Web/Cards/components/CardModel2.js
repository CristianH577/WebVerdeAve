

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";


function CardModel2({ img, img_alt, title, subtext, content }) {

    return (
        <Card className="max-w-[400px] max-[360px]:rounded-none">
            <CardHeader className="flex gap-3">
                <Image
                    alt={img_alt}
                    src={img}
                    radius="sm"
                    width={50}
                />
                <div className="flex flex-col">
                    <p className="text-md">{title}</p>
                    <p className="text-small text-default-500">{subtext}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                {content}
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
    );
}

export default CardModel2;
