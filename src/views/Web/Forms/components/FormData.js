
import { useState } from "react";

import addLangText from '../../../../lang/Web/Forms/components/FormData.json'
import { useOutletContext } from "react-router-dom";

import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { Input, Button } from "@nextui-org/react";
import { RadioGroup, Radio, Checkbox } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

import { LoremIpsum } from 'react-lorem-ipsum';


function FormData({ form_class, handleSubmitForm, ButtonReset }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const initialValues = {
        gender: 'none',
        name: '',
        surname: '',
        address: '',
        phone: '',
        day: [],
        month: [],
        year: '',
        date: '',
        accept: false,
    }

    const patternPhone = /^(\d\d\d)-? ?(\d\d)-? ?(\d)-? ?(\d)-? ?(\d)-? ?(\d\d)$/
    const validationSchema = yup.object().shape({
        gender: yup.mixed().oneOf(["masc", "fem", "none"]).required(langText.validationSchema.complete),
        name: yup.string().required(langText.validationSchema.complete),
        surname: yup.string().required(langText.validationSchema.complete),
        address: yup.string().required(langText.validationSchema.complete),
        phone: yup.string().required(langText.validationSchema.complete).matches(patternPhone, langText.validationSchema.format),
        day: yup.string().required(langText.validationSchema.complete),
        month: yup.number().required(langText.validationSchema.complete),
        year: yup.number().required(langText.validationSchema.complete).positive().integer().min(1900, langText.validationSchema.dateInvalid).max(2023, langText.validationSchema.dateInvalid),
        date: yup.date().required(langText.validationSchema.complete).min('2000/01/01', langText.dateMin + '01/01/2000.').max('2023/12/31', langText.dateMax + '31/12/2023.'),
        accept: yup.bool().oneOf([true], langText.accept_for),
    })


    const [data, setData] = useState(initialValues)



    return (
        <section className='flex flex-col items-center w-full' id='data'>
            <div className='text-5xl mb-8'>{langText.title}</div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e, actions) => {
                    handleSubmitForm(e, actions, 'data', addLangText)
                }}
                onReset={() => {
                    setData(initialValues)
                }}
            >
                {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                    <Form className={form_class + ' max-w-[800px]'} >

                        <RadioGroup
                            name='gender'
                            label={langText.gender}
                            orientation="horizontal"
                            className='ps-2'

                            defaultValue={data.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}

                            isInvalid={touched.gender && errors.gender ? true : false}
                            errorMessage={touched.gender && errors.gender}
                        >
                            <Radio value="masc">{langText.genders.masc}</Radio>
                            <Radio value="fem">{langText.genders.fem}</Radio>
                            <Radio value="none">{langText.genders.none}</Radio>
                        </RadioGroup>

                        <div className='flex flex-col gap-4 sm:flex-row'>
                            <Input
                                type='text'
                                name="name"
                                label={langText.form.name}
                                className='form-input'

                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={data.name}
                                onValueChange={e =>
                                    setData({ ...data, name: e })
                                }

                                isClearable
                                onClear={() => {
                                    values.name = ''
                                    data.name = ''
                                }}
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
                                value={data.surname}
                                onValueChange={e =>
                                    setData({ ...data, surname: e })
                                }

                                isClearable
                                onClear={() => {
                                    values.surname = ''
                                    data.surname = ''
                                }}
                                isInvalid={touched.surname && errors.surname ? true : false}
                                errorMessage={touched.surname && errors.surname}
                            />
                        </div>

                        <Input
                            type='text'
                            name="address"
                            label={langText.address}
                            className='form-input'

                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={data.address}
                            onValueChange={e =>
                                setData({ ...data, address: e })
                            }

                            isClearable
                            onClear={() => {
                                values.address = ''
                                data.address = ''
                            }}
                            isInvalid={touched.address && errors.address ? true : false}
                            errorMessage={touched.address && errors.address}
                        />

                        <div>
                            <Input
                                type='number'
                                name="phone"
                                label={langText.form.phone}
                                placeholder='999 999 9999'
                                description={langText.phoneDesc}
                                className='form-input sm:w-1/2'

                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={data.phone}
                                onValueChange={e =>
                                    setData({ ...data, phone: e })
                                }

                                isClearable
                                onClear={() => {
                                    values.phone = ''
                                    data.phone = ''
                                }}
                                isInvalid={touched.phone && errors.phone ? true : false}
                            />
                            {(touched.phone && errors.phone) &&
                                <ErrorMessage name='phone' >
                                    {msg => <div className='text-sm text-danger'>{msg}</div>}
                                </ErrorMessage>
                            }
                        </div>

                        <div className='flex flex-col gap-4 sm:flex-row'>
                            <Select
                                name="day"
                                label={langText.day}
                                placeholder="Seleccione"
                                className='form-select'

                                onChange={handleChange}
                                onSelectionChange={key =>
                                    setData({ ...data, day: key.currentKey })
                                }
                                selectedKeys={data.day}

                                isInvalid={touched.day && errors.day ? true : false}
                                errorMessage={touched.day && errors.day}
                            >
                                {[...Array(31)].map((e, i) => (
                                    <SelectItem key={i + 1} value={i + 1}>
                                        {(i + 1).toString()}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                name="month"
                                label={langText.month}
                                placeholder="Seleccione"
                                className='form-select'

                                onChange={handleChange}
                                onSelectionChange={key =>
                                    setData({ ...data, month: key.currentKey })
                                }
                                selectedKeys={data.month}

                                isInvalid={touched.month && errors.month ? true : false}
                                errorMessage={touched.month && errors.month}
                            >
                                {[...Array(12)].map((e, i) => (
                                    <SelectItem key={i} value={i + 1}>
                                        {(i + 1).toString()}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Input
                                type='number'
                                name="year"
                                label={langText.year}
                                placeholder='1900-2023'
                                className='form-input'

                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={data.year}
                                onValueChange={e =>
                                    setData({ ...data, year: e })
                                }

                                isClearable
                                onClear={() => {
                                    values.year = ''
                                    data.year = ''
                                }}
                                isInvalid={touched.year && errors.year ? true : false}
                                errorMessage={touched.year && errors.year}
                            />
                        </div>

                        <Input
                            type='date'
                            name="date"
                            label={langText.form.date}
                            placeholder='fecha'
                            className='sm:max-w-xs form-input'

                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={data.date}
                            onValueChange={e =>
                                setData({ ...data, date: e })
                            }

                            isClearable
                            onClear={() => {
                                values.date = ''
                                data.date = ''
                            }}
                            isInvalid={touched.date && errors.date ? true : false}
                            errorMessage={touched.date && errors.date}
                        />

                        <div className='max-xs:items-center flex flex-col'>
                            <div className='flex items-center'>
                                <Checkbox
                                    name='accept'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.accept && errors.accept ? true : false}
                                >
                                    {langText.accept}
                                </Checkbox>

                                <Popover
                                    placement="bottom"
                                    classNames={{
                                        base: 'max-w-[400px] sm:ms-[10vw] ' + (context.dark ? 'text-white dark' : '')
                                    }}
                                >
                                    <PopoverTrigger>
                                        <Button variant='solid' color='warning' className='ms-3 rounded-full font-bold text-lg' size='sm' isIconOnly >?</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-2 ">
                                            <div className="text-small font-bold">{langText.agreement}:</div>
                                            <div className="text-tiny">
                                                <LoremIpsum random={false} />
                                            </div>

                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {(touched.accept && errors.accept) &&
                                <ErrorMessage name='accept' >
                                    {msg => <div className='text-sm text-danger'>{msg}</div>}
                                </ErrorMessage>
                            }
                        </div>

                        <div className='flex flex-col-reverse gap-4 sm:flex-row justify-end'>
                            {ButtonReset}

                            <Button
                                type='submit'
                                className='form-button '
                                color='secondary'
                                isLoading={isSubmitting}
                                isDisabled={!(dirty && isValid)}
                            >
                                {langText.form.send}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormData;
