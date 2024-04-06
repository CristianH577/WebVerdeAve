import React, { useState } from 'react';
import './graphs_section.css'

import addLangText from '../../lang/analyze/graphs_section.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Image, Select, SelectItem } from "@nextui-org/react";

import { Chart } from "react-google-charts";

import { postFAPI, getFAPI, postFAPIgraph } from '../../libs/fastapi';


function GraphsSection({ data }) {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
        ...addLangText[lang]
    }


    const [content, setContent] = useState(<></>)
    const [isLoading, setIsLoading] = useState(false)
    const [preferences, setPreferences] = useState({
        ejex: [],
        ejey: [],
        type: '',
    })

    const graphSelects = ["ColumnChart", "Histogram", "LineChart", "ScatterChart", "PieChart"]
    const options = {
        ColumnChart: {
            hAxis: { title: preferences.ejex },
            vAxis: { title: preferences.ejey },
            legend: { position: "none" },
        },
        Histogram: {
            hAxis: { title: preferences.ejex },
            vAxis: { title: preferences.ejey },
            legend: { position: "none" },
        },
        LineChart: {
            hAxis: { title: preferences.ejex },
        },
        ScatterChart: {
            hAxis: { title: preferences.ejex },
        },
        PieChart: {
            is3D: true,
            hAxis: { title: preferences.ejex },
        },
    }


    const makeData = () => {
        const ejex = preferences.ejex
        const ejey = preferences.ejey
        const type = preferences.type

        if (ejex.length !== 0 && type && ejey.length !== 0) {
            setIsLoading(true)
            var rows = []

            if (ejey.length > 1) {
                rows = data.rows.reduce((prev, val) => {
                    var valx = val[ejex]
                    const row = [valx]

                    for (let i = 0; i < ejey.length; i++) {
                        const valy = val[ejey[i]]
                        row.push(valy)
                    }

                    prev.push(row)
                    return prev
                }, [])

            } else {
                if (ejey[0] === 'quantity') {
                    const count = data.rows.reduce((prev, val) => {
                        var valx = val[ejex[0]]
                        prev[valx] = prev[valx] + 1 || 1
                        return prev
                    }, {})
                    rows = Object.entries(count)
                } else {
                    rows = data.rows.reduce((prev, val) => {
                        var valx = val[ejex[0]]
                        const valy = val[ejey[0]]

                        if (type === 'PieChart') valx = valx.toString()

                        const dupla = [valx, valy]

                        prev.push(dupla)
                        return prev
                    }, [])
                }
            }

            const newDataGraph = [
                [...ejex, ...ejey],
                ...rows
            ]

            setContent(
                <div id='graph' className='mt-6 h-[90vw] max-h-[800px]'>
                    <Chart
                        chartType={preferences.type}
                        data={newDataGraph}
                        options={options[preferences.type]}
                        width={"100%"}
                        height={"100%"}
                    />
                </div>
            )
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        }
    }

    const [src, setSrc] = useState('')
    const test = async () => {
        setIsLoading(true)

        const x = 5

        var response = false
        const test = [1, 2, 3, 4, 4]
        const values = {
            test: JSON.stringify(test),
        }

        switch (x) {
            // no
            case 1:
                response = await getFAPI('createImg', lang)

                if (response.bool) {
                    const val = response.value
                    console.log(val)
                    // const blob = val.blob()
                }
                break;
            // no
            case 2:
                response = await postFAPI('createImgPost', values, lang)
                if (response.bool) {
                    const val = response.value
                    console.log(val)
                    // const blob = val.blob()
                    // console.log(blob)

                }
                break;
            // no
            case 3:
                response = await postFAPIgraph('createImgPost', values, lang)
                console.log(response)
                if (response) {
                    setSrc(response)
                }
                break;
            // si
            case 4:
                const formData = new FormData()

                const entries = Object.entries(values)
                for (let i = 0; i < entries.length; i++) {
                    formData.append(entries[i][0], entries[i][1])
                }

                const requestOptions = {
                    method: 'POST',
                    body: formData
                };
                fetch("http://127.0.0.1:8000/createImgPost/", requestOptions)
                    //     .then(response => response.blob())
                    .then(response => {
                        console.log(response)
                        return response.blob()
                    })
                    .then(blob => {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                            setSrc(reader.result)
                        }
                        reader.readAsDataURL(blob)
                    })
                    .catch(e => console.log(e))
                break;

            // si
            case 5:
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
                break;

            default:
                fetch("http://127.0.0.1:8000/createImg/")
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setSrc(reader.result);
                        };
                        reader.readAsDataURL(blob);
                    });
                break;
        }

        setIsLoading(false)
    }


    return (
        <section className='mt-4 '>

            <Button
                onClick={test}
            >
                test
            </Button>
            <Button
                onClick={() => setSrc('')}
            >
                reset
            </Button>
            <Image
                alt='test'
                src={src}
            />

            <div className='flex max-sm:flex-col gap-4 justify-center items-center mb-6 form-xs'>
                <Select
                    label={langText.graphic}
                    selectionMode="single"
                    className="form-select max-w-[360px]"
                    variant="bordered"
                    onSelectionChange={e => setPreferences({ ...preferences, type: Array.from(e)[0], ejey: [] })}
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
                    selectionMode={['LineChart', 'ScatterChart'].includes(preferences.type) ? 'multiple' : 'single'}
                    className=" max-w-[360px] form-select"
                    variant="bordered"
                    selectedKeys={preferences.ejey}
                    onSelectionChange={e => setPreferences({ ...preferences, ejey: Array.from(e) })}
                >
                    <SelectItem
                        key={'quantity'}
                        isDisabled={['LineChart', 'ScatterChart'].includes(preferences.type)}
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
                <Button
                    color='primary'
                    variant='shadow'
                    isDisabled={preferences.ejex.length === 0 || !preferences.type || preferences.ejey.length === 0}
                    isLoading={isLoading} onClick={makeData}
                >
                    {langText.graph}
                </Button>
            </div>

            {!isLoading && content}

        </section>
    );
}

export default GraphsSection;
