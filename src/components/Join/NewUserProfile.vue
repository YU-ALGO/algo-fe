<template>
  <div>
    <div class="container">
      <h1 class="text-center mt-2">ALGO</h1>
      <div class="card mt-4 mx-auto shadow" style="max-width: 680px;">
        <div class="card-body">
          <div class="progress" style="max-width: 100px; height: 10px">
            <div class="progress-bar" style="width: 100% "></div>
          </div>
          <h4 class="card-title mt-3">ALGo에서 사용할<br/>사용자 정보를 입력해주세요.</h4>
          <h5 class="text-black mt-4">닉네임</h5>
          <div class="row mt-2">
            <div class="col-9">
              <input type="text" class="form-control" v-model="nickname" placeholder="닉네임 입력 (2~15자)">
              <p v-show="enableErrorMessage" style="color: red"> {{ errorMessage }} </p>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary" @click="nickCheck">중복 확인</button>
            </div>
          </div>
          <div class="mb-3">
            <h5 class="text-black mt-4">알레르기 정보 (선택사항)</h5>
            <div class="card p-3 mb-3 bg-body">
              <div>
                <div class="form-check form-check-inline" v-for="data in allergyCheckData" :key="data.id">
                  <input class="form-check-input" type="checkbox" v-model="data.selected" :id="`${data.name}`"
                         :value="`${data.name}`">
                  <span class="form-check-label">{{ data.foodName }}</span>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary form-control mt-4" type="button" @click="submit">가입하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import useAxios from '@/modules/axios'
import router from '@/router'

export default {
  props: {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  setup(props,{ emit }) {
    const { axiosGet, axiosPost } = useAxios()
    const allergyCheckData = ref([
      {id: 1, name: 'squid', foodName: '오징어', selected: false},
      {id: 2, name: 'eggs', foodName: '난류', selected: false},
      {id: 3, name: 'chicken', foodName: '닭', selected: false},
      {id: 4, name: 'wheat', foodName: '밀', selected: false},
      {id: 5, name: 'nuts', foodName: '견과류', selected: false},
      {id: 6, name: 'milk', foodName: '우유', selected: false},
      {id: 7, name: 'pork', foodName: '돼지고기', selected: false},
      {id: 8, name: 'beef', foodName: '소고기', selected: false},
      {id: 9, name: 'clams', foodName: '조개류', selected: false},
      {id: 10, name: 'sulphite', foodName: '아황산류', selected: false},
      {id: 11, name: 'buckwheat', foodName: '메밀', selected: false},
      {id: 12, name: 'crab', foodName: '게', selected: false},
      {id: 13, name: 'shrimp', foodName: '새우', selected: false},
      {id: 14, name: 'soybean', foodName: '대두', selected: false},
      {id: 15, name: 'tomato', foodName: '토마토', selected: false},
      {id: 16, name: 'fish', foodName: '생선', selected: false},
      {id: 17, name: 'sesame', foodName: '참깨', selected: false},
      {id: 18, name: 'fruit', foodName: '과일', selected: false},
      {id: 19, name: 'garlic', foodName: '마늘', selected: false},
      {id: 20, name: 'vegetable', foodName: '채소', selected: false},
    ])
    const nickname = ref('')
    const nicknameValidation = ref(false)
    const duplicateNickname = ref(false)
    const duplicateNicknameCheck = ref(false)

    const enableErrorMessage = ref(false)
    const errorMessage = ref('')

    const allergyData = new Map()

    const checkSelected = () => {
      for (let i = 0; i < allergyCheckData.value.length; i++) {
        allergyData.set(allergyCheckData.value[i].name, allergyCheckData.value[i].selected)
      }
    }

    watch(allergyCheckData.value, () => {
      checkSelected()
    })

    watch(nickname, () => {
      duplicateNicknameCheck.value = false
      checkNickname()
    })

    const checkNickname = () => { // 닉네임 정규식 검사
      const validateNickname = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]{2,15}$/
      nicknameValidation.value = !(!validateNickname.test(nickname.value) || !nickname.value)
    }

    const nickCheck = () => { // 닉네임 중복 검사
      checkNickname()
      if (!nicknameValidation.value) {
        enableErrorMessage.value = true
        errorMessage.value = '한글과 영문 대 소문자 2~15자를 사용하세요. (특수기호, 숫자 사용 불가)'
      } else {
        enableErrorMessage.value = false
        errorMessage.value = ''
        axiosGet(`/api/v1/users/exists?nickname=${nickname.value}`, (res) => {
          duplicateNickname.value = res.data
          if (duplicateNickname.value) {
            enableErrorMessage.value = true
            errorMessage.value = '이미 사용중인 닉네임입니다.'
          } else {
            alert('사용 가능한 닉네임입니다!')
            duplicateNicknameCheck.value = true
          }
        }, (err) => console.error(err))
      }
    }

    const submit = () => {
      if (nickname.value === '') {
        alert('닉네임을 입력해주세요.')
      } else {
        if (!duplicateNicknameCheck.value) {
          alert('닉네임 중복확인이 필요합니다.')
        } else {
          if(confirm('입력하신 정보로 회원가입하시겠습니까?')) {
            axiosPost('/api/v1/signup', {
              username: props.username,
              password: props.password,
              nickname: nickname.value,
              allergyInfoDto: Object.fromEntries(allergyData)
            }, () => {
              alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.')
              router.push({ name: 'Login'})
            }, (err) => {
              console.error(err)
              alert('회원가입에 실패하였습니다.')
            })
          }
        }
      }
    }

    return {
      allergyCheckData,
      nickname,
      submit,
      nickCheck,
      enableErrorMessage,
      errorMessage,
      duplicateNicknameCheck,
    }
  }
}
</script>

<style scoped>

</style>