<template>
  <div class="container">
    <h1 class="text-center mt-2">ALGO</h1>
    <div class="card mt-4 mx-auto shadow" style="max-width: 680px;">
      <div class="card-body">
        <div class="progress" style="max-width: 100px; height: 10px">
          <div class="progress-bar" style="width: 66% "></div>
        </div>
        <h4 class="card-title mt-3">ALGo 로그인에 사용할<br/>비밀번호를 등록해 주세요.</h4>
        <h5 class="text-black-50 mt-5">이메일 아이디</h5>
        <p class="fw-bold">{{ username }}</p>
        <h5 class="text-black-50 mt-4">비밀번호</h5>
        <div class="mb-2">
          <input type="password" class="form-control" placeholder="비밀번호 입력 (8자 이상)" v-model="password" @keyup.enter="checkPassword"
                 minlength="8" maxlength="36" required>
          <p v-show="enablePasswordMsg" style="color: red"> {{ pwErrorMessage }} </p>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" placeholder="비밀번호 재입력" v-model="passwordCheck" @keyup.enter="checkPassword"
                 minlength="8" maxlength="36" required>
          <p v-show="enablePasswordCheckMsg" style="color: red"> {{ pwCheckErrorMessage }} </p>
        </div>
        <button class="btn btn-primary form-control mt-4" @click="checkPassword">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  emits: ['password'],
  props: {
    username: {
      type: String,
      required: true
    }
  },
  setup(props,{ emit }) {
    const password = ref('')
    const passwordCheck = ref('')
    const equalPassword = ref(false)
    const enablePasswordMsg = ref(false)
    const enablePasswordCheckMsg = ref(false)
    const pwErrorMessage = ref('')
    const pwCheckErrorMessage = ref('')
    const passwordValidation = ref(false)

    watch(password, () => {
      checkPass()
    })

    watch(passwordCheck, () => {
      if (passwordCheck.value !== '') {
        equalPassword.value = password.value === passwordCheck.value
        if (!equalPassword.value) {
          enablePasswordCheckMsg.value = true
          pwCheckErrorMessage.value = '비밀번호가 일치하지 않습니다.'
        } else {
          enablePasswordCheckMsg.value = false
        }
      }
    })

    const checkPass = () => {
      const validateNickname = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,}$/
      passwordValidation.value = !(!validateNickname.test(password.value) || !password.value)
      if(!passwordValidation.value) {
        enablePasswordMsg.value = true
        pwErrorMessage.value = '비밀번호는 숫자, 영어, 특수문자를 포함하여 8자 이상 입력해주세요.'
      } else {
        enablePasswordMsg.value = false
        pwErrorMessage.value = ''
      }
    }

    const checkPassword = () => {
      if (password.value === '' || passwordCheck.value === '') {
        alert('비밀번호를 모두 작성해주세요.')
      } else if (equalPassword.value && passwordValidation.value) {
        emit('password', password.value)
      } else {
        alert('비밀번호를 다시 확인해주세요.')
      }
    }

    return {
      password,
      passwordCheck,
      checkPassword,
      equalPassword,
      enablePasswordMsg,
      enablePasswordCheckMsg,
      pwCheckErrorMessage,
      pwErrorMessage,
    }
  }
}
</script>

<style scoped>

</style>