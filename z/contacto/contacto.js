import React from 'react';

import addLangText from '../../lang/contacto/contacto.json'
import { useOutletContext } from 'react-router-dom';

import { Input, Button, Textarea } from "@nextui-org/react";

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Reset } from '../../assets/icons.js';


function Contacto() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    const icons = {
        Reset: <Reset size={20} />,
    }

    const validationSchema = yup.object().shape({
        subject: yup.string().required(langText.validationSchema.complete).min(5, langText.validationSchema.min + 5).max(20, langText.validationSchema.max + 20),
        name: yup.string().required(langText.validationSchema.complete).min(5, langText.validationSchema.min + 5).max(20, langText.validationSchema.max + 20),
        surname: yup.string().required(langText.validationSchema.complete).min(5, langText.validationSchema.min + 5).max(20, langText.validationSchema.max + 20),
        email: yup.string().required(langText.validationSchema.complete).email(langText.validationSchema.emailInvalid),
        phone: yup.string().required(langText.validationSchema.complete).min(8, langText.validationSchema.format),
        message: yup.string().required(langText.validationSchema.complete).min(20, langText.validationSchema.min + 20).max(200, langText.validationSchema.max + 200),
    })

    const handleResetForm = (id) => {
        const form = document.querySelector('#' + id + ' form')
        const inputs = document.querySelectorAll('#' + id + ' form input')
        for (let i = 0; i < inputs.length; i++) {
            const e = inputs[i]
            if (!e.ariaReadOnly) e.value = null
        }

        form.reset()
    }

    const handleSubmitForm = (e, actions) => {
        // console.log(e)

        setTimeout(() => {
            actions.setSubmitting(false)
            handleResetForm('contacto')
        }, 2000)
    }

    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.contact}</div>

            <section className='flex flex-col items-center w-full max-w-[600px]' id='contacto'>
                <Formik
                    initialValues={{
                        subject: '',
                        name: '',
                        surname: '',
                        email: '',
                        phone: '',
                        message: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions)
                    }}
                    onReset={() => {
                        handleResetForm('contacto')
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                        <Form className='flex flex-col gap-4 w-full max-w-[800px] form-xs'>
                            <Input
                                type='text'
                                name="subject"
                                label={langText.form.subject}
                                className='form-input'

                                onChange={handleChange}
                                onBlur={handleBlur}
                                isClearable
                                onClear={() => values.subject = ''}
                                isInvalid={touched.subject && errors.subject ? true : false}
                                errorMessage={touched.subject && errors.subject}
                            />

                            <div className='flex flex-col gap-4 sm:flex-row'>
                                <Input
                                    type='text'
                                    name="name"
                                    label={langText.form.name}
                                    className='form-input'

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isClearable
                                    onClear={() => values.name = ''}
                                    isInvalid={touched.name && errors.name ? true : false}
                                    errorMessage={touched.name && errors.name}
                                />

                                <Input
                                    type='text'
                                    name="surname"
                                    label={langText.form.surname}
                                    className='form-input'

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isClearable
                                    onClear={() => values.surname = ''}
                                    isInvalid={touched.surname && errors.surname ? true : false}
                                    errorMessage={touched.surname && errors.surname}
                                />
                            </div>

                            <Input
                                type="text"
                                name="email"
                                label={langText.form.email}
                                placeholder={langText.formContact.email.placeholder}
                                size='lg'
                                className='form-input'

                                onChange={handleChange}
                                onBlur={handleBlur}
                                isClearable
                                onClear={() => values.email = ''}
                                isInvalid={touched.email && errors.email ? true : false}
                                errorMessage={touched.email && errors.email}
                            />

                            <div>
                                <Input
                                    type='number'
                                    name="phone"
                                    label={langText.form.phone}
                                    placeholder='999 999 9999'
                                    description={langText.formContact.phone.desc}
                                    className='form-input'

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isClearable
                                    onClear={() => values.phone = ''}
                                    isInvalid={touched.phone && errors.phone ? true : false}
                                    errorMessage={touched.phone && errors.phone}
                                />
                            </div>

                            <Textarea
                                name='message'
                                label={langText.form.message}
                                labelPlacement="outside"
                                placeholder={langText.formContact.message.placeholder}
                                description={langText.formContact.message.desc}
                                className='max-xs:text-center form-input'

                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isClearable
                                onClear={() => values.message = ''}
                                isInvalid={touched.message && errors.message ? true : false}
                                errorMessage={touched.message && errors.message}
                            />

                            <div className='flex justify-end w-full max-xs:flex-col gap-4'>
                                <Button
                                    type='reset'
                                    isIconOnly
                                    className='form-button w-full sm:w-auto '
                                    variant='shadow'
                                >
                                    {icons.Reset}
                                </Button>

                                <Button
                                    color='secondary'
                                    type='submit'
                                    className='form-button w-full sm:w-auto '
                                    isLoading={isSubmitting}
                                    isDisabled={!(dirty && isValid)}
                                    variant='shadow'
                                >
                                    {langText.form.send}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>

        </main>
    );
}

export default Contacto;
