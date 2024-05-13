import { useState } from 'react';
import addLangText from '../../../../lang/Apis/Analyze/components/ProcessSection.json'
import { useOutletContext } from 'react-router-dom';

import { postFAPI } from '../../../../libs/fastapi';

import { ButtonGroup, Button, Link } from "@nextui-org/react";

import ErrorBoundary from '../../../../components/ErrorBoundary';
import CustomTable from '../../../../components/CustomTable';

import { Reset } from '../../../../assets/icons'


function Procesamiento({ data }) {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
        ...addLangText[lang]
    }

    const [isLoading, setIsLoading] = useState(false)
    const contentDefault = {
        info: false,
        describe: false,
        isnull: false,
        notnull: false,
    }
    const [content, setContent] = useState(contentDefault)
    const sections = [
        {
            id: 'info',
            color: 'primary',
            b_label: langText.info,
        },
        {
            id: 'describe',
            color: 'secondary',
            b_label: langText.desc,
        },
        {
            id: 'isnull',
            color: 'danger',
            b_label: langText.headersInfo.Count,
        },
        {
            id: 'notnull',
            color: 'success',
            b_label: langText.headersInfo['Non-Null'],
        },
    ]


    const getData = async (action) => {
        setIsLoading(action)

        const response = await postFAPI('analyze/' + action, data.rows, lang)

        if (response.bool && typeof response.value === 'object') {
            const newData = { ...response.value }

            const newContent = { ...content }
            newContent[action] = newData
            setContent(newContent)
        }

        setIsLoading(false)
    }


    return (
        <section className='mx-auto my-4 flex flex-col items-center'>

            <ButtonGroup variant='shadow' className='buttongroup-xs' isDisabled={Boolean(isLoading)}>
                {sections.map(e =>
                    <Button
                        key={e.id}
                        color={e.color}
                        className='text-white'
                        onClick={() => getData(e.id)}
                        isLoading={isLoading === e.id}
                        as={Link}
                        href={'#' + e.id}
                    >
                        {e.b_label}
                    </Button>
                )}
                <Button
                    isIconOnly
                    onClick={() => setContent(contentDefault)}
                >
                    <Reset />
                </Button>
            </ButtonGroup>

            {sections.map(e =>
                <section
                    key={e.id}
                    className='max-xs:w-full mt-4'
                    id={e.id}
                >
                    {content[e.id] && (
                        <>
                            {e.id === 'info' && (
                                <div className='font-semibold mb-2 flex flex-row gap-4 me-6 justify-end max-sm:justify-center' >
                                    <div>{langText.table.cells}: {(data.cols.length) * (data.rows.length)}</div>
                                </div>

                            )}
                            <ErrorBoundary>
                                <CustomTable
                                    data={content[e.id]}
                                    preferences={{
                                        model: ['info', 'describe'].includes(e.id) ? ['none'] : ['pages'],
                                        checks: ['headers'],
                                    }}
                                    ariaLabel={langText.tableAria[e.id]}
                                    color={e.color}
                                />
                            </ErrorBoundary>
                        </>
                    )}
                </section>
            )}
        </section >
    );
}

export default Procesamiento;
