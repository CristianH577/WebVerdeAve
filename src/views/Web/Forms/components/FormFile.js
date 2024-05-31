
import { useState } from "react";

import addLangText from '../../../../lang/Web/Forms/components/FormFile.json'
import { useOutletContext } from "react-router-dom";

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Input, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";



function FormFile({ form_class, handleSubmitForm, ButtonReset }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const initialValues = {
        file_number: Math.floor(Math.random() * (99999 - 10000) + 10000),
        date: '2023-11-01',
        category: [],
        name: '',
        quantity: '',
        ammount: '',
        currency: 'ARS',
    }

    const validationSchema = yup.object().shape({
        category: yup.string().required(langText.validationSchema.complete),
        name: yup.string().required(langText.validationSchema.complete),
        quantity: yup.number().required(langText.validationSchema.complete),
        ammount: yup.number().required(langText.validationSchema.complete),
    })


    const [file, setFile] = useState(initialValues)



    return (
        <section className='flex flex-col items-center w-full max-w-[500px]' id='file'>
            <div className='text-5xl mb-8'>{langText.title}</div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e, actions) => {
                    handleSubmitForm(e, actions, 'file', addLangText)
                }}
                onReset={() => {
                    setFile(initialValues)
                    document.querySelector('#file form').reset()
                }}
            >
                {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur, initialValues }) => (
                    <Form className={form_class + ' max-w-sm justify-center'}  >

                        <div className='flex flex-col gap-4 sm:flex-row justify-between max-xs:ps-2'>
                            <Input
                                isReadOnly
                                type="number"
                                name="file_number"
                                label={langText.file_number}
                                labelPlacement='outside-left'
                                variant='underlined'
                                defaultValue={initialValues.file_number}
                                classNames={{
                                    inputWrapper: 'border-none w-auto'
                                }}
                            />

                            <Input
                                isReadOnly
                                type='date'
                                name="date"
                                label={langText.form.date}
                                labelPlacement='outside-left'
                                variant='underlined'
                                defaultValue={initialValues.date}
                                classNames={{
                                    inputWrapper: 'border-none'
                                }}
                            />
                        </div>

                        <Select
                            name="category"
                            label={langText.category}
                            placeholder={langText.form.selectPH}
                            variant='underlined'

                            onChange={handleChange}
                            onSelectionChange={key =>
                                setFile({ ...file, category: key.currentKey })
                            }
                            selectedKeys={file.category}

                            isInvalid={touched.category && errors.category ? true : false}
                            errorMessage={touched.category && errors.category}
                        >
                            {[...Array(6)].map((e, i) => (
                                <SelectItem key={i + 1} >
                                    {langText.category + " " + (i + 1)}
                                </SelectItem>
                            ))}
                        </Select>

                        <Input
                            type='text'
                            name="name"
                            label={langText.form.name}
                            labelPlacement='outside-left'
                            variant='underlined'
                            className='max-xs:flex-col'
                            classNames={{
                                mainWrapper: 'w-full'
                            }}

                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={file.name}
                            onValueChange={e =>
                                setFile({ ...file, name: e })
                            }

                            isClearable
                            onClear={() => {
                                values.name = ''
                                file.name = ''
                            }}
                            isInvalid={touched.name && errors.name ? true : false}
                            errorMessage={touched.name && errors.name}
                        />

                        <Input
                            type="number"
                            name="quantity"
                            label={langText.quantity}
                            labelPlacement='outside-left'
                            variant='underlined'
                            size='lg'
                            className='max-xs:flex-col'
                            classNames={{
                                mainWrapper: 'w-full'
                            }}

                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={file.quantity}
                            onValueChange={e =>
                                setFile({ ...file, quantity: e })
                            }

                            isClearable
                            onClear={() => {
                                values.quantity = ''
                                file.quantity = ''
                            }}

                            isInvalid={touched.quantity && errors.quantity ? true : false}
                            errorMessage={touched.quantity && errors.quantity}
                        />

                        <Input
                            type="number"
                            name="ammount"
                            label={langText.ammount}
                            labelPlacement='outside-left'
                            variant='underlined'
                            size='lg'
                            className='max-xs:flex-col'
                            classNames={{
                                mainWrapper: 'w-full'
                            }}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            endContent={
                                <div className="flex items-center">
                                    <label className="sr-only" htmlFor="currency">
                                        {langText.form.currency}
                                    </label>
                                    <select
                                        name="currency"
                                        className="outline-none border-0 bg-transparent text-default-400 text-small"

                                        value={file.currency}
                                        onChange={e => {
                                            handleChange(e)
                                            setFile({ ...file, currency: e.target.value })
                                        }}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="ARS">ARS</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            }

                            onChange={handleChange}
                            onBlur={handleBlur}

                            isInvalid={touched.ammount && errors.ammount ? true : false}
                            errorMessage={touched.ammount && errors.ammount}
                        />

                        <div className='flex flex-col-reverse gap-4 sm:flex-row justify-end w-full'>
                            {ButtonReset}

                            <Button
                                type='submit'
                                className={'form-button max-sm:w-full'}
                                color='secondary'
                                isLoading={isSubmitting}
                                isDisabled={!(dirty && isValid)}
                            >
                                {langText.add}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormFile;
