import React from 'react';

import addLangText from '../../lang/analisis/presentacion.json'
import { useOutletContext } from 'react-router-dom';

import CustomTable from '../../components/custom_table'


function Presentacion({ data }) {
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
                ariaLabel={langText.tableAria}
            />
        </section>
    );
}

export default Presentacion;
