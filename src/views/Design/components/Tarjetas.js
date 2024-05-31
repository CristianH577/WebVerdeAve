import GalerieFramerMotion from "../../../components/GalerieFramerMotion.js";


function Tarjetas({ title_class, dark, langText }) {

    return (
        <div className="w-full">
            <h1 className={title_class}>{langText.cards}</h1>

            <GalerieFramerMotion
                dark={dark}
                contextImgs={require.context('../../../assets/imgs/design/tarjetas', true)}
                items={[
                    {
                        id: 'tarjetas-1',
                        dark: true,
                    },
                    {
                        id: 'tarjetas-2',
                        dark: true,
                    },
                ]}
            />
        </div>
    );
}

export default Tarjetas;
