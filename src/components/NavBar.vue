<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">ALGo</a>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="{ name: 'Food' }">식품 정보</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              커뮤니티
            </a>
            <ul class="dropdown-menu">
              <li v-for="boards in boardsList" :key="boards.id">
                <router-link class="dropdown-item" :to="`/boards/${boards.id}`">{{ boards.name }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
<!--        <form class="d-flex" role="search">-->
<!--          <input class="form-control me-2" type="search" placeholder="검색" aria-label="Search">-->
<!--          <button class="btn btn-outline-success me-2" type="submit">Search</button>-->
<!--        </form>-->
        <div class="d-flex" v-if="!isLogin && !isSocialLogin">
          <router-link :to="{ name: 'Login' }" class="btn btn-primary me-2">로그인</router-link>
          <router-link :to="{ name: 'Join' }" class="btn btn-primary me-2">회원가입</router-link>
        </div>
        <div class="d-flex" v-else>
          <router-link :to="`/profile/${nickname}`" class="btn btn-primary me-2">프로필</router-link>
          <button @click="logout" class="btn btn-primary me-2">로그아웃</button>
          <router-link v-if="isAdmin" :to="{ name: 'Admin' }" class="btn btn-primary me-2">Admin</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import useAxios from '@/modules/axios'
import { useStore } from 'vuex'
import { useCookies } from 'vue3-cookies'

export default {
  setup() {
    const { axiosGet } = useAxios()
    const store = useStore() //vuex 스토어 사용
    const isAdmin = ref(store.getters['isAdmin'])
    const nickname = ref(store.getters['nickname'])
    const boardsList = ref(null)
    const { cookies } = useCookies()

    onMounted(() => {  // get boards list
      axiosGet('/api/v1/boards'
      , (res) => {
        boardsList.value = res.data
      }, () => {
        alert('백엔드 연결 실패 : 게시판 목록을 불러올 수 없습니다.')
      })
      // axiosGet('/api/v1/token/validate'
      //     , () => {
      //     isLogin.value = true;
      //   }, () => {
      //   alert('토큰오류')
      // })
    })

    // const isLogin = () => {
    //   if(store.getters['isLogin'] || cookies.get("isLogin")) {
    //     return true
    //   } else {
    //     return false;
    //   }
    // }

    const isLogin = store.getters['isLogin']
    const isSocialLogin = ref(cookies.get('isLogin'))

    if(isSocialLogin.value) {
      store.dispatch('socialLogin')
    }

    const logout = async () => {
      await store.dispatch('logout').catch((err) => console.error(err))
    }


    return {
      isLogin,
      isAdmin,
      nickname,
      boardsList,
      logout,
      isSocialLogin,
    }
  },
}
</script>

<style scoped>

</style>