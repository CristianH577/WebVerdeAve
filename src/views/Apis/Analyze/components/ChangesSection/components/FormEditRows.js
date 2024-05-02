
import addLangText from '../../../../../../lang/Apis/Analyze/components/ChangesSection/components/FormEditRows.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input } from "@nextui-org/react";

import ErrorBoundary from '../../../../../../components/ErrorBoundary'
import CustomTable from '../../../../../../components/CustomTable'


function FormEditRows({ onSubmit, isLoading, onCancel, data, newRowsValues }) {
    const context = useOutletContext()
    const langText = {
        actions: context.langText[context.lang].actions,
        ...addLangText[context.lang]
    }


    const makeCellEdit = (row, col) => {
        const dtypes = data.dtypes
        var type = 'string'

        if (!!dtypes) {
            if (dtypes[col].includes('int')) type = 'number'
            if (dtypes[col].includes('float')) type = 'number'
            if (dtypes[col].includes('date')) type = 'date'
        }

        return <Input
            type={type}
            defaultValue={row[col]}
            className='min-w-[100px]'
            name={col + '-' + row.key}
            onValueChange={(e) => {
                if (newRowsValues[row.key]) {
                    newRowsValues[row.key][col] = e
                } else {
                    newRowsValues[row.key] = { [col]: e }
                }
            }}
        />
    }


    return (
        <form className='mt-6 bg-success-50 p-4 rounded-lg form-xs w-full' onSubmit={onSubmit}>
            <div className='text-xl mb-2 break-all text-center'>{langText.editRows}</div>

            <ErrorBoundary>
                <CustomTable
                    aria-label={langText.tableAriaEdit}
                    data={data}
                    preferences={{
                        model: ['solicitude'],
                        results: 20,
                        checks: ['headers', 'sort', 'Dcount'],
                    }}
                    color='success'
                    makeCell={makeCellEdit}
                />
            </ErrorBoundary>

            <div className='center gap-4 sm:flex-row mt-4'>
                <Button
                    color='danger'
                    onClick={onCancel}
                    className='form-button'
                >
                    {langText.actions.cancel}
                </Button>

                <Button
                    type='submit'
                    color='primary'
                    isLoading={isLoading}
                    className='form-button'
                >
                    {langText.actions.save}
                </Button>
            </div>
        </form>
    );
}

export default FormEditRows;
