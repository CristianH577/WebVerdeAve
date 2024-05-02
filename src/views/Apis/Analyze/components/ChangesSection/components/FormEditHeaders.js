
import addLangText from '../../../../../../lang/Apis/Analyze/components/ChangesSection/components/FormEditHeaders.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input } from "@nextui-org/react";


function FormEditHeaders({ onSubmit, isLoading, onCancel, errors, headers }) {
    const context = useOutletContext()
    const langText = {
        actions: context.langText[context.lang].actions,
        ...addLangText[context.lang]
    }


    return (
        <form className='mt-4 text-center bg-content1 rounded-lg p-4 form-xs' onSubmit={onSubmit}>
            <div className='text-xl mb-4'>{langText.editHeaders}</div>

            <div className='mb-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                {headers.map(col =>
                    <Input key={col} defaultValue={col} name={col} className='input-xs' />
                )}
            </div>
            {errors.editHeaders && <div className='text-danger mb-4'>* {errors.editHeaders} *</div>}

            <div className='flex flex-col gap-4 sm:flex-row justify-center'>
                <Button
                    color='danger'
                    onClick={onCancel}
                >
                    {langText.actions.cancel}
                </Button>

                <Button
                    type='submit'
                    color='primary'
                    isLoading={isLoading}
                >
                    {langText.actions.save}
                </Button>
            </div>
        </form>
    );
}

export default FormEditHeaders;
