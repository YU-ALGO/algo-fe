import { reactive } from 'vue'
import useAxios from '@/modules/axios'

export const useAuth = () => {
  const state = reactive({ isLogin: false, isAdmin: false })
  const { axiosGet, axiosPost } = useAxios()

  const authLogin = (data) => {
    axiosPost('/api/v1/login', data
    , (res) => {
      state.isLogin = true
      if (res.data.isAdmin) {
        state.isAdmin = true
      }
      alert(res.data.nickname + "님 환영합니다!")
      // 성공 callback은 Login.vue에서 직접 처리
    }, () => {
      alert('아이디 또는 비밀번호를 확인해주세요.')
    })

  }

  const authLogout = () => {
    axiosPost('/logout', {
    }, (res) => {
      state.isLogin = false
      state.isAdmin = false
      console.log('로그아웃 성공: ' + res.data)
      alert('사이트에서 로그아웃되었습니다!')
      location.reload()
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
    authLogin,
    authLogout,
    isAdmin,
  }
}
