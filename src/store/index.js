import { createStore } from 'vuex'
import useAxios from '@/modules/axios'
import createPersistedState from 'vuex-persistedstate'
import { useCookies } from 'vue3-cookies'

const { axiosPost, axiosGet } = useAxios()
const { cookies } = useCookies()

export default createStore({
    namespaced: true,
    state: {    // 공통으로 사용할 변수
        isLogin: false,
        isAdmin: false,
        nickname: null,
    },
    mutations: {
        isLogin(state, data) {
            state.isLogin = data
        },
        isAdmin(state, data) {
            state.isAdmin = data
        },
        nickname(state, data) {
            state.nickname = data
        },
        username(state, data) {
            state.username = data
        },
    },
    getters: {
        isLogin(state) {
            return state.isLogin
        },
        isAdmin(state) {
            return state.isAdmin
        },
        nickname(state) {
            return state.nickname
        },
        username(state) {
            return state.username
        },
    },
    actions: {
        async login({ commit }, memberInfo) {
            await axiosPost('/api/v1/login', memberInfo, (res) => {
                commit('isLogin', true)
                if (res.data.isAdmin) {
                    commit('isAdmin', true)
                }
                commit('nickname', res.data.nickname)
                commit('username', res.data.username)
                window.location.href = '/'
            }, () => {
                alert('아이디 또는 비밀번호를 확인해주세요.')
            })
        },
        async logout( {commit} ) {
            await axiosPost('/logout',{}, ()=> {
                commit('isLogin', false)
                commit('isAdmin', false)
                commit('nickname', null)
                commit('username', null)
                cookies.remove('isAdmin')
                cookies.remove('isLogin')
                window.location.href = '/'
            })
        },
        async socialLogin({ commit }) {
            commit('isLogin', true)
        },
        async setUserData({ commit }) {
            await axiosGet('/api/v1/social', (res) => {
                commit('username', res.data.username)
                commit('nickname', res.data.nickname)
                window.location.href = '/'
            }, (err) => {
                alert('오류 : 사용자 정보를 가져올 수 없습니다.')
            })
        }
    },
    plugins: [
        createPersistedState({
            paths: ['isLogin', 'isAdmin', 'nickname', 'username']
        })
    ],
})
