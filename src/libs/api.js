import axios from 'axios';
import langText from '../lang/libs/api.json'

import { toast } from 'react-toastify';


const client = axios.create({
  baseURL: 'http://localhost:50/api-php-own-page/'
})

var lang = 'es'
const default_alert = {
  bool: false,
  status: false,
  variant: 'warning',
  msg: langText[lang]?.errors?.api,
}
var alert = { ...default_alert }


const analyzeResponse = (response) => {
  // console.log('analyzeResponse', response)
  alert.msg = false
  if (response) {
    alert.status = response.status
    const error = response.data?.error
    const answer = response.data?.answer

    if (error) {
      alert.variant = 'danger'
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
  alert.msg = false
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

  if (alert.msg) showAlert()
}

const showAlert = () => {
  const msg = alert.msg.title
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
