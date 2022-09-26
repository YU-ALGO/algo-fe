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
        <div class="d-flex" v-if="!isLogin">
          <router-link :to="{ name: 'Login' }" class="btn btn-primary me-2">로그인</router-link>
          <router-link :to="{ name: 'Join' }" class="btn btn-primary me-2">회원가입</router-link>
        </div>
        <div class="d-flex" v-else>
          <router-link :to="{ name: 'Profile' }" class="btn btn-primary me-2">프로필</router-link>
          <button @click="logout" class="btn btn-primary me-2">로그아웃</button>
          <router-link v-if="isAdmin" :to="{ name: 'Admin' }" class="btn btn-primary me-2">Admin</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/auth'
import useAxios from '@/modules/axios'

export default {
  setup() {
    const { axiosGet } = useAxios()
    const { state, authLogout } = useAuth()
    const isLogin = ref(state.isLogin)
    const isAdmin = ref(state.isAdmin)
    const boardsList = ref(null)

    const getBoardList = () => {
      axiosGet('/api/v1/boards'
      , (res) => {
        boardsList.value = res.data
      }, (res) => {
        console.error(res)
      })
    }

    const logout = () => {
      authLogout()
    }

    onMounted(() => {
      getBoardList()
    })

    return {
      isLogin,
      isAdmin,
      boardsList,
      logout,
    }
  },
}
</script>

<style scoped>

</style>