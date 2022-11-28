<template>
  <!-- Button trigger modal -->
  <button v-if="selfName === nickname" type="button" @click="getRecvMsgList(1, false)" class="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
    쪽지함
    <span v-show="parseInt(unReadCount) > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {{ unReadCount }}
      <span class="visually-hidden">읽지 않은 쪽지</span>
    </span>
  </button>
  <button v-else type="button" @click="replyOption(nickname)" class="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#Write_Message_Modal">
    쪽지 작성
  </button>

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
              <button class="nav-link active" data-bs-toggle="tab" @click="[resetValue(), getRecvMsgList(1, false)]">전체 쪽지</button>
              <button class="nav-link" data-bs-toggle="tab" @click="[resetValue(), getRecvMsgList(1, true)]">안읽음</button>
              <button class="nav-link" data-bs-toggle="tab" @click="[resetValue(), getSendMsgList(1)]">보낸 쪽지함</button>
              <button class="nav-link" data-bs-toggle="tab" @click="[resetValue(), getBlockUserList(1)]">차단 목록</button>
            </div>

            <div v-if="msgMode !== 4" class="row mt-3 mb-3">
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
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <table class="table">
            <thead>
            <tr v-if="msgMode === 4">
              <th scope="col">#</th>
              <th scope="col">닉네임</th>
              <th scope="col">차단일시</th>
              <th scope="col"></th>
            </tr>

            <tr v-else>
              <th scope="col" class="first">
                <input type="checkbox" value="all" v-model="selectAll" @click="allSelected"/>
              </th>
              <th v-if="msgMode === 3" scope="col">받는사람</th>
              <th v-else scope="col">보낸사람</th>
              <th scope="col">제목</th>
              <th scope="col">날짜</th>
              <th v-show="msgMode === 3" scope="col">수신확인</th>
            </tr>

            </thead>
            <!-- 보낸 쪽지함 -->
            <tbody v-if="msgMode === 3">
            <tr v-for="msg in sendMsgList" :key="msg.id">
              <th scope="row">
                <input type="checkbox" :id="msg" :value="msg.id" v-model="selected">
              </th>
              <td>{{ msg.receiver }}</td>
              <td class="text-link"><a class="text-dark" @click="getMsgData(msg.id)" href="#Detail_Message_Modal" style="text-decoration:none" data-bs-toggle="modal">{{ msg.title }}</a></td>
              <td>{{ msg.created_at }}</td>
              <td v-if="msg.read_time">{{ msg.read_time }}</td>
              <td v-else>읽지 않음</td>
            </tr>
            </tbody>

            <!-- 차단 -->
            <tbody v-else-if="msgMode === 4">
            <tr v-for="(user, index) in blockUserList" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.block_id }}</td>
              <td>{{ user.created_at }}</td>
              <td><button class="btn btn-success" @click="setUnblockUser(user.id)">차단해제</button></td>
            </tr>
            </tbody>

            <!-- 전체 쪽지, 안읽음 -->
            <tbody v-else>
            <tr v-for="msg in recvMsgList" :key="msg.id">
              <th scope="row">
                <input type="checkbox" :id="msg" :value="msg.id" v-model="selected">
              </th>
              <td>{{ msg.sender }}</td>
              <td class="text-link">
                <a :class="msg.is_read ? 'text-secondary' : 'text-primary'" @click="getMsgData(msg.id)" href="#Detail_Message_Modal" style="text-decoration: none;" data-bs-toggle="modal">{{ msg.title }}</a>
              </td>
              <td>{{ msg.created_at }}</td>
            </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-center">
            <!-- Pagination -->
            <Pagination v-if="msgMode === 1" :currentPage="currentPage" :pageDisplayCount="pageDisplayCount" :totalPageCount="totalPageCount" @change="setPage" />
            <Pagination v-else-if="msgMode === 2" :currentPage="currentPage" :pageDisplayCount="pageDisplayCount" :totalPageCount="totalPageCount" @change="setPage" />
            <Pagination v-else-if="msgMode ===3" :currentPage="currentPage" :pageDisplayCount="pageDisplayCount" :totalPageCount="totalPageCount" @change="setPage" />
            <Pagination v-else :currentPage="currentPage" :pageDisplayCount="pageDisplayCount" :totalPageCount="totalPageCount" @change="setPage" />
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Write_Message_Modal">
            쪽지 작성
          </button>
          <button v-if="msgMode !== 4" @click="selectMsgDelete" class="btn btn-danger">삭제</button>
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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="message_title" class="form-label d-flex">제목</label>
            <input class="form-control" v-model="title" id="message_title" name="message_title" type="text" maxlength="20" required>
          </div>
          <div class="mb-3">
            <label for="message_receiver" class="form-label d-flex">받는사람</label>
            <input v-if="!isReply" class="form-control" v-model="receiver_name" id="message_receiver" name="message_receiver" type="text" maxlength="20" required>
            <input v-else class="form-control" v-model="receiver_name" id="message_receiver" name="message_receiver" type="text" maxlength="20" disabled>
          </div>
          <div class="mb-3">
            <label for="message_content" class="form-label d-flex">내용</label>
            <textarea class="form-control" v-model="content" rows="5" required></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button id="write_button" @click="sendMessage" class="btn btn-primary">전송</button>
          <button v-if="selfName === nickname" type="button" @click="[resetValue(), refreshMsg(msgMode)]" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
            닫기
          </button>
          <button v-else type="button" @click="pageRefresh" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
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
              <th scope="row">받는사람</th>
              <td>{{ msgData.receiver_name }}</td>
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
          <p class="text-start d-flex">{{ msgData.content }}</p>
        </div>
        <div class="modal-footer">
          <button v-if="msgMode !== 3" type="button" @click="replyOption(msgData.sender_name)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Write_Message_Modal">
            답장
          </button>
          <button v-if="msgMode !== 3" class="btn btn-danger" @click="setBlockUser(msgData.sender_name)">
            차단
          </button>
          <button class="btn btn-danger" @click="deleteMsg(msgData.id)">
            삭제
          </button>
          <button type="button" @click="refreshMsg(msgMode)" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import useAxios from '@/modules/axios'
import { useStore } from 'vuex'
import { axios } from '@bundled-es-modules/axios'
import Pagination from '@compo/common/Pagination'

export default {
  components: {
    Pagination,
  },
  props: {
    nickname: {
      type: String,
      required: true,
    }
  },
  setup() {
    const { axiosGet, axiosPost, axiosDelete } = useAxios()
    const store = useStore()
    const selfName = ref(store.getters['nickname'])

    // Pagination
    const currentPage = ref(1)
    const pageDisplayCount = ref(5)
    const totalPageCount = ref()

    const isReply = ref(false)  // 답장 상태인지 확인
    const msgMode = ref(1)  // 1: 전체 쪽지, 2: 안읽음, 3: 보낸 쪽지함, 4: 차단

    const selectedSearch = ref('TITLE')
    const searchText = ref('')

    // 쪽지 작성
    const title = ref('')
    const receiver_name = ref('')
    const content = ref('')

    const sendMessage = () => {
      if (receiver_name.value === '' || title.value === '' || content.value === '') {
        alert('쪽지의 내용을 모두 작성해주세요.')
      } else {
        if (receiver_name.value === selfName.value) {
          alert('자신에게 쪽지를 보낼 수 없습니다.')
        } else {
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
            alert('존재하지 않는 사용자 입니다.')
          })
        }
        }
    }

    const recvMsgList = ref(null)
    const sendMsgList = ref(null)
    const blockUserList = ref('')

    const resetValue = () => {
      selectedSearch.value = 'TITLE'
      searchText.value = ''
      isReply.value = false
      receiver_name.value = ''
      selected.value = []
      selectAll.value = false
    }

    const getRecvMsgList = (page = currentPage.value, notRead) => {  // 수신함 목록 받아오기
      if (notRead) {
        msgMode.value = 2
      } else {
        msgMode.value = 1
      }
      currentPage.value = page
      axiosGet(`/api/v1/messages/inboxes?page=${page}&size=5&sort=createdAt,DESC&not_read=${notRead}&keyword=${searchText.value}&searchType=${selectedSearch.value}`
          , (res) => {
            totalPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
            if (res.data.length !== 0) {
              recvMsgList.value = res.data
            } else {
              recvMsgList.value = null
            }
          }, (err) => {
            console.error(err)
          })
    }

    const getSendMsgList = async (page = currentPage.value) => {  // 발신함 목록 받아오기
      msgMode.value = 3
      currentPage.value = page
      try {
        const res = await axios.get(`http://be.algo.r-e.kr:8088/api/v1/messages/outboxes?page=${page}&size=5&sort=createdAt,DESC&keyword=${searchText.value}&searchType=${selectedSearch.value}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          withCredentials: true,
        })
        totalPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          sendMsgList.value = res.data
        } else {
          sendMsgList.value = null
        }
      } catch (error) {
        console.error(error)
      }
    }

    const getBlockUserList = async(page = currentPage.value) => { // 차단 유저 목록 가져오기
      msgMode.value = 4
      currentPage.value = page
      try {
        const res = await axios.get(`http://be.algo.r-e.kr:8088/api/v1/users/blocks?page=${page}&size=5`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          withCredentials: true,
        })
        totalPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          blockUserList.value = res.data
        } else {
          blockUserList.value = null
        }
      } catch (error) {
        console.error(error)
      }
    }

    const setBlockUser = (sender_name) => { // 유저 차단
      if(confirm(sender_name+"님을 차단하시겠습니까?")) {
        axiosPost('/api/v1/users/blocks', {
          blockUserName : sender_name
        }, () => {
          alert('차단되었습니다.')
        }, (err) => {
          alert('이미 차단된 사용자입니다.')
        })
      }
    }

    const setUnblockUser = (block_id) => {
      axiosDelete(`/api/v1/users/blocks/${block_id}`, () => {
        getBlockUserList(1)
      }, (err) => {
        console.error(err)
      })
    }

    const msgData = ref({ // 메시지 데이터
      id: '',
      title: '',
      content: '',
      sender_name: '',
      receiver_name: '',
      created_at: '',
    })

    const getMsgData = (message_id) => {  // 상세 메시지 받아오기
      refreshNonReadCount()
      axiosGet(`/api/v1/messages/${message_id}`, (res) => {
        msgData.value = res.data
      }, (err) => {
        console.error(err)
      })
    }

    const replyOption = (sender) => { // 답장일 경우 받는 사람 이름 고정
      receiver_name.value = sender
      isReply.value = true
    }

    // 쪽지
    const unReadCount = ref('')

    // 쪽지 모달창을 빠져 나갔을 때 Profile 페이지 새로고침
    const pageRefresh = () => {
      isReply.value = false
    }

    // 쪽지 검색
    const searchMessage = () => {
      if (msgMode.value === 1) {
        getRecvMsgList(1, false)
      } else if (msgMode.value === 2) {
        getRecvMsgList(1, true)
      } else if (msgMode.value === 3) {
        getSendMsgList(1)
      }
    }

    // 쪽지 개별 삭제
    const deleteMsg = (message_id) => {
      if(confirm("쪽지를 삭제하시겠습니까?")) {
        axiosDelete(`/api/v1/messages/${message_id}`, () => {
          alert('삭제되었습니다.')
          window.location.reload()
        }, (err) => {
          console.error(err)
        })
      }
    }

    // 쪽지함 새로고침
    const refreshMsg = (msg) => {
      if (msg === 1) getRecvMsgList(1, false)
      else if (msg === 2) getRecvMsgList(1, true)
      else if (msg === 3) getSendMsgList(1)
      else getBlockUserList(1)
    }

    // 쪽지 전체 선택
    const selectAll = ref(false)
    const selected = ref([])

    watch(selected, () => {
      if (msgMode.value === 3) {
        if (sendMsgList.value !== null) {
          selectAll.value = selected.value.length === sendMsgList.value.length
        }
      } else {
        if (recvMsgList.value !== null) {
          selectAll.value = selected.value.length === recvMsgList.value.length
        }
      }
    })

    const allSelected = () => {
      selected.value = []
      if (!selectAll.value) {
        if (msgMode.value === 3) {  // 보낸 쪽지함
          for (let i in sendMsgList.value) {
            selected.value.push(sendMsgList.value[i].id)
          }
        } else { // 전체 쪽지, 안읽음
          for (let i in recvMsgList.value) {
            selected.value.push(recvMsgList.value[i].id)
          }
        }
      }
    }

    // 쪽지 Pagination
    const setPage = (page) => {
      currentPage.value = page
      if (msgMode.value === 1) {
        getRecvMsgList(page, false)
      } else if (msgMode.value === 2) {
        getRecvMsgList(page, true)
      } else if (msgMode.value === 3) {
        getSendMsgList(page)
      } else {
        getBlockUserList(page)
      }
    }

    // 쪽지 일괄 삭제
    const selectMsgDelete = () => {
      if (msgMode.value === 3) {
        if(confirm('선택한 메시지를 모두 삭제하시겠습니까?')) {
          axios.delete('http://be.algo.r-e.kr:8088/api/v1/messages/outboxes', {
            data: {
              messageIdArray: selected.value
            },
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true,
          }).then(() => {
            alert('메시지 삭제에 성공하였습니다.')
            getSendMsgList(1)
          }).catch(() => {
            alert('메시지 삭제에 실패하였습니다.')
          })
        }
      } else {
        if(confirm('선택한 메시지를 모두 삭제하시겠습니까?')) {
          axios.delete('http://be.algo.r-e.kr:8088/api/v1/messages/inboxes', {
            data: {
              messageIdArray: selected.value
            },
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true,
          }).then(() => {
            alert('메시지 삭제에 성공하였습니다.')
            if(msgMode.value === 1) {
              getRecvMsgList(1, false)
            } else {
              getRecvMsgList(1, true)
            }
          }).catch(() => {
            alert('메시지 삭제에 실패하였습니다.')
          })
        }
      }
    }

    const refreshNonReadCount = () => {
      axiosGet(`/api/v1/messages/non_read_counts`, (res) => {
        unReadCount.value = res.data
      }, (err) => {
        console.error(err)
      })
    }

    onMounted(() => {
      refreshNonReadCount()
    })

    return {
      selfName,
      getRecvMsgList,
      getBlockUserList,
      unReadCount,
      replyOption,
      resetValue,
      msgMode,
      selectedSearch,
      searchText,
      searchMessage,
      selectAll,
      allSelected,
      sendMsgList,
      getMsgData,
      blockUserList,
      setUnblockUser,
      recvMsgList,
      selected,
      getSendMsgList,
      currentPage,
      pageDisplayCount,
      totalPageCount,
      setPage,
      selectMsgDelete,
      pageRefresh,
      title,
      isReply,
      receiver_name,
      content,
      sendMessage,
      refreshMsg,
      msgData,
      setBlockUser,
      deleteMsg,
    }
  }
}
</script>

<style scoped>
.text-link {
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}
</style>