<template>
  <div class="container">
    <div class="input-form col-md-12 mx-auto">
      <h4 class="mb-3">ALGo 회원가입</h4>
      <form class="validation-form" novalidate>
        <div class="mb-3">
          <label for="username">아이디</label>
          <input type="text" class="form-control" id="username" v-model="username" @blur="idCheck()" required>
          <span v-if="username" :style="[resVal === 1 ? 'color: red' : 'color: green']">{{ message }}</span>
        </div>
        <div class="mb-3">
          <label for="password">비밀번호</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <div class="mb-3">
          <label for="password">비밀번호 확인</label>
          <input type="password" class="form-control" id="passwordCheck" v-model="passwordCheck" @keyup="pwCheck()" required>
          <span v-if="passwordCheck" style="color: red">{{ pwMessage }}</span>
        </div>
        <div class="mb-3">
          <label for="nickname">닉네임</label>
          <input type="text" class="form-control" id="nickname" v-model="nickname" required>
        </div>
        <div class="form-inline row">
          <div class="text-lg-end">
            <button class="btn btn-primary me-3" type="button" @click="submit">가입하기</button>
            <button class="btn btn-outline-dark" @click="moveToLoginPage">취소</button>
          </div>
        </div>
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
    const passwordCheck = ref('')
    const nickname = ref('')

    const message = ref('')
    const pwMessage = ref('')
    const resVal = ref(3)

    const idCheck = () => {
      if(username.value)
        axiosGet(`/api/v1/users/${username.value}/exists`, getId, () => console.error())
    }

    const pwCheck = () => {
      pwMessage.value = ''
      if(password.value !== passwordCheck.value) {
        pwMessage.value = '비밀번호가 일치하지 않습니다.'
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
      axiosPost('/api/v1/signup', {
        user_id : username.value,
        password : password.value,
        nickname : nickname.value
      }, () => {
        alert('회원가입 성공!')
        router.push('/')
      }, () => {
        alert('회원가입 실패ㅠ')
      })
    }

    const moveToLoginPage = () => {
      router.push('/')
    }

    return {
      username,
      password,
      passwordCheck,
      nickname,
      idCheck,
      pwCheck,
      message,
      pwMessage,
      resVal,
      submit,
      moveToLoginPage,
    }
  },
}
</script>

<style scoped>
/*body {*/
/*  min-height: 100vh;*/

/*  background: -webkit-gradient(linear, left bottom, right top, from(#92b5db), to(#1d466c));*/
/*  background: -webkit-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);*/
/*  background: -moz-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);*/
/*  background: -o-linear-gradient(bottom left, #92b5db 0%, #1d466c 100%);*/
/*  background: linear-gradient(to top right, #92b5db 0%, #1d466c 100%);*/
/*}*/

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