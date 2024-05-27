import { useEffect, useRef, useState } from 'react';
import './Game.css'

import addLangText from '../../../lang/Apis/Game/Game.json'
import { useOutletContext } from 'react-router-dom';

import { getFAPI, postFAPI, deleteFAPI } from '../../../libs/fastapi';

import { Button, Tooltip, ButtonGroup, Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

import { toast } from 'react-toastify';

import CreateChar from './components/CreateChar';
import Map from './components/Map';
import CharInfo from './components/CharInfo';
import ModalFight from './components/ModalFight';
// eslint-disable-next-line
import Admin from './components/Admin';

import { LuSword, LuSwords, LuSkull } from "react-icons/lu";
import { GiAbdominalArmor, GiTorch, GiBossKey, GiHealthPotion, GiMagicPotion, GiWizardStaff, GiLeatherArmor, GiRobe, GiLindenLeaf, GiPiercingSword, GiTribalMask } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import { RiCoinLine } from "react-icons/ri";
import { LiaPoopSolid } from "react-icons/lia";

import char_icon from '../../../assets/imgs/game/char.webp'
import goblin from '../../../assets/imgs/game/goblin.webp'
import ogre from '../../../assets/imgs/game/ogre.webp'
import minotaur from '../../../assets/imgs/game/minotaur.webp'



function Game() {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
        ...addLangText[lang]
    }

    const [isLoading, setIsLoading] = useState(false)


    const icons = {
        char: <Image src={char_icon} alt="" radius="none" className="z-0" />,

        options: {
            fight: <LuSwords />,
            leave: <FaRunning />,
        },

        items: {
            0: <RiCoinLine size={30} />,
            1: <GiHealthPotion size={30} />,
            2: <GiMagicPotion size={30} />,
            3: <GiPiercingSword size={30} className='-rotate-90' />,
            4: <GiWizardStaff size={30} />,
            5: <GiLeatherArmor size={30} />,
            6: <GiRobe size={30} />,
            7: <TfiKey size={30} />,
            8: <GiBossKey size={30} className='-rotate-[135deg]' />,
            9: <GiTorch size={30} />,
            10: <GiLindenLeaf size={30} />,
            11: <GiAbdominalArmor size={30} />,
            12: <LuSword size={30} className='rotate-90' />,
            13: <LiaPoopSolid size={30} />,
            14: <GiTribalMask size={30} />,
        },

        death: <LuSkull size={100} />,

        mobs: {
            0: <Image src={goblin} alt="" radius="none" className="z-0" />,
            1: <Image src={ogre} alt="" radius="none" className="z-0" />,
            2: <Image src={minotaur} alt="" radius="none" className="z-0" />,
        },
    }


    // char ------------------------------------
    const [char, setChar] = useState(false)

    const getChar = async () => {
        setIsLoading(true)

        if (typeof char === 'number' || char.id) {
            const id = char.id || char
            const response = await getFAPI("game/getElementById/" + id, lang)
            if (response.bool) setChar(response.value)
        }

        setIsLoading(false)
    }

    const createChar = async values => {
        setIsLoading(true)

        const response = await postFAPI("game/add", values, lang)
        if (response.bool) setChar(response.value)

        setIsLoading(false)
        return response.bool
    }

    const resetGame = async () => {
        if (char) {
            const r = await deleteFAPI("game/" + char.id, lang)
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
            const r = await getFAPI("game/restart/" + char.id, lang)
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


    // map ------------------------------------
    const base_cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u']
    const toastId = useRef(null)
    const [zoom, setZoom] = useState(1)
    const [move, setMove] = useState([0, 0])


    const checkAllowMove = (x, y) => {
        if (char.id === 1) return true

        var bool = false
        if (!isLoading && !toast.isActive(toastId.current) && char !== false) {
            if (x in char.map) {
                if (y in char.map[x]) {

                    const distX = Math.abs(base_cols.indexOf(x) - base_cols.indexOf(char.loc[0]))
                    const distY = Math.abs(y - char.loc[1])
                    const checkX = distX === 1 && distY === 0
                    const checkY = distY === 1 && distX === 0
                    bool = checkY || checkX

                    if (bool) {
                        if (char.map[x][y].kind === "empty") {
                            bool = true
                            const layer = char.map[x][y]?.layer

                            if (layer === 'mob') {
                                bool = false
                            } else if (layer === 'chest') {
                                if (char.map[x][y]?.interacted === 'end') bool = false
                            }
                        } else {
                            bool = false
                        }
                    }
                }
            }
        }

        return bool
    }


    // actions ------------------------------------
    const handleMove = async (x, y) => {
        const url = "game/checkMove?x=" + x + "&y=" + y + "&id=" + char.id
        const response = await getFAPI(url, lang)

        if (response.bool && response.value) {
            handleInteraction(response.value, -1)
        }

        getChar()
    }
    const handleMoveIconChar = () => {
        if (char.loc) {
            const x_str = char.loc[0]
            const y = char.loc[1] - 1
            const x = base_cols.indexOf(x_str)
            setMove([64 * zoom * x, 64 * zoom * y])

            document.querySelector('#map').scroll(64 * zoom * (x - 2), 64 * zoom * (y - 2))
        }
    }
    const handleCellAction = async e => {
        setIsLoading(true)

        const xy = e.target.getAttribute('data-xy').split(',')
        const x = xy[0]
        const y = parseInt(xy[1])
        char.interacting = [x, y]

        if (checkAllowMove(x, y)) await handleMove(x, y)

        setIsLoading(false)
    }

    const cleanToast = async () => {
        toast.dismiss(toastId.current)
        toastId.current = null
    }

    const handleInteraction = async (array, i) => {
        if (i === -1) await cleanToast()

        const toast_config = {
            position: "bottom-center",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
            className: 'toast-game'
        }
        if (!toast.isActive(toastId.current)) toastId.current = toast("", toast_config)

        const new_msg = array[i + 1]
        if (new_msg) {
            var content = <></>

            if (typeof (new_msg) === 'string') {
                content = <div className='text-center'>
                    <div className='pb-2'>
                        {new_msg}
                    </div>
                    <div className='text-sm text-game_s1'>
                        {langText.toast.to_continue}
                    </div>
                </div>

                toast.update(toastId.current, {
                    render: content,
                    className: '!cursor-pointer toast-game',
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
                                    ? icons.options[op]
                                    : '--> '
                                }
                                {langText.toast[op] ? langText.toast[op] : op}
                            </span>
                        )}
                    </div>
                </div>

                toast.update(toastId.current, {
                    render: content,
                    className: 'toast-game',
                })
            }
        }
        else {
            cleanToast()
            getChar()
        }
    }

    const handleEvent = async op => {
        const url = "game/handleOption?x=" + char.interacting[0] + "&y=" + char.interacting[1] + "&op=" + op + "&id=" + char.id

        const event = await getFAPI(url, lang)
        if (event.bool) {
            if (event.value !== "") {
                var msg = false

                const value = event.value
                if (Array.isArray(value)) {
                    msg = value
                }
                else if (typeof value === 'object') {
                    handleMove(value.x, value.y)
                }
                else if (value === 'restart') {
                    restart()
                }

                cleanToast()
                getChar()

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
                const form_data = new FormData()
                form_data.append('turn', JSON.stringify(new_turn))
                form_data.append('id', char.id)

                const response = await postFAPI("game/handleFight", form_data, lang)
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
                    const form_data = new FormData()
                    form_data.append('turn', JSON.stringify(new_turn))
                    form_data.append('id', char.id)

                    const response = await postFAPI("game/handleFight", form_data, lang)
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
            if (char.mob.data.stats.hp <= 0) {
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
                    const form_data = new FormData()
                    form_data.append('turn', JSON.stringify(new_turn))
                    form_data.append('id', char.id)

                    const response = await postFAPI("game/handleFight", form_data, lang)
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
        const url = "game/endFight/" + char.id

        const end = await getFAPI(url, lang)

        if (end.bool) {
            if (end.status === 200) {
                const stats_points = end.value
                setAddStats({
                    ...char.stats,
                    add: stats_points
                })
            }
        }
        getChar()
        setTurn(default_turn)
        setIsLoading(false)
    }

    const [addStats, setAddStats] = useState(false)
    const handleAddStat = async () => {
        ['hp_max', 'damage', 'defence'].forEach(stat => char.stats[stat] = addStats[stat])
        char.stats.hp = addStats.hp_max
        setChar({ ...char })

        const form_data = new FormData()
        form_data.append('char', JSON.stringify(char))

        const update = await postFAPI("game/update", form_data, lang)
        if (update.bool) {
            setSpecialEvent(false)
            getChar()
        }
    }
    const handleLvlUp = () => {
        if (char && addStats) {
            const body =
                <ModalBody className='items-center justify-evenly text-center max-xs:px-0'>
                    <div className='font-bold px-2'>
                        Has subido de nivel! Ahora eres nivel {char.level}.
                    </div>

                    <div className='px-2'>
                        Conseguiste puntos de habilidad!
                    </div>

                    <div className='text-center w-full'>
                        <div>Tienes: {addStats.add}</div>

                        <div className='w-full center items-center gap-2 mt-2'>

                            {['hp_max', 'damage', 'defence'].map(stat =>
                                <div key={stat} className='w-full flex justify-center items-center gap-2 items-center  max-xs:flex-col'>
                                    {icons[stat]}

                                    <div className='flex w-[150px] max-xs:w-full'>
                                        <Button
                                            isIconOnly
                                            className='rounded-e-none  button-game button-xs max-xs:w-1/3'
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

                                        <div className='bg-game_s1 w-[50px] center items-center max-xs:w-1/3'>
                                            {addStats[stat]}
                                        </div>

                                        <Button
                                            isIconOnly
                                            className='rounded-s-none button-game button-xs max-xs:w-1/3'
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
                        className='button-game button-xs'
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

        const url = "game/useConsumable?id_item=" + id_item + "&id_char=" + char.id

        const use = await getFAPI(url, lang)

        if (use.bool) {
            handleInteraction(use.value, -1)
            setSpecialEvent(false)
        }

        setIsLoading(false)
    }
    const openInventory = () => {
        const item_file = item => {
            return <div className='text-center'>
                {['kind', 'name', 'quantity', 'desc'].map((i, k) =>
                    <div key={k} className='flex flex-col mb-2 max-w-[150px]'>
                        <span className='uppercase'>{langText.item_file[i]}: </span>
                        <span>{item[i]}</span>
                    </div>
                )}
                {item.effect.length > 0 && (
                    <div className='flex flex-col mb-2'>
                        <span className='uppercase'>{langText.item_file.effect}: </span>
                        <span>
                            {langText.effects_list[item.effect[0]]}
                            {item.effect[1] >= 0 ? "+" : ""}
                            {item.effect[1]}
                        </span>
                    </div>
                )}
            </div>
        }

        const body = <ModalBody className=' justify-between max-xs:p-0'>
            <div className='font-bold text-[50px] text-center break-all'>
                {langText.action.inventory}
            </div>

            <div className='flex justify-evenly xs:justify-center gap-4 flex-wrap px-2' >
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
                            disabled={item.kind !== "consumible"}
                            onPress={item.kind === "consumible" && useConsumable}
                        >
                            {icons.items[item.id] ? icons.items[item.id] : "?"}
                        </Button>
                    </Tooltip>
                )}
            </div>

            <div className='flex justify-center mt-4' >
                <Button
                    name='back'
                    className='button-game button-xs'
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
    useEffect(() => {
        if (typeof char === "object" && char.stats.hp <= 0) {
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



    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.game}
            </div>

            {/* <Admin
                char={char}
                setChar={setChar}
                setIsLoading={setIsLoading}
                cleanToast={cleanToast}
                setTurn={cleanToast}
                getChar={getChar}
                handleInteraction={handleInteraction}
                default_turn={default_turn}
            /> */}

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
                            color='danger'
                            className='button-xs'
                            onClick={resetGame}
                        >
                            {langText.delete_character}
                        </Button>
                    </div>

                    {/* char info */}
                    <CharInfo
                        char={char}
                        langText={langText}
                        dark={context.dark}
                        toastId={toastId}
                        openInventory={openInventory}
                    />

                    {/* map */}
                    <Map
                        base_cols={base_cols}
                        char={char}
                        zoom={zoom}
                        move={move}
                        icons_mobs={icons.mobs}
                        checkAllowMove={checkAllowMove}
                        handleCellAction={handleCellAction}
                    />


                    {/* fight */}
                    <ModalFight
                        char={char}
                        icon_char={icons.char}
                        icons_mobs={icons.mobs}
                        dark={context.dark}
                        langText={langText}
                        isLoading={isLoading}
                        turn={turn}
                        openInventory={openInventory}
                        handleFightDecide={handleFightDecide}
                        handleFightContinue={handleFightContinue}
                        handleFightEnd={handleFightEnd}
                    />
                </>
            )}


            {/* special */}
            <Modal
                isOpen={specialEvent}
                className={
                    'style-game text-game_s2 max-xs:rounded-none max-xs:w-full max-xs:m-0 max-xs:h-full '
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

        </main >
    );
}

export default Game;
