import React, { useState } from 'react';

import addLangText from '../../lang/diseños/forms.json'
import { useOutletContext } from 'react-router-dom';

import { Divider } from "@nextui-org/react";
import { Input, Button, Switch, Link } from "@nextui-org/react";
import { RadioGroup, Radio, Checkbox } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Tabs, Tab, Textarea, CircularProgress, Tooltip, ScrollShadow } from "@nextui-org/react";
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

    const [showPass, setShowPass] = useState(false)

    const [selectDay, setSelectDay] = useState(null)
    const [selectMonth, setSelectMonth] = useState(null)

    const [selectCategory, setSelectCategory] = useState(null)


    const [tab, setTab] = useState('example')

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [modalContent, setModalContent] = useState({})

    const tabs = ["example", "music", "paint", "literature", "cinema"]
    const tabProgressDicc = {
        example: 0,
        music: 0,
        paint: 25,
        literature: 50,
        cinema: 75,
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
    const formClass = 'flex flex-col gap-4 py-4 xs:px-4 w-full shadow-medium bg-content1 xs:rounded-lg form-xs'
    const buttonFormClass = 'form-button'
    const buttonReset =
        <Button
            type='reset'
            isIconOnly
            className={buttonFormClass + ' w-full sm:w-auto'}
        >
            {icons.Reset}
        </Button>


    const initialValues = {
        ingreso: {
            email: '',
            password: '',
            keep: false,
        },

        datos: {
            gender: 'none',
            name: '',
            surname: '',
            address: '',
            phone: '',
            day: '',
            month: '',
            year: '',
            date: '',
            accept: false,
        },

        ficha: {
            fileNum: Math.floor(Math.random() * (99999 - 10000) + 10000),
            date: '2023-11-01',
            category: '',
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
            impN: 14,
            impP: 14,
            comicion: 14,
            comicionF: 0,
            envio: 1900,
            costo_base: 0,
            ganancia: 30,
            otros: 0,
            // precio: null,
        },
    }

    const patternPhone = /^(\d\d\d)-? ?(\d\d)-? ?(\d)-? ?(\d)-? ?(\d)-? ?(\d\d)$/
    const validationSchema = {
        ingreso: yup.object().shape({
            email: yup.string().email(langText.validationSchema.emailInvalid).required(langText.validationSchema.complete),
            password: yup.string().min(5, langText.validationSchema.min + 5).max(10, langText.validationSchema.max + 10).required(langText.validationSchema.complete),
        }),

        datos: yup.object().shape({
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

        ficha: yup.object().shape({
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


    const handleResetForm = (id) => {

        if (id !== 'costs') {
            const inputs = document.querySelectorAll('#' + id + ' form input')
            for (let i = 0; i < inputs.length; i++) {
                const e = inputs[i]
                if (!e.ariaReadOnly) e.value = null
            }
        }

        switch (id) {
            case 'datos':
                setSelectDay([])
                setSelectMonth([])
                break;
            case 'ficha':
                setSelectCategory([])
                break;
            case 'tabs':
                setTab('example')
                break;
            // case 'costs':
            //     const f = document.querySelector('#' + id + ' form')
            //     f.reset()
            //     break;

            default:
                break;
        }

    }

    const handleSubmitForm = (e, actions, id) => {

        const content = { ...e, id: id }

        if (id === 'costs') {
            const c = e.comicionF + e.envio + e.costo_base + e.otros
            const x = 1 - (e.impN + e.impP + e.comicion + e.ganancia) / 100
            const p = c / x
            content.precio_final = p
        }

        setModalContent(content)

        setTimeout(() => {
            actions.setSubmitting(false)
            onOpen()
        }, 2000)
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.forms}</div>

            <section className='flex flex-col items-center w-full' id='ingreso'>
                <div className='text-5xl mb-8'>{langText.designsForm.ingreso.title}</div>

                <Formik
                    initialValues={initialValues.ingreso}
                    validationSchema={validationSchema.ingreso}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'ingreso')
                    }}
                    onReset={() => {
                        handleResetForm('ingreso')
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                        <Form className={formClass + ' max-w-[400px]'} >
                            <Input
                                type="text"
                                name="email"
                                label={langText.form.email}
                                placeholder={langText.designsForm.ingreso.emailPH}
                                size='lg'
                                className='form-input'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isClearable
                                onClear={() => values.email = ''}
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => setShowPass(!showPass)}>
                                        {showPass ? icons.EyeSlash : icons.Eye}
                                    </button>
                                }
                                type={showPass ? "text" : "password"}
                                errorMessage={touched.password && errors.password}
                                isInvalid={touched.password && errors.password ? true : false}
                            />

                            <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
                                <Switch
                                    aria-label={langText.designsForm.ingreso.keep} name='keep'
                                    onValueChange={e => values.keep = e} className='text-sm'
                                    color='success'
                                >
                                    {langText.designsForm.ingreso.keep}
                                </Switch>

                                <div className='text-center'>
                                    <Link color="primary" href="#" size="sm">
                                        {langText.designsForm.ingreso.forgot}?
                                    </Link>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 sm:flex-row justify-center w-full'>
                                <Tooltip content="Reset" placement='bottom' color='default'>
                                    {buttonReset}
                                </Tooltip>

                                <Button
                                    color='primary'
                                    className={buttonFormClass + ' w-full'}
                                >
                                    {langText.designsForm.ingreso.register}
                                </Button>

                                <Button
                                    type='submit'
                                    className={buttonFormClass + ' w-full sm:w-auto'}
                                    color='secondary'
                                    isLoading={isSubmitting}
                                    isDisabled={!(dirty && isValid)}
                                >
                                    {langText.designsForm.ingreso.login}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>


            <Divider className='w-3/4 max-w-[1200px] my-8' />


            <section className='flex flex-col items-center w-full' id='datos'>
                <div className='text-5xl mb-8'>{langText.designsForm.datos.title}</div>

                <Formik
                    initialValues={initialValues.datos}
                    validationSchema={validationSchema.datos}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'datos')
                    }}
                    onReset={() => {
                        handleResetForm('datos')
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                        <Form className={formClass + ' max-w-[800px]'} >
                            <RadioGroup
                                name='gender'
                                label={langText.designsForm.datos.gender}
                                orientation="horizontal"
                                className='ps-2'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.gender && errors.gender ? true : false}
                                errorMessage={touched.gender && errors.gender}
                            >
                                <Radio value="masc">{langText.designsForm.datos.genders.masc}</Radio>
                                <Radio value="fem">{langText.designsForm.datos.genders.fem}</Radio>
                                <Radio value="none">{langText.designsForm.datos.genders.none}</Radio>
                            </RadioGroup>

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
                                type='text'
                                name="address"
                                label={langText.designsForm.datos.address}
                                className='form-input'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isClearable
                                onClear={() => values.address = ''}
                                isInvalid={touched.address && errors.address ? true : false}
                                errorMessage={touched.address && errors.address}
                            />

                            <div>
                                <Input
                                    type='number'
                                    name="phone"
                                    label={langText.form.phone}
                                    placeholder='999 999 9999'
                                    description={langText.designsForm.datos.phoneDesc}
                                    className='form-input'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isClearable
                                    onClear={() => values.phone = ''}
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
                                    label={langText.designsForm.datos.day}
                                    placeholder="Seleccione"
                                    className='form-select'
                                    onSelectionChange={key => setSelectDay(key.currentKey)}
                                    selectedKeys={selectDay}

                                    onChange={handleChange}
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
                                    label={langText.designsForm.datos.month}
                                    placeholder="Seleccione"
                                    className='form-select'
                                    onSelectionChange={key => setSelectMonth(key.currentKey)}
                                    selectedKeys={selectMonth}
                                    onChange={handleChange}
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
                                    label={langText.designsForm.datos.year}
                                    placeholder='1900-2023'
                                    className='form-input'

                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isClearable
                                    onClear={() => values.year = ''}
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
                                isClearable
                                onClear={() => values.date = ''}
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
                                        {langText.designsForm.datos.accept}
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
                                                <div className="text-small font-bold">{langText.designsForm.datos.agreement}:</div>
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

                            <div className='flex flex-col gap-4 sm:flex-row justify-end w-full'>
                                {buttonReset}

                                <Button
                                    type='submit'
                                    className={buttonFormClass + ' w-full sm:w-auto'}
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


            <section className='flex flex-col items-center w-full' id='ficha'>
                <div className='text-5xl mb-8'>{langText.designsForm.ficha.title}</div>

                <Formik
                    initialValues={initialValues.ficha}
                    validationSchema={validationSchema.ficha}
                    onSubmit={(e, actions) => {
                        handleSubmitForm(e, actions, 'ficha')
                    }}
                    onReset={() => {
                        handleResetForm('ficha')
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur, initialValues }) => (
                        <Form className={formClass + ' max-w-sm justify-center'}  >
                            <div className='flex flex-col gap-4 sm:flex-row justify-between max-xs:ps-2'>
                                <Input
                                    isReadOnly
                                    type="number"
                                    name="fileNum"
                                    label={langText.designsForm.ficha.fileNum}
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
                                label={langText.designsForm.ficha.category}
                                placeholder={langText.form.selectPH}
                                variant='underlined'
                                onSelectionChange={key => setSelectCategory(key.currentKey)}
                                selectedKeys={selectCategory}

                                onChange={handleChange}
                                isInvalid={touched.category && errors.category ? true : false}
                                errorMessage={touched.category && errors.category}
                            >
                                {[...Array(6)].map((e, i) => (
                                    <SelectItem key={i + 1} >
                                        {langText.designsForm.ficha.category + " " + (i + 1)}
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
                                isClearable
                                onClear={() => values.name = ''}
                                isInvalid={touched.name && errors.name ? true : false}
                                errorMessage={touched.name && errors.name}
                            />

                            <Input
                                type="number"
                                name="quantity"
                                label={langText.designsForm.ficha.quantity}
                                labelPlacement='outside-left'
                                variant='underlined'
                                size='lg'
                                className='max-xs:flex-col'
                                classNames={{
                                    mainWrapper: 'w-full'
                                }}

                                onChange={handleChange}
                                onBlur={handleBlur}
                                isClearable
                                onClear={() => values.quantity = ''}
                                isInvalid={touched.quantity && errors.quantity ? true : false}
                                errorMessage={touched.quantity && errors.quantity}
                            />

                            <Input
                                type="number"
                                name="ammount"
                                label={langText.designsForm.ficha.ammount}
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
                                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                                            name="currency"
                                            onChange={handleChange}
                                            defaultValue={initialValues.currency}
                                        >
                                            <option>USD</option>
                                            <option>ARS</option>
                                            <option>EUR</option>
                                        </select>
                                    </div>
                                }

                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.ammount && errors.ammount ? true : false}
                                errorMessage={touched.ammount && errors.ammount}
                            />

                            <div className='flex flex-col gap-4 sm:flex-row justify-end w-full'>
                                {buttonReset}

                                <Button
                                    type='submit'
                                    className={buttonFormClass + ' w-full sm:w-auto'}
                                    color='secondary'
                                    isLoading={isSubmitting}
                                    isDisabled={!(dirty && isValid)}
                                >
                                    {langText.designsForm.ficha.add}
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
                        handleResetForm('tabs')
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
                                                        className={buttonFormClass}
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
                                                        className={buttonFormClass + ' text-white'}
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
                                                        className={buttonFormClass}
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
                        handleResetForm('costs')
                    }}
                >
                    {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur, initialValues }) => (
                        <Form className={formClass + ' xs:max-w-[250px]'} >
                            {['impN', 'impP', 'comicion', 'ganancia'].map(inp =>
                                <Input
                                    key={inp}
                                    type='number'
                                    name={inp}
                                    label={langText.designsForm.costs[inp]}
                                    className='form-input'
                                    min={0}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">%</span>
                                        </div>
                                    }

                                    // defaultValue={initialValues[inp]}
                                    value={values[inp]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isClearable
                                    onClear={() => values[inp] = ''}
                                    isInvalid={touched[inp] && errors[inp] ? true : false}
                                    errorMessage={touched[inp] && errors[inp]}
                                />
                            )}

                            {['comicionF', 'envio', 'costo_base', 'otros'].map(inp =>
                                <Input
                                    key={inp}
                                    type='number'
                                    name={inp}
                                    label={langText.designsForm.costs[inp]}
                                    className='form-input'
                                    min={0}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }

                                    // defaultValue={initialValues[inp]}
                                    value={values[inp]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isClearable
                                    onClear={() => values[inp] = ''}
                                    isInvalid={touched[inp] && errors[inp] ? true : false}
                                    errorMessage={touched[inp] && errors[inp]}
                                />
                            )}

                            <div className='flex flex-col gap-4 sm:flex-row justify-end w-full'>
                                {buttonReset}

                                <Button
                                    type='submit'
                                    className={buttonFormClass + ' w-full sm:w-auto'}
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
                className={dark ? 'dark text-foreground' : ''}
                placement='center'
            >
                <ModalContent>
                    {(onClose) => (
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
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Ok
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main >
    );
}

export default Formularios;
