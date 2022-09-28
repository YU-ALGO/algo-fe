import { reactive } from 'vue'
import useAxios from '@/modules/axios'
import router from '@/router'


export const useAuth = () => {
  const state = reactive({ isLogin: false, isAdmin: false })
  const { axiosGet, axiosPost } = useAxios()

  const login = (data) => {
    return new Promise((resolve, reject) => {
      axiosPost('/api/v1/login', data
      , (res) => {
        state.isLogin = true
        if (res.data.isAdmin) {
          state.isAdmin = true
        }
        alert(res.data.nickname + '님 환영합니다!')
        router.push('/')
      }, (res) => {
        console.error(res)
        reject(res)
      })
    })
  }

  const logout = () => {
    axiosPost('/logout', {
    }, (res) => {
      state.isLogin = false
      state.isAdmin = false
      console.log('로그아웃 성공: ' + res.data)
    }, (res) => {
      console.log('로그아웃 실패: ' + res.data)
    })
  }

  const isAdmin = () => {
    axiosGet('/api/v1/admin'
    , (res) => {
      state.isAdmin = true
      console.log(res.data)
    }, (res) => {
      console.error(res)
    })
  }

  return {
    state,
    login,
    logout,
    isAdmin,
  }
}
