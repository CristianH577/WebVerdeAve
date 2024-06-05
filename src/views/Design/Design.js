
import { useOutletContext } from "react-router-dom";
import addLangText from '../../lang/Design/Design.json'

import ShowModelsMain from '../../components/ShowModelsMain.js';

import Design3D from './components/Design3D.js';
import Logos from './components/Logos.js';
import Banners from './components/Banners/Banners.js';
import Tarjetas from './components/Tarjetas.js';
import Catalogos from './components/Catalogos/Catalogos.js';
import Menus from './components/Menus.js';


function Design() {
    const context = useOutletContext()
    const langText = {
        // ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const title_class = 'text-5xl text-center mb-6'

    const models = [
        <Design3D
            title_class={title_class}
        />,
        <Logos
            title_class={title_class}
        />,
        <Banners
            title_class={title_class}
            dark={context.dark}
        />,
        <Catalogos
            title_class={title_class}
            dark={context.dark}
            langText={langText}
        />,
        <Tarjetas
            title_class={title_class}
            dark={context.dark}
            langText={langText}
        />,
        <Menus
            title_class={title_class}
            dark={context.dark}
            langText={langText}
        />,
    ]


    return (
        <ShowModelsMain
            id={'design'}
            models={models}
        />
    );
}

export default Design;
