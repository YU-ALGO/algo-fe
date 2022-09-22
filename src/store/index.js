import { createStore } from 'vuex'
import useAxios from '@/modules/axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'

const { axiosGet, axiosPost } = useAxios()

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
        login({commit}, {username, password}) { //로그인 처리
            // eslint-disable-next-line no-async-promise-executor
            return new Promise((resolve, reject) => {
                axiosPost('/api/v1/login', {
                    username, password
                }, (res) => {
                    commit('isLogin', true)
                    if (res.data.isAdmin) {
                        commit('isAdmin', true)
                    }
                    alert(res.data.nickname + '님 환영합니다!')
                    router.push('/')  // await?
                }, (res) => {
                    console.error(res)
                    reject(res)
                })
            })
        },
        logout({ commit }) {
            axiosPost('/logout', {}
                , (res) => {
                    console.log('로그아웃 성공: ' + res.data)
                }, (res) => {
                    console.log('로그아웃 실패: ' + res.data)
                })
            commit('isLogin', false)
            commit('isAdmin', false)
        },
        isAdmin({ commit }) {
            axiosGet('/api/v1/admin'
                , (res) => {res
                    console.log(res.data)
                }, (res) => {
                    console.error(res)
                })
            commit('isAdmin', true)
        }
    },
    plugins: [
        createPersistedState({
            paths: ['isLogin', 'isAdmin']
        })
    ],
})
