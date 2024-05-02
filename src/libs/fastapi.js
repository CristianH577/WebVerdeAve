import axios from 'axios';
import langText from '../lang/libs/fastapi.json'

import { toast } from 'react-toastify';


const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

var lang = 'es'
const defaultAlert = {
    bool: false,
    msg: langText[lang]?.errors?.fapi,
    value: false,
    status: false,
}
var alert = { ...defaultAlert }


const analyzeResponse = (response) => {
    // console.log(response)
    if (response) {
        alert.status = response.status

        if (alert.status >= 200 && alert.status < 300) alert.bool = true

        if (alert.status === 200) {
            alert.variant = 'success'

            alert.msg = response.data?.detail
            alert.value = response.data?.value
        } else if (alert.status === 206) {
            alert.variant = 'info'

            alert.msg = response.data.detail?.detail
            alert.value = response.data.detail?.value
        }

        if (alert.msg && alert.status) showAlert()
    }
}
const analyzeError = (e) => {
    // console.log(e)
    if (["ERR_NETWORK", "ERR_BAD_RESPONSE"].includes(e.code)) {
        alert.status = 500
        alert.msg = langText[lang]?.errors?.server
    } else if (e.code === "ERR_BAD_REQUEST") {
        alert.status = e.response.request.status
    }

    if (alert.status) {
        alert.variant = 'danger'
        if (alert.status < 500) {
            const detail = e?.response?.data?.detail
            const msg = langText[lang]?.errors[detail]
            alert.msg = msg ? msg : detail
        }
    }

    if (alert.msg && alert.status) showAlert()
}

const showAlert = () => {
    const msg = alert.msg?.title
        ? <div>
            <div className='font-semibold'>{alert.msg.title}:</div>
            <div >{alert.msg.content}.</div>
        </div>
        : alert.msg


    switch (alert.variant) {
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


export async function getFAPI(action, currentLang) {
    alert = { ...defaultAlert }
    currentLang && (lang = currentLang)

    await client.get(action)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}

export async function postFAPI(action, data, currentLang) {
    alert = { ...defaultAlert }
    currentLang && (lang = currentLang)

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


export async function postFAPIgraph(action, data, currentLang) {
    alert = { ...defaultAlert }
    currentLang && (lang = currentLang)

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
        .catch(e => analyzeError(e))

    if (!alert.bool) showAlert(alert)

    return blob
}
