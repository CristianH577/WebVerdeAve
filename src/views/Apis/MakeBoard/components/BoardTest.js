
import { Button } from '@nextui-org/react'



function BoardTest({ cells_types, handleCell, data }) {
    const current = data.current
    const map = data.map


    return (
        <div className='flex flex-col gap-2 items-center'>
            <h1>Tablero de prueba</h1>

            <div className='space-y-2 overflow-x-auto max-w-[95vw]'>
                <div className='space-y-2 '>
                    {Object.keys(map).map(row =>
                        <div key={row} className='flex gap-2'>
                            {Object.keys(map[row]).map(col =>
                                <Button
                                    key={[row, col]}
                                    data-row={row}
                                    data-col={col}
                                    isIconOnly
                                    className={'hover:!bg-secondary ' + ([row, col].toString() === current.toString() ? 'text-red-300 ' : '')}
                                    color={
                                        map[row][col]?.kind !== undefined
                                            ? cells_types[map[row][col].kind].color
                                            : 'default'
                                    }
                                    variant={
                                        map[row][col]?.kind !== undefined
                                            ? cells_types[map[row][col].kind].variant
                                            : 'ghost'
                                    }
                                    onClick={handleCell}
                                >
                                    {map[row][col]?.seen}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div>
                {[
                    'Presione las casillas para iluminar.',
                    '1: Celda seleccionada',
                    '2: Celdas en la misma fila o columna',
                    '3: Celdas visibles',
                    '4: Celdas vistas pero fuera de rango',
                ].map((e, i) =>
                    <p key={i} className='text-neutral-500 text-small'>
                        {e}
                    </p>
                )}
            </div>

            <Button onClick={() => console.log(data)}>
                data
            </Button>
        </div>
    );
}

export default BoardTest;
