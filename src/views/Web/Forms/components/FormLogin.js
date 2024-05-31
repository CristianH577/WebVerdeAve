
import { useState } from "react";

import addLangText from '../../../../lang/Web/Forms/components/FormLogin.json'
import { useOutletContext } from "react-router-dom";

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Input, Button, Switch, Link } from "@nextui-org/react";

import { BsEye, BsEyeSlash } from "react-icons/bs";



function FormLogin({ form_class, handleSubmitForm, ButtonReset }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const initialValues = {
        email: '',
        password: '',
        keep: false,
        show_pass: false,
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email(langText.validationSchema.emailInvalid).required(langText.validationSchema.complete),
        password: yup.string().min(5, langText.validationSchema.min + 5).max(10, langText.validationSchema.max + 10).required(langText.validationSchema.complete),
    })


    const [login, setLogin] = useState(initialValues)



    return (
        <section className='flex flex-col items-center w-full' id='login'>
            <div className='text-5xl mb-8'>{langText.title}</div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e, actions) => {
                    handleSubmitForm(e, actions, 'login', addLangText)
                }}
            >
                {({ handleChange, errors, values, isSubmitting, isValid, dirty, touched, handleBlur }) => (
                    <Form className={form_class + ' max-w-[400px]'} >
                        <Input
                            type="text"
                            name="email"
                            label={langText.form.email}
                            placeholder={langText.emailPH}
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
                                    {login.show_pass
                                        ? <BsEyeSlash size={24} className='text-default-400 ' />
                                        : <BsEye size={24} className='text-default-400 ' />
                                    }
                                </button>
                            }

                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={touched.password && errors.password}
                            isInvalid={touched.password && errors.password ? true : false}
                        />

                        <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
                            <Switch
                                aria-label={langText.keep}
                                name='keep'
                                onValueChange={e => {
                                    values.keep = e
                                }}
                                className='text-sm'
                                color='success'
                            >
                                {langText.keep}
                            </Switch>

                            <div className='text-center'>
                                <Link color="primary" size="sm" className="cursor-pointer">
                                    {langText.forgot}?
                                </Link>
                            </div>
                        </div>

                        <div className='flex flex-col-reverse gap-4 sm:flex-row justify-center w-full'>
                            {ButtonReset}

                            <Button
                                color='primary'
                                className={'form-button w-full'}
                            >
                                {langText.register}
                            </Button>

                            <Button
                                type='submit'
                                className={'form-button max-sm:w-full'}
                                color='secondary'
                                isLoading={isSubmitting}
                                isDisabled={!(dirty && isValid)}
                            >
                                {langText.login}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormLogin;
