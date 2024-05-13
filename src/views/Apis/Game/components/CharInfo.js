

import { Button, Progress, Tooltip } from "@nextui-org/react";
import { toast } from 'react-toastify';

import { LuShield, LuHeart } from "react-icons/lu";
import { FaRegHandRock } from "react-icons/fa";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { GiBackpack } from "react-icons/gi";


function CharInfo({ char, langText, dark, openInventory, toastId }) {

    const icons = {
        hp: <LuHeart size={30} className='text-danger' />,
        hp_max: <LuHeart size={25} className='text-danger' />,
        damage: <FaRegHandRock size={25} color='gray' />,
        defence: <LuShield size={25} color='gold' />,

        inventory: <GiBackpack size={30} />,
        effects: <AiOutlineThunderbolt size={30} className='' />,
    }


    return (
        <section className={'flex gap-2 mb-4 items-center style-game xs:rounded-lg py-2 xs:px-6 max-xs:w-full max-xs:flex-col'}>
            <div className='flex flex-col'>
                <div className='capitalize text-xl mb-1 text-center'>
                    {char.name} - {langText.clase[char.clase]} {langText.level}{char.level}
                </div>

                <div className='flex items-center gap-2 group'>
                    {icons.hp}
                    <Progress
                        color="danger"
                        aria-label='hp'
                        classNames={{
                            track: 'bg-game_s2'
                        }}
                        value={char.stats.hp * 100 / char.stats.hp_max}
                    />
                    <span className='hidden group-hover:block'>
                        {char.stats.hp}/{char.stats.hp_max}
                    </span>
                </div>
                <div className='flex justify-evenly'>
                    <div className='flex gap-2 items-center text-xl'>{icons.damage} {char.stats.damage}</div>
                    <div className='flex gap-2 items-center text-xl'>{icons.defence} {char.stats.defence}</div>
                </div>
            </div>

            <div className='flex flex-col gap-2 justify-evenly max-xs:w-full'>
                <Tooltip
                    content={langText.action.inventory}
                    placement='bottom'
                    className={
                        'rounded-medium bg-game_s2 text-game_s1'
                        + (dark ? ' dark' : '')
                    }
                    classNames={{
                        base: 'rounded-medium',
                    }}
                >
                    <Button
                        isIconOnly
                        className='button-game button-xs'
                        onClick={openInventory}
                        disabled={toast.isActive(toastId.current)}
                    >
                        {icons.inventory}
                    </Button>
                </Tooltip>
                <Tooltip
                    content={
                        <div>
                            <div className='text-center'>{langText.effects}</div>
                            {Object.entries(char.effects).map(e =>
                                <div key={e}>
                                    {langText.effects_list[e[0]]}
                                    {e[1] >= 0 ? "+" : ""}
                                    {e[1]}
                                </div>
                            )}
                        </div>
                    }
                    placement='bottom'
                    className={
                        'rounded-medium bg-game_s2 text-game_s1'
                        + (dark ? ' dark' : '')
                    }
                    classNames={{
                        base: 'rounded-medium',
                    }}
                >
                    <Button
                        isIconOnly
                        className='button-game button-xs'
                        disabled
                    >
                        {icons.effects}
                    </Button>
                </Tooltip>
            </div>
        </section>
    );
}

export default CharInfo;
