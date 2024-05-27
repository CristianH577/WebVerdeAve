import { Image } from "@nextui-org/react";



function Catalogos({ title_class }) {

    const contextCat = require.context('../../../assets/imgs/design/catalogos', true)

    const imgs = [
        'max-w-[700px]',
        'max-w-[600px]',
        'max-w-[800px]',
        'max-w-[850px]',
    ]


    return (
        <div >
            <h1 className={title_class}>Catalogos</h1>

            <div className='flex flex-wrap justify-center items-center gap-8'>
                {imgs.map((e, i) => {
                    const xs = null || contextCat(`./${i + 1}-xs.webp`)
                    const sm = null || contextCat(`./${i + 1}-sm.webp`)
                    const md = null || contextCat(`./${i + 1}-md.webp`)
                    const lg = null || contextCat(`./${i + 1}.webp`)

                    return <Image
                        key={`catalogo${i + 1}`}
                        alt={`catalogo${i + 1}`}
                        removeWrapper
                        className={'w-full xs:p-2 h-fit max-xs:rounded-none ' + e}
                        src={lg}
                        srcSet={`${xs} 640w, ${sm} 768w, ${md} 950w , ${lg} 1024w `}
                        sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 950px) 950px, 1024px"
                    />
                })}
            </div>
        </div>
    );
}

export default Catalogos;
