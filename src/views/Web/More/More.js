
import ShowModelsMain from '../../../components/ShowModelsMain.js';
import Notifications from './components/Notifications.js';
import Graphs from './components/Graphs.js';
import CisterciensesNumbers from './components/CisterciensesNumbers.js';


function More() {
    const models = [
        <Notifications />,
        <Graphs />,
        <CisterciensesNumbers />
    ]


    return (
        <ShowModelsMain
            id={'more'}
            models={models}
            className={'xs:px-2 md:px-8'}
        />
    );
}

export default More;
