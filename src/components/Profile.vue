<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="../assets/default.png" alt="Admin" class="rounded-circle" width="150">
                <div class="mt-3">
                  <h4>{{ userData.nickname }}</h4>
                  <p class="text-muted font-size-sm">일반회원</p>
                  <button type="button" @click="getRecvMsgList(1, false)" class="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
                    쪽지함
                    <span v-show="parseInt(unReadCount) > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {{ unReadCount }}
                      <span class="visually-hidden">읽지 않은 쪽지</span>
                    </span>
                  </button>
                  <br/>
                  <div v-if="editProfile">
                    <label for="inputImage" class="btn_model">
                      <b id="btnChangeProfile" class="btn btn-primary mt-2">프로필 사진 변경</b>
                    </label>
                    <input type="file" id="inputImage" accept="image/*" @change="fileChange" hidden>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <div class="card-title fw-bold mb-2">즐겨찾기 식품</div>
              <div v-for="food in userFoods" :key="food.id" class="d-flex">
                <img :src="food.food_image_url" class="me-3" height="100" width="100"/>
                <router-link :to="{ name: 'FoodView', params: { id: food.id } }" class="col text-link text-center align-self-center text-body">{{ food.foodName }}</router-link>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <Pagination :currentPage="curFoodPage" :pageDisplayCount="5" :totalPageCount="totalFoodPageCount" @change="setFoodPage"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0 fw-bold">아이디</h6>
                </div>
                <div class="col-sm-9">
                  <div>
                    {{ userData.username }}
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0 fw-bold">닉네임</h6>
                </div>
                <div class="col-sm-9">
                  <div v-if="!editProfile">
                    {{ userData.nickname }}
                  </div>
                  <div v-else>
                    <div class="row">
                      <div class="col">
                        <input v-model="newNickname" type="text" class="form-control">
                      </div>
                      <div class="col">
                        <button class="btn btn-primary" @click="nicknameCheck">중복 확인</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0 fw-bold">가입일</h6>
                </div>
                <div class="col-sm-9">
                  {{ userData.reg_date }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0 fw-bold">알레르기 정보</h6>
                </div>
                <div class="col-sm-9">
                  <div v-if="!editProfile" class=" d-inline-flex">
                    <div v-for="(val, key, index) in userData.userAllergyInfo" :key="key">
                      <div v-if="val">{{ allergyCheckData[index].foodName }} &nbsp;</div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="form-check form-check-inline" v-for="data in allergyCheckData" :key="data.id">
                      <input class="form-check-input" type="checkbox" v-model="data.selected" :id="`${data.name}`" :value="`${data.name}`">
                      <span class="form-check-label">{{ data.foodName }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0 fw-bold">한 줄 소개</h6>
                </div>
                <div v-if="!editProfile" class="col-sm-9">
                  {{ userData.introduce }}
                </div>
                <div v-else class="col-sm-9">
                  <input v-model="newIntroduce" type="text" class="form-control">
                </div>
              </div>

              <hr>
              <div class="row justify-content-around">
                <div class="col-lg-6 col-sm-12 " :class="editProfile ? 'text-start' : 'text-center'">
                  <button class="btn btn-info" @click="editProfileChange">
                    <div v-if="!editProfile">
                      프로필 수정
                    </div>
                    <div v-else>
                      취소
                    </div>
                  </button>
                </div>

                <div class="col-lg-6 col-sm-12 text-lg-end text-center" v-if="editProfile">
                  <button class="btn btn-primary me-2" @click="updateProfile">
                    저장
                  </button>
                  <button class="btn btn-primary " @click="updatePassword">
                    비밀번호 수정
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <div class="card-title fw-bold mb-2">
                <div v-if="selfName === userData.nickname">내가 쓴 글</div>
                <div v-else>{{ userData.nickname }}님이 쓴 글</div>
              </div>
              <div v-for="post in userPosts" :key="post.postId" class="d-flex">
                <a class="text-link text-body" :href="`/boards/${post.boardId}/posts/${post.postId}`">{{ post.title }}</a>
                <code class="ms-auto">{{ post.created_at }}</code>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <Pagination :currentPage="curPostPage" :pageDisplayCount="5" :totalPageCount="totalPostPageCount" @change="setPostPage"/>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <div class="card-title fw-bold mb-2">
                <div v-if="selfName === userData.nickname">내가 쓴 댓글</div>
                <div v-else>{{ userData.nickname }}님이 쓴 댓글</div>
              </div>
              <div v-for="comment in userComments" :key="comment.postId" class="d-flex">
                <a class="text-link text-body" :href="`/boards/${comment.boardId}/posts/${comment.postId}`">{{ comment.content }}</a>
                <code class="ms-auto">{{ comment.created_at }}</code>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <Pagination :currentPage="curCommPage" :pageDisplayCount="5" :totalPageCount="totalCommPageCount" @change="setCommPage"/>
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
                    <i class="ri-search-line"></i>
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
            <tr v-for="(msg, index) in sendMsgList" :key="msg.id">
              <th scope="row">
                <input type="checkbox" :id="msg" :value="msg.id" v-model="selected" :key="index.id">
              </th>
              <td>{{ msg.receiver }}</td>
              <td><a class="text-dark" @click="getMsgData(msg.id)" href="#Detail_Message_Modal" style="text-decoration:none" data-bs-toggle="modal">{{ msg.title }}</a></td>
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
            <tr v-for="(msg, index) in recvMsgList" :key="msg.id">
              <th scope="row">
                <input type="checkbox" :id="msg" :value="msg.id" v-model="selected" :key="index.id">
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
          <button type="button" @click="[resetValue(), refreshMsg(msgMode)]" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#Receive_Message_Modal">
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
          <p class="text-start">{{ msgData.content }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="replyOption(msgData.sender_name)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Write_Message_Modal">
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

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, watch } from 'vue'
import useAxios from '@/modules/axios'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'
import axios from 'axios'
import Pagination from '@compo/Pagination.vue'

export default {
  components: {
    Pagination,
  },
  setup() {
    const { axiosGet, axiosPost, axiosPatch, axiosDelete } = useAxios()
    const route = useRoute()
    const store = useStore()
    const selfName = ref(store.getters['nickname'])

    const userData = ref({
      introduce: '',
      userAllergyInfo: Object,
      nickname: '',
      username: '',
      profileImg: '',
      isAuthor: Boolean,
      reg_date: '',
    })

    const userFoods = ref([])
    const userPosts = ref([])
    const userComments = ref([])
    const newNickname = ref('')
    const editProfile = ref(false)  // 프로필 수정 상태인지 확인
    const isNickAvail = ref(false)
    const modalShow = ref(false)

    // 한줄 소개
    const newIntroduce = ref('')

    // Pagination
    const currentPage = ref(1)
    const pageDisplayCount = ref(5)
    const totalPageCount = ref()

    const isReply = ref(false)  // 답장 상태인지 확인
    const msgMode = ref(1)  // 1: 전체 쪽지, 2: 안읽음, 3: 보낸 쪽지함, 4: 차단

    const selectedSearch = ref('TITLE')
    const searchText = ref('')

    const selectedList = ref([])

    // Food pagination
    const curFoodPage = ref(1)
    const totalFoodPageCount = ref()

    const getFoodList = (page = curFoodPage.value) => {
      axiosGet(`/api/v1/profiles/${route.params.nickname}/foods?page=${page}&size=4`
        , (res) => {
          totalFoodPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
          if (res.data.length !== 0) {
            userFoods.value = res.data
          }
        }, (err) => {
          console.error(err)
        })
    }

    const setFoodPage = (page) => {
      curFoodPage.value = page
      getFoodList(page)
    }

    // Post pagination
    const curPostPage = ref(1)
    const totalPostPageCount = ref()

    // 사용자 작성 글 get
    const getPostList = (page = curPostPage.value) => {
      axiosGet(`/api/v1/profiles/${route.params.nickname}/posts?page=${page}&size=5`
        , (res) => {
          totalPostPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
          if (res.data.length !== 0) {
            userPosts.value = res.data
          }
        }, (err) => {
          console.error(err)
        })
    }

    const setPostPage = (page) => {
      curPostPage.value = page
      getPostList(page)
    }

    // Comment pagination
    const curCommPage = ref(1)
    const totalCommPageCount = ref()

    const getCommentList = (page = curCommPage.value) => {
      axiosGet(`/api/v1/profiles/${route.params.nickname}/comments?page=${page}&size=5`
        , (res) => {
          totalCommPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
          if (res.data.length !== 0) {
            userComments.value = res.data
          }
        }, (err) => {
          console.log(err)
        })
    }

    const setCommPage = (page) => {
      curCommPage.value = page
      getCommentList(page)
    }

    const allergyCheckData = ref([  // 현재 사용자가 선택한 알레르기 데이터
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

    const editProfileChange = () => {
      editProfile.value = !editProfile.value
      newNickname.value = userData.value.nickname
      newIntroduce.value = userData.value.introduce
    }

    const nicknameCheck = () => {
      if(newNickname.value === userData.value.nickname) {
        alert('현재 닉네임과 동일합니다.')
      }
      else {
        axiosGet(`/api/v1/users/${newNickname.value}/exists`, (res) => {
          if (res.data) {
            alert('이미 사용중인 닉네임입니다.')
          } else {
            alert('사용가능한 닉네임입니다.')
          }
        }, (err) => {
          console.error(err)
        })
      }
    }

    // 프로필 수정
    const updateProfile = () => {
      const promiseList = []

      if(newNickname.value !== userData.value.nickname) {
        promiseList.push(axiosPatch('/api/v1/users/nickname', { nickname: newNickname.value }))
      }
      if(newIntroduce.value !== userData.value.introduce) {
        promiseList.push(axiosPatch('/api/v1/users/introduce', { introduce: newIntroduce.value }))
      }

      Promise.all(promiseList)
        .then(() => {
          alert('변경되었습니다.')
          store.commit('nickname', newNickname.value)
          router.push(`/profile/${newNickname.value}`).then(() => { router.go() })
        }).catch(() => {
          alert('닉네임 중복 또는 한 줄 소개를 확인해주세요.')
        })
    }

    const fileChange = () => {
      // axiosPost('/api/v1/profiles/images')
    }


    const updatePassword = () => {
      router.push({name : 'ChangePassword'})
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
            console.log(err)
          })
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
        totalPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          sendMsgList.value = res.data
        } else {
          sendMsgList.value = null
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getBlockUserList = async(page = currentPage.value) => { // 차단 유저 목록 가져오기
      msgMode.value = 4
      currentPage.value = page
      try {
        const res = await axios.get(`http://be2.algo.r-e.kr:8088/api/v1/users/blocks?page=${page}&size=5`, {
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
        console.log(error)
      }
    }

    const setBlockUser = (sender_name) => { // 유저 차단
      if(confirm(sender_name+"님을 차단하시겠습니까?")) {
        axiosPost('/api/v1/users/blocks', {
          blockUserName : sender_name
        }, () => {
          alert('차단되었습니다.')
        }, (err) => {
          console.error(err)
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

    const unReadCount = ref('')

    onMounted(() => {
      modalShow.value = true

      axiosGet(`/api/v1/messages/non_read_counts`, (res) => {
        unReadCount.value = res.data
      }, (err) => {
        console.error(err)
      })

      // 사용자 정보
      axiosGet(`/api/v1/profiles/${route.params.nickname}`
          , (res) => {
            userData.value = res.data
            newNickname.value = userData.value.nickname
            newIntroduce.value = userData.value.introduce
          }, (err) => {
            console.log('사용자 정보 에러ㅠㅠ')
            console.error(err)
          })

      // 사용자 즐겨찾기 식품 정보
      getFoodList(1)

      // 사용자 작성 글 정보
      getPostList(1)

      // 사용자 작성 댓글 정보
      getCommentList(1)
    })

    const pageRefresh = () => { // 모달창을 빠져 나갔을 때 Profile 페이지 새로고침
      window.location.reload()
      isReply.value = false
    }

    const searchMessage = () => {
      if (msgMode.value === 1) {
        getRecvMsgList(1, false)
      } else if (msgMode.value === 2) {
        getRecvMsgList(1, true)
      } else if (msgMode.value === 3) {
        getSendMsgList(1)
      }
    }

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

    const selectMsgDelete = () => {
      if (msgMode.value === 3) {
        if(confirm('선택한 메시지를 모두 삭제하시겠습니까?')) {
          axios.delete('http://be2.algo.r-e.kr:8088/api/v1/messages/outboxes', {
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
            window.location.reload()
          }).catch(() => {
            alert('메시지 삭제에 실패하였습니다.')
          })
        }
      } else {
        if(confirm('선택한 메시지를 모두 삭제하시겠습니까?')) {
          axios.delete('http://be2.algo.r-e.kr:8088/api/v1/messages/inboxes', {
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
            window.location.reload()
          }).catch(() => {
            alert('메시지 삭제에 실패하였습니다.')
          })
        }
      }
    }

    return {
      modalShow,
      selfName,
      userData,
      userFoods,
      userPosts,
      userComments,
      newNickname,
      newIntroduce,
      editProfile,
      allergyCheckData,
      curFoodPage,
      totalFoodPageCount,
      setFoodPage,
      curPostPage,
      totalPostPageCount,
      setPostPage,
      curCommPage,
      totalCommPageCount,
      setCommPage,
      editProfileChange,
      fileChange,
      nicknameCheck,
      updateProfile,
      updatePassword,
      isNickAvail,
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
      isReply,
      replyOption,
      msgMode,
      selectedSearch,
      searchText,
      searchMessage,
      resetValue,
      getBlockUserList,
      setBlockUser,
      blockUserList,
      setUnblockUser,
      deleteMsg,
      refreshMsg,

      currentPage,
      pageDisplayCount,
      totalPageCount,
      setPage,

      selectAll,
      selected,
      allSelected,
      selectMsgDelete,
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

.text-link {
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
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