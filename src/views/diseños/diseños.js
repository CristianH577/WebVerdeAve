import React from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

import { Image, Tooltip } from "@nextui-org/react";

import galerias from '../../assets/imgs/diseños/articulos.svg'
import cartas from '../../assets/imgs/diseños/cartas.svg'
import forms from '../../assets/imgs/diseños/forms.svg'
import sliders from '../../assets/imgs/diseños/sliders.svg'
import showroom from '../../assets/imgs/diseños/showroom.svg'
import tablas from '../../assets/imgs/diseños/tablas.svg'
import mapas from '../../assets/imgs/diseños/mapas.svg'


function Diseños() {
    const context = useOutletContext()
    const dark = context.dark
    const langText = {
        ...context.langText[context.lang],
    }


    const navigate = useNavigate()

    const articles = [
        {
            key: 'cartas',
            img: cartas,
            navigate: 'cartas',
        },
        {
            key: 'galerias',
            img: galerias,
            navigate: 'galerias',
        },
        {
            key: 'forms',
            img: forms,
            navigate: 'formularios',
        },
        {
            key: 'sliders',
            img: sliders,
            navigate: 'presentaciones',
        },
        {
            key: 'showroom',
            img: showroom,
            navigate: 'showroom',
        },
        {
            key: 'tables',
            img: tablas,
            navigate: 'tablas',
        },
        {
            key: 'maps',
            img: mapas,
            navigate: 'mapas',
        },
    ]


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.designs}</div>

            <section className='flex w-full flex-wrap justify-around gap-8 mt-4'>
                {articles.map(art =>
                    <Tooltip
                        key={art.key}
                        content={
                            <div className='font-semibold text-2xl capitalize'>
                                {langText[art.key]}
                            </div>
                        }
                        offset={-20}
                        className={dark ? 'bg-slate-800 text-white' : ''}
                    >
                        <Image
                            width="100%"
                            alt={langText.imgOf + langText[art.key]}
                            src={art.img}
                            className=" h-[200px] cursor-pointer hover:scale-75"
                            onClick={() => navigate(art.navigate)}
                        />
                    </Tooltip>
                )}
            </section>

        </main>
    );
}

export default Diseños;
