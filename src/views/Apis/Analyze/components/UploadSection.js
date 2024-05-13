import { useEffect, useState } from 'react';

import addLangText from '../../../../lang/Apis/Analyze/components/UploadSection.json'
import { useOutletContext } from 'react-router-dom';

import { Button } from "@nextui-org/react";

import { postFAPI } from '../../../../libs/fastapi';

import file_example from '../../../../assets/files/analyze.json'

import { Reset } from '../../../../assets/icons';


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

        const formData = new FormData()
        formData.append('file', file)
        const response = await postFAPI('analyze/fileToDf', formData, lang)

        if (response.bool && typeof response.value === 'object') {
            const cols = response.value?.cols
            const rows = response.value?.rows

            if (cols && rows) {
                const newData = {
                    name: file.name,
                    cols: cols,
                    rows: rows,
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
        <div className='mt-4 center gap-4 sm:flex-row items-center'>
            <div className='max-xs:w-full center items-center'>
                <form id='upload_file_form'>
                    <input
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
    );
}

export default UploadSection;
