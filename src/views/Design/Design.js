

import ShowModelsMain from '../../components/ShowModelsMain';

import Design3D from './components/Design3D';
import Logos from './components/Logos';
import Banners from './components/Banners/Banners';
import Tarjetas from './components/Tarjetas/Tarjetas';
import Catalogos from './components/Catalogos';
import Menus from './components/Menus/Menus';


function Design() {
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
        />,
        <Catalogos
            title_class={title_class}
        />,
        <Tarjetas
            title_class={title_class}
        />,
        <Menus
            title_class={title_class}
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
