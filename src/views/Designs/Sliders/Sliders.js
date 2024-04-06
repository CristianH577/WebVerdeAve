import React from 'react';

import { useOutletContext } from 'react-router-dom';

import { Divider } from "@nextui-org/react";


import SliderCustom from './components/SliderCustom';
import SliderParallax from './components/SliderParallax';
import SliderEffects from './components/SliderEffects';
import SliderAdapt from './components/SliderAdapt';



function Sliders() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }

    const section_class = 'w-full mb-8 flex flex-col items-center gap-8'
    const title_class = 'text-5xl break-all text-center'
    const divider_class = 'w-3/4 max-w-[1200px] my-8'



    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.sliders}
            </div>

            <SliderCustom
                section_class={section_class}
                title_class={title_class}
            />

            <Divider className={divider_class} />

            <SliderParallax
                section_class={section_class}
                title_class={title_class}
            />

            <Divider className={divider_class} />

            <SliderEffects
                section_class={section_class}
                title_class={title_class}
            />

            <Divider className={divider_class} />

            <SliderAdapt
                section_class={section_class}
                title_class={title_class}
            />

        </main>
    );
}

export default Sliders;
