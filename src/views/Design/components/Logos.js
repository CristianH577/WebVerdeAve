import { Image } from "@nextui-org/react";


function Logos({ title_class }) {

    const contextLogos = require.context('../../../assets/imgs/design/logos', true)

    return (
        <div >
            <h1 className={title_class}>Logos</h1>

            <div className='flex flex-wrap justify-center gap-8 p-2'>
                {[...Array(6)].map((e, i) =>
                    <Image
                        key={`logo${i + 1}`}
                        alt={`logo${i + 1}`}
                        src={contextLogos(`./${i + 1}.webp`)}
                        removeWrapper
                        className='w-full xs:max-w-[200px] max-xs:rounded-none bg-white'
                    />
                )}
            </div>
        </div>
    );
}

export default Logos;
