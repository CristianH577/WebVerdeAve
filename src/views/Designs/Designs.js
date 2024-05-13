
import { useNavigate, useOutletContext } from "react-router-dom";

import { Image, Tooltip } from "@nextui-org/react";

import galeries from '../../assets/imgs/designs/articles.svg'
import cards from '../../assets/imgs/designs/cards.svg'
import forms from '../../assets/imgs/designs/forms.svg'
import sliders from '../../assets/imgs/designs/sliders.svg'
import showroom from '../../assets/imgs/designs/showroom.svg'
import tables from '../../assets/imgs/designs/tables.svg'
import mapas from '../../assets/imgs/designs/maps.svg'
import more from '../../assets/imgs/designs/more.svg'


function Diseños() {
    const context = useOutletContext()
    const dark = context.dark
    const langText = {
        ...context.langText[context.lang],
    }

    const navigate = useNavigate()

    const articles = [
        {
            key: 'cards',
            img: cards,
        },
        {
            key: 'galeries',
            img: galeries,
        },
        {
            key: 'forms',
            img: forms,
        },
        {
            key: 'sliders',
            img: sliders,
        },
        {
            key: 'showroom',
            img: showroom,
        },
        {
            key: 'tables',
            img: tables,
        },
        {
            key: 'maps',
            img: mapas,
        },
        {
            key: 'more',
            img: more,
        },
    ]


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.designs}
            </div>

            <section className='flex w-full flex-wrap justify-around gap-8 mt-4'>
                {articles.map(art =>
                    <Tooltip
                        key={art.key}
                        content={
                            <div className='font-semibold text-2xl capitalize'>
                                {langText.sections_titles[art.key]}
                            </div>
                        }
                        offset={-20}
                        className={dark ? 'bg-slate-800 text-white' : ''}
                    >
                        <Image
                            width="100%"
                            alt={langText.imgOf + langText.sections_titles[art.key]}
                            src={art.img}
                            className=" h-[200px] cursor-pointer hover:scale-75"
                            onClick={() => {
                                navigate(art.key)
                                window.scroll(0,0)
                            }}
                        />
                    </Tooltip>
                )}
            </section>

        </main>
    );
}

export default Diseños;
