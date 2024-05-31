
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

import { postFAPI } from '../../../libs/fastapi.js'

import { Button } from '@nextui-org/react'

import ErrorBoundary from '../../../components/ErrorBoundary.js'
import FormBoardBase from './components/FormBoardBase.js';
import BoardTest from './components/BoardTest.js';
import BoardBase from './components/BoardBase.js';


function MakeBoard() {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
    }


    const cells_types = {
        empty: {
            color: 'primary',
            variant: 'ghost',
            label: 'Vacio',
        },
        wall: {
            color: 'default',
            variant: 'solid',
            label: 'Muro',
        },
        door_closed: {
            color: 'danger',
            variant: 'solid',
            label: 'Puerta cerrada',
        },
        door_open: {
            color: 'success',
            variant: 'solid',
            label: 'Puerta abierta',
        },
        enemy: {
            color: 'warning',
            variant: 'shadow',
            label: 'Enemigo',
        },
        trap: {
            color: 'primary',
            variant: 'flat',
            label: 'Trampa',
        },
    }

    const [isLoading, setIsLoading] = useState(false)
    const [boardBaseData, setBoardBaseData] = useState(false)
    const [boardTestData, setBoardTestData] = useState(false)
    const [cellType, setCellType] = useState('empty')
    const [ilumination, setIlumination] = useState('3')


    const getBoardBase = async (e) => {
        setIsLoading(true)

        const response = await postFAPI("mechanics/makeBase", e, lang)

        if (response.bool && response.value) {
            setBoardBaseData({ ...response.value })
            setBoardTestData(false)
        }
        setIsLoading(false)
    }

    const handleCellBase = e => {
        const row = e.target.dataset.row
        const col = e.target.dataset.col

        const new_board = structuredClone(boardBaseData)

        new_board[row][col].kind = cellType

        setBoardBaseData(new_board)
    }

    const getBoardTest = () => {
        setBoardTestData(false)

        const new_board = {}
        for (const k in boardBaseData) {
            new_board[k] = {}
            for (const k1 in boardBaseData[k]) {
                new_board[k][k1] = {}
            }
        }
        setTimeout(() => {
            setBoardTestData({
                map: new_board,
                current: [0, 0]
            })
        }, 200)
    }

    const handleCellTest = async e => {
        setIsLoading(true)
        const row = e.target.dataset.row
        const col = e.target.dataset.col

        const data = {
            map_base: boardBaseData,
            test_data: boardTestData,
            row: row,
            col: col,
            ilumination: ilumination,
        }

        const response = await postFAPI("mechanics/showCells", data, lang)

        if (response.bool && response.value) {
            setBoardTestData(response.value)
        }

        setIsLoading(false)
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.make_board}
            </div>

            <FormBoardBase
                isLoading={isLoading}
                onSubmit={getBoardBase}
            />


            {boardBaseData && (
                <section className='text-center space-y-2 border p-2 rounded-lg border-divider'>
                    <h1>Seleccione un tipo:</h1>

                    <div className='flex gap-2 justify-center flex-wrap'>
                        {Object.keys(cells_types).map(type =>
                            <div key={type} className='flex gap-2 items-center'>
                                <Button
                                    variant={cells_types[type].variant}
                                    color={cells_types[type].color}
                                    className={'dark:text-foreground ' + (type === cellType ? 'border-b-5 border-secondary' : '')}
                                    onClick={() => setCellType(type)}
                                >
                                    {cells_types[type].label}
                                </Button>
                            </div>
                        )}
                    </div>

                    <p className='text-neutral-500 text-small break-all'>
                        Presione las casillas del tablero base para cambiar su tipo.
                    </p>
                </section>
            )}

            <section className='flex gap-6 flex-wrap justify-center'>
                {boardBaseData && (
                    <ErrorBoundary lang={context.lang}>
                        <BoardBase
                            cells_types={cells_types}
                            handleCell={handleCellBase}
                            data={boardBaseData}
                            getBoardTest={getBoardTest}
                            ilumination={ilumination}
                            setIlumination={setIlumination}
                        />
                    </ErrorBoundary>
                )}

                {boardTestData && (
                    <ErrorBoundary lang={context.lang}>
                        <BoardTest
                            cells_types={cells_types}
                            handleCell={handleCellTest}
                            data={boardTestData}
                        />
                    </ErrorBoundary>
                )}
            </section>
        </main >
    );
}

export default MakeBoard;
