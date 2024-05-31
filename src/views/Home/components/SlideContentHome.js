
import { Button, Image } from "@nextui-org/react";


function SlideContentHome({ langText, id, ...props }) {

    return (
        <div
            className={
                'bg-gradient-to-br dark:bg-gradient-to-tl p-4 sm:p-6  flex justify-center !h-full '
                + (props.bg && props.bg)
            }
        >
            <div className="max-w-[900px] flex justify-evenly items-center gap-2 max-sm:flex-col ">
                <div className=' flex flex-col items-center sm:w-2/3 gap-4'>
                    <h1 className='text-3xl flex flex-wrap justify-center gap-2 uppercase text-white'>
                        <p className='p-2 max-sm:break-all'>
                            {langText.slides[id].title}
                        </p>

                        <span className={'bg-background p-2 rounded-md font-bold transition ' + props?.span_text_class}>
                            {langText.slides[id].title_span}
                        </span>

                    </h1>

                    <p className='text-center text-white'>
                        {langText.slides[id].desc}
                    </p>

                    {props.icons && (
                        <div className='flex items-center gap-4 my-2 h-[48px]'>
                            {props.icons.map((icon, i) =>
                                <Image
                                    key={'icon_' + i}
                                    alt={langText.icon_of + langText.slides[id].title}
                                    src={icon}
                                    removeWrapper
                                    className='h-full '
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

                <div className='sm:w-1/3 flex items-center flex-col'>
                    <Image
                        src={props.img}
                        alt={langText.img_of + langText.slides[id].title}
                        className=' object-contain'
                    />
                </div>
            </div>

        </div>
    );
}

export default SlideContentHome;
