<template>
  <div class="container">
    <div class="input-form col-md-12 mx-auto">
      <h4 class="mb-3">회원가입</h4>
      <form class="validation-form" novalidate>
        <div class="mb-3">
          <label for="username">아이디</label>
          <input type="text" class="form-control" id="username" v-model="username" @blur="idCheck" required/>
          <span v-if="username" :style="[resVal === 1 ? 'color: red' : 'color: green']">{{ message }}</span>
        </div>
        <div class="mb-3">
          <label for="password">비밀번호</label>
          <input type="password" class="form-control" id="password" v-model="password" required/>
        </div>
        <div class="mb-3">
          <label for="password">비밀번호 확인</label>
          <input type="password" class="form-control" id="password2" v-model="password2" @keyup="pwCheck" required/>
          <span v-if="password2" style="color: red">{{ message2 }}</span>
        </div>
        <div class="mb-3">
          <label for="nickname">닉네임</label>
          <input type="text" class="form-control" id="nickname" v-model="nickname" required/>
        </div>
        <div class="mb-4"></div>
        <button class="btn btn-primary btn-block" type="button" @click="submit">가입하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useAxios from '@/modules/axios.js'
import router from '@/router'

export default {
  setup() {
    const { axiosGet, axiosPost } = useAxios()

    const username = ref('')
    const password = ref('')
    const password2 = ref('')
    const nickname = ref('')

    const message = ref('')
    const message2 = ref('')
    const resVal = ref(3)

    const idCheck = () => {
      if (username.value) {
        axiosGet(`/api/v2/users/${username.value}/exists`, getId, () => console.error())
      }
    }

    const pwCheck = () => {
      message2.value = ''
      if (password.value !== password2.value) {
        message2.value = '비밀번호가 일치하지 않습니다.'
      }
    }

    const getId = (res) => {
      if (res) {
        resVal.value = 1
        message.value = '이미 사용중이거나 탈퇴한 아이디입니다.'
      } else {
        resVal.value = 0
        message.value = '멋진 아이디네요!'
      }
    }

    const submit = () => {
      axiosPost('/api/v2/signup', {
        user_id : username.value,
        password : password.value,
        nickname : nickname.value,
      }, () => {
        alert('회원가입 성공!')
        router.push('/')
      }, () => {
        alert('회원가입 실패ㅠ')
      })
    }

    return {
      username,
      password,
      password2,
      nickname,
      message,
      message2,
      resVal,
      idCheck,
      pwCheck,
      submit,
    }
  },
}
</script>

<style scoped>
body {
  min-height: 100vh;

  background: -webkit-gradient(linear, left bottom, right top, from(#92b5db), to(#1d466c));
  background: -webkit-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);
  background: -moz-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);
  background: -o-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);
  background: linear-gradient(to top right, #92b5db 0%, #1d466c 100%);
}

.input-form {
  max-width: 680px;

  margin-top: 80px;
  padding: 32px;

  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15)
}
</style>