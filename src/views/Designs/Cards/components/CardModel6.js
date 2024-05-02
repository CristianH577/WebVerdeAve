

import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";

import { FaRegBookmark } from "react-icons/fa";
import { Bs1Circle, Bs2Circle, Bs3Circle } from "react-icons/bs";



function CardModel2({ img, img_alt, title, subtext, title_progress, marked, setmarked, text_start, text_end }) {

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[600px] max-[360px]:rounded-none"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt={img_alt}
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src={img}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">{title}</h3>
                                <p className="text-small text-foreground/80">{subtext}</p>
                                <h1 className="text-large font-medium mt-2">{title_progress}</h1>
                            </div>
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                radius="full"
                                variant="light"
                                onPress={() => setmarked((v) => !v)}
                            >
                                <FaRegBookmark size={20} className={marked ? "text-primary" : "text-foreground"}  />
                            </Button>
                        </div>

                        <div className="flex flex-col mt-3 gap-1">
                            <Progress
                                aria-label={title_progress}
                                classNames={{
                                    indicator: "bg-default-800 dark:bg-white",
                                    track: "bg-default-500/30",
                                }}
                                color="default"
                                size="sm"
                                value={49}
                            />
                            <div className="flex justify-between">
                                <p className="text-small">{text_start}</p>
                                <p className="text-small text-foreground/50">{text_end}</p>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-evenly">
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <Bs3Circle className="text-foreground/80" size={22} />
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <Bs2Circle size={36} />
                            </Button>
                            <Button
                                isIconOnly
                                className="w-auto h-auto data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <Bs1Circle size={54} />
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <Bs2Circle size={36} />
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <Bs3Circle className="text-foreground/80" size={22} />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default CardModel2;
