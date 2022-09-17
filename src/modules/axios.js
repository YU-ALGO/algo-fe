import { ref } from 'vue'
import axios from 'axios'

export default function () {
    const communicating = ref(false)
    const BASE_URL = 'http://be.downbit.r-e.kr:8088'

    const creatURL = (url) => {
        return url.startsWith('http') ? url : BASE_URL + url
    }

    const checkResult = (resp, onSuccess, onFailed) => {
        communicating.value = false
        if (resp.status === 200 || resp.status === 201) {
            if (onSuccess) {
                onSuccess(resp.data)
            }
        } else {
            if (onFailed) {
                onFailed(resp.data)
            }
        }
    }

    const axiosGet = async (url, onSuccess = null, onFailed = null) => {
        communicating.value = true
        axios.get(creatURL(url), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
        }).then((resp) => {
            return checkResult(resp, onSuccess, onFailed)
        })
    }

    const axiosPost = async (url, data, onSuccess = null, onFailed = null) => {
        communicating.value = true
        axios.post(creatURL(url), JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // authorization: 'Bearer ' + cookies.get('accessToken'),
            },
            withCredentials: true
        }).then((resp) => {
            checkResult(resp, onSuccess, onFailed)
        })
    }

    const axiosPut = async (url, data, onSuccess = null, onFailed = null) => {
        communicating.value = true
        axios.put(creatURL(url), data).then((resp) => {
            checkResult(resp, onSuccess, onFailed)
        })
    }

    return {
        communicating,
        axiosGet,
        axiosPost,
        axiosPut,
    }
}