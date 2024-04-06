import React, { useState } from 'react';

import addLangText from '../../lang/Designs/Forms.json'
import { useOutletContext } from 'react-router-dom';

import { Divider } from "@nextui-org/react";
import { Input, Button, Switch, Link } from "@nextui-org/react";
import { RadioGroup, Radio, Checkbox } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Tabs, Tab, Textarea, CircularProgress, ScrollShadow } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { LoremIpsum } from 'react-lorem-ipsum';

import { Eye, EyeSlash, Reset, Musica, Pintura, Literatura, Cine } from '../../assets/icons.js';


function Formularios() {
    const context = useOutletContext()
    const dark = context.dark
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const icons = {
        Eye: <Eye size={24} className='text-default-400 ' />,
        EyeSlash: <EyeSlash size={24} className='text-default-400 ' />,
        Reset: <Reset size={20} />,

        music: <Musica size={20} />,
        paint: <Pintura size={20} />,
        literature: <Literatura size={20} />,
        cinema: <Cine size={20} />,
    }

    // general--------------------------
    const formClass = 'flex flex-col gap-4 py-4 xs:px-4 w-full shadow-medium bg-content1 xs:rounded-lg form-xs'

    const buttonReset =
        <Button
            type='reset'
            isIconOnly
            className='form-button max-sm:w-full'
        >
            {icons.Reset}
        </Button>


    const initialValues = {
        login: {
            email: '',
            password: '',
            keep: false,
            show_pass: false,
        },

        data: {
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
        },

        file: {
            fileNum: Math.floor(Math.random() * (99999 - 10000) + 10000),
            date: '2023-11-01',
            category: [],
            name: '',
            quantity: '',
            ammount: '',
            currency: 'ARS',
        },

        tabs: {
            music: '',
            paint: '',
            literature: '',
            cinema: '',
        },

        costs: {
            impN: 15,
            impP: 15,
            comicion: 14,
            comicionF: 0,
            envio: 7070,
            costo_base: 0,
            ganancia: 30,
            otros: 1650,
        },
    }


    const patternPhone = /^(\d\d\d)-? ?(\d\d)-? ?(\d)-? ?(\d)-? ?(\d)-? ?(\d\d)$/
    const validationSchema = {
        login: yup.object().shape({
            email: yup.string().email(langText.validationSchema.emailInvalid).required(langText.validationSchema.complete),
            password: yup.string().min(5, langText.validationSchema.min + 5).max(10, langText.validationSchema.max + 10).required(langText.validationSchema.complete),
        }),

        data: yup.object().shape({
            gender: yup.mixed().oneOf(["masc", "fem", "none"]).required(langText.validationSchema.complete),
            name: yup.string().required(langText.validationSchema.complete),
            surname: yup.string().required(langText.validationSchema.complete),
            address: yup.string().required(langText.validationSchema.complete),
            phone: yup.string().required(langText.validationSchema.complete).matches(patternPhone, langText.validationSchema.format),
            day: yup.string().required(langText.validationSchema.complete),
            month: yup.number().required(langText.validationSchema.complete),
            year: yup.number().required(langText.validationSchema.complete).positive().integer().min(1900, langText.validationSchema.dateInvalid).max(2023, langText.validationSchema.dateInvalid),
            date: yup.date().required(langText.validationSchema.complete).min('2000/01/01', langText.validationSchemaForms.dateMin + '01/01/2000.').max('2023/12/31', langText.validationSchemaForms.dateMax + '31/12/2023.'),
            accept: yup.bool().oneOf([true], langText.validationSchemaForms.accept),
        }),

        file: yup.object().shape({
            category: yup.string().required(langText.validationSchema.complete),
            name: yup.string().required(langText.validationSchema.complete),
            quantity: yup.number().required(langText.validationSchema.complete),
            ammount: yup.number().required(langText.validationSchema.complete),
        }),

        tabs: yup.object().shape({
            music: yup.string().required(true).min(20, langText.validationSchemaForms.descShort),
            paint: yup.string().required(true).min(20, langText.validationSchemaForms.descShort),
            literature: yup.string().required(true).min(20, langText.validationSchemaForms.descShort),
            cinema: yup.string().required(true).min(20, langText.validationSchemaForms.descShort),
        }),

        costs: yup.object().shape({
            impN: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
            impP: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
            comicion: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
            comicionF: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0),
            envio: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0),
            costo_base: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
            ganancia: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0).required(langText.validationSchema.complete),
            otros: yup.number().integer(langText.validationSchema.integer).moreThan(-1, langText.validationSchema.positive0),
        }),
    }

    // --------------------------
    const [login, setLogin] = useState(initialValues.login)
    const [data, setData] = useState(initialValues.data)
    const [file, setFile] = useState(initialValues.file)
    const [costs, setCosts] = useState(initialValues.costs)

    const [tab, setTab] = useState('example')
    const tabs = ["example", "music", "paint", "literature", "cinema"]
    const tabProgressDicc = {
        example: 0,
        music: 0,
        paint: 25,
        literature: 50,
        cinema: 75,
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [modalContent, setModalContent] = useState({})

    // functions --------------------------
    const handleSubmitForm = (e, actions, id) => {

        const content = { ...e, id: id }

        switch (id) {
            case 'login':
                delete content.show_pass
                break;
            case 'costs':
                const costos = e.comicionF + e.envio + e.costo_base
                const ganancia = e.costo_base * e.ganancia / 100
                const x = 100 - (e.impN + e.impP + e.comicion)
                var p = (costos + ganancia) / (x / 100)
                p = p + e.otros
                content.precio_final = p.toFixed(2)

                for (const [k, v] of Object.entries(content)) {
                    if (['impN', 'impP', 'comicion', 'ganancia'].includes(k)) {
                        content[k] = v + "%"
                    }
                    else if (['comicionF', 'envio', 'otros', 'costo_base', 'precio_final'].includes(k)) {
                        content[k] = "$" + v
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


    return (
        <main className={context.mainClass}>

        <div className={context.titleClass}>
            {langText.sections_titles.forms}
        </div>

            <section className='flex flex-col items-center w-full' id='login'>
                <div className='text-5xl mb-8'>{langText.designsForm.login.title}</div>

                <Formik
                    initialValues={initialValues.login}
                    validationSchema={validationSchema.login}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'login')
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                        <Form className={formClass + ' max-w-[400px]'} >
                            <Input
                                type="text"
                                name="email"
                                label={langText.form.email}
                                placeholder={langText.designsForm.login.emailPH}
                                size='lg'
                                className='form-input'
                                autoComplete='off'

                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={login.email}
                                onValueChange={e =>
                                    setLogin({ ...login, email: e })
                                }

                                isClearable
                                onClear={() => {
                                    values.email = ''
                                    login.email = ''
                                }}
                                isInvalid={touched.email && errors.email ? true : false}
                                errorMessage={touched.email && errors.email}
                            />

                            <Input
                                name="password"
                                label={langText.form.password}
                                autoComplete='false'
                                size='sm'
                                description="Min. 5. - Max. 10"
                                className='form-input'

                                type={login.show_pass ? "text" : "password"}
                                endContent={
                                    <button
                                        type="button"
                                        className="focus:outline-none"
                                        onClick={() => setLogin({
                                            ...login, show_pass: !login.show_pass
                                        })}
                                    >
                                        {login.show_pass ? icons.EyeSlash : icons.Eye}
                                    </button>
                                }

                                onChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={touched.password && errors.password}
                                isInvalid={touched.password && errors.password ? true : false}
                            />

                            <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
                                <Switch
                                    aria-label={langText.designsForm.login.keep}
                                    name='keep'
                                    onValueChange={e => {
                                        values.keep = e
                                    }}
                                    className='text-sm'
                                    color='success'
                                >
                                    {langText.designsForm.login.keep}
                                </Switch>

                                <div className='text-center'>
                                    <Link color="primary" href="#" size="sm">
                                        {langText.designsForm.login.forgot}?
                                    </Link>
                                </div>
                            </div>

                            <div className='flex flex-col-reverse gap-4 sm:flex-row justify-center w-full'>
                                {buttonReset}

                                <Button
                                    color='primary'
                                    className={'form-button w-full'}
                                >
                                    {langText.designsForm.login.register}
                                </Button>

                                <Button
                                    type='submit'
                                    className={'form-button max-sm:w-full'}
                                    color='secondary'
                                    isLoading={isSubmitting}
                                    isDisabled={!(dirty && isValid)}
                                >
                                    {langText.designsForm.login.login}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>


            <Divider className='w-3/4 max-w-[1200px] my-8' />


            <section className='flex flex-col items-center w-full' id='data'>
                <div className='text-5xl mb-8'>{langText.designsForm.data.title}</div>

                <Formik
                    initialValues={initialValues.data}
                    validationSchema={validationSchema.data}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'data')
                    }}
                    onReset={() => {
                        setData(initialValues.data)
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                        <Form className={formClass + ' max-w-[800px]'} >

                            <RadioGroup
                                name='gender'
                                label={langText.designsForm.data.gender}
                                orientation="horizontal"
                                className='ps-2'

                                defaultValue={data.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}

                                isInvalid={touched.gender && errors.gender ? true : false}
                                errorMessage={touched.gender && errors.gender}
                            >
                                <Radio value="masc">{langText.designsForm.data.genders.masc}</Radio>
                                <Radio value="fem">{langText.designsForm.data.genders.fem}</Radio>
                                <Radio value="none">{langText.designsForm.data.genders.none}</Radio>
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
                                label={langText.designsForm.data.address}
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
                                    description={langText.designsForm.data.phoneDesc}
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
                                    label={langText.designsForm.data.day}
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
                                    label={langText.designsForm.data.month}
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
                                    label={langText.designsForm.data.year}
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
                                        {langText.designsForm.data.accept}
                                    </Checkbox>

                                    <Popover
                                        placement="bottom"
                                        classNames={{
                                            base: 'max-w-[400px] sm:ms-[10vw] ' + (dark ? 'text-white dark' : '')
                                        }}
                                    >
                                        <PopoverTrigger>
                                            <Button variant='solid' color='warning' className='ms-3 rounded-full font-bold text-lg' size='sm' isIconOnly >?</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="px-1 py-2 ">
                                                <div className="text-small font-bold">{langText.designsForm.data.agreement}:</div>
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
                                {buttonReset}

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


            <Divider className='w-3/4 max-w-[1200px] my-8' />


            <section className='flex flex-col items-center w-full' id='file'>
                <div className='text-5xl mb-8'>{langText.designsForm.file.title}</div>

                <Formik
                    initialValues={initialValues.file}
                    validationSchema={validationSchema.file}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'file')
                    }}
                    onReset={() => {
                        setFile(initialValues.file)
                        document.querySelector('#file form').reset()
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur, initialValues }) => (
                        <Form className={formClass + ' max-w-sm justify-center'}  >

                            <div className='flex flex-col gap-4 sm:flex-row justify-between max-xs:ps-2'>
                                <Input
                                    isReadOnly
                                    type="number"
                                    name="fileNum"
                                    label={langText.designsForm.file.fileNum}
                                    labelPlacement='outside-left'
                                    variant='underlined'
                                    defaultValue={initialValues.fileNum}
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
                                label={langText.designsForm.file.category}
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
                                        {langText.designsForm.file.category + " " + (i + 1)}
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
                                label={langText.designsForm.file.quantity}
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
                                label={langText.designsForm.file.ammount}
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
                                {buttonReset}

                                <Button
                                    type='submit'
                                    className={'form-button max-sm:w-full'}
                                    color='secondary'
                                    isLoading={isSubmitting}
                                    isDisabled={!(dirty && isValid)}
                                >
                                    {langText.designsForm.file.add}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>


            <Divider className='w-3/4 max-w-[1200px] my-8' />


            <section className='flex flex-col items-center w-full' id='tabs'>
                <div className='text-5xl mb-8'>{langText.designsForm.tabs.title}</div>

                <Formik
                    initialValues={initialValues.tabs}
                    validationSchema={validationSchema.tabs}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'tabs')
                    }}
                    onReset={() => {
                        setTab('example')
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, handleBlur }) => (
                        <Form className={formClass + ' max-w-[400px] md:max-w-[800px] '} >
                            <Tabs
                                aria-label={langText.designsForm.tabs.title}
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
                                                ?
                                                <div className='mb-4'>
                                                    <p className='block text-small font-medium text-foreground pb-1.5 max-xs:text-center'>
                                                        {langText.designsForm.tabs.descExample}
                                                    </p>

                                                    <ScrollShadow className="h-[200px] bg-default-100 rounded-lg p-3 max-xs:rounded-none" hideScrollBar >
                                                        <LoremIpsum p={4} />
                                                    </ScrollShadow>
                                                </div>
                                                :
                                                <Textarea
                                                    name={tab}
                                                    label={langText.form.desc}
                                                    labelPlacement="outside"
                                                    placeholder={langText.designsForm.tabs.descPH}
                                                    description={langText.designsForm.tabs.descDesc}
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
                                                        {langText.designsForm.tabs.prev}
                                                    </Button>
                                                }

                                                {buttonReset}

                                                {i === tabs.length - 1
                                                    ?
                                                    <Button
                                                        type='submit'
                                                        color='success'
                                                        className={'form-button text-white'}
                                                        isDisabled={!isValid}
                                                        isLoading={isSubmitting}
                                                    >
                                                        {langText.form.send}
                                                    </Button>
                                                    :
                                                    <Button
                                                        color='primary'
                                                        isDisabled={!!errors[tab] || values[tab] === ''}
                                                        onClick={() => setTab(tabs[i + 1])}
                                                        className='form-button'
                                                    >
                                                        {langText.designsForm.tabs.next}
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
                                            aria-label={langText.designsForm.tabs.loading}
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


            <Divider className='w-3/4 max-w-[1200px] my-8' />


            <section className='flex flex-col items-center w-full' id='costs'>
                <div className='text-5xl mb-8'>{langText.designsForm.costs.title}</div>

                <Formik
                    initialValues={initialValues.costs}
                    validationSchema={validationSchema.costs}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'costs')
                    }}
                    onReset={() => {
                        setCosts(initialValues.costs)
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                        <Form className={formClass + ' xs:max-w-[250px]'}>

                            {['impN', 'impP', 'comicion', 'ganancia'].map(imp =>
                                <Input
                                    key={imp}
                                    type='number'
                                    name={imp}
                                    label={langText.designsForm.costs[imp]}
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
                                    label={langText.designsForm.costs[x]}
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
                                {buttonReset}

                                <Button
                                    type='submit'
                                    className={'form-button max-sm:w-full'}
                                    color='secondary'
                                    isLoading={isSubmitting}
                                    isDisabled={!(dirty && isValid)}
                                >
                                    {langText.designsForm.costs.calculated}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>


            {/* modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className={
                    'max-xs:rounded-none max-xs:w-full max-xs:m-0 max-xs:h-full '
                    + (dark ? 'dark text-foreground' : '')
                }
                placement='center'
            >
                <ModalContent>
                    {(onclose) =>
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {langText.formOf}: {langText.designsForm[modalContent.id].title}
                            </ModalHeader>

                            <ModalBody className='bg-content2'>
                                {Object.entries(modalContent).map(e =>
                                    e[0] !== 'id' &&
                                    < div key={e[0]} className='flex gap-2'>
                                        <div className='font-semibold capitalize'>
                                            {modalContent.id === 'tabs'
                                                ? langText.tabsForm[e[0]]
                                                : langText.form[e[0]] || langText.designsForm[modalContent.id][e[0]]
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
        </main >
    );
}

export default Formularios;
