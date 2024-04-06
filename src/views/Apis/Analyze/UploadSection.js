import React, { useEffect, useState } from 'react';

import addLangText from '../../../lang/Apis/Analyze/UploadSection.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input } from "@nextui-org/react";

import { postFAPI } from '../../../libs/fastapi';

import file_example from '../../../assets/files/analyze.json'

import { Reset } from '../../../assets/icons';


function UploadSection({ setData }) {
    const context = useOutletContext()
    const lang = context.lang
    const langText = {
        ...context.langText[lang],
        ...addLangText[lang]
    }

    var input_file = document.querySelector('#upload_file_input')
    var button_file = document.querySelector('#upload_file_btn')
    const [isLoading, setIsLoading] = useState(false)


    const UploadExample = () => {
        const newData = {
            name: 'wine_data.csv',
            ...file_example,
        }

        setData(newData)
    }

    const handleFile = async (file) => {
        setIsLoading(true)

        const values = { file: file }
        const response = await postFAPI('file_to_df', values, lang)

        if (response.bool) {
            if (response.status === 200) {
                const val = response.value

                const newData = {
                    name: file.name,
                    cols: val.cols,
                    rows: JSON.parse(val.rows),
                }

                setData(newData)
            }
        }

        setIsLoading(false)
        document.querySelector('#upload_file_form').reset()
    }

    const handleOnChangeFileInput = (e) => {
        const uploadFile = e.target.files[0]

        if (uploadFile) handleFile(uploadFile)
    }

    const handleDropFile = (e) => {
        e.preventDefault()

        button_file.removeAttribute('data-drag')

        var file = false
        if (e.dataTransfer.items) {
            const to = e.dataTransfer.items.length
            for (var i = 0; i < to; i++) {
                const kind = e.dataTransfer.items[i].kind
                if (kind === "file") {
                    file = e.dataTransfer.items[i].getAsFile()
                    i = to
                }
            }
        } else {
            file = e.dataTransfer.files[0]
        }

        if (file !== false) handleFile(file)
    }

    const handleClean = () => {
        document.querySelector('#upload_file_form').reset()
        setData(false)
        setIsLoading(false)
    }


    useEffect(() => {
        // eslint-disable-next-line
        input_file = document.querySelector('#upload_file_input')
        // eslint-disable-next-line
        button_file = document.querySelector('#upload_file_btn')
    }, [])


    return (
        <section className='mt-4 '>
            <div className=' center gap-4 sm:flex-row items-center'>
                <div className='max-xs:w-full center items-center'>
                    <form id='upload_file_form'>
                        <Input
                            type='file'
                            onChange={handleOnChangeFileInput}
                            className='hidden'
                            id='upload_file_input'
                            accept='.xlsx,.csv,.xls'
                        />
                    </form>

                    <Button
                        color='secondary'
                        variant='shadow'
                        onClick={() => input_file && input_file.click()}
                        className='button-xs data-[drag=true]:bg-warning data-[drag=true]:shadow-none '
                        id='upload_file_btn'

                        isLoading={isLoading}
                        onDragEnter={() => {
                            button_file.setAttribute('data-drag', true)
                        }}
                        onDragLeave={() => {
                            button_file.removeAttribute('data-drag')
                        }}

                        onDragOver={(e) => {
                            e.preventDefault()
                        }}
                        onDrop={handleDropFile}
                    >
                        {langText.upload_data} (.csv/.xls/.xlsx)
                    </Button>
                </div>

                <Button
                    color='primary'
                    variant='shadow'
                    onClick={UploadExample}
                    className='button-xs'
                    isLoading={isLoading}
                >
                    {langText.upload_example}
                </Button>

                <Button
                    isIconOnly
                    color='default'
                    variant='shadow'
                    onClick={handleClean}
                    className='button-xs'
                >
                    <Reset />
                </Button>
            </div>

        </section>
    );
}

export default UploadSection;
