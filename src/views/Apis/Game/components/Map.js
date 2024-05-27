
import { Image } from "@nextui-org/react";


import char_icon from '../../../../assets/imgs/game/char.webp'

import chest from '../../../../assets/imgs/game/chest.webp'
import chest_open from '../../../../assets/imgs/game/chest_open.webp'

import mimic from '../../../../assets/imgs/game/mimic.webp'
import arrow from '../../../../assets/imgs/game/arrow.webp'
import lever from '../../../../assets/imgs/game/lever.webp'
import gas from '../../../../assets/imgs/game/gas.webp'
import trap_floor from '../../../../assets/imgs/game/trap_floor.webp'


function Map({ base_cols, char, zoom, move, checkAllowMove, handleCellAction, icons_mobs }) {
    const base_rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const showCoords = false


    const icons = {
        chest: <Image src={chest} alt="" radius="none" className="z-0" />,
        chest_open: <Image src={chest_open} alt="" radius="none" className="z-0" />,

        traps: {
            arrow: <Image src={arrow} alt="" radius="none" className="z-0" />,
            mimic: <Image src={mimic} alt="" radius="none" className="z-0" />,
            gas: <Image src={gas} alt="" radius="none" className="z-0 h-full" />,
            floor: <Image src={trap_floor} alt="" radius="none" className="z-0" />,
            lever: <Image src={lever} alt="" className="z-0" style={{ transform: ' rotateZ(90deg)' }} />,
        },

        lever: <Image src={lever} alt="" className="z-0" style={{ transform: 'rotateX(180deg) rotateZ(90deg)' }} />
    }


    const makeCell = (x, y) => {
        var data = ''
        if (char && char.map[x] && char.map[x][y]) data = char.map[x][y]

        var content = ''
        var clase = ''
        var bg = 'bg-piso'

        switch (data.kind) {
            case 'wall':
                bg = 'bg-ladrillo'
                break;
            case 'empty':
                break;

            default:
                clase = 'bg-content1'
                bg = 'bg-background'
                break;
        }

        switch (data.layer) {
            case 'door':
                var top = 0
                var left = 0
                var rotate = 0
                bg = data.door.show_inside === undefined ? 'bg-background' : 'bg-piso'
                switch (data.door.side) {
                    case 't':
                        left = 64 * zoom
                        if (data.door.status) {
                            rotate = -270
                        } else {
                            rotate = -180
                            top = 3 * zoom
                        }
                        break;
                    case 'b':
                        if (data.door.status) {
                            rotate = -90
                            top = 64 * zoom
                        } else {
                            rotate = 0
                            top = 61 * zoom
                        }
                        break;
                    case 's':
                        if (data.door.status) {
                        } else {
                            rotate = 90
                            left = 3 * zoom
                        }
                        break;
                    case 'e':
                        top = 64 * zoom
                        if (data.door.status) {
                            rotate = -180
                            left = 64 * zoom
                        } else {
                            rotate = -90
                            left = 61 * zoom
                        }
                        break;

                    default:
                        break;
                }
                content = <span
                    className=' bg-puerta bg-contain bg-no-repeat absolute transition-all ease origin-top-left '
                    style={{
                        zIndex: 1,
                        width: (64 * zoom) + 'px',
                        height: (16 * zoom) + 'px',
                        top: top + 'px',
                        left: left + 'px',
                        rotate: rotate + 'deg',
                    }}
                ></span>
                break;
            case "chest":
                clase = 'center items-center'
                content = data.interacted === "end" ? icons.chest_open : icons.chest
                break;
            case 'lever':
                content = icons.lever
                break;
            case 'mob':
                clase = 'center items-center'
                content = icons_mobs[data.mob]
                break;
            case 'trap':
                clase = 'center items-center'
                content = icons.traps[data.trap]
                break;

            default:
                break;
        }


        return <div
            key={[x, y]}
            className={
                ' relative bg-cover transition-all ease-in delay-500 '
                + bg
            }
            style={{
                width: (64 * zoom) + 'px',
                height: (64 * zoom) + 'px',
            }}
        >
            {content && (
                <span
                    className={'w-full h-full absolute ' + clase}
                >
                    {content}
                </span>
            )}

            {(showCoords && (
                <span className='w-full h-full center items-center absolute' >
                    {[x, y]}
                </span>
            ))}

            <span
                className='w-full h-full absolute z.10 bg-cover opacity-50 data-[show="1"]:cursor-pointer data-[show="2"]:cursor-pointer data-[show="1"]:bg-char '
                data-xy={[x, y]}
                onClick={handleCellAction}

                data-show={false}
                onMouseEnter={e => {
                    if (data.kind === 'empty') {
                        if (checkAllowMove(x, y)) {
                            if (data.layer === undefined) {
                                e.currentTarget.setAttribute('data-show', 1)
                            } else {
                                e.currentTarget.setAttribute('data-show', 2)
                            }
                        }
                    }
                }}
                onMouseLeave={e => {
                    if (data.kind === 'empty') {
                        e.currentTarget.setAttribute('data-show', false)
                    }
                }}
            ></span>
        </div>
    }


    return (
        <section
            id='map'
            className='flex overflow-hidden w-full bg-neutral-400 relative max-w-fit'
            style={{
                height: (64 * zoom * 7) + "px"
            }}
        >
            {base_cols.map(x =>
                <div key={x} className='flex flex-col h-fit'>
                    {base_rows.map(y =>
                        makeCell(x, y)
                    )}
                </div>
            )}

            <Image
                src={char_icon} 
                alt=""
                radius="none"
                hidden={move[0] === 0 && move[1] === 0}
                removeWrapper
                className="z-10 absolute"
                style={{
                    left: move[0] + 'px',
                    top: move[1] + 'px',
                    zIndex: 10,
                    width: (64 * zoom) + 'px',
                    height: (64 * zoom) + 'px',
                    transition:'all .5s ease-in-out'
                }}
            />
            
        </section>
    );
}

export default Map;
