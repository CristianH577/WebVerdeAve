import React from 'react';

import { Card, CardHeader, CardBody, CardFooter, Button, Avatar } from "@nextui-org/react";

function CardModel3({ img, title, subtext, isActive, setisActive, button_text_active, button_text_inactive, content, text1, text2 }) {

    return (
        <Card className="max-w-[340px] max-[360px]:rounded-none">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src={img} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{title}</h4>
                        <h5 className="text-small tracking-tight text-default-400">@{subtext}</h5>
                    </div>
                </div>
                <Button
                    color={isActive ? "primary" : "default"}
                    radius="full"
                    size="sm"
                    variant={isActive ? "solid" : "bordered"}
                    onPress={() => setisActive(!isActive)}
                >
                    {isActive ? button_text_active : button_text_inactive}
                </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                {content}
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
                    <p className=" text-default-400 text-small">{text1}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">NNN</p>
                    <p className="text-default-400 text-small">{text2}</p>
                </div>
            </CardFooter>
        </Card>
    );
}

export default CardModel3;
