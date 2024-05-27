


import ShowModelsMain from '../../../components/ShowModelsMain';
import Notifications from './components/Notifications';
import Graphs from './components/Graphs';
import CisterciensesNumbers from './components/CisterciensesNumbers';



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
        />
    );
}

export default More;
