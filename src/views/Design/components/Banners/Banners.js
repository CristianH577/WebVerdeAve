


import GalerieFramerMotion from "../../../../components/GalerieFramerMotion.js";

import BannerModel1 from "./components/BannerModel1.js";


function Banners({ title_class, dark, langText }) {

    return (
        <section className="">
            <h1 className={title_class}>Banners</h1>

            <div className='flex flex-col items-center gap-8'>
                <BannerModel1 />
            </div>

            <GalerieFramerMotion
                dark={dark}
                contextImgs={require.context('../../../../assets/imgs/design/banners', true)}
                items={[
                    {
                        id: 'banners-2',
                        dark: true,
                    },
                ]}
            />
        </section>
    );
}

export default Banners;
