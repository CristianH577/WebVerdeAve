
import addLangText from '../../../../lang/Web/Showroom.json'
import { useOutletContext } from 'react-router-dom';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Select, SelectItem, SelectSection, Input } from "@nextui-org/react";

import { Reset } from '../../../../assets/icons.js';


function FiltersModal({ articles_data, handleFilterInput, preferences, isOpen, onOpenChange, handleFilterSelect,handleReset }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const filters_array = [
        {
            key: 'results',
            items: ['1', '4', '5', '10'],
        },
        {
            key: 'category',
            items: [...articles_data.categories],
        },
        {
            key: 'marca',
            items: [...articles_data.marcas, ...articles_data.fruits_marcas],
        },
        {
            key: 'rank',
            items: ['0', '1', '2', '3', '4', '5'],
        },
    ]


    return (
        <Modal
            size="full"
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className={(context.dark ? 'dark' : '')}
            classNames={{
                wrapper: 'justify-start'
            }}
            motionProps={{
                variants: {
                    initial: {
                        x: '-100%',
                        opacity: 1,
                    },
                    enter: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        x: '-100%',
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent className="rounded-none xs:w-fit ">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Filtros</ModalHeader>

                        <ModalBody className='w-full'>
                            {filters_array.map(filter =>
                                <Select
                                    key={filter.key}
                                    variant='underlined'
                                    label={langText.filters[filter.key].label}
                                    size='sm'
                                    className={'xs:max-w-[200px] ' + (context.dark ? 'dark' : '')}
                                    name={filter.key}
                                    selectedKeys={preferences[filter.key]}
                                    onChange={handleFilterSelect}
                                    aria-label={langText.search.filter + " " + filter.key}
                                    classNames={{
                                        popoverContent: (context.dark ? 'dark text-foreground' : ''),
                                    }}
                                >
                                    {filter.key !== 'results' && (
                                        <SelectSection showDivider className={preferences[filter.key].length === 0 ? 'hidden' : ''}>
                                            <SelectItem className='capitalize' key=''>
                                                {langText.filters.remove}
                                            </SelectItem>
                                        </SelectSection>
                                    )}
                                    {filter.items.map(item =>
                                        <SelectItem key={item} className='capitalize' value={item}>
                                            {langText.filters[filter.key].items ? langText.filters[filter.key].items[item] : item}
                                        </SelectItem>
                                    )}
                                </Select>
                            )}

                            <div className='xs:max-w-[200px] flex'>
                                <Input
                                    type='number'
                                    label='Precio Min'
                                    startContent='$'
                                    placeholder='-'
                                    className=''
                                    size='sm'
                                    variant='underlined'
                                    classNames={{
                                        inputWrapper: 'rounded-e-none',
                                    }}

                                    name='min'
                                    value={preferences.min}
                                    onChange={handleFilterInput}
                                />
                                <Input
                                    type='number'
                                    label='Precio Max'
                                    startContent='$'
                                    placeholder='-'
                                    size='sm'
                                    variant='underlined'
                                    classNames={{
                                        inputWrapper: 'rounded-e-none',
                                    }}

                                    name='max'
                                    value={preferences.max}
                                    onChange={handleFilterInput}
                                />
                            </div>

                        </ModalBody>

                        <ModalFooter>
                            <Button isIconOnly onPress={handleReset}>
                                <Reset />
                            </Button>
                            {/* <Button color="primary" onPress={onClose}>
                                Cerrar
                            </Button> */}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default FiltersModal;
