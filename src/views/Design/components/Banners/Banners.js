import BannerModel1 from "./components/BannerModel1";
import BannerModel2 from "./components/BannerModel2/BannerModel2";


function Banners({ title_class }) {

    return (
        <section >
            <h1 className={title_class}>Banners</h1>

            <div className='flex flex-col items-center gap-8'>
                <BannerModel1 />
                <BannerModel2 />
            </div>
        </section>
    );
}

export default Banners;
