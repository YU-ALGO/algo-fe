<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">DownBit</a>
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
            <router-link class="nav-link active" aria-current="page" :to="{ name: 'Stock' }">알레르기 정보</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              커뮤니티
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" :to="{ name: 'FreeBoard' }">자유게시판</router-link></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
<!--        <form class="d-flex" role="search">-->
<!--          <input class="form-control me-2" type="search" placeholder="검색" aria-label="Search">-->
<!--          <button class="btn btn-outline-success me-2" type="submit">Search</button>-->
<!--        </form>-->
        <div class="d-flex" v-if="needLogin">
          <router-link :to="{ name: 'Login' }" class="btn btn-primary me-2">로그인</router-link>
          <router-link :to="{ name: 'Join' }" class="btn btn-primary">회원가입</router-link>
        </div>
        <div class="d-flex" v-else>
          <router-link :to="{ name: 'Profile' }" class="btn btn-primary me-2">프로필</router-link>
          <button @click="logout" class="btn btn-primary">로그아웃</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const needLogin = computed(() => {
      return store.getters['needLogin']
    })

    const logout = (() => {
      alert('사이트에서 로그아웃되었습니다!')
      store.dispatch('logout')
    })

    return {
      needLogin,
      logout,
    }
  },
}
</script>

<style scoped>

</style>