
import ShowModelsMain from '../../../components/ShowModelsMain';

import SliderCustom from './components/SliderCustom';
import SliderParallax from './components/SliderParallax';
import SliderEffects from './components/SliderEffects';
import SliderAdapt from './components/SliderAdapt';



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
