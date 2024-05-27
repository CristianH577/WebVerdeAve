
import { useState } from "react";

import addLangText from '../../../../lang/Web/Forms/components/FormCosts.json'
import { useOutletContext } from "react-router-dom";

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Input, Button } from "@nextui-org/react";



function FormCosts({ form_class, handleSubmitForm, ButtonReset }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const initialValues = {
        impN: 15,
        impP: 15,
        comicion: 14,
        comicionF: 0,
        envio: 7070,
        costo_base: 0,
        ganancia: 30,
        otros: 1650,
    }

    const validationSchema = yup.object().shape({
        impN: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
        impP: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
        comicion: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
        comicionF: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0),
        envio: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0),
        costo_base: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
        ganancia: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
        otros: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0),
    })


    const [costs, setCosts] = useState(initialValues)


    return (
        <section className='flex flex-col items-center w-full' id='costs'>
            <div className='text-5xl mb-8'>{langText.title}</div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e, actions) => {
                    handleSubmitForm(e, actions, 'costs', addLangText)
                }}
                onReset={() => {
                    setCosts(initialValues)
                }}
            >
                {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                    <Form className={form_class + ' xs:max-w-[250px]'}>

                        {['impN', 'impP', 'comicion', 'ganancia'].map(imp =>
                            <Input
                                key={imp}
                                type='number'
                                name={imp}
                                label={langText[imp]}
                                className='form-input'
                                min={0}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">%</span>
                                    </div>
                                }

                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={costs[imp]}
                                onValueChange={e => {
                                    const n = { ...costs }
                                    n[imp] = Number(e)
                                    setCosts(n)
                                }}

                                isClearable
                                onClear={() => {
                                    values[imp] = 0
                                    costs[imp] = 0
                                }}

                                isInvalid={touched[imp] && errors[imp] ? true : false}
                                errorMessage={touched[imp] && errors[imp]}
                            />
                        )}

                        {['comicionF', 'envio', 'otros', 'costo_base'].map(x =>
                            <Input
                                key={x}
                                type='number'
                                name={x}
                                label={langText[x]}
                                className='form-input'
                                min={0}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">$</span>
                                    </div>
                                }

                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={costs[x]}
                                onValueChange={e => {
                                    const n = { ...costs }
                                    n[x] = Number(e)
                                    setCosts(n)
                                }}

                                isClearable
                                onClear={() => {
                                    values[x] = 0
                                    costs[x] = 0
                                }}

                                isInvalid={touched[x] && errors[x] ? true : false}
                                errorMessage={touched[x] && errors[x]}
                            />
                        )}

                        <div className='flex flex-col-reverse gap-4 sm:flex-row justify-end w-full'>
                            {ButtonReset}

                            <Button
                                type='submit'
                                className={'form-button max-sm:w-full'}
                                color='secondary'
                                isLoading={isSubmitting}
                                isDisabled={!(dirty && isValid)}
                            >
                                {langText.calculated}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormCosts;
