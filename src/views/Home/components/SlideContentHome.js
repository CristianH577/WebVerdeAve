
import addLangText from '../../../lang/Home/components/SlideContentHome.json'
import { useOutletContext } from "react-router-dom";

import { Button, Image } from "@nextui-org/react";


function SlideContentHome(props) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang],
        iconOf: context.langText[context.lang].iconOf,
        imgOf: context.langText[context.lang].imgOf,
    }

    return (
        <div
            className={
                'bg-gradient-to-br dark:bg-gradient-to-tl py-4 sm:py-6 px-4 sm:h-[300px] flex justify-center h-full '
                + (props.bg && props.bg)
            }
        >
            <div className=" max-w-[900px] flex justify-center items-center gap-2 max-[450px]:flex-col ">
                <div className='flex flex-col items-center justify-around h-full mix-[450px]:w-1/2 sm:w-2/3 gap-2'>
                    <h1 className='text-3xl flex flex-wrap justify-center gap-2 uppercase text-white'>
                        {props.title && (
                            <p className='p-2 max-[450px]:break-all'>
                                {props.title}
                            </p>
                        )}

                        {props.title_span && (
                            <span className={'bg-background p-2 rounded-md font-bold transition ' + (props.span_text_class && props.span_text_class)}>
                                {props.title_span}
                            </span>
                        )}

                    </h1>

                    <p className='text-center text-white'>
                        {props.desc}
                    </p>

                    {props.icons && (
                        <div className='flex items-center gap-4 my-2 h-8'>
                            {props.icons.map((icon, i) =>
                                <Image
                                    key={'icon_' + i}
                                    alt={langText.iconOf + (props.title || props.span)}
                                    src={icon}
                                    removeWrapper
                                    className='h-full'
                                />
                            )}
                        </div>
                    )}

                    {props.link && (
                        <Button color={props.button_color} variant='shadow' size='sm' className='rounded-ss-none rounded-ee-none text-white hover:rounded-ss-lg hover:rounded-ee-lg hover:rounded-se-none hover:rounded-es-none' onClick={() => props.onMore(props.link)}>
                            {langText.more}
                        </Button>
                    )}
                </div>

                <div className='mix-[450px]:w-1/2 sm:w-1/3 flex items-center flex-col'>
                    <Image
                        src={props.img}
                        alt={langText.imgOf + (props.title || props.span)}
                    />
                </div>
            </div>

        </div>
    );
}

export default SlideContentHome;
