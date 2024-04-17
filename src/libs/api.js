import axios from 'axios';
import addLangText from '../lang/libs/api.json'

import { toast } from 'react-toastify';


const client = axios.create({
  baseURL: 'http://localhost:50/api-php-bd/'
})

var lang = 'es'
const langText = addLangText
var alert = {
  bool: false,
  variant: 'warning',
  msg: langText[lang].errors.api,
}


const analyzeResponse = (response) => {
  // console.log(response)
  if (response) {
    const error = response.data?.error
    const answer = response.data?.answer

    if (error) {
      alert.variant = 'danger'
      const msg = langText[lang].errors[error]
      alert.msg = msg ? msg : error
    } else if (answer) {
      alert.bool = true
      alert.variant = 'success'
      alert.value = answer?.value

      const detail = answer?.detail
      const msg = langText[lang].success[detail]
      alert.msg = msg ? msg : detail
    }

    if (alert.msg) showAlert()
  }

}

const analyzeError = (e) => {
  // console.log(e)
  if (e.code === "ERR_NETWORK") {
    alert.status = 500
    alert.msg = langText[lang].errors.server
  } else if (e.code === "ERR_BAD_REQUEST") {
    alert.status = e.response.request.status
  }

  if (alert.status) {
    alert.variant = 'danger'
    if (alert.status < 500) {
      const detail = e?.response?.data?.detail
      const msg = langText[lang].errors[detail]
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
  currentLang && (lang = currentLang)

  await client.post(action, data)
    .then(response => analyzeResponse(response))
    .catch(e => analyzeError(e))

  return alert
}

export async function getAPI(action, currentLang) {
  currentLang && (lang = currentLang)

  await client.get(action)
    .then(response => analyzeResponse(response))
    .catch(e => analyzeError(e))

  return alert
}
