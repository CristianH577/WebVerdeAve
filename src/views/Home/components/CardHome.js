
import addLangText from '../../../lang/Home/components/CardHome.json'
import { useOutletContext } from 'react-router-dom';


import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";



function CardHome({ onExlore, ...props }) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang],
        iconOf: context.langText[context.lang].iconOf,
        imgOf: context.langText[context.lang].imgOf,
    }

    const is_even = (props.i || props.i === 0) && props.i % 2 === 0

    const contextImg = require.context('../../../assets/imgs/home/cards', true)

    const lg = contextImg(`./${props.id}-lg.webp`) || null
    const img = contextImg(`./${props.id}.webp`) || null


    return (
        <article
            className={'flex flex-col-reverse w-full px-2  gap-8 justify-center items-center ' + (is_even ? 'sm:flex-row-reverse' : 'sm:flex-row')}
            data-aos={is_even ? "fade-right" : "fade-left"}
        >
            <Image
                alt={langText.imgOf + props.title}
                removeWrapper
                className='object-cover h-[100vw] sm:w-1/2 sm:h-[25vw] max-h-[300px]'
                src={lg}
                srcSet={`${lg} 1024w , ${img} 1280w `}
                sizes="(max-width: 1024px) 1024px, 1280px"
            />

            <div className='w-full sm:w-1/2 flex sm:items-center '>
                <div className={'space-y-4 text-balance w-full ' + (is_even && 'text-end')}>
                    <div>
                        <h1 className='font-bold text-5xl'>{props.title}</h1>
                        <h2 className='text-neutral-800 dark:text-neutral-400 text-3xl'>{props.subtitle}</h2>
                    </div>

                    <p className=' break-'>
                        {props.desc}
                    </p>

                    <Button
                        className='bg-foreground text-background font-semibold hover:scale-105'
                        onPress={() => {
                            onExlore && onExlore(props.link)
                            window.window.scroll(0, 0)
                        }}
                    >
                        {langText.explore}
                    </Button>
                </div>
            </div>
        </article>

    );
}

export default CardHome;
