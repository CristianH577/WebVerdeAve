import React, { useState } from 'react';

import addLangText from '../../lang/analisis/graphs_section.json'
import { useOutletContext } from 'react-router-dom';

import { Button, ButtonGroup, Image, Select, SelectItem } from "@nextui-org/react";

import { postFAPIgraph } from '../../libs/fastapi';

import { Reset } from '../../assets/icons'


function GraphsSection({ data }) {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
        ...addLangText[lang]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [src, setSrc] = useState('')
    const [preferences, setPreferences] = useState({
        ejex: [],
        ejey: [],
        type: '',
    })

    const graphSelects = ["bar", "hist", "pie", "boxplot", "scatter", "line", "corr"]

    const makeGraph = async () => {
        setIsLoading(true)
        console.log(preferences)

        const values = {
            rows: JSON.stringify(data.rows),
            preferences: JSON.stringify(preferences),
        }

        await postFAPIgraph('createImgPost', values, lang)
            .then(blob => {
                if (blob) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setSrc(reader.result)
                    }
                    reader.readAsDataURL(blob)
                }
            })

        setIsLoading(false)
    }


    return (
        <section className='mt-4 '>

            <div className='center sm:flex-row gap-4 items-center mb-6 form-xs'>
                <Select
                    label={langText.type}
                    selectionMode="single"
                    className="form-select max-w-[360px]"
                    variant="bordered"
                    onSelectionChange={e => {
                        const type = Array.from(e)[0]
                        const x = type === 'corr' ? ['class'] : [preferences.ejex]
                        const y = ["hist", "pie", "boxplot"].includes(type) ? ['quantity'] : []
                        setPreferences({ type: type, ejex: x, ejey: y })
                    }}
                >
                    {graphSelects.map((select) => (
                        <SelectItem key={select} >
                            {langText.graphSelects[select]}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    label={langText.axisX}
                    selectionMode="single"
                    className=" max-w-[360px] form-select"
                    variant="bordered"
                    isDisabled={["corr"].includes(preferences.type)}
                    onSelectionChange={e => preferences.ejex = Array.from(e)}
                >
                    {data.cols.map(col => (
                        <SelectItem key={col} >
                            {col}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    label={langText.axisY}
                    className="max-w-[360px] form-select"
                    variant="bordered"
                    selectedKeys={preferences.ejey}
                    isDisabled={["hist", "pie", "boxplot", "corr"].includes(preferences.type)}
                    onSelectionChange={e => setPreferences({ ...preferences, ejey: Array.from(e) })}
                >
                    <SelectItem
                        key={'quantity'}
                        isDisabled={['scatter', 'line'].includes(preferences.type)}
                    >
                        {langText.quantity}
                    </SelectItem>

                    {data.cols.map((col) => (
                        <SelectItem key={col} >
                            {col}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className='text-center'>
                <ButtonGroup variant='shadow' className='buttongroup-xs' isDisabled={isLoading}>
                    <Button
                        color='primary'
                        variant='shadow'
                        isDisabled={
                            preferences.type === 'corr'
                                ? false
                                : (
                                    !preferences.type
                                    || preferences.ejex.length === 0
                                    || preferences.ejey.length === 0
                                )
                        }
                        isLoading={isLoading}
                        onClick={makeGraph}
                    >
                        {langText.graph}
                    </Button>

                    <Button
                        isIconOnly
                        onClick={() => setSrc('')}
                    >
                        <Reset />
                    </Button>
                </ButtonGroup>
            </div>

            {src !== '' && (
                <Image
                    alt={langText.graphImgAlt}
                    src={src}
                    width={'100%'}
                    className='mt-4 max-w-[800px]'
                    classNames={{
                        wrapper: 'flex justify-center'
                    }}
                />
            )}

        </section >
    );
}

export default GraphsSection;
