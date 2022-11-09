<template>
  <div class="container">
    <div class="input-form col-md-12 mx-auto">
      <h4 class="mb-3">ALGo 회원가입</h4>
      <div class="mb-3 input">
        <label for="username" :style="!emailValidation ? 'color: red' : ''">이메일 주소</label>
        <div class="row">
          <div class="col-9">
            <input type="text" class="form-control" id="username" v-model="username" @blur="idCheck" @keyup.enter="sendVerifyMail" maxlength="50" :disabled="sendMail">
            <p v-show="!emailValidation" style="color: red"> 이메일 주소를 다시 확인해주세요. </p>
            <p v-show="!resVal" style="color: red"> 이미 사용중인 이메일입니다. </p>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" @click="sendVerifyMail" :disabled="sendMail">인증번호 받기</button>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-8">
            <input type="tel" v-model="code" class="form-control" placeholder="인증번호 입력하세요" maxlength="6" :disabled="!isCodeValidate">
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" @click="checkCode" :disabled="!isCodeValidate">인증 확인</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary" @click="resendVerifyMail" :disabled="!isCodeValidate">재전송</button>
          </div>
          <p v-show="!codeValidation" style="color: red"> 인증번호가 일치하지 않습니다. </p>
          <p v-show="codeValidation" style="color: green"> 인증번호가 일치합니다. </p>
        </div>
      </div>
      <div class="mb-3">
        <label for="nickname" :style="!nicknameValidation || !nickresVal ? 'color:red' : ''">닉네임</label>
        <input type="text" class="form-control" id="nickname" v-model="nickname" @blur="nickCheck" @keyup.enter="submit" maxlength="40" required>
        <p v-show="!nicknameValidation" style="color: red"> 한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가) </p>
        <p v-show="!nickresVal" style="color: red"> 이미 사용중인 닉네임입니다. </p>
      </div>
      <div class="mb-3">
        <label for="password">비밀번호 (6자 이상)</label>
        <input type="password" class="form-control" id="password" v-model="password" @keyup.enter="submit" minlength="6" maxlength="20" required>
      </div>
      <div class="mb-3">
        <label for="password" :style="!passCheck ? 'color : red' : ''">비밀번호 확인</label>
        <input type="password" class="form-control" id="passwordCheck" v-model="passwordCheck" @keyup.enter="submit" minlength="6" maxlength="20" required>
        <p v-show="!passCheck" style="color: red"> 비밀번호가 일치하지 않습니다 .</p>
      </div>
      <div class="mb-3">
        <label>알레르기 정보</label>
        <div class="card p-3 mb-3 bg-body">
          <div v-for="data in checkData" :key="data.id">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" v-model="data.selected" :id="`${data.name}`" :value="`${data.name}`">
              <label class="form-check-label" for="inlineCheckbox1">{{ data.name }}</label>
            </div>
          </div>
<!--          <div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" id="squid" value="1">-->
<!--              <label class="form-check-label" for="inlineCheckbox1">오징어</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="eggs">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">난류</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="chicken">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">닭</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="wheat">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">밀</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="nuts">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">견과류</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="milk">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">우유</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="pork">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">돼지고기</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="beef">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">소고기</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="clams">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">조개류</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="sulphite">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">아황산류</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="buckwheat">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">메밀</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="crab">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">게</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="shrimp">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">새우</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="soybean">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">대두</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="tomato">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">토마토</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="fish">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">생선</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="sesame">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">참깨</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="fruit">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">과일</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="garlic">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">마늘</label>-->
<!--            </div>-->
<!--            <div class="form-check form-check-inline">-->
<!--              <input class="form-check-input" type="checkbox" v-model="checkedList" value="vegetable">-->
<!--              <label class="form-check-label" for="inlineCheckbox2">채소</label>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
      <div class="form-inline row">
        <div class="text-lg-end">
          <button class="btn btn-primary me-3" type="button" @click="[selected(), submit()]">가입하기</button>
          <button class="btn btn-outline-dark" @click="moveToLoginPage">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import useAxios from '@/modules/axios.js'
import router from '@/router'

export default {
  setup() {
    const { axiosGet, axiosPost } = useAxios()

    const username = ref('')
    const password = ref('')
    const passwordCheck = ref('')
    const nickname = ref('')
    const sendMail = ref(false) // 인증메일 발송여부 (true == 발송했음)
    const code = ref('')

    const passCheck = ref(true)  // 비밀번호 확인 (false == 비밀번호 확인이랑 일치하지 않음)
    const resVal = ref(true)  // 아이디 중복 여부 (false == 중복된 아이디)
    const nickresVal = ref(true)  // 닉네임 중복 여부 (false == 중복된 닉네임)

    const emailValidation = ref(true)  // 이메일 정규식 검사
    const codeValidation = ref(false) // 인증코드 확인 (true == 일치함)
    const nicknameValidation = ref(true) // 닉네임 정규식 검사

    const isCodeValidate = ref(false) // 코드 인증칸 활성화 여부

    const checkData = ref([
      {id: 1, name: 'squid', selected: 'false'},
      {id: 2, name: 'eggs', selected: 'false'},
      {id: 3, name: 'chicken', selected: 'false'},
      {id: 4, name: 'wheat', selected: 'false'},
      {id: 5, name: 'nuts', selected: 'false'},
    ])


    const sendVerifyMail = () => {
      if (username.value.length > 0 && emailValidation.value) {
        axiosPost('/api/v1/users/mail', {
          username: username.value
        }, () => {
          alert('해당 이메일로 인증메일을 발송했습니다.')
          sendMail.value = true
          isCodeValidate.value = true
        }, (err) => {
          alert('인증메일 발송에 실패했습니다.')
          sendMail.value = false
          console.error(err)
        })
      } else {
        alert('이메일을 주소를 정확히 입력해주세요.')
      }
    }

    watch(username, () => {
      checkEmail()
    })

    watch(nickname, () => {
      checkNickname()
      if (nickname.value === '') nickresVal.value = true
    })

    watch(passwordCheck, () => {
      if (password.value === passwordCheck.value) passCheck.value = true
      else passCheck.value = false
    })

    const checkEmail = () => {  // 이메일(아이디) 정규식 검사
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      emailValidation.value = !(!validateEmail.test(username.value) || !username.value);
    }

    const idCheck = () => { // 이메일(아이디) 중복 검사
      if(username.value && emailValidation.value) {
        axiosGet(`/api/v1/users/${username.value}/exists`, (res) => {
          resVal.value = !res.data
        }, (err) => console.error(err))
      }
    }


    const checkNickname = () => { // 닉네임 정규식 검사
      const validateNickname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/
      nicknameValidation.value = !(!validateNickname.test(nickname.value) || !nickname.value)
    }

    const nickCheck = () => { // 닉네임 중복 검사
      if(nickname.value && nicknameValidation.value) {
        axiosGet(`/api/v1/users/exists?nickname=${nickname.value}`, (res) => {
          nickresVal.value = !res.data
        }, (err) => console.error(err))
      }
    }

    const checkCode = () => {
      axiosPost('/api/v1/users/validate', {
        username : username.value,
        code : code.value
      }, () => {
        alert('인증에 성공했습니다.')
        codeValidation.value = true
        isCodeValidate.value = false
      }, (err) => {
        alert('인증에 실패했습니다.')
        console.error(err)
        codeValidation.value = false;
      })
    }

    const resendVerifyMail = () => {
      code.value = ''
      sendMail.value = false
      username.value = ''
    }

    const submit = () => {
      if (username.value === '' || password.value === '' || passwordCheck.value === '' || nickname.value === '') {
        alert('회원가입 양식을 모두 작성해주세요.')
      } else if(emailValidation.value && nicknameValidation.value && passCheck.value && resVal.value && nickresVal.value && codeValidation.value && sendMail.value) {
        axiosPost('/api/v1/signup', {
          username: username.value,
          password: password.value,
          nickname: nickname.value
        }, () => {
          alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.')
          router.push('/login')
        }, (err) => {
          console.error(err)
          alert('회원가입에 실패하였습니다.')
        })
      } else if (!codeValidation.value || !sendMail.value) {
        alert('이메일 인증이 필요합니다.')
      }
      else {
        alert('회원가입 양식을 다시 확인해주세요.')
      }
    }

    const moveToLoginPage = () => {
      router.push('/')
    }

    return {
      sendVerifyMail,
      sendMail,
      emailValidation,
      checkEmail,
      resendVerifyMail,
      checkCode,
      codeValidation,
      code,
      nicknameValidation,
      checkNickname,
      nickCheck,
      nickresVal,
      passCheck,
      isCodeValidate,


      username,
      password,
      passwordCheck,
      nickname,
      idCheck,
      resVal,
      submit,
      moveToLoginPage,
      checkData,
      selected
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

  margin-top: 30px;
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