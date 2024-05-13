import { useState } from 'react';

import addLangText from '../../../../lang/Apis/Game/components/CreateChar.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Reset } from '../../../../assets/icons.js';
import { GiBroadsword, GiAbdominalArmor, GiWizardStaff } from "react-icons/gi";
import { LuSword, LuShield, LuHeart } from "react-icons/lu";


function CreateChar({ createChar }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const icons = {
        warrior: <GiBroadsword size={50} className='rotate-[-45deg]' />,
        mage: <GiWizardStaff size={50} className='rotate-[-45deg]' />,
        tank: <GiAbdominalArmor size={50} />,

        hp_max: <LuHeart size={25} className='text-danger' />,
        damage: <LuSword size={25} color='gray' />,
        defence: <LuShield size={25} color='brown' />,
    }

    const default_points = {
        add: 7,
        hp_max: 1,
        damage: 1,
        defence: 1,
    }
    const [addStats, setAddStats] = useState(default_points)
    const initialValues = {
        name: '',
        clase: false,
    }
    const validationSchema = yup.object().shape({
        name: yup.string().min(4, langText.validationSchema.min + 4).max(10, langText.validationSchema.max + 10).required(langText.validationSchema.complete),
        clase: yup.string().oneOf(['mage', 'warrior', 'tank'], langText.validationSchema.clase).required(langText.validation.complete),
    })

    const handleCreateChar = async (values, actions) => {
        const values_correct = {
            name: values.name,
            clase: values.clase,
            stats: {
                hp_max: addStats.hp_max,
                damage: addStats.damage,
                defence: addStats.defence,
                hp: addStats.hp_max,
            }
        }
        await createChar(values_correct)
        actions.setSubmitting(false)
        // actions.resetForm()
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateChar}
            onReset={() => setAddStats(default_points)}
        >
            {({ handleChange, handleBlur, errors, values, isSubmitting, isValid, dirty, touched }) => (
                <Form className='flex flex-col gap-4 py-4 xs:px-4 w-full shadow-medium style-game border-5 xs:rounded-lg form-xs max-w-[350px] mb-4 items-center'>
                    <div className='text-2xl font-bold text-center'>{langText.new_char}</div>

                    <Input
                        type="text"
                        name="name"
                        label={langText.form.name}
                        className='form-input input-game flex-col !items-center'
                        classNames={{
                            label: 'label text-md !p-0',
                            mainWrapper: 'w-full text-center',
                            input: 'text-center',
                            errorMessage: 'text-center',
                        }}
                        labelPlacement='outside-left'
                        autoComplete='off'

                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorMessage={touched.name && errors.name}
                    />

                    <div className='text-center'>
                        <div>{langText.stats_points.title}:  {addStats.add}</div>
                    </div>

                    <div className='w-full center items-center gap-2 '>
                        {['hp_max', 'damage', 'defence'].map(stat =>
                            <div key={stat} className='w-full flex justify-center items-center gap-2 max-xs:flex-col '>
                                {icons[stat]}

                                <div className='flex w-[150px] max-xs:w-full'>
                                    <Button
                                        isIconOnly
                                        className='rounded-e-none max-xs:rounded-none button-game max-xs:w-1/3'
                                        isDisabled={addStats[stat] === 1}
                                        onClick={() => {
                                            const new_addStats = { ...addStats }
                                            new_addStats[stat] -= 1
                                            values[stat] -= 1
                                            new_addStats.add += 1
                                            setAddStats(new_addStats)
                                            values.add += 1
                                        }}
                                    >
                                        -
                                    </Button>

                                    <div className='bg-game_s1 w-[50px] center items-center max-xs:w-1/3'>
                                        {addStats[stat]}
                                    </div>

                                    <Button
                                        isIconOnly
                                        className='rounded-s-none button-game max-xs:rounded-none max-xs:w-1/3'
                                        isDisabled={addStats[stat] === 5 || addStats.add === 0}
                                        onClick={() => {
                                            const new_addStats = { ...addStats }
                                            new_addStats[stat] += 1
                                            values[stat] += 1
                                            new_addStats.add -= 1
                                            setAddStats(new_addStats)
                                            values.add -= 1
                                        }}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <RadioGroup
                        name='clase'
                        label={langText.select_clase.title + ":"}
                        orientation="horizontal"
                        className='text-center mb-4 w-full '
                        classNames={{
                            wrapper: 'justify-evenly max-xs:!flex-col max-xs:items-center',
                            label: 'text-game_s2',
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.clase && errors.clase ? true : false}
                        errorMessage={touched.clase && errors.clase}
                    >
                        {['mage', 'warrior', 'tank'].map(clase =>
                            <Radio
                                key={clase}
                                value={clase}
                                className='center gap-2 mt-2'
                                classNames={{
                                    label: 'center items-center gap-1 text-game_s1 hover:text-game_s2' + (values.clase === clase ? ' text-game_s2' : ''),
                                    labelWrapper: 'ms-0 transition hover:scale-125' + (values.clase === clase ? ' scale-125' : ''),
                                    wrapper: 'hidden',
                                }}
                            >
                                {icons[clase]}
                                {langText.select_clase[clase]}
                            </Radio>
                        )}
                    </RadioGroup>


                    <div className='flex flex-col gap-4 sm:flex-row-reverse justify-center w-full'>
                        <Button
                            type='submit'
                            className='form-button w-full sm:w-auto button-game'
                            isLoading={isSubmitting}
                            isDisabled={!(
                                dirty
                                && isValid
                                && addStats.add === 0
                            )}
                        >
                            {langText.create}
                        </Button>

                        <Button
                            type='reset'
                            isIconOnly
                            className='form-button w-full sm:w-auto'
                        >
                            <Reset />
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CreateChar;
