
import addLangText from '../../../../../../lang/Apis/Analyze/components/ChangesSection/components/FormEditTypes.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Select, SelectItem } from "@nextui-org/react";


function FormEditTypes({ onSubmit, isLoading, onCancel, cols, types }) {
    const context = useOutletContext()
    const langText = {
        actions: context.langText[context.lang].actions,
        ...addLangText[context.lang]
    }


    return (
        <form className='mt-4 text-center bg-content1 rounded-lg p-4 w-full form-xs' onSubmit={onSubmit}>
            <div className='text-xl mb-4 break-all px-2'>{langText.editTypes}</div>

            <div className='mb-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                {cols.map(col =>
                    <Select
                        key={col}
                        defaultSelectedKeys={[types[col]]}
                        name={col}
                        label={col}
                        className='form-select'
                    >
                        <SelectItem key='string'>
                            string
                        </SelectItem>
                        <SelectItem key='object'>
                            object
                        </SelectItem>
                        <SelectItem key='int64'>
                            int64
                        </SelectItem>
                        <SelectItem key='float64'>
                            float64
                        </SelectItem>
                        <SelectItem key='datetime64'>
                            datetime64
                        </SelectItem>
                    </Select>
                )}
            </div>
            <div className='text-neutral-500 text-sm mb-2'>
                *{langText.warningNoSelect}*
            </div>

            <div className='center gap-4 sm:flex-row '>
                <Button
                    color='danger'
                    className='button-xs'
                    onClick={onCancel}

                >
                    {langText.actions.cancel}
                </Button>

                <Button
                    type='submit'
                    color='primary'
                    className='button-xs'
                    isLoading={isLoading}
                >
                    {langText.actions.save}
                </Button>
            </div>
        </form>
    );
}

export default FormEditTypes;
