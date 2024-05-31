

import ShowModelsMain from '../../../components/ShowModelsMain.js';
import LeafletMap from './components/LeafletMap.js';
import SvgMap from './components/SvgMap.js';


function Maps() {
    const models = [
        <LeafletMap />,
        <SvgMap />
    ]


    return (
        <ShowModelsMain
            id={'maps'}
            models={models}
        />
    );
}

export default Maps;
