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
    variant: 'info',
    msg: langText[config.lang].errors.fapi,
    value: false,
    status: false,
}
var alert = { ...defaultAlert }


const analyzeResponse = (response) => {
    // console.log(response)
    if (response) {
        alert.status = response.status

        if (alert.status >= 200 && alert.status < 300) alert.bool = true

        alert.msg = response.data?.detail
        alert.value = response.data?.value

        if (alert.msg) alert.variant = 'success'

        if (alert.msg) showAlert()
    }
}
const analyzeError = (e) => {
    // console.log(e)
    if (e.code === "ERR_NETWORK") {
        alert.status = 500
        alert.msg = langText[config.lang].errors.server
    } else if (e.code === "ERR_BAD_REQUEST") {
        alert.status = e.response.request.status
    }

    if (alert.status) {
        alert.variant = 'danger'
        if (alert.status < 500) {
            const detail = e?.response?.data?.detail
            const msg = langText[config.lang].errors[detail]
            alert.msg = msg ? msg : detail
        }
    }

    if (alert.msg) showAlert()
}
const showAlert = () => {
    const msg = alert.msg.title
        ? <div>
            <div className='font-semibold'>{alert.msg.title}:</div>
            <div >{alert.msg.content}.</div>
        </div>
        : alert.msg

    var type = toast.TYPE.DEFAULT
    switch (alert.variant) {
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
        .catch(e => analyzeError(e))

    return alert
}

export async function postFAPI(action, data, newConfig) {
    alert = { ...defaultAlert }

    newConfig && (config = { ...config, ...newConfig })

    await client.post(action, data)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}


export async function deleteFAPI(action) {
    alert = { ...defaultAlert }

    await client.delete(action)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}


export async function putFAPI(action, data) {
    alert = { ...defaultAlert }

    await client.put(action, data)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}


export async function postFAPIgraph(action, data, newConfig) {
    alert = { ...defaultAlert }

    newConfig && (config = { ...config, ...newConfig })

    var blob = false

    const config_post = {
        responseType: "blob",
    }

    await client.post(action + "/", data, config_post)
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
        // .then( blob => {
        //     if (blob) {
        //         const reader = new FileReader()
        //         alert.value = reader.readAsDataURL(blob)
        //     }
        // })
        .catch(e => analyzeError(e))

    // if (!blob) alert.msg = langText[config.lang].errors_server.response
    if (!alert.bool) showAlert(alert)

    return blob
}
