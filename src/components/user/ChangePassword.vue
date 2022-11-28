<template>
  <div class="container">
    <div class="card mt-4 mx-auto shadow" style="max-width: 680px;">
      <div class="card-body">
        <div class="progress" style="max-width: 100px; height: 10px">
          <div class="progress-bar" style="width: 100% "></div>
        </div>
        <h4 class="card-title mt-3">ALGo 로그인에 사용할<br/>새로운 비밀번호를 입력해주세요</h4>
        <h5 class="text-black-50 mt-5">현재 비밀번호</h5>
        <input type="password" class="form-control" placeholder="비밀번호 입력" v-model="password" @keyup.enter="checkPassword" required>
        <h5 class="text-black-50 mt-4">새로운 비밀번호</h5>
        <div class="mb-2">
          <input type="password" class="form-control" placeholder="비밀번호 입력 (8자 이상)" v-model="newPassword" @keyup.enter="checkPassword"
                 minlength="8" maxlength="36" required>
          <p v-show="enablePasswordMsg" style="color: red"> {{ pwErrorMessage }} </p>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" placeholder="비밀번호 재입력" v-model="passwordCheck" @keyup.enter="checkPassword"
                 minlength="8" maxlength="36" required>
          <p v-show="enablePasswordCheckMsg" style="color: red"> {{ pwCheckErrorMessage }} </p>
        </div>
        <button class="btn btn-primary form-control mt-4" @click="checkPassword">완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import useAxios from '@/modules/axios'
import router from '@/router'
import store from '@/store'

export default {
  setup() {
    const { axiosPatch } = useAxios()
    const password = ref('')
    const newPassword = ref('')
    const passwordCheck = ref('')
    const equalPassword = ref(false)
    const enablePasswordMsg = ref(false)
    const enablePasswordCheckMsg = ref(false)
    const pwErrorMessage = ref('')
    const pwCheckErrorMessage = ref('')
    const passwordValidation = ref(false)
    const username = ref(store.getters['username'])

    watch(newPassword, () => {
      checkPass()
    })

    watch(passwordCheck, () => {
      if (passwordCheck.value !== '') {
        equalPassword.value = newPassword.value === passwordCheck.value
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
      passwordValidation.value = !(!validateNickname.test(newPassword.value) || !newPassword.value)
      if(!passwordValidation.value) {
        enablePasswordMsg.value = true
        pwErrorMessage.value = '비밀번호는 숫자, 영어, 특수문자를 포함하여 8자 이상 입력해주세요.'
      } else {
        enablePasswordMsg.value = false
        pwErrorMessage.value = ''
      }
    }

    const checkPassword = () => {
      if (password.value ==='' || newPassword.value === '' || passwordCheck.value === '') {
        alert('비밀번호를 모두 작성해주세요.')
      } else if (equalPassword.value && passwordValidation.value) {
        if (newPassword.value === passwordCheck.value) {
          axiosPatch('/api/v1/users/password', {
            username: username.value,
            password: password.value,
            new_password: newPassword.value,
            is_reset: false,
          }, (res) => {
            alert('비밀번호 변경이 완료되었습니다.')
            router.push({name: 'Profile'})
          }, (err) => {
            alert(err.response.data.message)
          })
        } else {
          alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
          equalPassword.value = false
          enablePasswordCheckMsg.value = true
          pwCheckErrorMessage.value = '비밀번호가 일치하지 않습니다.'
        }
      } else {
        alert('비밀번호를 다시 확인해주세요.')
      }
    }

    return {
      password,
      newPassword,
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