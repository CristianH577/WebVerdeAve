
import addLangText from '../../../../lang/Apis/Databases/Databases.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input } from "@nextui-org/react";


function FormEditRow({ onSubmit, isLoading, edit, setEdit, labels }) {
    const context = useOutletContext()
    const langText = {
        actions: { ...context.langText[context.lang].actions },
        ...addLangText[context.lang]
    }


    return (
        <form
            onSubmit={onSubmit}
            className='bg-content1 py-4 xs:px-4 rounded-lg flex flex-col gap-4 items-center my-6 shadow-medium form-xs xs:min-w-[300px]'
            id='form_edit_row'
        >
            <div>{langText.editRow}:</div>

            <div className='center gap-4 sm:flex-row w-full'>
                {Object.keys(edit.row).map(col =>
                    col.includes('col') && (
                        < Input
                            key={col}
                            name={col}
                            label={labels[col]}
                            defaultValue={edit.row[col]}
                            className='form-input'
                            maxLength={50}
                            autoComplete='off'
                        />
                    )
                )}
            </div>

            <div className='center gap-4 sm:flex-row max-xs:w-full'>
                <Button
                    color='danger'
                    onClick={() => setEdit(false)}
                    isDisabled={Boolean(isLoading)}
                    className='button-xs'
                >
                    {langText.actions.cancel}
                </Button>

                <Button
                    type='submit'
                    color='primary'
                    isDisabled={Boolean(isLoading)}
                    isLoading={isLoading && edit.key.includes('editRow')}
                    className='button-xs'
                >
                    {langText.actions.save}
                </Button>
            </div>
        </form>
    );
}

export default FormEditRow;
