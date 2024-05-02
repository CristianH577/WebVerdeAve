

import { useOutletContext } from 'react-router-dom';

import { Divider } from "@nextui-org/react";

import LeafletMap from './components/LeafletMap';
import SvgMap from './components/SvgMap';



function Maps() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.maps}
            </div>

            <LeafletMap />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <SvgMap />
        </main>
    );
}

export default Maps;
