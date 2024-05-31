import { useState } from 'react';
import './Graphs.css'

import addLangText from '../../../../lang/Web/More/Graphs.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Radio, RadioGroup } from '@nextui-org/react';

import { Chart } from "react-google-charts";


function Graphs() {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang]
    }

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
        setGraph({ ...graph, data: 'loading' })
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
        <section className='w-full center'>
            <div className='text-center font-semibold text-lg'>
                {langText.title}
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
                            {langText.graphSelects[g]}
                        </Radio>
                    )}
                </RadioGroup>

                <Button
                    color='primary'
                    className='mt-2 button-xs'
                    onClick={() => makeDataGraph()}
                    isLoading={graph.data === 'loading' ? true : false}
                >
                    {langText.graph}
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
    );
}

export default Graphs;
