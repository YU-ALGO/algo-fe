<template>
  <div class="d-flex text-center mt-md-5">
    <main class="form-signin">
      <h2>DownBit</h2>
      <form>
        <input type="text" v-model="username" id="username" class="form-control mb-2" placeholder="아이디" @keyup.enter="login">
        <input type="password" v-model="password" id="password" class="form-control mb-3" placeholder="비밀번호" @keyup.enter="login">
        <button class="btn btn-lg btn-primary btn-block me-2" type="button" @click="login">로그인</button>
        <a href="http://anycar8515.iptime.org:8088/oauth2/authorization/kakao">
          <img src="../assets/kakao_login_medium_narrow.png" alt="">
        </a>
      </form>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
// import useAxios from '@/modules/axios.js'
// import router from '@/router'

export default {
  setup() {
    // const { axiosPost } = useAxios()
    const username = ref(null)
    const password = ref(null)
    const store = useStore()

    const needLogin = computed(() => {
      return store.getters['needLogin']
    })

    const login = async () => {
      try {
        const rs = await store.dispatch('login', {
          username: username.value,
          password: password.value
        })
        alert(rs);
      } catch (err) {
        alert('아이디 또는 비밀번호를 확인해주세요.');
      }
    }

    // const login = () => {
    //   if (username.value && password.value) {
    //     axiosPost('/api/v2/login', {
    //       username: username.value,
    //       password: password.value,
    //     }, onSuccess, onFailed)
    //   } else {
    //     alert('아이디 또는 비밀번호를 입력해주세요.')
    //   }
    // }
    //
    // const onSuccess = (res) => {
    //   console.log(res.token)
    //   router.push('/')
    // }
    //
    // const onFailed = (err) => {
    //   console.error(err)
    // }

    return {
      needLogin,
      username,
      password,
      login,
    }
  },
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin > .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin > input[type='password'] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>