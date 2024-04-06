import React, { useEffect, useRef, useState } from 'react';
import './game.css'

import addLangText from '../../lang/game/game.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input, Progress, Tooltip, ButtonGroup } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";

import CreateChar from './components/create_char';

import { ToastContainer, toast } from 'react-toastify';

import { getFAPI, postFAPI, deleteFAPI } from '../../libs/fastapi';

import { LuSword, LuShield, LuHeart, LuSwords, LuSkull } from "react-icons/lu";
import { GiBackpack, GiChest, GiOpenChest, GiGoblinHead, GiOrcHead, GiMimicChest, GiArrowFlights, GiMantrap, GiLever, GiAbdominalArmor } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { CgGhostCharacter } from "react-icons/cg";
import { Reset } from '../../assets/icons.js';

import constantin from './components/char_admin_data'


function Game() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const [isLoading, setIsLoading] = useState(false)

    const server_notify_config = {
        lang: context.lang,
        dark: context.dark,
    }

    const icons = {
        char: <CgGhostCharacter className='w-full h-full' color='black' />,

        chest: <GiChest className='w-3/4 h-3/4' color='gold' />,
        chest_open: <GiOpenChest className='w-1/2 h-3/4' color='gold' />,

        goblin: <GiGoblinHead className='w-3/4 h-3/4' color='red' />,
        orc: <GiOrcHead className='w-3/4 h-3/4' color='red' />,

        hp: <LuHeart size={25} className='text-danger' />,
        hp_max: <LuHeart size={25} className='text-danger' />,
        damage: <LuSword size={25} color='gray' />,
        defence: <LuShield size={25} color='gold' />,

        attack: <LuSword />,
        fight: <LuSwords />,
        leave: <FaRunning />,
        inventory: <GiBackpack size={30} className='text-game_s1' />,

        trap: {
            arrow: <GiArrowFlights className='w-full h-full' color='steelblue' />,
            chest: <GiMimicChest className='w-full h-full' color='steelblue' />,
            floor: <GiMantrap className='w-full h-full' color='steelblue' />,
            lever: <GiLever className='w-1/2 h-full' style={{ transform: 'rotateZ(90deg)' }} color='steelblue' />,
        },
        lever: <GiLever className='w-full h-full' color='firebrick' />,

        items: {
            1: <LuHeart size={30} />,
            3: <LuSword size={30} />,
            5: <GiAbdominalArmor size={30} />
        },

        death: <LuSkull size={100} />
    }

    // char ------------------------------------
    const [char, setChar] = useState(false)

    const getChar = async () => {
        setIsLoading(true)

        if (typeof char === 'number' || char.id) {
            const id = char.id || char
            const char_data = await getFAPI("/chars/getElementById/" + id, server_notify_config)
            if (char_data.bool) {
                setChar(char_data.value)
            }
        }

        setIsLoading(false)
    }

    const createChar = async values => {
        setIsLoading(true)
        const data = { data: JSON.stringify(values) }
        const create = await postFAPI("/chars/add", data, server_notify_config)
        if (create.bool) setChar(create.value)
        setIsLoading(false)
        return create.bool
    }

    // map ------------------------------------
    const baseCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u']
    const baseRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const toastId = useRef(null)
    const [showCoords] = useState(false)
    const [zoom, setZoom] = useState(1)
    const [move, setMove] = useState([0, 0])


    const makeCell = (x, y) => {
        var data = ''
        if (char && char.map[x] && char.map[x][y]) {
            data = char.map[x][y]
        }

        var content = ''
        var clase = ''
        var bg = 'bg-piso'

        switch (data.kind) {
            case 'wall':
                bg = 'bg-ladrillo'
                break;
            case 'empty':
                break;
            case 'mob':
                clase = 'center items-center'
                const kind = data.mob.kind
                if (kind === 'goblin') {
                    content = icons.goblin
                } else if (kind === 'orc') {
                    content = icons.orc
                }
                break;
            case 'trap':
                if (icons.trap[data.trap.kind]) {
                    content = icons.trap[data.trap.kind]
                } else {
                    clase = 'center items-center'
                    content = <div
                        className='bg-primary '
                        style={{
                            width: (32 * zoom) + 'px',
                            height: (32 * zoom) + 'px',
                        }}
                    >

                    </div>
                }
                break;
            case 'chest':
                clase = 'center items-center'
                if (data.interacted && data.interacted === 'end') {
                    content = icons.chest_open
                } else {
                    content = icons.chest
                }
                break;
            case 'door':
                var top = 0
                var left = 0
                var rotate = 0
                bg = (data.door.status === 0 && data.interacted === undefined) ? 'bg-background' : 'bg-piso'
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
            case 'lever':
                var rotateX = '180'
                if (data.interacted && data.interacted === 'end') rotateX = '0'
                content = <div
                    className='w-1/2 h-full'
                    style={{ transform: 'rotateX(' + rotateX + 'deg) rotateZ(90deg)' }}
                >
                    {icons.lever}
                </div>
                break;

            default:
                clase = 'bg-content1'
                bg = 'bg-background'
                break;
        }


        return <div
            key={[x, y]}
            className={
                ' relative bg-cover '
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
                className='w-full h-full absolute data-[hover="true"]:cursor-pointer z.10 bg-cover opacity-50 data-[hover="true"]:bg-char '
                data-xy={[x, y]}
                onClick={handleCellAction}

                data-hover={false}
                onMouseEnter={e => {
                    if (data.kind !== 'wall') {
                        if (checkAllowMove(x, y)) e.currentTarget.setAttribute('data-hover', true)
                    }
                }}
                onMouseLeave={e => {
                    if (data.kind !== 'wall') {
                        e.currentTarget.setAttribute('data-hover', false)
                    }
                }}
            ></span>
        </div>
    }
    const checkAllowMove = (x, y) => {
        var bool = false
        if (!isLoading && !toast.isActive(toastId.current) && char !== false) {
            if (x in char.map) {
                if (y in char.map[x]) {
                    switch (char.map[x][y].kind) {
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
                            bool = true
                            break;
                    }
                }
            }
        }

        if (bool) {
            const distX = Math.abs(baseCols.indexOf(x) - baseCols.indexOf(char.currentLoc[0]))
            const distY = Math.abs(y - char.currentLoc[1])
            const checkX = distX === 1 && distY === 0
            const checkY = distY === 1 && distX === 0
            bool = checkY || checkX
        }
        if (char.id === 1) bool = true

        return bool
    }

    const generateMap = () => {
        return <section
            id='map'
            className='flex overflow-hidden w-full bg-neutral-400 relative max-w-fit'
            style={{
                height: (64 * zoom * 7) + "px"
            }}
        >
            {baseCols.map(x =>
                <div key={x} className='flex flex-col h-fit'>
                    {baseRows.map(y =>
                        makeCell(x, y)
                    )}
                </div>
            )}

            <CgGhostCharacter
                className=' absolute transition-all ease-in '
                hidden={move[0] === 0 && move[1] === 0}
                style={{
                    left: move[0] + 'px',
                    top: move[1] + 'px',
                    zIndex: 10,
                    width: (64 * zoom) + 'px',
                    height: (64 * zoom) + 'px',
                }}
                color='black'
            />
        </section>
    }


    // actions ------------------------------------
    const handleMove = async (x, y) => {
        const url = "/chars/checkMove?x=" + x + "&y=" + y + "&id_char=" + char.id
        const interaction = await getFAPI(url, server_notify_config)

        if (interaction.bool) {
            if (interaction.status === 200) {
                handleInteraction(interaction.value, -1)
            }
        }

        getChar()
    }
    const handleMoveIconChar = () => {
        if (char.currentLoc) {
            const x_str = char.currentLoc[0]
            const y = char.currentLoc[1] - 1
            const x = baseCols.indexOf(x_str)
            setMove([64 * zoom * x, 64 * zoom * y])

            document.querySelector('#map').scroll(64 * zoom * (x - 2), 64 * zoom * (y - 2))
        }
    }
    const handleCellAction = async e => {
        setIsLoading(true)

        const xy = e.target.getAttribute('data-xy').split(',')
        const x = xy[0]
        const y = parseInt(xy[1])

        if (checkAllowMove(x, y)) {
            await handleMove(x, y)
            // setChar({ ...char, currentLoc: [x, y] })
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
                content =
                    <div className='text-center'>
                        <div className='pb-2'>
                            {new_msg}
                        </div>
                        <div className='text-sm text-game_s1'>
                            {langText.toast.to_continue}
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
                        {new_msg.msg}
                    </div>
                    <div className='center ps-2'>
                        {new_msg.options.map(op =>
                            <span
                                key={op}
                                className='italic hover:text-game_s1 cursor-pointer flex gap-2 items-center'
                                onClick={() => handleEvent(op)}
                            >
                                {['fight', 'leave'].includes(op)
                                    ? icons[op]
                                    : '--> '
                                }
                                {langText.toast[op] ? langText.toast[op] : op}
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
            getChar()
        }
    }

    const handleEvent = async op => {
        const url = "/chars/handleOption?op=" + op + "&id_char=" + char.id

        const event = await getFAPI(url, server_notify_config)
        if (event.bool) {
            if (event.value !== "") {
                var msg = false
                switch (event.value.event_type) {
                    case "openDoor":
                        const data = event.value.data
                        if (Array.isArray(data)) {
                            msg = data
                        }
                        else if (typeof data === 'object') {
                            handleMove(data.x, data.y)
                        }
                        break;
                    case "activateTrap":
                        msg = event.value.data
                        break;
                    case "fightWith":
                        getChar()
                        break;
                    case "leaveFrom":
                        msg = event.value.data
                        break;
                    case "openChest":
                        msg = event.value.data
                        break;
                    case "specialEvent":
                        if (event.value.data) {
                            if (event.value.data === "restart") {
                                restart()
                            } else {
                                msg = event.value.data
                            }
                        }
                        break;

                    default:
                        break;
                }
                cleanToast()

                if (msg) handleInteraction(msg, -1)
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
    const [specialEvent, setSpecialEvent] = useState(false)

    const handleFightDecide = async e => {
        setIsLoading(true)
        const action = e.target.name

        var new_turn = {
            ...turn,
            state: 'results',
            char: action,
        }
        switch (action) {
            case 'attack':
                const url = "/chars/handleFight"
                const data = { turn: JSON.stringify(new_turn), id_char: char.id }
                const response = await postFAPI(url, data, server_notify_config)
                if (response.bool) new_turn = response.value
                break;
            case 'defence':
                new_turn.msg = "Te pocisionas para defenderte"
                break;
            case 'back':
                new_turn.msg = "Que vas a hacer?"
                new_turn.state = 'decide'
                break;

            default:
                if (typeof action === 'number') {
                    const url = "/chars/handleFight"
                    const data = { turn: JSON.stringify(new_turn), id_char: char.id }
                    const response = await postFAPI(url, data, server_notify_config)
                    if (response.bool) new_turn = response.value
                }
                break;
        }

        setTurn(new_turn)
        getChar()
        setIsLoading(false)
    }

    const handleFightContinue = async () => {
        setIsLoading(true)

        var new_turn = { ...turn }

        if (turn.current === 'char') {
            if (char.mob.stats.hp <= 0) {
                new_turn.state = 'win'
                new_turn.msg = "Mataste al mob"
            }
            else if (turn.state === 'results') {
                new_turn.state = 'continue'
                new_turn.current = 'mob'
                new_turn.mob = 'attack'
                new_turn.msg = "Es turno del mob"
            }
            else if (typeof turn.char === 'number') {
                new_turn.state = 'decide'
                new_turn.msg = 'Que vas a hacer?'
            }
        }
        else if (turn.current === 'mob') {
            if (char.stats.hp <= 0) {
                new_turn.state = 'lost'
                new_turn.msg = "Moristes"
            }
            else if (turn.state === 'results') {
                new_turn.state = 'decide'
                new_turn.current = 'char'
                new_turn.msg = "Es tu turno"
            }
            else {
                new_turn.state = 'results'

                if (turn.mob === 'attack') {
                    const url = "/chars/handleFight"
                    const data = { turn: JSON.stringify(new_turn), id_char: char.id }
                    const response = await postFAPI(url, data, server_notify_config)
                    if (response.bool) {
                        new_turn = response.value
                    }
                }
            }
        }

        setTurn(new_turn)
        getChar()
        setIsLoading(false)
    }

    const handleFightEnd = async () => {
        setIsLoading(true)
        const url = "/chars/endFight/" + char.id

        const end = await getFAPI(url, server_notify_config)

        if (end.bool) {
            await getChar()
            if (end.status === 200) {
                const stats_points = end.value
                setAddStats({
                    ...char.stats,
                    add: stats_points
                })
            }
        }
        setTurn(default_turn)
        setIsLoading(false)
    }

    const [addStats, setAddStats] = useState(false)
    const handleAddStat = async () => {
        ['hp_max', 'damage', 'defence'].forEach(stat => char.stats[stat] = addStats[stat])
        char.stats.hp = addStats.hp_max
        setChar({ ...char })

        const data = { char: JSON.stringify(char) }
        const url = "/chars/update"

        const update = await postFAPI(url, data, server_notify_config)
        if (update.bool) {
            setSpecialEvent(false)
            getChar()
        }
    }
    const handleLvlUp = () => {
        if (char && addStats) {
            const body =
                <ModalBody className='items-center justify-between'>
                    <div className='text-center'>
                        <div className='font-bold'>Has subido de nivel! Ahora eres nivel {char.level}. </div>

                        <div>Conseguiste puntos de habilidad!</div>
                    </div>

                    <div className='text-center'>
                        <div>Tienes: {addStats.add}</div>

                        <div className='w-full center items-center gap-2 mt-2'>

                            {['hp_max', 'damage', 'defence'].map(stat =>
                                <div key={stat} className='w-full flex justify-center items-center gap-2 items-center gap-2 max-xs:flex-col'>
                                    {icons[stat]}

                                    <div className='flex w-[150px]'>
                                        <Button
                                            isIconOnly
                                            className='rounded-e-none  button-game '
                                            isDisabled={addStats[stat] === char.stats[stat]}
                                            onClick={() => {
                                                const new_addStats = { ...addStats }
                                                new_addStats[stat] -= 1
                                                new_addStats.add += 1
                                                setAddStats(new_addStats)
                                            }}
                                        >
                                            -
                                        </Button>

                                        <Input
                                            type='number'
                                            name={stat}
                                            value={addStats[stat]}
                                            readOnly
                                            size='xs'
                                            className='bx-0'
                                            min={char.stats[stat]}
                                            max={4 + char.level}
                                            classNames={{
                                                label: 'text-md text-game_s2 !p-0',
                                                mainWrapper: 'w-full text-center',
                                                input: 'text-center !text-game_s2',
                                                errorMessage: 'text-center',
                                                inputWrapper: ' rounded-none bg-game_s1 data-[hover=true]:bg-game_s1 data-[focus=true]:!bg-game_s1'
                                            }}
                                        >
                                            {stat}
                                        </Input>

                                        <Button
                                            isIconOnly
                                            className='rounded-s-none button-game '
                                            isDisabled={addStats.add === 0}
                                            onClick={() => {
                                                const new_addStats = { ...addStats }
                                                new_addStats[stat] += 1
                                                new_addStats.add -= 1
                                                setAddStats(new_addStats)
                                            }}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        className='button-game'
                        isDisabled={addStats.add !== 0}
                        onClick={handleAddStat}
                    >
                        Guardar
                    </Button>
                </ModalBody>

            setSpecialEvent({ event: 'lvlup', body: body })
        }
    }


    const useConsumable = async e => {
        setIsLoading(true)
        const id_item = e.target.name

        const url = "/chars/useConsumable?id_item=" + id_item + "&id_char=" + char.id

        const use = await getFAPI(url, server_notify_config)

        if (use.bool) {
            handleInteraction(use.value, -1)
            setSpecialEvent(false)
        }

        setIsLoading(false)
    }
    const openInventory = () => {
        const item_file = item => {
            return <div className=''>
                {Object.entries(item).map((i, k) =>
                    <div key={k}>
                        <span className='uppercase'>{i[0]}: </span>
                        {i[1]}
                    </div>
                )}
            </div>
        }

        const body = <ModalBody className=' justify-between'>
            <div className='font-bold text-[50px] text-center'>
                {langText.action.inventory}
            </div>

            <div className='flex justify-center gap-4' >
                {Object.values(char.inventory).map(item =>
                    <Tooltip
                        key={item.id}
                        content={item_file(item)}
                        placement='bottom'
                        className={
                            'rounded-medium bg-game_s2 text-game_s1'
                            + (context.dark ? ' dark' : '')
                        }
                        classNames={{
                            base: 'rounded-medium',
                        }}
                    >
                        <Button
                            name={item.id}
                            isIconOnly
                            className='button-game'
                            disabled={item.kind !== "consumable"}
                            onPress={item.kind === "consumable" && useConsumable}
                        >
                            {icons.items[item.id] ? icons.items[item.id] : "?"}
                        </Button>
                    </Tooltip>
                )}
            </div>

            <div className='flex justify-center mt-4' >
                <Button
                    name='back'
                    className='button-game '
                    onClick={() => setSpecialEvent(false)}
                    disabled={isLoading}
                >
                    {langText.close}
                </Button>
            </div>
        </ModalBody>

        setSpecialEvent({ event: 'inventory', body: body })
    }


    //  ------------------------------------
    const resetGame = async () => {
        if (char) {
            const r = await deleteFAPI("chars/" + char.id, server_notify_config)
            if (r.bool) {
                setChar(false)
                cleanToast()
                setTurn(default_turn)
                setSpecialEvent(false)
            }
        }
    }
    const restart = async () => {
        if (char) {
            const r = await getFAPI("/chars/restart/" + char.id, server_notify_config)
            if (r.bool) {
                setChar(char.id)
                cleanToast()
                setTurn(default_turn)
                setSpecialEvent(false)
                document.querySelector('#map').scroll(0, 0)
                getChar()
            }
        }
    }


    //  ------------------------------------
    useEffect(() => {
        if (typeof char === "object" && char.stats.hp === 0) {
            const body =
                <ModalBody className='items-center justify-center'>
                    {icons.death}
                    <div className='font-bold' >
                        {langText.death_msg}
                    </div>

                    <Button
                        className='button-game'
                        onClick={async () => {
                            await restart()
                            getChar()
                        }}
                    >
                        {langText.play_again}
                    </Button>
                </ModalBody>
            setSpecialEvent({ event: 'death', body: body })
        }
        handleMoveIconChar()
        // eslint-disable-next-line
    }, [char])

    // eslint-disable-next-line
    useEffect(handleMoveIconChar, [zoom])

    // eslint-disable-next-line
    useEffect(handleLvlUp, [addStats])


    //  ------------------------------------
    const getAdminChar = async () => {
        setIsLoading(true)
        const char_data = await getFAPI("/chars/getElementById/" + 1, server_notify_config)
        if (char_data.bool) {
            setChar(char_data.value)
        }
        setIsLoading(false)
    }
    const charBack = async () => {
        const r = await getFAPI("/chars/getElementById/" + char.id, server_notify_config)
        if (r.bool) {
            console.log('char back', r.value)
        }
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.game}</div>

            <div className='flex flex-wrap gap-4 mb-4 border-y'>
                <Button onClick={getAdminChar} color='primary'>admin char</Button>
                <Button onClick={() => setChar(constantin)} color='primary'>constantin</Button>
                <Button onClick={() => setChar(false)} color='primary'>char false</Button>

                {typeof char === 'number'
                    ?
                    <Button onClick={getChar}>
                        get char
                    </Button>
                    :
                    <Button onClick={() => setChar(2)} >test char</Button>
                }

                <Button onClick={() => console.log(char)}>char front</Button>
                <Button onClick={charBack}>char back</Button>

            </div>


            {char === false && (
                <CreateChar createChar={createChar} />
            )}

            {typeof char === 'number' && (
                <div className='style-game center xs:rounded-lg p-8 mb-4 '>
                    <div className='font-bold text-4xl mb-8 text-center'>
                        {langText.char_created}!
                    </div>
                    <div className='text-center'>
                        <Button className='button-game' onClick={getChar}>
                            {langText.start}
                        </Button>
                    </div>
                </div>
            )}


            {typeof char === 'object' && (
                <>
                    {/* menu */}
                    <div className='flex flex-wrap gap-4 mb-4 max-xs:flex-col max-xs:w-full'>
                        <Button
                            className='button-xs'
                            disabled={!char}
                            onClick={restart}
                            color='secondary'
                        >
                            {langText.play_again}
                        </Button>

                        <div className='flex items-center gap-1 max-xs:flex-col'>
                            Zoom
                            <ButtonGroup className='buttongroup-xs' color='primary'>
                                <Button
                                    isDisabled={zoom <= 1}
                                    isIconOnly
                                    onClick={() => {
                                        if (zoom > 1) setZoom(zoom - 1)
                                    }}
                                >
                                    -
                                </Button>
                                <Button
                                    isDisabled={zoom >= 5}
                                    isIconOnly
                                    onClick={() => {
                                        if (zoom < 5) setZoom(zoom + 1)
                                    }}
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </div>

                        <Button
                            className='button-xs'
                            isIconOnly
                            onClick={resetGame}
                        >
                            <Reset />
                        </Button>
                    </div>

                    {/* char info */}
                    <section
                        className={'flex gap-2 mb-4 items-center style-game xs:rounded-lg py-2 px-2 xs:px-6 max-xs:w-full max-xs:flex-col'}>
                        <div className='flex flex-col'>
                            <div className='capitalize text-xl mb-1 text-center'>
                                {char.name} - {char.clase} LvL {char.level}
                            </div>
                            <div className='flex items-center gap-2'>
                                {icons.hp}
                                <Progress
                                    color="danger"
                                    value={char.stats.hp * 100 / char.stats.hp_max}
                                    aria-label='hp'
                                    classNames={{
                                        track: 'bg-game_s2'
                                    }}
                                />
                            </div>
                            <div className='flex justify-evenly'>
                                <div className='flex gap-2 items-center text-xl'>{icons.damage} {char.stats.damage}</div>
                                <div className='flex gap-2 items-center text-xl'>{icons.defence} {char.stats.defence}</div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 justify-evenly'>
                            <Tooltip
                                content={langText.action.inventory}
                                placement='bottom'
                                className={
                                    'rounded-medium bg-game_s2 text-game_s1'
                                    + (context.dark ? ' dark' : '')
                                }
                                classNames={{
                                    base: 'rounded-medium',
                                }}
                            >
                                <Button
                                    isIconOnly
                                    className='button-game'
                                    onClick={openInventory}
                                >
                                    {icons.inventory}
                                </Button>
                            </Tooltip>
                        </div>
                    </section>

                    {/* map */}
                    {generateMap()}


                    {/* fight */}
                    <Modal
                        isOpen={Boolean(char.mob)}
                        className={
                            'max-xs:rounded-none max-xs:w-full max-xs:m-0 max-xs:h-full '
                            + (context.dark ? 'dark ' : null)
                        }
                        placement='center'
                        hideCloseButton
                    >
                        <ModalContent className='style-game text-game_s1 font-bold'>
                            <ModalBody className='bg-game_s2 text-game_s1 max-xs:h-1/2 flex justify-evenly items-center gap-8 xs:flex-row'>
                                <div className='center w-1/2 max-xs:w-full text-center'>
                                    <div>
                                        {char.name}
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        {icons.hp}
                                        <Progress
                                            color="danger"
                                            value={char.stats.hp * 100 / char.stats.hp_max}
                                            aria-label='hp'
                                            classNames={{
                                                track: 'bg-game_s1'
                                            }}
                                        />
                                    </div>

                                    <div className='flex justify-evenly'>
                                        <div className='flex gap-2 items-center text-xl'>{icons.damage} {char.stats.damage}</div>
                                        <div className='flex gap-2 items-center text-xl'>{icons.defence} {char.stats.defence}</div>
                                    </div>
                                </div>

                                {char.mob && (
                                    <div className='center w-1/2 max-xs:w-full text-center'>
                                        <div>
                                            {char.mob.name}
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            {icons.hp}
                                            <Progress
                                                color="danger"
                                                value={char.mob.stats.hp * 100 / char.mob.stats.hp_max}
                                                aria-label='hp'
                                                classNames={{
                                                    track: 'bg-game_s1'
                                                }}
                                            />
                                        </div>

                                        <div className='flex justify-evenly'>
                                            <div className='flex gap-2 items-center text-xl'>{icons.damage} {char.mob.stats.damage}</div>
                                            <div className='flex gap-2 items-center text-xl'>{icons.defence} {char.mob.stats.defence}</div>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>

                            <ModalFooter className='flex-col text-center'>
                                <div
                                    onClick={['continue', 'results'].includes(turn.state) ? handleFightContinue : null}
                                    className={['continue', 'results'].includes(turn.state) ? 'cursor-pointer' : null}
                                >
                                    <div className='text-center mb-2' >
                                        {turn.msg}
                                    </div>

                                    {['continue', 'results'].includes(turn.state) && (
                                        <div className='text-sm text-game_s1'>
                                            {langText.toast.to_continue}
                                        </div>
                                    )}
                                </div>

                                {turn.state === 'decide' && (
                                    <div className='flex justify-center gap-4' >
                                        {['attack', 'defence'].map(action =>
                                            <Button
                                                key={action}
                                                className='button-game'
                                                name={action}
                                                onClick={handleFightDecide}
                                                disabled={isLoading}
                                            >
                                                {langText.action[action]}
                                            </Button>
                                        )}
                                        <Button
                                            isIconOnly
                                            className='button-game'
                                            onClick={openInventory}
                                        >
                                            {icons.inventory}
                                        </Button>
                                    </div>
                                )}

                                {['win', 'lost'].includes(turn.state) && (
                                    <div className='flex justify-center gap-4' >
                                        <Button
                                            className='button-game'
                                            onClick={handleFightEnd}
                                        >
                                            Salir
                                        </Button>
                                    </div>
                                )}
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            )}


            {/* special */}
            <Modal
                isOpen={specialEvent}
                className={
                    'style-game text-game_s2 font-bold max-xs:rounded-none max-xs:w-full max-xs:m-0 max-xs:h-full '
                    + (context.dark ? 'dark ' : null)
                }
                placement='center'
                hideCloseButton
                size='sm'
            >
                <ModalContent className='style-game'>
                    {specialEvent.body}
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
                className='toast-game'
            />

        </main >
    );
}

export default Game;
