
import { useState } from "react";

import addLangText from '../../../../lang/Web/More/CisterciensesNumbers.json'
import { useOutletContext } from 'react-router-dom';

import { Input } from "@nextui-org/react";


function CisterciensesNumbers() {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang]
    }

    const [num, setNum] = useState('')
    const [digitos, setDigitos] = useState({})

    const bases_points = {
        0: {
            x: 6,
            y: 1,
        },
        1: {
            x: 6,
            y: 1,
        },
        2: {
            x: 6,
            y: 11,
        },
        3: {
            x: 6,
            y: 11,
        },
    }
    const cuadrantes = {
        0: {
            x: 1,
            y: 1,
        },
        1: {
            x: -1,
            y: 1,
        },
        2: {
            x: 1,
            y: -1,
        },
        3: {
            x: -1,
            y: -1,
        },
    }
    const distance = 3
    const lines_points = {
        a: [[0, 0], [1, 0]],
        b: [[1, 0], [1, 1]],
        c: [[1, 1], [0, 1]],
        d: [[0, 0], [1, 1]],
        e: [[0, 1], [1, 0]],
    }
    const numbers_lines = {
        1: ['a'],
        2: ['c'],
        3: ['d'],
        4: ['e'],
        5: ['a', 'e'],
        6: ['b'],
        7: ['a', 'b'],
        8: ['b', 'c'],
        9: ['a', 'b', 'c'],
    }


    const handleNum = e => {
        if (e === '' || (0 < e && e < 10000)) {
            setNum(e)
            const num_str = e.toString()
            const num_digs = num_str.split('')
            const new_digitos = {}

            var k = num_digs.length - 1
            for (let i = 0; i < num_digs.length; i++, k--) {
                const dig = num_digs[k] || 0

                const num_lines = numbers_lines[dig] || []
                const num_points = num_lines.reduce((prev, val) => {
                    return [...prev, ...lines_points[val]]
                }, [])

                const num_coords = num_points.map(val => {
                    const x = val[0] * distance * cuadrantes[i].x + bases_points[i].x
                    const y = val[1] * distance * cuadrantes[i].y + bases_points[i].y
                    return [x, y]
                })

                const num_coords_str = num_coords.map(val => val.toString()).toString()

                new_digitos[i] = num_coords_str
            }

            setDigitos(new_digitos)
        }
    }


    return (
        <section className="flex flex-col items-center gap-4">

            <div className='text-center font-semibold text-lg'>
                {langText.title}
            </div>

            <Input
                type="number"
                value={num}
                placeholder={langText.placeholder}
                className="max-w-32"
                onValueChange={handleNum}

                isClearable
                onClear={() => setDigitos({})}
            />

            <svg
                stroke="currentColor"
                className="bg-content2 rounded-lg "
                viewBox="0 0 12 12"
            >
                {Object.keys(digitos).length !== 0 &&
                    <path d="M 6,1 6,11" strokeLinecap="round"></path>
                }

                {Object.keys(digitos).map(digito =>
                    digitos[digito] !== '' && (
                        <path
                            key={digito}
                            d={"M " + digitos[digito]}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        ></path>
                    )
                )}

            </svg>

        </section>
    );
}

export default CisterciensesNumbers;
