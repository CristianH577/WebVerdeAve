

import addLangText from '../../../../lang/Web/Forms/components/ModalSubmit.json'
import { useOutletContext } from "react-router-dom";

import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";



function ModalSubmit({ modalContent, onOpenChange, isOpen }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang],
        ...modalContent?.plusLangText && modalContent?.plusLangText[context.lang]
    }


    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className={
                'max-xs:rounded-none max-xs:w-full max-xs:m-0 max-xs:h-full '
                + (context.dark ? 'dark text-foreground' : '')
            }
            placement='center'
        >
            <ModalContent>
                {(onclose) =>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {langText.formOf}: {langText.title}
                        </ModalHeader>

                        <ModalBody className='bg-content2'>
                            {Object.entries(modalContent.form_data).map(e =>
                                < div key={e[0]} className='flex gap-2'>
                                    <div className='font-semibold capitalize'>
                                        {modalContent.id === 'tabs'
                                            ? langText.tabsForm[e[0]]
                                            : langText.form[e[0]] || langText[e[0]]
                                        }:
                                    </div>
                                    <div>
                                        {['accept', 'keep'].includes(e[0])
                                            ? (e[1] ? langText.form.yes : langText.form.no)
                                            : e[0] === 'password'
                                                ? "*".repeat(e[1].length)
                                                : e[1]
                                        }
                                    </div>
                                </div>
                            )}
                        </ModalBody>

                        <ModalFooter className='max-xs:p-0'>
                            <Button
                                className='button-xs'
                                onClick={onclose}
                            >
                                OK
                            </Button>
                        </ModalFooter>
                    </>
                }
            </ModalContent>
        </Modal>
    );
}

export default ModalSubmit;
