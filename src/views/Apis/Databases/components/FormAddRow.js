import { useEffect, useState } from 'react';

import addLangText from '../../../../lang/Apis/Databases/Databases.json'
import { useOutletContext } from 'react-router-dom';

import { name, surname, username, fullname } from 'react-lorem-ipsum';

import { Button, Input } from "@nextui-org/react";

import { Reset } from '../../../../assets/icons.js';


function FormAddRow({ onSubmit, isLoading, edit, setEdit }) {
    const context = useOutletContext()
    const langText = {
        actions: { ...context.langText[context.lang].actions },
        ...addLangText[context.lang]
    }

    const cleanValuesRow = {
        col1: '',
        col2: '',
        col3: '',
        col4: '',
    }

    const [defaultValuesRow, setDefaultValuesRow] = useState(cleanValuesRow)


    useEffect(() => {
        setDefaultValuesRow(cleanValuesRow)
        // eslint-disable-next-line
    }, [edit])


    return (
        <form
            onSubmit={onSubmit}
            className='bg-content1 py-4 xs:px-4 rounded-lg flex flex-col gap-4 items-center my-6 shadow-medium form-xs xs:min-w-[300px]'
            id='form_add_row'
        >
            <div>{langText.addToTable}: {edit.table.name}</div>

            <div className='center gap-4 sm:flex-row w-full'>
                {edit.table.cols.map((col, i) =>
                    !col.includes('actions') && (
                        < Input
                            key={col}
                            name={col}
                            label={edit.table.labels[col]}
                            maxLength={50}
                            autoComplete='off'

                            value={defaultValuesRow['col' + (i + 1)]}
                            onValueChange={(e) => {
                                const newValues = { ...defaultValuesRow }
                                newValues['col' + (i + 1)] = e
                                setDefaultValuesRow(newValues)
                            }}

                            isClearable
                            onClear={() => {
                                const newValues = { ...defaultValuesRow }
                                newValues['col' + (i + 1)] = ''
                                setDefaultValuesRow(newValues)
                            }}
                        />
                    )
                )}
            </div>

            <div className='center gap-4 sm:flex-row max-xs:w-full'>
                <Button
                    isIconOnly
                    isDisabled={Boolean(isLoading)}
                    className='button-xs max-sm:w-full'
                    onClick={() => setDefaultValuesRow(cleanValuesRow)}
                >
                    <Reset />
                </Button>

                <Button
                    color='danger'
                    isDisabled={Boolean(isLoading)}
                    className='button-xs'
                    onClick={() => setEdit(false)}
                >
                    {langText.actions.cancel}
                </Button>

                <Button
                    color='warning'
                    isDisabled={Boolean(isLoading)}
                    className='button-xs text-white'
                    onClick={() => setDefaultValuesRow({
                        col1: name(),
                        col2: surname(),
                        col3: username(),
                        col4: fullname(),
                    })}
                >
                    {langText.actions.autocomplete}
                </Button>

                <Button
                    type='submit'
                    color='secondary'
                    isDisabled={Boolean(isLoading) || !edit.key.includes('addRow')}
                    isLoading={Boolean(isLoading) && edit.key.includes('addRow')}
                    className='button-xs'
                >
                    {langText.actions.add}
                </Button>
            </div>
        </form>
    );
}

export default FormAddRow;
