

import { Image } from "@nextui-org/react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";

import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";



function CatalogSlider() {
    const images200 = require.context('../../../../../assets/imgs/design/catalogos/CatalogSlider/200', true);
    const images = require.context('../../../../../assets/imgs/design/catalogos/CatalogSlider/full', true);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className='mt-6'>
            <Swiper
                modules={[Navigation, Pagination, Mousewheel]}
                spaceBetween={0}
                slidesPerView={1}

                loop={true}
                mousewheel={true}
                navigation={true}
                grabCursor={true}
                pagination={{
                    enabled: true,
                    type: 'fraction',
                }}

                className='w-full max-w-[300px] h-full xs:rounded-lg shadow-medium bg-content1 !pb-6'

            >
                {images200.keys().map((image, i) =>
                    <SwiperSlide key={i} className='py-4 !flex justify-center' >
                        <Image
                            shadow="sm"
                            radius="lg"
                            alt={"pag_" + (i + 1)}
                            src={images200(image)}
                            className="max-xs:rounded-none"
                        />
                    </SwiperSlide>
                )}
                <Button isIconOnly onPress={onOpen} className="absolute bottom-0 right-0 z-50 bg-transparent hover:scale-110">
                    <AiOutlineFullscreen size={25} />
                </Button>
            </Swiper>


            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    wrapper: 'items-center sm:!items-start',
                    closeButton: 'z-50'
                }}
            >
                <ModalContent className="w-full md:w-auto rounded-none max-sm:justify-center max-sm:m-0 sm:my-2">
                    {(onclose) => (<>
                        <Swiper
                            modules={[Navigation, Pagination, Mousewheel]}
                            spaceBetween={0}
                            slidesPerView={1}

                            loop={true}
                            mousewheel={true}
                            navigation={true}
                            grabCursor={true}
                            pagination={{
                                enabled: true,
                                type: 'fraction',
                            }}

                            className='w-full md:max-w-[800px] rounded-none shadow-medium bg-content1 !pb-12 !m-0'

                        >
                            {images.keys().map((image, i) =>
                                <SwiperSlide key={i} className='' >
                                    <Image
                                        shadow="sm"
                                        alt={"pag_" + (i + 1)}
                                        src={images(image)}
                                        removeWrapper
                                        className="rounded-none object-contain"
                                    />
                                </SwiperSlide>
                            )}

                            <Button isIconOnly onPress={onclose} className="absolute bottom-0 right-0 z-50 bg-transparent hover:scale-110">
                                <AiOutlineFullscreenExit size={25} />
                            </Button>
                        </Swiper>
                    </>)}
                </ModalContent>
            </Modal>
        </section>
    );
}

export default CatalogSlider;
