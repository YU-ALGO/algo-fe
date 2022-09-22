export const auth = {  // Composition API 사용
    namespaced: true,
    state: () => ({
        username: null,
        nickname: null,
        token: null,
    }),
    getters: {
        user_data: (state) => {
            return {
                username: state.username,
                nickname: state.nickname,
            }
        }
    },
    mutations: {

    },
    actions: {

    },
}