

import { useEffect, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"

import { Image } from "@nextui-org/react"


function GalerieFramerMotion({ items, dark, contextImgs }) {

    const [selectedId, setSelectedId] = useState('')


    useEffect(() => {
        if (selectedId) {
            document.querySelector('#footer_btn').style.display = 'none'
            document.documentElement.style.overflowY = 'hidden'
            document.querySelector('#modal-gfm').scrollIntoView()
        } else {
            document.documentElement.style.overflowY = 'scroll'
            document.querySelector('#footer_btn').style.display = 'inline-flex'
        }
    }, [selectedId])


    return (
        <motion.div className="flex flex-wrap gap-4 p-4 justify-center items-center">
            {items.map((item) => {
                return <motion.div
                    className={`bg-content1 cursor-pointer h-fit w-fit shadow-lg `}
                    layoutId={`card-container-${item.id}`}
                    onClick={() => setSelectedId(item.id)}
                    key={item.id}
                    initial={{ scale: 1 }}
                    animate={{ scale: selectedId === item.id ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: .9 }}
                >
                    <Image
                        removeWrapper
                        radius='none'
                        className="bg-transparent "
                        src={contextImgs(`./previews${(dark && item.dark) ? '/dark' : ''}/${item.id}.webp`)}
                    />
                </motion.div>
            })}

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        id='modal-gfm'
                        className="absolute z-20 top-0 h-screen inset-0 bg-black/50 dark:bg-content1/50 flex items-start justify-center cursor-pointer w-full overflow-auto py-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId('')}
                    >
                        {items.map((item) => (
                            item.id === selectedId && (
                                <motion.div
                                    className="m-auto"
                                    layoutId={`card-container-${item.id}`}
                                    key={item.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                >
                                    <Image
                                        removeWrapper
                                        radius='none'
                                        src={contextImgs(`.${(dark && item.dark) ? '/dark' : ''}/${item.id}.webp`)}
                                        className="transparent "
                                    />
                                </motion.div>
                            )
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default GalerieFramerMotion;
