import axios from 'axios';
import addLangText from '../lang/libs/fastapi.json'

import { toast } from 'react-toastify';


const baseURL = 'http://127.0.0.1:8000/'
const client = axios.create({
    baseURL: baseURL
})

const langText = addLangText

var config = {
    lang: 'es',
    dark: false,
    toastId: 'toast_server'
}

const defaultAlert = {
    bool: false,
    variant: 'warning',
    msg: langText[config.lang].errors_server.fapi,
    value: false,
    status: false,
}
var alert = { ...defaultAlert }


const analyzeResponse = (response) => {
    alert.variant = 'danger'

    alert.status = response.status

    if (response.status < 200 || response.status > 299) {
        alert.msg = response.detail
    }
    else {
        alert.bool = true
        alert.variant = "success"
        alert.value = response.data
    }

}
const showAlert = (alertToShow) => {
    const msg = <div>
        <div className='font-semibold'>{alertToShow.msg.title}:</div>
        <div >{alertToShow.msg.content}.</div>
    </div>

    var type = toast.TYPE.DEFAULT
    switch (alertToShow.variant) {
        case 'info':
            type = toast.TYPE.INFO
            break;
        case 'success':
            type = toast.TYPE.SUCCESS
            break;
        case 'warning':
            type = toast.TYPE.WARNING
            break;
        case 'danger':
            type = toast.TYPE.ERROR
            break;

        default:
            break;
    }

    toast(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type: type,
        theme: config.dark ? 'dark' : 'light',
    })

}


export async function getFAPI(action, newConfig) {
    alert = { ...defaultAlert }

    newConfig && (config = { ...config, ...newConfig })

    await client.get(action)
        .then(response => analyzeResponse(response))
        .catch(e => {
            alert.msg = langText[config.lang].errors_server.server
        })

    if (!alert.bool) {
        showAlert(alert)
    }

    return alert
}

export async function postFAPI(action, values, newConfig) {
    alert = { ...defaultAlert }

    newConfig && (config = { ...config, ...newConfig })

    const formData = new FormData()

    const entries = Object.entries(values)
    for (let i = 0; i < entries.length; i++) {
        formData.append(entries[i][0], entries[i][1])
    }

    await client.post(action, formData)
        .then(response => analyzeResponse(response))
        .catch(e => {
            alert.msg = langText[config.lang].errors_server.server
        })

    if (!alert.bool) {
        showAlert(alert)
    }

    return alert
}

export async function postFAPIgraph(action, values, newConfig) {
    alert = { ...defaultAlert }

    newConfig && (config = { ...config, ...newConfig })

    const formData = new FormData()

    const entries = Object.entries(values)
    for (let i = 0; i < entries.length; i++) {
        formData.append(entries[i][0], entries[i][1])
    }

    var blob = false

    const config_post = {
        responseType: "blob",
    }

    await client.post(action + "/", formData, config_post)
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
            alert.msg = langText[config.lang].errors_server.server
        })

    if (!blob) {
        alert.msg = langText[config.lang].errors_server.response
    }
    if (!alert.bool) {
        showAlert(alert)
    }

    return blob
}


export async function deleteFAPI(action, newConfig) {
    alert = { ...defaultAlert }

    newConfig && (config = { ...config, ...newConfig })

    await client.delete(action)
        .then(response => analyzeResponse(response))
        .catch(e => {
            alert.msg = langText[config.lang].errors_server.server
        })

    if (!alert.bool) {
        showAlert(alert)
    }

    return alert
}