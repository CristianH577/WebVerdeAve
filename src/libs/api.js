import axios from 'axios';
import addLangText from '../lang/libs/api.json'

import { toast } from 'react-toastify';


const baseURL = 'http://localhost:50/own-page-api/'
const client = axios.create({
  baseURL: baseURL
})

var lang = 'es'
const langText = addLangText
var alert = {
  bool: false,
  variant: 'warning',
  msg: langText[lang].errors_server.api,
}


const analyzeResponse = (response) => {
  // console.log(response)
  alert.variant = 'danger'

  if (typeof response.data === 'object') {
    const error = response.data.error
    const answer = response.data.answer

    if (error) {
      alert.msg = langText[lang].errors_server[error] ? langText[lang].errors_server[error] : langText[lang].errors_server['']
    }
    else if (answer || answer === '' || answer.length === 0 || answer === 0 || answer === false) {
      alert.bool = true
      alert.variant = "success"
      alert.value = answer
      if (typeof answer === 'string') alert.msg = langText[lang].success_server[answer] ? langText[lang].success_server[answer] : langText[lang].success_server['']
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


export async function postAPI(values, action, currentLang) {
  currentLang && (lang = currentLang)
  alert.title = 'postAPI'

  const formData = new FormData()

  const entries = Object.entries(values)
  for (let i = 0; i < entries.length; i++) {
    formData.append(entries[i][0], entries[i][1])
  }

  await client.post(action, formData)
    .then(response => analyzeResponse(response))
    .catch(e => {
      alert.msg = langText[lang].errors_server.connection
      alert.value = e
    })

  if (!alert.bool || typeof alert.value === 'string') {
    showAlert(alert)
  }

  return alert
}

export async function getAPI(action, currentLang) {
  currentLang && (lang = currentLang)
  alert.title = 'getAPI'

  await client.get(action)
    .then(response => analyzeResponse(response))
    .catch(e => {
      alert.msg = langText[lang].errors_server.connection
      alert.value = e
    })

  if (!alert.bool || typeof alert.value === 'string') {
    showAlert(alert)
  }

  return alert
}
