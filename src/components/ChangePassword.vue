<template>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="card mt-4 shadow p-3 mb-5 bg-body">
          <div class="card-body">
            <h3 class="card-title mb-4">비밀번호 변경</h3>
          </div>
          <div class="mb-3">
            <label for="password">현재 비밀번호 (6자 이상)</label>
            <input type="password" class="form-control" id="password" v-model="password" @keyup.enter="submit" placeholder="현재 비밀번호" minlength="6" maxlength="20"
                   required>
          </div>
          <div class="mb-3">
            <label for="password">새 비밀번호 (6자 이상)</label>
            <input type="password" class="form-control" id="new_password" v-model="new_password" @keyup.enter="submit" placeholder="새 비밀번호" minlength="6" maxlength="20"
                   required>
          </div>
          <div class="mb-3">
            <label for="password" :style="!passCheck ? 'color : red' : ''">새 비밀번호 확인</label>
            <input type="password" class="form-control" id="new_password_check" v-model="new_password_check" @keyup.enter="submit"  placeholder="새 비밀번호 확인" minlength="6" maxlength="20"
                   required>
            <p v-show="!passCheck" style="color: red"> 비밀번호가 일치하지 않습니다 .</p>
          </div>
          <div class="mb-3">
            <button type="button" class="btn btn-danger" style=" float: right;" @click="moveToPrevPage">취소</button>
            <button type="button" class="btn btn-primary" style=" float: right;margin-right: 5px;">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import useAxios from '@/modules/axios.js'
import router from '@/router'

export default {
  setup() {
    const passCheck = ref(true)  // 비밀번호 확인 (false == 비밀번호 확인이랑 일치하지 않음)
    const password = ref('')
    const new_password = ref('')
    const new_password_check = ref('')
    watch(new_password_check, () => {
      if (new_password.value === new_password_check.value) passCheck.value = true
      else passCheck.value = false
    })

    //비밀번호 변경 submit 수정 필요
    const submit = () => {
      if (password.value === '' || new_password.value === '' || new_password_check.value === '') {
        alert('비밀번호 변경 양식을 모두 작성해주세요.')
      } else if (passCheck.value) {
        axiosPost('/api/v1/signup', {
          password: password.value,
          new_password: new_password.value,
          new_password_check: new_password_check.value
        }, () => {
          alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.')
          router.push('/login')
        }, (err) => {
          console.error(err)
          alert('회원가입에 실패하였습니다.')
        })
      }
      else {
        alert('비밀번호 변경 양식을 다시 확인해주세요.')
      }
    }

    const moveToPrevPage = () => {
      router.go(-1)
    }
    return {
      passCheck,
      password,
      new_password,
      new_password_check,
      moveToPrevPage
    }
  },
}
</script>

<style scoped>

</style>