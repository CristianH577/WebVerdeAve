
import { Button, Select, SelectItem } from '@nextui-org/react'


function BoardBase({ cells_types, handleCell, data, getBoardTest, ilumination, setIlumination }) {

    return (
        <div className='flex flex-col gap-2 items-center '>
            <h1 >Tablero base</h1>

            <div className='space-y-2 overflow-x-auto max-w-[95vw]'>
                <div className='space-y-2 '>
                    {Object.keys(data).map(row =>
                        <div key={row} className='flex gap-2 '>
                            {Object.keys(data[row]).map(col =>
                                <Button
                                    key={[row, col]}
                                    data-row={row}
                                    data-col={col}
                                    onClick={handleCell}
                                    isIconOnly
                                    className='dark:text-foreground'
                                    variant={
                                        data[row][col].kind === 'empty'
                                            ? 'ghost' : 'solid'
                                    }
                                    color={cells_types[data[row][col].kind].color}
                                >
                                    {row}-{col}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className='flex flex-wrap items-center justify-center gap-2'>
                <Select
                    label='Iluminacion'
                    selectedKeys={[ilumination]}
                    onSelectionChange={e => e.size && setIlumination(e.currentKey)}
                    size='sm'
                    className='w-28'
                >
                    {[1, 2, 3, 4, 5].map(key =>
                        <SelectItem key={key} title={key.toString()} />
                    )}
                </Select>

                <Button onClick={getBoardTest}>
                    Generar prueba
                </Button>
            </div>
        </div>
    );
}

export default BoardBase;
