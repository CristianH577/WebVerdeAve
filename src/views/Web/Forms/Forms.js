import { useState } from 'react';

import { Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

import ShowModelsMain from '../../../components/ShowModelsMain';

import FormLogin from './components/FormLogin.js';
import FormData from './components/FormData.js';
import FormFile from './components/FormFile.js';
import FormTabs from './components/FormTabs.js';
import FormCosts from './components/FormCosts.js';
import ModalSubmit from './components/ModalSubmit.js';

import { Reset } from '../../../assets/icons.js';


function Formularios() {
    const form_class = 'flex flex-col gap-4 py-4 xs:px-4 w-full shadow-medium bg-content1 xs:rounded-lg form-xs'

    const ButtonReset =
        <Button
            type='reset'
            isIconOnly
            className='form-button max-sm:w-full'
        >
            <Reset size={20} />
        </Button>

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [modalContent, setModalContent] = useState({})

    const handleSubmitForm = (form_data, actions, id, plusLangText) => {
        const content = { form_data: form_data, id: id, plusLangText: plusLangText }

        switch (id) {
            case 'login':
                delete content.form_data.show_pass
                break;
            case 'costs':
                const costos = form_data.comicionF + form_data.envio + form_data.costo_base
                const ganancia = form_data.costo_base * form_data.ganancia / 100
                const x = 100 - (form_data.impN + form_data.impP + form_data.comicion)
                var p = (costos + ganancia) / (x / 100)
                p = p + form_data.otros
                content.form_data.precio_final = p.toFixed(2)

                for (const [k, v] of Object.entries(content)) {
                    if (['impN', 'impP', 'comicion', 'ganancia'].includes(k)) {
                        content.form_data[k] = v + "%"
                    }
                    else if (['comicionF', 'envio', 'otros', 'costo_base', 'precio_final'].includes(k)) {
                        content.form_data[k] = "$" + v
                    }
                }

                break;

            default:
                break;
        }

        setModalContent(content)

        setTimeout(() => {
            actions.setSubmitting(false)
            onOpen()
        }, 1000)
    }

    const models = [
        <FormLogin
            form_class={form_class}
            handleSubmitForm={handleSubmitForm}
            ButtonReset={ButtonReset}
        />,
        <FormData
            form_class={form_class}
            handleSubmitForm={handleSubmitForm}
            ButtonReset={ButtonReset}
        />,
        <FormFile
            form_class={form_class}
            handleSubmitForm={handleSubmitForm}
            ButtonReset={ButtonReset}
        />,
        <FormTabs
            form_class={form_class}
            handleSubmitForm={handleSubmitForm}
            ButtonReset={ButtonReset}
        />,
        <FormCosts
            form_class={form_class}
            handleSubmitForm={handleSubmitForm}
            ButtonReset={ButtonReset}
        />
    ]


    return (
        <>
            <ShowModelsMain
                id={'forms'}
                models={models}
            />

            <ModalSubmit
                modalContent={modalContent}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
}

export default Formularios;
