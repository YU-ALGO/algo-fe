import { createStore } from 'vuex'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'

const { cookies } = useCookies()

export default createStore({
    namespaced: true,
    state: {
        needLogin: true,
    },
    mutations: {
        needLogin(state, data) {
            state.needLogin = data;
        },
        removeToken () {
            // cookies.remove('accessToken')
        },
    },
    getters: {
        needLogin(state) {
            return state.needLogin
        },
    },
    actions: {
        login({ commit }, { username, password }) { //로그인 및 토큰 처리
            // eslint-disable-next-line no-async-promise-executor
            return new Promise( async (resolve, reject) => {
                try {
                    const res = await axios.post('http://be.downbit.r-e.kr:8088/api/v2/login', { username, password }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        withCredentials: true,
                    })
                    if (res.status === 200) {
                        // const accessToken = res.data.token
                        // cookies.set('accessToken', accessToken)
                        commit('needLogin', false)
                        alert(res.data.userId + '님 환영합니다!')
                        await router.push('/')
                    }
                    // resolve(res.data.msg)
                } catch (err) {
                    console.error(err)
                    reject(err)
                }
            })
        },
        logout({ commit }) {
            axios.post('http://be.downbit.r-e.kr:8088/logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                withCredentials: true,
            }).then(function (res) {
                console.log('로그아웃 성공 : ' + res)
            }). catch(function (error) {
                console.log('로그아웃 오류 : ' + error)
            })
            // commit('removeToken')
            commit('needLogin', true)
            location.reload()
        },
    },
    plugins: [
        createPersistedState({
            paths: ['needLogin']
        })
    ],
})
