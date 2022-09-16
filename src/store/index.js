import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'

const BASE_URL = 'http://be.downbit.r-e.kr:8088'

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
            return new Promise( async(resolve, reject) => {
                try {
                    const res = await axios.post(BASE_URL+'/api/v1/login', { username, password }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        withCredentials: true
                    })
                    if (res.status === 200) {
                        // console.log('로그인 정보 : ' + res.data.isAdmin)
                        commit('isLogin', true);
                        alert(res.data.userId + '님 환영합니다!')
                        if (res.data.isAdmin) {
                            commit('isAdmin', true)
                        }
                        await router.push('/')
                    }
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            })
        },
        logout({ commit }) {
            axios.post(BASE_URL+'/logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                withCredentials: true
            }).then(function (res) {
                console.log('로그아웃 성공 : ' + res)
            }). catch(function (error) {
                console.log('로그아웃 오류 : ' + error)
            })
            commit('isLogin', false)
            commit('isAdmin', false)
            location.reload()
        },
        isAdmin({ commit }) {
            try {
                const res = axios.get(BASE_URL+`/api/v1/admin`)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
            commit('isAdmin', true)
        }
    },
    plugins: [
        createPersistedState({
            paths: ['isLogin', 'isAdmin']
        })
    ],
})
