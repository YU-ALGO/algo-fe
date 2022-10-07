<template>
  <MessageModal ref="modal"/>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2" alt="Admin" class="rounded-circle" width="150">
                <div class="mt-3">
                  <h4>{{ nickname }}</h4>
<!--                  <p class="text-secondary mb-1">직업</p>-->
                  <p class="text-muted font-size-sm">일반회원</p>
<!--                  <button class="btn btn-primary me-2">팔로우</button>-->
                  <button class="btn btn-primary" @click="message">쪽지</button>
                  <br/>
                  <button class="btn btn-primary mt-2">프로필 사진 변경</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body">

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">아이디</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <div v-if="!editProfile">
                    {{ username }}
                  </div>
                  <div v-else>
                    <input type="text" class="form-control">
                  </div>
                </div>
              </div>
              <hr>

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">닉네임</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <div v-if="!editProfile">
                    {{ nickname }}
                  </div>
                  <div v-else>
                    <input type="text" class="form-control">
                  </div>
                </div>
              </div>
              <hr>

              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">가입일</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  ???
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">알레르기 정보</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  없음
                </div>
              </div>
              <hr>
<!--              <div class="row">-->
<!--                <div class="col-sm-3">-->
<!--                  <h6 class="mb-0">주소</h6>-->
<!--                </div>-->
<!--                <div class="col-sm-9 text-secondary">-->
<!--                  경북 경산시 영남대학교 IT관-->
<!--                </div>-->
<!--              </div>-->
<!--              <hr>-->
              <div class="row justify-content-around">
                <div class="col-lg-6 col-sm-12 text-lg-start text-center">
                  <button class="btn btn-info " @click="editProfileChange">
                    <div v-if="!editProfile">
                      프로필 수정
                    </div>
                    <div v-else>
                      취소
                    </div>
                  </button>
                </div>

                <div class="col-lg-6 col-sm-12 text-lg-end text-center" v-if="editProfile">
                  <button class="btn btn-primary " @click="editProfileChange">
                    비밀번호 수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index"
import MessageModal from '@compo/MessageModal'
import { ref } from 'vue'

export default {
  components: {
    MessageModal,
  },
  setup() {
    const nickname = ref(store.getters['nickname'])
    const username = ref(store.getters['username'])
    const editProfile = ref(false)  // 프로필 수정 상태인지 확인

    const modal = ref(null) // 쪽지 모달

    const editProfileChange = () => {
      editProfile.value = !editProfile.value
    }

    const message = () => {
      modal.value.showModal()
    }

    return {
      nickname,
      username,
      editProfile,
      editProfileChange,
      message,
    }
  }
}
</script>

<style scoped>
body{
  margin-top:20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}
.main-body {
  padding: 15px;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0,0,0,.125);
  border-radius: .25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3, .my-3 {
  margin-bottom: 1rem!important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100%!important;
}
.shadow-none {
  box-shadow: none!important;
}
</style>