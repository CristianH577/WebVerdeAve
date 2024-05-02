import { useEffect, useState } from 'react';

import addLangText from '../../../../lang/Apis/Databases/Databases.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input } from "@nextui-org/react";

import { Reset } from '../../../../assets/icons.js';


function FormAddTable({ onSubmit, isLoading, edit, setEdit, totalTables }) {
    const context = useOutletContext()
    const langText = {
        actions: { ...context.langText[context.lang].actions },
        form: { ...context.langText[context.lang].form },
        ...addLangText[context.lang]
    }

    const clean_values_table = {
        name: '',
        col1: '',
        col2: '',
        col3: '',
        col4: '',
    }

    const [defaultValuesTable, setDefaultValuesTable] = useState(clean_values_table)

    useEffect(() => {
        setDefaultValuesTable(clean_values_table)
        // eslint-disable-next-line
    }, [edit])

    return (
        <form
            onSubmit={onSubmit}
            className='bg-content1 py-4 xs:px-4 rounded-lg flex flex-col gap-4 items-center my-6 shadow-medium form-xs xs:min-w-[300px] max-w-[600px]'
        >
            <div>{langText.createTable}:</div>

            <Input
                name={'name'}
                label={langText.nameOfTable}
                className='form-input w-1/2'
                maxLength={50}
                autoComplete='off'

                value={defaultValuesTable.name}
                onValueChange={(e) => {
                    const newValues = { ...defaultValuesTable }
                    newValues.name = e
                    setDefaultValuesTable(newValues)
                }}

                isClearable
                onClear={() => {
                    const newValues = { ...defaultValuesTable }
                    newValues.name = ''
                    setDefaultValuesTable(newValues)
                }}
            />

            <div className='center gap-4 sm:flex-row w-full'>
                {[...Array(4)].map((e, i) =>
                    <Input
                        key={'col' + (i + 1)}
                        name={'col' + (i + 1)}
                        label={langText.databasesLabels['col' + (i + 1)]}
                        className='form-input'
                        maxLength={50}
                        autoComplete='off'

                        value={defaultValuesTable['col' + (i + 1)]}
                        onValueChange={(e) => {
                            const newValues = { ...defaultValuesTable }
                            newValues['col' + (i + 1)] = e
                            setDefaultValuesTable(newValues)
                        }}

                        isClearable
                        onClear={() => {
                            const newValues = { ...defaultValuesTable }
                            newValues['col' + (i + 1)] = ''
                            setDefaultValuesTable(newValues)
                        }}
                    />
                )}
            </div>

            <div className='center gap-4 sm:flex-row max-xs:w-full'>
                <Button
                    isIconOnly
                    isDisabled={isLoading}
                    className='button-xs max-sm:w-full'
                    onClick={() => setDefaultValuesTable(clean_values_table)}
                >
                    <Reset />
                </Button>

                <Button
                    color='danger'
                    isDisabled={isLoading}
                    className='button-xs'
                    onClick={() => setEdit(false)}
                >
                    {langText.actions.cancel}
                </Button>

                <Button
                    color='warning'
                    isDisabled={isLoading}
                    className='button-xs text-white'
                    onClick={() => setDefaultValuesTable({
                        name: langText.table_name + (totalTables + 1),
                        col1: langText.form.name + (totalTables + 1),
                        col2: langText.form.surname + (totalTables + 1),
                        col3: langText.form.user + (totalTables + 1),
                        col4: langText.asociated + (totalTables + 1),
                    })}
                >
                    {langText.actions.autocomplete}
                </Button>

                <Button
                    type='submit'
                    color='secondary'
                    isLoading={isLoading && edit.key === 'addTable'}
                    className='button-xs'
                >
                    {langText.createTable}
                </Button>
            </div>
        </form>
    );
}

export default FormAddTable;
