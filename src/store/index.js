import { createStore } from 'vuex'
import useAxios from '@/modules/axios'
import createPersistedState from 'vuex-persistedstate'

const { axiosPost } = useAxios()

export default createStore({
    namespaced: true,
    state: {
        isLogin: false,
        isAdmin: false,
    },
    mutations: {
        isLogin(state, data) {
            state.isLogin = data;
        },
        isAdmin(state, data) {
            state.isAdmin = data;
        }
    },
    getters: {
        isLogin(state) {
            return state.isLogin;
        },
        isAdmin(state) {
            return state.isAdmin;
        }
    },
    actions: {
        async login({ commit }, memberInfo) {
            await axiosPost('/api/v1/login', memberInfo, (res) => {
                alert(res.data.nickname + "님 환영합니다!")
                commit('isLogin', true)
                window.location.href = '/'
            }, () => {
                alert('아이디 또는 비밀번호를 확인해주세요.')
            })
        },
        async logout( {commit} ) {
            await axiosPost('/logout',{}, ()=> {
                alert('사이트에서 로그아웃 되었습니다!')
                commit('isLogin', false)
                window.location.href = '/'
            })
        }
    },
    plugins: [
        createPersistedState({
            paths: ['isLogin', 'isAdmin']
        })
    ],
})
