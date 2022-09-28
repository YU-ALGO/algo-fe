<template>
  <div class="container">
    <div class="row">
      <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
        <div class="panel border bg-white">
          <div class="panel-heading">
            <h3 class="pt-3 font-weight-bold">ALGo 로그인</h3>
          </div>
          <div class="panel-body p-3">
            <form>
              <div class="form-group py-2">
                <div class="input-field">
                  <input type="text" v-model="username" id="username" class="form-control" placeholder="아이디" @keyup.enter="login" required/>
                </div>
              </div>
              <div class="form-group py-2">
                <div class="input-field">
                  <input type="password" v-model="password" id="password" class="form-control" placeholder="비밀번호" @keyup.enter="login" required/>
                </div>
              </div>
              <div class="form-inline row">
                <div class="text-lg-end">
                  <a href="#" id="forgot" class="font-weight-bold">비밀번호를 잊으셨나요?</a>
                </div>
              </div>
              <button type="button" @click="login" class="btn btn-primary mx-auto w-100 mt-3">로그인</button>
              <div class="text-center pt-4 text-muted">계정이 없으신가요? <a href="#" @click="moveToJoinPage">가입하기</a> </div>
            </form>
          </div>
          <div class="mx-3 my-2 py-2 bordert">
            <div class="text-center py-3">
              <a href="http://be.downbit.r-e.kr:8088/login/oauth2/code/kakao" class="px-2">
                <img src="../assets/kakaoLogo.png" alt=""/>
              </a>
              <a href="#" class="px-2">
                <img src="../assets/naverLogo.png" alt=""/>
              </a>
              <a href="#" class="px-2">
                <img src="../assets/googleLogo.png" alt=""/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/composables/auth'
import router from '@/router'

export default {
  setup() {
    const username = ref(null)
    const password = ref(null)
    const { state, authLogin } = useAuth()
    const isLogin = ref(state.isLogin)

    const login = () => {
      authLogin(username.value, password.value)
    }

    const moveToJoinPage = () => {
      router.push('/join')
    }

    return {
      username,
      password,
      isLogin,
      login,
      moveToJoinPage,
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif
}

body {
  height: 100vh;
  background: linear-gradient(to top, #c9c9ff 50%, #9090fa 90%) no-repeat
}

.container {
  margin: 50px auto
}

.panel-heading {
  text-align: center;
  margin-bottom: 10px
}

#forgot {
  min-width: 100px;
  margin-left: auto;
  text-decoration: none
}

a:hover {
  text-decoration: none
}

.form-inline label {
  padding-left: 10px;
  margin: 0;
  cursor: pointer
}

.btn.btn-primary {
  margin-top: 20px;
  border-radius: 15px
}

.panel {
  min-height: 380px;
  box-shadow: 20px 20px 80px rgb(218, 218, 218);
  border-radius: 12px
}

.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ddd;
  color: #4343ff
}

input[type='text'],
input[type='password'] {
  border: none;
  outline: none;
  box-shadow: none;
  width: 100%
}

.fa-eye-slash.btn {
  border: none;
  outline: none;
  box-shadow: none
}

img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  position: relative
}

a[target='_blank'] {
  position: relative;
  transition: all 0.1s ease-in-out
}

.bordert {
  border-top: 1px solid #aaa;
  position: relative
}

.bordert:after {
  content: "또는";
  position: absolute;
  top: -13px;
  left: 45%;
  background-color: #fff;
  padding: 0px 8px
}

@media(max-width: 360px) {
  #forgot {
    margin-left: 0;
    padding-top: 10px
  }

  body {
    height: 100%
  }

  .container {
    margin: 30px 0
  }

  .bordert:after {
    left: 25%
  }
}
</style>