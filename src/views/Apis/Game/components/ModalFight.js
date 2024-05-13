

import { Button, Progress } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@nextui-org/react";

import { LuShield, LuHeart } from "react-icons/lu";
import { GiBackpack } from "react-icons/gi";
import { FaRegHandRock } from "react-icons/fa";



function ModalFight({ char, dark, langText, isLoading, turn, openInventory, handleFightDecide, handleFightContinue, handleFightEnd, icon_char, icons_mobs }) {
    const icons = {
        hp: <LuHeart size={30} className='text-danger' />,
        damage: <FaRegHandRock size={25} color='gray' />,
        defence: <LuShield size={25} color='gold' />,
        inventory: <GiBackpack size={30} />,
    }


    return (
        <Modal
            isOpen={Boolean(char.mob.data)}
            className={
                'max-xs:rounded-none max-xs:w-full max-xs:m-0 max-xs:h-full '
                + (dark ? 'dark ' : null)
            }
            placement='center'
            hideCloseButton
        >
            <ModalContent className='font-bold'>
                <ModalBody className='bg-game_p text-game_s2 max-xs:h-1/2 flex justify-evenly items-center gap-8 xs:flex-row'>
                    <div className='center w-1/2 max-xs:w-full text-center'>
                        <div>
                            {char.name}
                        </div>

                        <div className='flex justify-center'>
                            <span className='w-[150px]'>
                                {icon_char}
                            </span>
                        </div>

                        <div className='flex items-center gap-2 group'>
                            {icons.hp}
                            <Progress
                                color="danger"
                                value={char.stats.hp * 100 / char.stats.hp_max}
                                aria-label='hp'
                                classNames={{
                                    track: 'bg-game_s1'
                                }}
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

                    {Boolean(char.mob.data) && (
                        <div className='center w-1/2 max-xs:w-full text-center '>
                            <div>
                                {char.mob.data.name}
                            </div>

                            <div className='flex justify-center'>
                                <span className='w-[150px]'>
                                    {icons_mobs[char.map[char.mob.loc[0]][char.mob.loc[1]].mob]}
                                </span>
                            </div>

                            <div className='flex items-center gap-2 group'>
                                {icons.hp}
                                <Progress
                                    color="danger"
                                    aria-label='hp'
                                    classNames={{
                                        track: 'bg-game_s1'
                                    }}
                                    value={char.mob.data.stats.hp * 100 / char.mob.data.stats.hp_max}
                                />
                                <span className='hidden group-hover:block'>
                                    {char.mob.data.stats.hp}/{char.mob.data.stats.hp_max}
                                </span>
                            </div>

                            <div className='flex justify-evenly'>
                                <div className='flex gap-2 items-center text-xl'>{icons.damage} {char.mob.data.stats.damage}</div>
                                <div className='flex gap-2 items-center text-xl'>{icons.defence} {char.mob.data.stats.defence}</div>
                            </div>
                        </div>
                    )}
                </ModalBody>

                <ModalFooter className='bg-game_s2 text-game_s1 flex-col text-center'>
                    <div
                        onClick={['continue', 'results'].includes(turn.state) ? handleFightContinue : null}
                        className={['continue', 'results'].includes(turn.state) ? 'cursor-pointer' : null}
                    >
                        <div className='text-center mb-2' >
                            {turn.msg}
                        </div>

                        {['continue', 'results'].includes(turn.state) && (
                            <div className='text-sm text-game_p'>
                                {langText.toast.to_continue}
                            </div>
                        )}
                    </div>

                    {turn.state === 'decide' && (
                        <div className='flex justify-center gap-4 flex-wrap' >
                            {['attack', 'defence'].map(action =>
                                <Button
                                    key={action}
                                    className='bg-game_p text-game_s2'
                                    name={action}
                                    onClick={handleFightDecide}
                                    disabled={isLoading}
                                >
                                    {langText.action[action]}
                                </Button>
                            )}
                            <Button
                                isIconOnly
                                className='bg-game_p text-game_s2'
                                onClick={openInventory}
                            >
                                {icons.inventory}
                            </Button>
                        </div>
                    )}

                    {['win', 'lost'].includes(turn.state) && (
                        <div className='flex justify-center gap-4' >
                            <Button
                                className='bg-game_p text-game_s2'
                                onClick={handleFightEnd}
                            >
                                Salir
                            </Button>
                        </div>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalFight;
