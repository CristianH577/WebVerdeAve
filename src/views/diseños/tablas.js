import React, { useState } from 'react';

import addLangText from '../../lang/diseños/tablas.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input } from "@nextui-org/react";
import { CheckboxGroup } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { CustomCheckbox } from "../../components/custom_checkbox";
import CustomTable from '../../components/custom_table'

import { Reset } from '../../assets/icons';
import data_example from '../../assets/files/tablas.json'


function Tablas() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    const defaultPreferences = {
        model: ['pages'],
        results: 10,
        checks: ['headers'],
        color: ['default'],
    }
    const [preferences, setPreferences] = useState(defaultPreferences)
    const [content, setContent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const iconst = {
        Reset: <Reset />
    }
    const selectsModel = ["none", "pages", "solicitude", "infinite"]
    const selectsColor = ["default", "primary", "secondary", "danger", "warning", "success"]

    const handleResults = e => {
        const val = parseInt(e.target.value)
        if (val === 0) return false
        setPreferences({ ...preferences, results: parseInt(e.target.value) })
    }

    const uploadTable = () => {
        if (preferences.results <= 100) {
            setIsLoading(true)

            let data = {
                ...data_example,
                labels: langText.dataLabels
            }

            setContent(<CustomTable
                data={data}
                preferences={preferences}
                ariaLabel={langText.tablaAria}
            />)

            setTimeout(() => {
                setIsLoading(false)
            }, 2000)

        }
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>{langText.tables}</div>

            <section className='flex flex-col gap-4 items-center'>

                <div className='bg-content1 rounded-lg py-4 min-[360px]:px-4 flex flex-col gap-4 shadow-medium form-xs'>
                    <div className='text-center'>{langText.form.prefs}</div>

                    <div className="flex max-sm:flex-col gap-1 w-full max-sm:items-center">
                        <Select
                            label={langText.prefs.model}
                            className="form-select max-w-[360px]"
                            defaultSelectedKeys={preferences.model}
                            selectedKeys={preferences.model}
                            onSelectionChange={key => key.currentKey && setPreferences({ ...preferences, model: [key.currentKey] })}
                        >
                            {selectsModel.map(select =>
                                <SelectItem key={select}>{langText.selectsModel[select]}</SelectItem>
                            )}
                        </Select>

                        <Select
                            label={langText.prefs.color}
                            className="form-select max-w-[360px]"
                            defaultSelectedKeys={preferences.color}
                            selectedKeys={preferences.color}
                            onSelectionChange={key => key.currentKey && setPreferences({ ...preferences, color: [key.currentKey] })}
                        >
                            {selectsColor.map(select =>
                                <SelectItem key={select}>{langText.selectsColor[select]}</SelectItem>
                            )}
                        </Select>

                        <Input
                            type="number"
                            label={langText.search.results}
                            min='1'
                            max='100'
                            defaultValue='10'
                            description='Min. 1 - Max. 100'
                            onChange={handleResults}
                            value={preferences.results}
                            isInvalid={isNaN(preferences.results) || preferences.results > 100}
                            className='form-input max-w-[360px]'
                        />
                    </div>

                    <CheckboxGroup
                        className="gap-1 max-[360px]:text-center"
                        orientation="horizontal"
                        value={preferences.checks}
                        onChange={e => setPreferences({ ...preferences, checks: e })}
                        classNames={{
                            wrapper: 'max-[360px]:justify-center'
                        }}
                    >
                        <CustomCheckbox value="headers" >
                            {langText.checks.headers}
                        </CustomCheckbox>
                        <CustomCheckbox value="striped" >
                            {langText.checks.headers}
                        </CustomCheckbox>
                        <CustomCheckbox value="sort" >
                            {langText.checks.headers}
                        </CustomCheckbox>
                        <CustomCheckbox value="select" >
                            {langText.checks.headers}
                        </CustomCheckbox>
                        <CustomCheckbox value="fixed" >
                            {langText.checks.fixed}
                        </CustomCheckbox>
                        <CustomCheckbox value="sticky" isDisabled={!preferences.checks.includes('fixed')} >
                            {langText.checks.sticky}
                        </CustomCheckbox>
                    </CheckboxGroup>
                </div>

                <div className='flex gap-4 max-sm:flex-col justify-center'>
                    <Button
                        isIconOnly
                        variant='shadow'
                        onClick={() => {
                            setPreferences(defaultPreferences)
                            setContent(false)
                        }}
                        className='max-sm:w-full'
                    >
                        {iconst.Reset}
                    </Button>

                    <Button
                        color='secondary'
                        variant='shadow'
                        isDisabled={!(preferences.results <= 100)}
                        isLoading={isLoading}
                        onClick={uploadTable}
                    >
                        {langText.loadTable}
                    </Button>
                </div>

            </section>

            <section className='mt-6'>
                {!isLoading && content}
            </section>

        </main>
    );
}

export default Tablas;
