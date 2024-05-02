

import addLangText from '../../../../lang/Apis/Analyze/components/ShowSection.json'
import { useOutletContext } from 'react-router-dom';

import CustomTable from '../../../../components/CustomTable'
import ErrorBoundary from '../../../../components/ErrorBoundary'


function ShowSection({ data }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    return (
        <ErrorBoundary>
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
