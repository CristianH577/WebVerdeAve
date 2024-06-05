import GalerieFramerMotion from "../../../../components/GalerieFramerMotion.js";
import CatalogSlider from "./comopnents/CatalogSlider.js";


function Catalogos({ title_class, dark, langText }) {

    return (
        <div >
            <h1 className={title_class}>{langText.catalogs}</h1>

            <GalerieFramerMotion
                contextImgs={require.context('../../../../assets/imgs/design/catalogos', true)}
                dark={dark}
                items={[
                    {
                        id: 'catalogs-1',
                    },
                    {
                        id: 'catalogs-2',
                    },
                    {
                        id: 'catalogs-3',
                    },
                    {
                        id: 'catalogs-4',
                    },
                ]}
            />

            <CatalogSlider />
        </div>
    );
}

export default Catalogos;
