import React, { useState } from 'react';
import './mas.css'

import addLangText from '../../lang/diseños/mas.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Divider, Input, Radio, RadioGroup } from '@nextui-org/react';

import { ToastContainer, toast } from 'react-toastify';

import { Chart } from "react-google-charts";


function Cartas() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const [notify] = useState({
        color: 'default',
        msg: langText.notify.msg
    })


    const options = {
        ColumnChart: {
            legend: { position: "none" },
        },
        Histogram: {
            legend: { position: "none" },
        },
        LineChart: {
        },
        ScatterChart: {
        },
        PieChart: {
            is3D: true,
        },
    }
    const [graph, setGraph] = useState({
        type: 'ColumnChart',
        data: false,
    })
    const makeDataGraph = () => {

        var cols = ['X', 'Y']
        var rows = []
        if (["Histogram"].includes(graph.type)) {
            rows = Array.from(Array(30), e =>
                e = [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100)
                ]
            )
        }
        else if (["LineChart", "ScatterChart"].includes(graph.type)) {
            cols = ['X', 'A', 'B', 'C']
            rows = Array.from(Array(30), e =>
                e = [
                    graph.type === 'ScatterChart' ? Math.floor(Math.random() * 100) : ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                ]
            )
        }
        else {
            const data = Array.from(Array(30), e =>
                e = [
                    ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
                    Math.floor(Math.random() * 100),
                ]
            )

            const count = data.reduce((prev, val) => {
                prev[val[0]] = prev[val[0]] + 1 || 1
                return prev
            }, {})

            rows = Object.entries(count)
        }

        const newDataG = [
            cols,
            ...rows,
        ]

        setGraph({ ...graph, data: newDataG })
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.mas}</div>

            <section>
                <div className='text-center font-semibold text-lg'>
                    {langText.notify.title}
                </div>

                <RadioGroup
                    label='Color'
                    name='color'
                    orientation="horizontal"
                    className='mt-2'
                    defaultValue={notify.color}
                    onValueChange={e => notify.color = e}
                >
                    {['default', 'info', 'success', 'warning', 'error'].map(color =>
                        <Radio key={color} value={color}>{langText.notify.color[color]}</Radio>
                    )}
                </RadioGroup>

                <Input
                    type='text'
                    name='msg'
                    className='mt-2 input-xs'
                    placeholder={notify.msg}
                    defaultValue={notify.msg}
                    max={50}
                    onChange={e => notify.msg = e.target.value}

                    isClearable
                    onClear={() => notify.msg = ''}
                />

                <Button
                    color='primary'
                    className='mt-2 button-xs'
                    onClick={() => {
                        if (notify.color === 'default') {
                            toast(notify.msg)
                        } else {
                            toast[notify.color](notify.msg)
                        }
                    }}
                >
                    {langText.notify.showNotify}
                </Button>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={context.dark ? 'dark' : 'light'}
                />
            </section>

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <section className='w-full center'>
                <div className='text-center font-semibold text-lg'>
                    {langText.graphs.title}
                </div>

                <div className='center items-center'>
                    <RadioGroup
                        name='type'
                        orientation="horizontal"
                        className='mt-2'
                        defaultValue={graph.type}
                        onValueChange={e => graph.type = e}
                    >
                        {["ColumnChart", "Histogram", "LineChart", "ScatterChart", "PieChart"].map(g =>
                            <Radio key={g} value={g}>
                                {langText.graphs.graphSelects[g]}
                            </Radio>
                        )}
                    </RadioGroup>

                    <Button
                        color='primary'
                        className='mt-2 button-xs'
                        onClick={() => makeDataGraph()}
                    >
                        {langText.graphs.graph}
                    </Button>
                </div>

                <div id='graph' className='mt-6 xs:h-[90vw] max-h-[800px] xs:rounded-lg'>
                    {graph.data && (
                        <Chart
                            chartType={graph.type}
                            data={graph.data}
                            options={{
                                hAxis: { title: "X" },
                                vAxis: { title: "Y" },
                                ...options[graph.type]
                            }}
                            width={"100%"}
                            height={"100%"}
                        />
                    )}
                </div>

            </section>

        </main>
    );
}

export default Cartas;
