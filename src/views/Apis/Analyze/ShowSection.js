import React from 'react';

import addLangText from '../../../lang/Apis/Analyze/ShowSection.json'
import { useOutletContext } from 'react-router-dom';

import CustomTable from '../../../components/CustomTable'


function ShowSection({ data }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    return (
        <section>
            <CustomTable
                data={data}
                preferences={{
                    model: ['solicitude'],
                    checks: ['headers', 'sort', 'Dcount'],
                    results: 20,
                }}
                ariaLabel={langText.table_aria}
            />
        </section>
    );
}

export default ShowSection;
