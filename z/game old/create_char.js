import React, { useState } from 'react';

// import addLangText from '../../lang/designs/forms.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input, Slider } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Reset } from '../../assets/icons.js';


function CreateChar({ createChar }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        // ...addLangText[context.lang]
    }

    const default_points = {
        total: 7,
        hp: 1,
        damage: 1,
        defence: 1,
    }
    const [points, setPoints] = useState(default_points)
    const initialValues = {
        name: '',
        clase: false,
        ...default_points,
    }
    const validationSchema = yup.object().shape({
        name: yup.string().min(5, langText.validationSchema.min + 5).max(10, langText.validationSchema.max + 10).required(langText.validationSchema.complete),
        total: yup.number().max(0, "Debe usar todos los puntos"),
        clase: yup.string().oneOf(['mage', 'fighter', 'tank'], 'elija una clase').required(langText.validationSchema.complete),
    })

    const handleCreateChar = e => {
        console.log(e)
        // createChar(e)
    }


    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateChar}
            onReset={() => setPoints(default_points)}
        >
            {({ handleChange, handleBlur, errors, values, isSubmitting, isValid, dirty, touched }) => (
                <Form className='flex flex-col gap-4 py-4 xs:px-4 w-full shadow-medium bg-content1 xs:rounded-lg form-xs max-w-[350px] mb-4 items-center'>
                    <div className='text-2xl font-bold'>Nuevo Personaje</div>

                    <Input
                        type="text"
                        name="name"
                        label={langText.form.name}
                        className='form-input flex-col !items-center'
                        classNames={{
                            label: 'text-md',
                            mainWrapper:'w-full text-center',
                            input:'text-center',
                            errorMessage: 'text-center'
                        }}
                        labelPlacement='outside-left'

                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={touched.name && errors.name}
                    />

                    <div className='text-center'>
                        <div>Total points:  {points.total}</div>

                        {(touched.clase && errors.total) && (
                            <div className='text-sm text-danger'>{errors.total}</div>
                        )}

                        <Input
                            type="number"
                            name="total"
                            className='form-input'
                            readOnly
                            classNames={{
                                inputWrapper: 'hidden'
                            }}
                            value={points.total}
                        />
                    </div>

                    {['hp', 'damage', 'defence'].map(stat =>
                        <Slider
                            key={stat}
                            name={stat}
                            label={stat}
                            step={1}
                            maxValue={5}
                            minValue={1}
                            showSteps
                            className='max-xs:px-2'
                            classNames={{
                                labelWrapper:'justify-evenly'
                            }}

                            value={points[stat]}
                            endContent={<Button isIconOnly onPress={() => {
                                if (points.total > 0 && points[stat] < 5) {
                                    const newPoints = { ...points }
                                    newPoints.total -= 1
                                    newPoints[stat] += 1
                                    values.total = newPoints.total
                                    values[stat] = newPoints[stat]
                                    setPoints(newPoints)
                                }
                            }}> + </Button>}
                            startContent={<Button isIconOnly onPress={() => {
                                if (points[stat] > 1) {
                                    const newPoints = { ...points }
                                    newPoints.total += 1
                                    newPoints[stat] -= 1
                                    values.total = newPoints.total
                                    values[stat] = newPoints[stat]
                                    setPoints(newPoints)
                                }
                            }}> - </Button>}

                        />
                    )}

                    <RadioGroup
                        name='clase'
                        label="Seleccione una clase"
                        orientation="horizontal"
                        className='text-center mb-4'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.clase && errors.clase ? true : false}
                        errorMessage={touched.clase && errors.clase}
                    >
                        <Radio value="mage">Mago</Radio>
                        <Radio value="fighter">Guerrero</Radio>
                        <Radio value="tank">Tanque</Radio>
                    </RadioGroup>


                    <div className='flex flex-col gap-4 sm:flex-row justify-center w-full'>
                        <Button
                            type='reset'
                            className='form-button w-full sm:w-auto'
                        >
                            <Reset />
                        </Button>

                        <Button
                            type='submit'
                            className='form-button w-full sm:w-auto'
                            color='secondary'
                            isLoading={isSubmitting}
                            isDisabled={!(dirty && isValid)}
                        >
                            {/* {langText.designsForm.ingreso.login} */}
                            Crear
                        </Button>
                    </div>
                    {/* <div>
                        <Button
                            className='form-button w-full sm:w-auto'
                            onPress={() => console.log(values)}
                        >
                            values
                        </Button>
                        <Button
                            className='form-button w-full sm:w-auto'
                            onPress={() => console.log(errors)}
                        >
                            errors
                        </Button>
                        <Button
                            className='form-button w-full sm:w-auto'
                            onPress={() => console.log(touched)}
                        >
                            touched
                        </Button>
                    </div> */}
                </Form>
            )}
        </Formik>
    );
}

export default CreateChar;
