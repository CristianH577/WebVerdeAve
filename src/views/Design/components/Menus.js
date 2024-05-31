
import GalerieFramerMotion from "../../../components/GalerieFramerMotion.js";


function Menus({ title_class, dark, langText }) {

    return (
        <div className="">
            <h1 className={title_class}>{langText.menus}</h1>

            <GalerieFramerMotion
                contextImgs={require.context('../../../assets/imgs/design/menus', true)}
                dark={dark}
                items={[
                    {
                        id: '1',
                        dark: true,
                    },
                    {
                        id: '2',
                        dark: true,
                    },
                    {
                        id: '3',
                    },
                    {
                        id: '4',
                    },
                ]}
            />
        </div>
    );
}

export default Menus;
