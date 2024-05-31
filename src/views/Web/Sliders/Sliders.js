
import ShowModelsMain from '../../../components/ShowModelsMain.js';

import SliderCustom from './components/SliderCustom.js';
import SliderParallax from './components/SliderParallax.js';
import SliderEffects from './components/SliderEffects.js';
import SliderAdapt from './components/SliderAdapt.js';



function Sliders() {
    const section_class = 'space-y-8'
    const title_class = 'text-5xl break-all text-center'

    const models = [
        <SliderCustom
            section_class={section_class}
            title_class={title_class}
        />,
        <SliderParallax
            section_class={section_class}
            title_class={title_class}
        />,
        <SliderEffects
            section_class={section_class}
            title_class={title_class}
        />,
        <SliderAdapt
            section_class={section_class}
            title_class={title_class}
        />
    ]

    return (
        <ShowModelsMain
            id={'sliders'}
            models={models}
        />
    );
}

export default Sliders;
