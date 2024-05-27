
import { useState } from "react";

import addLangText from '../../../../lang/Web/Forms/components/FormTabs.json'
import { useOutletContext } from "react-router-dom";

import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { Button } from "@nextui-org/react";
import { Tabs, Tab, Textarea, CircularProgress, ScrollShadow } from "@nextui-org/react";

import { LoremIpsum } from 'react-lorem-ipsum';

import { Musica, Pintura, Literatura, Cine } from '../../../../assets/icons.js';


function FormTabs({ form_class, handleSubmitForm, ButtonReset }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    const icons = {
        music: <Musica size={20} />,
        paint: <Pintura size={20} />,
        literature: <Literatura size={20} />,
        cinema: <Cine size={20} />,
    }


    const initialValues = {
        music: '',
        paint: '',
        literature: '',
        cinema: '',
    }

    const validationSchema = yup.object().shape({
        music: yup.string().required(true).min(20, langText.descShort),
        paint: yup.string().required(true).min(20, langText.descShort),
        literature: yup.string().required(true).min(20, langText.descShort),
        cinema: yup.string().required(true).min(20, langText.descShort),
    })


    const [tab, setTab] = useState('example')
    const tabs = ["example", "music", "paint", "literature", "cinema"]
    const tabProgressDicc = {
        example: 0,
        music: 0,
        paint: 25,
        literature: 50,
        cinema: 75,
    }



    return (
        <section className='flex flex-col items-center w-full' id='tabs'>
            <div className='text-5xl mb-8'>{langText.title}</div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e, actions) => {
                    handleSubmitForm(e, actions, 'tabs', addLangText)
                }}
                onReset={() => {
                    setTab('example')
                }}
            >
                {({ handleChange, errors, values, isSubmitting, isValid, handleBlur }) => (
                    <Form className={form_class + ' max-w-[400px] md:max-w-[800px] '} >
                        <Tabs
                            aria-label={langText.title}
                            color='primary'
                            size='lg'
                            selectedKey={tab}
                            classNames={{
                                base: 'block',
                                tabList: 'p-2 flex-col w-full md:flex-row sm:w-auto max-xs:rounded-none max-xs:px-0 ',
                                tab: ' max-xs:rounded-none ',
                                cursor: ' max-xs:rounded-none',
                                panel: 'max-xs:px-0'
                            }}
                        >
                            {tabs.map((tab, i) =>
                                <Tab
                                    key={tab}
                                    title={
                                        <div className="flex items-center space-x-2 capitalize">
                                            {icons[tab]}
                                            <span >{langText.tabsForm[tab]}</span>
                                        </div>
                                    }
                                    className='flex justify-center'
                                >
                                    <div className='max-w-[400px] w-full'>
                                        {tab === 'example'
                                            ? <div className='mb-4'>
                                                <p className='block text-small font-medium text-foreground pb-1.5 max-xs:text-center'>
                                                    {langText.descExample}
                                                </p>

                                                <ScrollShadow className="h-[200px] bg-default-100 rounded-lg p-3 max-xs:rounded-none" hideScrollBar >
                                                    <LoremIpsum p={4} />
                                                </ScrollShadow>
                                            </div>
                                            : <Textarea
                                                name={tab}
                                                label={langText.form.desc}
                                                labelPlacement="outside"
                                                placeholder={langText.descPH}
                                                description={langText.descDesc}
                                                classNames={{
                                                    inputWrapper: 'max-xs:rounded-none ',
                                                    label: 'max-xs:text-center'
                                                }}
                                                defaultValue={values[tab]}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        }
                                        {errors[tab] &&
                                            <ErrorMessage name={tab} >
                                                {msg => <div className='text-sm text-danger'>{msg}</div>}
                                            </ErrorMessage>
                                        }

                                        <div className='flex flex-col sm:flex-row justify-between gap-4 mt-2'>
                                            {i !== 0 &&
                                                <Button
                                                    color='secondary'
                                                    className='form-button'
                                                    onClick={() => setTab(tabs[i - 1])}
                                                >
                                                    {langText.prev}
                                                </Button>
                                            }

                                            {ButtonReset}

                                            {i === tabs.length - 1
                                                ? <Button
                                                    type='submit'
                                                    color='success'
                                                    className={'form-button text-white'}
                                                    isDisabled={!isValid}
                                                    isLoading={isSubmitting}
                                                >
                                                    {langText.form.send}
                                                </Button>
                                                : <Button
                                                    color='primary'
                                                    isDisabled={!!errors[tab] || values[tab] === ''}
                                                    onClick={() => setTab(tabs[i + 1])}
                                                    className='form-button'
                                                >
                                                    {langText.next}
                                                </Button>
                                            }

                                        </div>
                                    </div>
                                </Tab>
                            )}

                            <Tab
                                key='progress'
                                className='mt-2 p-0'
                                title={
                                    <CircularProgress
                                        aria-label={langText.loading}
                                        size="lg"
                                        value={values.cinema.length > 19 ? 100 : tabProgressDicc[tab]}
                                        color={values.cinema.length > 19 ? 'success' : 'warning'}
                                        showValueLabel={true}
                                        className='mb-2'
                                    />
                                }
                            >
                            </Tab>
                        </Tabs>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormTabs;
