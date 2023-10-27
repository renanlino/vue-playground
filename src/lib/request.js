import Axios from 'axios'
import Qs from 'qs'
import JsonApi from './json-api'
import snakecaseKeys from 'snakecase-keys'
import { DirectUpload } from '@rails/activestorage'

async function request (method, url, params, customOptions = {}) {
  const options = {
    ...customOptions,
    headers: {
      Accept: 'application/json',
      ...customOptions.headers
    }
  }
  let requestUrl = url
  let requestParams = params || {}

  if (options.headers['Content-Type'] !== 'multipart/form-data') {
    requestParams = {
      ...snakecaseKeys(requestParams)
    }
  }

  if (['get', 'delete'].includes(method)) {
    const qs = Qs.stringify(requestParams, { arrayFormat: 'brackets' })
    // FIXME: Merge qs with possible qs from url variable
    requestUrl = `${url}?${qs}`
  } else {
    options.data = requestParams
  }

  const response = await Axios.request({
    url: requestUrl,
    method,
    ...options
  })

  return JsonApi.parse(response.data)
}

export const directUpload = (file, backendUrl) => {
  return new Promise((resolve, reject) => {
    const upload = new DirectUpload(file, `${backendUrl}/direct_uploads`)
    upload.create((error, response) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

export const get = (...args) => request('get', ...args)
export const post = (...args) => request('post', ...args)
export const put = (...args) => request('put', ...args)
export const patch = (...args) => request('patch', ...args)
export const del = (...args) => request('delete', ...args)
