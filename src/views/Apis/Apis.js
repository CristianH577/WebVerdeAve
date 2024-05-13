
import { useNavigate, useOutletContext } from "react-router-dom";

import { Image, Tooltip } from "@nextui-org/react";

import analyze from '../../assets/imgs/apis/analyze.png'
import databases from '../../assets/imgs/apis/databases.png'
import game from '../../assets/imgs/apis/game.png'

function APIs() {
    const context = useOutletContext()
    const dark = context.dark
    const langText = {
        ...context.langText[context.lang],
    }

    const navigate = useNavigate()

    const articles = [
        {
            key: 'databases',
            img: databases,
        },
        {
            key: 'analyze',
            img: analyze,
        },
        {
            key: 'game',
            img: game,
        },
    ]


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>APIs</div>

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
                                window.scroll(0, 0)
                            }}
                        />
                    </Tooltip>
                )}
            </section>


        </main>
    );
}

export default APIs;
