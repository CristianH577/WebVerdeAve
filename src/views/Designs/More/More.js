

import { useOutletContext } from 'react-router-dom';

import { Divider } from '@nextui-org/react';


import Notifications from './components/Notifications';
import Graphs from './components/Graphs';



function More() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.more}
            </div>

            <Notifications />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <Graphs />

        </main>
    );
}

export default More;
