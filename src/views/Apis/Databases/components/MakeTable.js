
import { useOutletContext } from 'react-router-dom';

import { Button, ButtonGroup, Divider, Spinner } from "@nextui-org/react";

import ErrorBoundary from '../../../../components/ErrorBoundary.js'
import CustomTable from '../../../../components/CustomTable.js'



function MakeTable({ table, isLoading, makeCell, updateTable, setEdit }) {
    const context = useOutletContext()
    const langText = {
        actions: {...context.langText[context.lang].actions},
    }


    return (
        <section key={table.key} className=' w-full center items-center'>
            <Divider className='mt-8 mb-4 w-3/4' />

            <div className='text-center' >{table.name}</div>

            <ButtonGroup variant='ghost' className='buttongroup-xs mt-2'>
                <Button
                    color='warning'
                    className='hover:!text-white'
                    onClick={() => updateTable(table.key)}
                    isDisabled={typeof edit === 'object' || Boolean(isLoading)}
                    isLoading={isLoading === table.key}
                >
                    {langText.actions.refresh}
                </Button>

                <Button
                    color='primary'
                    onClick={() => {
                        setEdit({ key: 'addRow', table: table })
                        setTimeout(() => {
                            document.getElementById("form_add_row").scrollIntoView()
                        }, 200);
                    }}
                    isDisabled={typeof edit === 'object' || Boolean(isLoading)}
                >
                    {langText.actions.add}
                </Button>
            </ButtonGroup>

            {isLoading === table.key
                ? <Spinner className='mt-4' />
                : <ErrorBoundary lang={context.lang}>
                    <CustomTable
                        data={table}
                        preferences={{
                            model: ['pages'],
                            checks: ['headers', 'strip'],
                        }}
                        makeCell={makeCell}
                        ariaLabel={'Bases de datos: Tabla 1'}
                        className={'mt-4 w-full max-w-[800px]'}
                    />
                </ErrorBoundary>
            }
        </section>
    );
}

export default MakeTable;
