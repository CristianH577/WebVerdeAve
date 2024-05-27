
import { Button, Input } from '@nextui-org/react'

import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';



function FormBoardBase({ isLoading, onSubmit }) {

    const form_base_inputs = {
        rows: 'Filas',
        cols: 'Columnas',
        ilumination: 'Iluminacion',
    }

    return (
        <Formik
            initialValues={{
                rows: 5,
                cols: 5,
            }}
            validationSchema={
                yup.object().shape({
                    rows: yup.number().min(1, 'Min. 1').max(10, 'Max. 10').required('Complete el campo'),
                    cols: yup.number().min(1, 'Min. 1').max(10, 'Max. 10').required('Complete el campo'),
                })
            }
            onSubmit={onSubmit}
        >
            {({ handleChange, handleBlur, values, isSubmitting, errors, isValid }) => (
                <Form className='flex flex-col items-center gap-2'>
                    <div className='flex items-center gap-2 flex-wrap justify-center'>
                        <Input
                            type='number'
                            name='rows'
                            label='Filas'
                            size='sm'
                            className='w-24'
                            defaultValue={values.rows}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.rows ? true : false}
                        />
                        <Input
                            type='number'
                            name='cols'
                            label='Columnas'
                            size='sm'
                            className='w-24'
                            defaultValue={values.cols}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={errors.cols ? true : false}
                        />

                        <Button
                            type='submit'
                            className='px-4'
                            isLoading={isSubmitting}
                            isDisabled={isLoading || !isValid}
                        >
                            Generar base
                        </Button>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div>
                            {Object.keys(errors).map(key =>
                                <ErrorMessage key={key} name={key}>
                                    {msg =>
                                        <div className='text-sm text-danger'>
                                            {form_base_inputs[key]}: {msg}
                                        </div>
                                    }
                                </ErrorMessage>
                            )}
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
}

export default FormBoardBase;
