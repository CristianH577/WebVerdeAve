import React, { useRef, useState } from 'react';
import './test.css'
import { useOutletContext } from 'react-router-dom';

import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";

import CreateChar from './create_char';

import { ToastContainer, toast } from 'react-toastify';

import { getFAPI,postFAPI } from '../../libs/fastapi';


function Test() {
    const context = useOutletContext()
    const [isLoading, setIsLoading] = useState(false)

    const server_notify_config = {
        lang: context.lang,
        dark: context.dark,
        // toastId: toast_server
    }

    // char ------------------------------------
    const [char, setChar] = useState(false)

    const getChar = async () => {
        setIsLoading(true)
        const char = await getFAPI("/chars/getElementById/0", server_notify_config)
        if (char.bool) {
            setChar(char.value)
        }
        setIsLoading(false)
    }

    const createChar = async data => {
        setIsLoading(true)
        const create = await postFAPI("/chars/add", data, server_notify_config)
        if (create.bool) {
            console.log('creado')
            // getChar()
        }
        setIsLoading(false)
    }

    // map ------------------------------------
    const baseCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u']
    const baseRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const toastId = useRef(null)
    const [showCoords, setshowCoords] = useState(false)


    const makeCell = (x, y) => {
        var data = ''
        if (char && char.map[x] && char.map[x][y]) {
            data = char.map[x][y]
        }

        var content = <></>
        var clase = ''

        switch (data.type) {
            case 'wall':
                clase = 'bg-slate-500'
                break;
            case 'empty':
                clase = 'bg-neutral-400'
                break;
            case 'mob':
                clase = 'center items-center'
                content = <div className='bg-danger w-[20px] h-[20px]'></div>
                break;
            case 'chest':
                clase = 'flex'
                content = <div className='bg-success w-[20px] h-[20px] m-auto'></div>
                break;
            case 'door':
                var size = ''
                switch (data.door.side) {
                    case 't':
                        size = 'w-full h-[15px]'
                        break;
                    case 'b':
                        size = 'w-full h-[15px] '
                        clase = 'flex items-end'
                        break;
                    case 's':
                        size = 'w-[15px] h-full'
                        break;
                    case 'e':
                        size = 'w-[15px] h-full '
                        clase = 'flex justify-end'
                        break;

                    default:
                        break;
                }
                content = <div className={'bg-warning ' + size} data-xy={x + ',' + y}></div>
                break;

            default:
                clase = 'bg-content1'
                break;
        }

        const mark = (data.type !== 'wall' && char && x === char.currentLoc.x && y === char.currentLoc.y) ? ' !bg-success' : ''
        return <div
            key={x + ',' + y}
            className={'min-w-[50px] h-[50px] data-[hover="true"]:cursor-pointer data-[hover="true"]:bg-danger  ' + clase + mark}

            data-hover={false}
            data-xy={x + ',' + y}

            onMouseEnter={e => {
                if (data.type !== 'wall') {
                    if (checkAllowMove(x, y)) e.currentTarget.setAttribute('data-hover', true)
                }
            }}
            onMouseLeave={e => {
                if (data.type !== 'wall') {
                    e.currentTarget.setAttribute('data-hover', false)
                }
            }}

            onClick={handleCellAction}
        >
            {content}

            {!['door', 'mob', 'chest'].includes(data.type) && (
                showCoords && (
                    <div
                        className='w-full h-full center items-center'
                        data-xy={x + ',' + y}
                    >
                        {(x + y)}
                    </div>
                )
            )}
        </div>
    }
    const checkAllowMove = (x, y) => {
        var bool = false
        if (!isLoading && !toast.isActive(toastId.current) && char !== false) {
            if (char.map[x]) {
                if (char.map[x][y]) {
                    switch (char.map[x][y].type) {
                        case 'empty':
                            bool = true
                            break;
                        case 'door':
                            bool = char.map[x][y].door.status === 1
                            break;
                        case 'mob':
                            bool = false
                            break;
                        case 'wall':
                            bool = false
                            break;
                        case 'chest':
                            bool = false
                            break;

                        default:
                            break;
                    }
                }
            }
        }

        if (bool) {
            const distX = Math.abs(baseCols.indexOf(x) - baseCols.indexOf(char.currentLoc.x))
            const distY = Math.abs(y - char.currentLoc.y)
            const checkX = distX === 1 && distY === 0
            const checkY = distY === 1 && distX === 0
            bool = checkY || checkX
        }
        return bool
    }


    // actions ------------------------------------
    const handleCellAction = async e => {
        setIsLoading(true)
        const xy = e.target.getAttribute('data-xy').split(',')
        const x = xy[0]
        const y = parseInt(xy[1])
        if (checkAllowMove(x, y)) {
            const url = "/chars/checkMove?x=" + x + "&y=" + y + "&id_char=" + char.id
            const interaction = await getFAPI(url, server_notify_config)
            if (interaction.bool) {
                if (interaction.status === 200) {
                    handleInteraction(interaction.value, -1)
                }
            }
            getChar()
        }
        setIsLoading(false)
    }

    const cleanToast = async () => {
        toast.dismiss(toastId.current)
        toastId.current = null
    }
    const handleInteraction = async (array, i) => {
        if (i === -1) {
            await cleanToast()
        }
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast("")
        }

        const new_msg = array[i + 1]
        if (new_msg) {
            var content = <></>

            if (typeof (new_msg) === 'string') {
                content = <div>
                    <div className='pb-2'>
                        {new_msg}.
                    </div>
                    <div className='text-sm text-neutral-500 text-end'>
                        Click para continuar
                    </div>
                </div>

                toast.update(toastId.current, {
                    render: content,
                    className: '!cursor-pointer',
                    onClick: () => handleInteraction(array, i + 1)
                })
            }
            else if (typeof (new_msg) === 'object') {
                content = <div>
                    <div>
                        {new_msg.msg}.
                    </div>
                    <div className='center ps-2'>
                        {new_msg.options.map(op =>
                            <span
                                key={op}
                                className='italic hover:text-warning cursor-pointer'
                                onClick={() => handleEvent(op)}
                            >
                                {'--> ' + op}
                            </span>
                        )}
                    </div>
                </div>

                toast.update(toastId.current, {
                    render: content,
                    className: '',
                })
            }
        }
        else {
            cleanToast()
        }
    }

    const [mob, setMob] = useState(false)
    const handleEvent = async op => {
        const url = "/chars/handleOption?op=" + op + "&id_char=" + char.id

        const event = await getFAPI(url, server_notify_config)
        if (event.bool) {
            if (event.value !== "") {
                switch (event.value.type) {
                    case "addItems":
                        getChar()
                        handleInteraction(event.value.data, -1)
                        break;
                    case "openDoor":
                        getChar()
                        break;
                    case "activateTrap":
                        getChar()
                        break;
                    case "fightWith":
                        var mob = event.value.data
                        setMob(mob)
                        break;
                    case "leaveFrom":
                        handleInteraction(event.value.data, -1)
                        break;

                    default:
                        break;
                }
                cleanToast()
            } else {
                cleanToast()
            }
        }
    }


    // fights ------------------------------------
    const default_turn = {
        state: 'decide',
        current: 'char',
        char: false,
        mob: false,
        msg: 'Que vas a hacer?',
    }
    const [turn, setTurn] = useState(default_turn)

    const handleFightContinue = () => {
        setIsLoading(true)

        var newTurn = { ...turn }

        if (turn.current === 'char') {
            if (turn.state === 'results') {
                newTurn.state = 'continue'
                newTurn.turn = 'mob'
                newTurn.mob = 'attack'
                newTurn.msg = "es turno del mob"
            }
        }
        else if (turn.current === 'mob') {
            if (turn.state === 'results') {
                newTurn.state = 'decide'
                newTurn.turn = 'char'
                newTurn.msg = "es tu turno"
            }
            else {
                newTurn.state = 'results'

                if (turn.mob === 'attack') {
                    if (turn.char === 'defence') {
                        newTurn.msg = "el mob te golpea pero cubres su ataque"
                    } else {
                        if (mob.damage > char.defence) {
                            const damage = (mob.damage - char.defence)
                            var new_char_hp = char.hp - damage
                            if (new_char_hp < 0) new_char_hp = 0
                            setChar({
                                ...char,
                                hp: new_char_hp
                            })

                            if (new_char_hp <= 0) {
                                newTurn.state = 'lost'
                                newTurn.msg = "moriste"
                            } else {
                                newTurn.msg = "el mob te golpea, te hizo " + damage + " de daño"
                            }
                        } else {
                            newTurn.msg = "el mob te golpea pero no tiene suficiente daño"
                        }
                    }
                }
            }
        }

        setTurn(newTurn)

        setIsLoading(false)
    }

    const handleFightDecide = e => {
        const action = e.target.name

        var newTurn = {
            ...turn,
            state: 'results',
            char: action,
        }
        switch (action) {
            case 'attack':
                if (char.damage > mob.defence) {
                    const damage = (char.damage - mob.defence)
                    var new_mob_hp = mob.hp - damage
                    if (new_mob_hp < 0) new_mob_hp = 0

                    setMob({
                        ...mob,
                        hp: new_mob_hp
                    })

                    if (new_mob_hp <= 0) {
                        newTurn.state = 'win'
                        newTurn.msg = "mataste al mob"
                    } else {
                        newTurn.msg = "golpeaste al mob, le hiciste " + damage + " de daño"
                    }
                }
                break;
            case 'defence':
                newTurn.msg = "te pocisionas para defenderte"
                break;

            default:
                break;
        }

        setTurn(newTurn)
    }


    //  ------------------------------------
    const resetGame = async () => {
        const r = await getFAPI("/chars/resetGame/" + char.id, server_notify_config)
        if (r.bool) {
            // console.log('game reset', r.value)
            setChar(false)
            cleanToast()
            setMob(false)
            setTurn(default_turn)
        }
    }


    const charBack = async () => {
        const r = await getFAPI("/chars/getElementById/" + char.id, server_notify_config)
        if (r.bool) {
            console.log('char back', r.value)
        }
    }
    const test = async () => {
        // eslint-disable-next-line
        const url = "/chars/selectClass?clase=mage&id_char=" + char.id
        const r = await getFAPI(url, server_notify_config)
        if (r.bool) {
            console.log('test', r)
            getChar()
            handleInteraction(r.value, -1)
        }
    }

    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>Test</div>

            <CreateChar createChar={createChar} />

            <div className='flex flex-wrap gap-4 mb-4'>
                <Button onClick={getChar}>
                    get char
                </Button>
                <Button
                    onClick={() => console.log(char)}
                    color={char ? 'success' : 'default'}
                >
                    char front
                </Button>
                <Button onClick={charBack}>
                    char back
                </Button>
                <Button onClick={() => setshowCoords(!showCoords)}>
                    show coords
                </Button>
                <Button
                    disabled={!char}
                    onClick={resetGame}
                >
                    reset
                </Button>
                <Button
                    onClick={() => console.log(toast.isActive(toastId.current))}
                >
                    toast active
                </Button>
                <Button
                    onClick={cleanToast}
                >
                    toast clean
                </Button>
                <Button
                    color={isLoading ? 'warning' : 'default'}
                    onClick={() => setIsLoading(!isLoading)}
                >
                    setIsLoading
                </Button>
                <Button
                    onClick={test}
                >
                    test
                </Button>
            </div>

            <section className='flex overflow-x-scroll w-full bg-neutral-400'>
                {baseCols.map(x =>
                    <div key={x} className='flex flex-col'>
                        {baseRows.map(y =>
                            makeCell(x, y)
                        )}
                    </div>
                )}
            </section>


            {/* fight */}
            <Modal
                isOpen={mob}
                className={context.dark ? 'dark text-foreground' : ''}
                placement='center'
                hideCloseButton={true}
            >
                <ModalContent>
                    <ModalBody className='bg-content2'>
                        <div className='flex justify-between'>
                            <div>
                                {['name', 'hp', 'mp', 'damage', 'defence'].map(stat =>
                                    char[stat] || char[stat] === 0
                                        ? <div key={'char-' + stat}>
                                            {stat + ': ' + char[stat]}
                                        </div>
                                        : null
                                )}
                            </div>
                            <div>
                                {['name', 'hp', 'mp', 'damage', 'defence'].map(stat =>
                                    mob[stat] || mob[stat] === 0
                                        ? <div key={'mob-' + stat}>
                                            {stat + ': ' + mob[stat]}
                                        </div>
                                        : null
                                )}
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter className='flex-col'>
                        <div
                            onClick={turn.state === 'decide' ? null : handleFightContinue}
                            className={['continue', 'results'].includes(turn.state) ? 'cursor-pointer' : null}
                        >
                            <div className='text-center mb-2' >
                                {turn.msg}
                            </div>

                            {['continue', 'results'].includes(turn.state) && (
                                <div className='text-sm text-neutral-500 text-end'>
                                    Click para continuar
                                </div>
                            )}
                        </div>

                        {turn.state === 'decide' && (
                            <div className='flex justify-center gap-4' >
                                {['attack', 'defence'].map(action =>
                                    <Button
                                        key={action}
                                        color='primary'
                                        name={action}
                                        onClick={handleFightDecide}
                                        disabled={isLoading}
                                    >
                                        {action}
                                    </Button>
                                )}
                            </div>
                        )}

                        {turn.state === 'lost' && (
                            <div className='flex justify-center gap-4' >
                                <Button
                                    color='primary'
                                    onClick={resetGame}
                                >
                                    Volver a empezar
                                </Button>
                            </div>
                        )}

                        {turn.state === 'win' && (
                            <div className='flex justify-center gap-4' >
                                <Button
                                    color='primary'
                                    onClick={() => {
                                        setMob(false)
                                        setTurn(default_turn)
                                    }}
                                >
                                    Salir
                                </Button>
                            </div>
                        )}

                        <Button onPress={() => {
                            setTurn(default_turn)
                            setChar({ ...char, hp: 7 })
                            setMob({ ...mob, hp: 4 })
                        }}>
                            reset turn
                        </Button>

                        <Button color="danger" onPress={() => setMob(false)}>
                            salir
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <ToastContainer
                toastId={toastId}
                position="bottom-center"
                autoClose={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                closeButton={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme={context.dark ? 'dark' : 'light'}
            />
        </main >
    );
}

export default Test;
