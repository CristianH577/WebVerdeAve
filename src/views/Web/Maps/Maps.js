


import ShowModelsMain from '../../../components/ShowModelsMain';
import LeafletMap from './components/LeafletMap';
import SvgMap from './components/SvgMap';



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
