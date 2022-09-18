import axios from 'axios'

export default () => {
  const BASE_URL = 'http://be2.downbit.r-e.kr:8088'
  const CONFIG = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  }

  const createURL = (url) => {
    return url.startsWith('http') ? url : BASE_URL + url
  }

  const checkResult = (resp, onSuccess, onFailed) => {
    if (resp.status === 200 || resp.status === 201) {  // && resp.data.rsp === 'ok'
      if (onSuccess) {
        onSuccess(resp)
      }
    } else {
      if (onFailed) {
        onFailed(resp)
      }
    }
  }

  const axiosGet = async (url, onSuccess = null, onFailed = null) => {
    axios.get(createURL(url), CONFIG).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  const axiosPost = async (url, data, onSuccess = null, onFailed = null) => {
    axios.post(createURL(url), data, CONFIG).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  const axiosPut = async (url, data, onSuccess = null, onFailed = null) => {
    axios.put(createURL(url), data, CONFIG).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  const axiosPatch = async (url, data, onSuccess = null, onFailed = null) => {
    axios.patch(createURL(url), data, CONFIG).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  const axiosDelete = async (url, onSuccess = null, onFailed = null) => {
    axios.delete(createURL(url), CONFIG).then((resp) => {
      checkResult(resp, onSuccess, onFailed)
    })
  }

  return {
    axiosGet,
    axiosPost,
    axiosPut,
    axiosPatch,
    axiosDelete,
  }
}
