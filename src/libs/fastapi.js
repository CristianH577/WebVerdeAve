import axios from 'axios';
import addLangText from '../lang/libs/fastapi.json'

import { toast } from 'react-toastify';


const baseURL = 'http://127.0.0.1:8000/'
const client = axios.create({
    baseURL: baseURL
})

var lang = 'es'
const langText = addLangText

const defaultAlert = {
    bool: false,
    variant: 'warning',
    msg: langText[lang].errors_server.fapi,
    value: false,
}
var alert = { ...defaultAlert }


const analyzeResponse = (response) => {
    // console.log(response)
    alert.variant = 'danger'

    if (typeof response.data === 'object') {
        const error = response.data.error
        const answer = response.data.answer

        if (error) {
            alert.msg = langText[lang].errors_server[error] ? langText[lang].errors_server[error] : langText[lang].errors_server['']
            if (error === 'handle') {
                alert.msg.content = response.data.errorValue
            }
        }
        else if (answer || answer === '' || answer.length === 0 || answer === 0 || answer === false) {
            alert.bool = true
            alert.variant = "success"
            alert.value = answer
        }
    }
    else {
        alert.msg = langText[lang].errors_server.response
    }

}
const showAlert = (alertToShow) => {
    const msg = <div>
        <div className='font-semibold'>{alertToShow.msg.title}:</div>
        <div className=''>{alertToShow.msg.content}.</div>
    </div>

    switch (alertToShow.variant) {
        case 'info':
            toast.info(msg)
            break;
        case 'success':
            toast.success(msg)
            break;
        case 'warning':
            toast.warning(msg)
            break;
        case 'danger':
            toast.error(msg)
            break;

        default:
            toast(msg)
            break;
    }
}


export async function postFAPI(action, values, currentLang) {
    alert = { ...defaultAlert }

    currentLang && (lang = currentLang)

    const formData = new FormData()

    const entries = Object.entries(values)
    for (let i = 0; i < entries.length; i++) {
        formData.append(entries[i][0], entries[i][1])
    }

    await client.post(action + "/", formData)
        .then(response => analyzeResponse(response))
        .catch(e => {
            // console.log(e)
            alert.msg = langText[lang].errors_server.server
        })

    if (!alert.bool) {
        showAlert(alert)
    }

    return alert
}

export async function getFAPI(action, currentLang) {
    alert = { ...defaultAlert }

    currentLang && (lang = currentLang)

    await client.get(action + "/")
        .then(response => analyzeResponse(response))
        .catch(e => {
            // console.log(e)
            alert.msg = langText[lang].errors_server.server
        })

    if (!alert.bool) {
        showAlert(alert)
    }

    return alert
}

export async function postFAPIgraph(action, values, currentLang) {
    alert = { ...defaultAlert }

    currentLang && (lang = currentLang)

    const formData = new FormData()

    const entries = Object.entries(values)
    for (let i = 0; i < entries.length; i++) {
        formData.append(entries[i][0], entries[i][1])
    }

    var blob = false

    const config = {
        responseType: "blob",
    }

    await client.post(action + "/", formData, config)
        .then(async (response) => {
            const isJsonBlob = (data) => data instanceof Blob && data.type === "application/json"
            const responseData = isJsonBlob(response?.data)
                ? await (response?.data)?.text()
                : response?.data || {}
            const responseJson = (typeof responseData === "string")
                ? JSON.parse(responseData)
                : responseData;

            if (responseJson.error) {
                analyzeResponse(response)
            } else {
                blob = responseJson
                alert.bool = true
            }
        })
        .catch(e => {
            console.log(e)
            alert.msg = langText[lang].errors_server.server
        })

    if (!blob) {
        alert.msg = langText[lang].errors_server.response
    }
    if (!alert.bool) {
        showAlert(alert)
    }

    return blob
}