import React, { useState } from 'react';

import addLangText from '../../lang/analisis/procesamiento.json'
import { useOutletContext } from 'react-router-dom';

import { ButtonGroup, Button, Link } from "@nextui-org/react";

import CustomTable from '../../components/custom_table';

import { postFAPI } from '../../libs/fastapi';

import { Reset } from '../../assets/icons'


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
            Blabel: langText.info,
        },
        {
            id: 'describe',
            color: 'secondary',
            Blabel: langText.desc,
        },
        {
            id: 'isnull',
            color: 'danger',
            Blabel: langText.headersInfo.Count,
        },
        {
            id: 'notnull',
            color: 'success',
            Blabel: langText.headersInfo['Non-Null'],
        },
    ]


    const getData = async (action) => {
        setIsLoading(action)

        const values = { rows: JSON.stringify(data.rows) }
        const response = await postFAPI(action, values, lang)

        if (response.bool) {
            var val = response.value
            const newData = {
                cols: val.cols,
                rows: JSON.parse(val.rows),
            }

            const newContent = { ...content }
            newContent[action] = newData
            setContent(newContent)
        }

        setIsLoading(false)
    }


    return (
        <section className='mx-auto my-4 flex flex-col items-center'>

            <ButtonGroup variant='shadow' className='buttongroup-xs' isDisabled={Boolean(isLoading)}>
                {sections.map(s =>
                    <Button
                        key={s.id}
                        color={s.color}
                        className='text-white'
                        onClick={() => getData(s.id)}
                        isLoading={isLoading === s.id}
                        as={Link}
                        href={'#' + s.id}
                    >
                        {s.Blabel}
                    </Button>
                )}
                <Button
                    isIconOnly
                    onClick={() => setContent(contentDefault)}
                >
                    <Reset />
                </Button>
            </ButtonGroup>

            {sections.map(s =>
                <section
                    key={s.id}
                    className='max-xs:w-full mt-4'
                    id={s.id}
                >
                    {content[s.id] && (
                        <>
                            {s.id === 'info' && (
                                <div className='font-semibold mb-2 flex flex-row gap-4 me-6 justify-end max-sm:justify-center' >
                                    <div>{langText.table.cells}: {(data.cols.length) * (data.rows.length)}</div>
                                </div>

                            )}
                            <CustomTable
                                data={content[s.id]}
                                preferences={{
                                    model: ['info', 'describe'].includes(s.id) ? ['none'] : ['pages'],
                                    checks: ['headers'],
                                }}
                                ariaLabel={langText.tableAria[s.id]}
                                color={s.color}
                            />
                        </>
                    )}
                </section>
            )}
        </section >
    );
}

export default Procesamiento;
