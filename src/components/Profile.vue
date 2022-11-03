<template>
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
                  <button type="button" @click="getRecvMsgList(1, false)" class="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
                    쪽지함
                    <span v-show="parseInt(unReadCount) > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {{ unReadCount }}
                      <span class="visually-hidden">읽지 않은 쪽지</span>
                    </span>
                  </button>
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
                  <div>
                    {{ username }}
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
                    <div class="row">
                      <div class="col">
                        <input type="text" class="form-control">
                      </div>
                      <div class="col">
                        <button class="btn btn-primary">중복확인</button>
                      </div>
                    </div>
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

  <!-- 쪽지함 -->
  <div class="modal fade" id="Receive_Message_Modal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="Receive_Message_ModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="Receive_Message_ModalLabel">쪽지함</h1>
        </div>
        <div class="modal-body">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" data-bs-toggle="tab" @click="getRecvMsgList(1, false)">전체 쪽지</button>
              <button class="nav-link" data-bs-toggle="tab" @click="getRecvMsgList(1, true)">안읽음</button>
              <button class="nav-link" data-bs-toggle="tab" @click="getSendMsgList(1)">보낸 쪽지함</button>
              <button class="nav-link" data-bs-toggle="tab">차단 목록</button>
            </div>
            <div class="row mt-3 mb-3">
              <div class="col-2">
                <select v-model="selectedSearch" class="form-select">
                  <option value="TITLE">제목</option>
                  <option v-if="msgMode === 3" value="RECEIVER">받은사람</option>
                  <option v-else value="SENDER">보낸사람</option>
                </select>
              </div>
              <div class="col">
                <div class="input-group">
                  <input type="search" class="form-control" v-model="searchText" @keyup.enter="searchMessage" placeholder="검색"/>
                  <button class="btn btn-primary" @click="searchMessage">
                    <i class="ri-search-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <table class="table">
            <thead>
            <tr>
              <th scope="col" class="first">
                <label style="display: inline;">
                  <input type="checkbox" value="Y">
                </label>
              </th>
              <th v-if="msgMode === 3" scope="col">받은사람</th>
              <th v-else scope="col">보낸사람</th>
              <th scope="col">제목</th>
              <th scope="col" class="last">날짜</th>
              <th v-show="msgMode === 3" scope="col">수신확인</th>
            </tr>
            </thead>
            <tbody v-if="msgMode === 3">
            <tr v-for="msg in sendMsgList" :key="msg.id">
              <th scope="row">
                <input type="checkbox" name="checkbox_name" value="checkbox_value">
              </th>
              <td>{{ msg.receiver }}</td>
              <td><a class="text-dark" @click="getMsgData(msg.id)" href="#Detail_Message_Modal" style="text-decoration:none" data-bs-toggle="modal">{{ msg.title }}</a></td>
              <td>{{ msg.created_at }}</td>
              <td v-if="msg.read_time">{{ msg.read_time }}</td>
              <td v-else>읽지 않음</td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr v-for="msg in recvMsgList" :key="msg.id">
              <th scope="row">
                <input type="checkbox" name="checkbox_name" value="checkbox_value">
              </th>
              <td>{{ msg.sender }}</td>
              <td>
                <a :class="msg.is_read ? 'text-secondary' : 'text-primary'" @click="getMsgData(msg.id)" href="#Detail_Message_Modal" style="text-decoration: none;" data-bs-toggle="modal">{{ msg.title }}</a>
              </td>
              <td>{{ msg.created_at }}</td>
            </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-center">
            <!-- Pagination -->
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li v-if="currentPage !== 1" class="page-item">
                  <a v-if="msgMode === 1" style="cursor: pointer" class="page-link" @click="getRecvMsgList(currentPage - 1, false)">이전</a>
                  <a v-else-if="msgMode === 2" style="cursor: pointer" class="page-link" @click="getRecvMsgList(currentPage - 1, true)">이전</a>
                  <a v-else style="cursor: pointer" class="page-link" @click="getSendMsgList(currentPage - 1)">이전</a>
                </li>
                <li v-for="page in numberOfPages" :key="page" class="page-item" :class="currentPage === page ? 'active' : ''">
                  <a v-if="msgMode === 1" style="cursor: pointer" class="page-link" @click="getRecvMsgList(page, false)">{{ page }}</a>
                  <a v-else-if="msgMode === 2" style="cursor: pointer" class="page-link" @click="getRecvMsgList(page, true)">{{ page }}</a>
                  <a v-else style="cursor: pointer" class="page-link" @click="getSendMsgList(page)">{{ page }}</a>
                </li>
                <li v-if="currentPage !== numberOfPages" class="page-item">
                  <a v-if="msgMode === 1" style="cursor: pointer" class="page-link" @click="getRecvMsgList(currentPage + 1, false)">다음</a>
                  <a v-else-if="msgMode === 2" style="cursor: pointer" class="page-link" @click="getRecvMsgList(currentPage + 1, true)">다음</a>
                  <a v-else style="cursor: pointer" class="page-link" @click="getSendMsgList(currentPage + 1)">다음</a>
                </li>
              </ul>
            </nav>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Write_Message_Modal">
            쪽지 작성
          </button>
          <button type="button" class="btn btn-danger">삭제</button>
          <button type="button" @click="pageRefresh" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 쪽지 작성 -->
  <div class="modal fade" id="Write_Message_Modal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="Write_Message_ModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="Write_Message_ModalLabel">쪽지 작성</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="message_title"  class="form-label">제목</label>
              <input class="form-control" v-model="title" id="message_title" name="message_title" type="text" maxlength="20" required>
            </div>
            <div class="mb-3">
              <label for="message_receiver" class="form-label">받는사람</label>
              <input v-if="!isReply" class="form-control" v-model="receiver_name" id="message_receiver" name="message_receiver" type="text" maxlength="20" required>
              <input v-else class="form-control" v-model="receiver_name" id="message_receiver" name="message_receiver" type="text" maxlength="20" disabled>
            </div>
            <div class="mb-3">
              <label for="message_content" class="form-label">내용</label>
              <textarea class="form-control" v-model="content" rows="5" required></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button id="write_button" @click="sendMessage" class="btn btn-primary">전송</button>
            <button type="button" @click="pageRefresh" class="btn btn-secondary" data-bs-dismiss="modal"
                    id="closeJoinBtn">
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>

  <!-- 쪽지 상세화면 -->
  <div class="modal fade" id="Detail_Message_Modal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="Detail_Message_ModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="Detail_Message_ModalLabel">쪽지 상세화면</h1>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
            받은 쪽지함
          </button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Send_Message_Modal">
            보낸 쪽지함
          </button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">제목</th>
              <td>{{ msgData.title }}</td>
            </tr>
            <tr>
              <th scope="row">보낸사람</th>
              <td>{{ msgData.sender_name }}</td>
            </tr>
            <tr>
              <th scope="row">보낸시간</th>
              <td>{{ msgData.created_at }}</td>
            </tr>
            </tbody>
          </table>
          <p class="text-start">{{ msgData.content }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="replyOption(msgData.sender_name)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Write_Message_Modal">
            답장
          </button>
          <button type="button" @click="pageRefresh" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 차단 목록 -->
  <div class="modal fade" id="Block_Message_Modal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="Block_Message_ModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="Block_Message_ModalLabel">차단 목록</h1>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
            받은 쪽지함
          </button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Send_Message_Modal">
            보낸 쪽지함
          </button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">닉네임</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row"><input type="checkbox" name="checkbox_name" value="checkbox_value"></th>
              <td>황종근</td>
            </tr>
            <tr>
              <th scope="row"><input type="checkbox" name="checkbox_name" value="checkbox_value"></th>
              <td>도현관</td>
            </tr>
            <tr>
              <th scope="row"><input type="checkbox" name="checkbox_name" value="checkbox_value"></th>
              <td>삼병철</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger">차단 해제</button>
          <button type="button" @click="pageRefresh" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index"
import { ref, onMounted } from 'vue'
import useAxios from '@/modules/axios'
import axios from "axios";

export default {

  setup() {
    const { axiosPost, axiosGet } = useAxios()
    const nickname = ref(store.getters['nickname'])
    const username = ref(store.getters['username'])
    const editProfile = ref(false)  // 프로필 수정 상태인지 확인

    // Pagination
    const currentPage = ref(1)  // 현재 페이지
    const numberOfPages = ref(1)

    const isReply = ref(false)
    const msgMode = ref(1)  // 1: 전체 쪽지, 2: 안읽음, 3: 보낸 쪽지함

    const selectedSearch = ref('TITLE')
    const searchText = ref('')

    const editProfileChange = () => {
      editProfile.value = !editProfile.value
    }

    // 쪽지 작성
    const title = ref('')
    const receiver_name = ref('')
    const content = ref('')

    const sendMessage = () => {
      axiosPost('/api/v1/messages', {
        title : title.value,
        content : content.value,
        receiver_name : receiver_name.value
      }, () => {
        alert('메시지 발송에 성공했습니다!')
        title.value = ''
        content.value = ''
        receiver_name.value = ''
        isReply.value = false
      }, (err) => {
        console.error(err)
      })
    }

    const recvMsgList = ref('')
    const sendMsgList = ref('')

    const resetSearch = () => {
      selectedSearch.value = 'TITLE'
      searchText.value = ''
    }

    const getRecvMsgList = async(page = currentPage.value, notRead) => {  // 수신함 목록 받아오기
      msgMode.value = 1
      currentPage.value = page
      try {
        const res = await axios.get(`http://be2.algo.r-e.kr:8088/api/v1/messages/inboxes?page=${page}&size=5&sort=createdAt,DESC&not_read=${notRead}&keyword=${searchText.value}&searchType=${selectedSearch.value}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          withCredentials: true,
        })
        numberOfPages.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          console.log(res.data)
          recvMsgList.value = res.data
        } else {
          recvMsgList.value = null
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getSendMsgList = async (page = currentPage.value) => {  // 발신함 목록 받아오기
      msgMode.value = 3
      currentPage.value = page
      try {
        const res = await axios.get(`http://be2.algo.r-e.kr:8088/api/v1/messages/outboxes?page=${page}&size=5&sort=createdAt,DESC&keyword=${searchText.value}&searchType=${selectedSearch.value}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          withCredentials: true,
        })
        numberOfPages.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          sendMsgList.value = res.data
        } else {
          sendMsgList.value = null
        }
      } catch (error) {
        console.log(error)
      }
    }

    const msgData = ref({ // 메시지 데이터
      title: '',
      content: '',
      sender_name: '',
      receiver_name: '',
      created_at: '',
    })

    const getMsgData = (message_id) => {  // 상세 메시지 받아오기
      axiosGet(`/api/v1/messages/${message_id}`, (res) => {
        msgData.value = res.data
      }, (err) => {
        console.error(err)
      })
    }

    const replyOption = (sender) => {
      receiver_name.value = sender
      isReply.value = true
    }

    const unReadCount = ref('')

    onMounted(() => {
      axiosGet(`/api/v1/messages/non_read_counts`, (res) => {
        unReadCount.value = res.data
      }, (err) => {
        console.error(err)
      })
    })

    const pageRefresh = () => {
      window.location.reload()
      isReply.value = false
    }

    const searchMessage = () => {
      getRecvMsgList(1, false)
    }


    return {
      nickname,
      username,
      editProfile,
      editProfileChange,

      title,
      receiver_name,
      content,
      sendMessage,
      getRecvMsgList,
      getSendMsgList,
      recvMsgList,
      sendMsgList,
      msgData,
      getMsgData,
      unReadCount,
      pageRefresh,
      currentPage,
      numberOfPages,
      isReply,
      replyOption,
      msgMode,
      selectedSearch,
      searchText,
      searchMessage,
      resetSearch,
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