
import addLangText from '../../../lang/Home/components/CardHome.json'
import { useOutletContext } from 'react-router-dom';


import { Image } from "@nextui-org/react";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";


function CardHome(props) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang],
        iconOf: context.langText[context.lang].iconOf,
        imgOf: context.langText[context.lang].imgOf,
    }

    return (
        <Card isFooterBlurred className="w-full h-[300px] max-xs:rounded-none max-w-[600px] ">
            <CardHeader className="absolute z-10 top-0 flex-col items-start card-header rounded-none bg-gradient-to-r from-slate-500/80 to-slate-500/10 ">
                <p className="text-tiny text-neutral-300 opacity-100 uppercase font-bold">
                    {props.subtitle}
                </p>
                <h4 className="text-white/90 font-semibold text-4xl italic">
                    {props.title}
                </h4>
            </CardHeader>

            <Image
                removeWrapper
                alt={langText.imgOf + props.title}
                className="z-0 w-full h-full object-cover max-[360px]:rounded-none"
                src={props.img}
            />

            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 max-[360px]:rounded-none">
                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                        <p className="text-tiny text-white/60">{props.footer_text}</p>
                        <p className="text-tiny text-white/60">{props.footer_subtext}</p>
                    </div>
                </div>
                <Button color='warning' variant='ghost' radius="full" size="sm" className='hover:!text-white' onClick={() => props.onExlore(props.navigate)}>{langText.explore}</Button>
            </CardFooter>
        </Card>
    );
}

export default CardHome;
