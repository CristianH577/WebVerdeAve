

import addLangText from '../../../../lang/Apis/Analyze/components/ShowSection.json'
import { useOutletContext } from 'react-router-dom';

import CustomTable from '../../../../components/CustomTable.js'
import ErrorBoundary from '../../../../components/ErrorBoundary.js'


function ShowSection({ data }) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang]
    }


    return (
        <ErrorBoundary lang={context.lang}>
            <CustomTable
                data={data}
                preferences={{
                    model: ['solicitude'],
                    checks: ['headers', 'sort', 'Dcount'],
                    results: 20,
                }}
                ariaLabel={langText.table_aria}
            />
        </ErrorBoundary>
    );
}

export default ShowSection;
