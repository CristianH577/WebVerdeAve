import axios from 'axios';
import langText from '../lang/libs/api.json'

import { toast, Flip } from 'react-toastify';


const client = axios.create({
  baseURL: 'http://localhost:50/api-php-verde-ave/'
})

var lang = 'es'
let toastFAPI = 'toastFAPI'
const default_alert = {
  bool: false,
  status: false,
  variant: 'warning',
  msg: langText[lang]?.errors?.api,
}
var alert = { ...default_alert }


const analyzeResponse = (response) => {
  // console.log('analyzeResponse', response)
  if (response) {
    alert.msg = false
    alert.status = response.status
    const error = response.data?.error
    const answer = response.data?.answer

    if (error) {
      alert.variant = 'error'
      const msg = langText[lang]?.errors[error]
      alert.msg = msg ? msg : error
    } else if (answer) {
      alert.bool = true
      alert.variant = 'success'
      alert.value = answer?.value

      const detail = answer?.detail
      const msg = langText[lang]?.success[detail]
      alert.msg = msg ? msg : detail
    }

    if (alert.msg) showAlert()
  }

}

const analyzeError = (e) => {
  // console.log('analyzeError', e)
  if (["ERR_NETWORK", "ERR_BAD_RESPONSE"].includes(e.code)) {
    alert.status = 500
    alert.msg = langText[lang]?.errors?.server
  } else if (e.code === "ERR_BAD_REQUEST") {
    alert.status = e.response.request.status
  }

  if (alert.status) {
    alert.msg = false
    alert.variant = 'error'
    if (alert.status < 500) {
      const detail = e?.response?.data?.detail
      const msg = langText[lang]?.errors[detail]
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

    if (!toast.isActive(toastFAPI)) {
      toastFAPI = toast(msg, {
          type: alert.variant,
      })
  } else {
      toast.update(toastFAPI, {
          render: msg,
          type: alert.variant,
          transition: Flip
      })
  }

}


export async function postAPI(action, data, currentLang) {
  alert = { ...default_alert }
  currentLang && (lang = currentLang)

  await client.post(action, data)
    .then(response => analyzeResponse(response))
    .catch(e => analyzeError(e))

  return alert
}

export async function getAPI(action, currentLang) {
  alert = { ...default_alert }
  currentLang && (lang = currentLang)

  await client.get(action)
    .then(response => analyzeResponse(response))
    .catch(e => analyzeError(e))

  return alert
}
