<template>
  <!-- load fail -->
  <div v-if="loading === -1">
    <NotFound/>
  </div>
  <!-- loading -->
  <div v-else-if="loading === 0">
    <Loading/>
  </div>
  <!-- load success -->
  <div v-else class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div v-if="editProfile">
                  <img v-if="!userData.profileImg" src="../../assets/default.png" alt="" class="rounded-circle" width="150">
                  <img v-else :src="userData.profileImg" alt="../assets/default.png" class="rounded-circle" width="150">
                </div>
                <div v-else>
                  <img v-if="!userData.profileImg" src="../../assets/default.png" alt="" class="rounded-circle" width="150">
                  <img v-else :src="userData.profileImg" alt="../assets/default.png" class="rounded-circle" width="150">
                </div>
                <div class="mt-3">
                  <h4>{{ userData.nickname }}</h4>
                  <p class="text-muted font-size-sm">일반회원</p>
                  <Message :nickname="userData.nickname"/>
                  <br/>
                  <div v-if="editProfile">
                    <label for="inputImage" class="btn_model">
                      <b id="btnChangeProfile" class="btn btn-primary mt-2">프로필 사진 변경</b>
                    </label>
                    <input type="file" id="inputImage" accept="image/*" @change="fileChange" hidden ref="input_file">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <div class="card-title fw-bold mb-2">즐겨찾기 식품</div>
              <div v-for="food in userFoods" :key="food.id" class="d-flex">
                <img :src="food.food_image_url" class="me-3" height="100" width="100" alt=""/>
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
                        <button class="btn btn-primary" @click="checkNickname">중복 확인</button>
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

              <hr v-if="selfName === userData.nickname">
              <div v-if="selfName === userData.nickname" class="row justify-content-around">
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
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import useAxios from '@/modules/axios'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'
import { axios } from '@bundled-es-modules/axios'
import Pagination from '@compo/common/Pagination'
import Message from '@compo/user/Message'
import Loading from '@compo/common/Loading'
import NotFound from '@compo/common/NotFound'

export default {
  components: {
    Pagination,
    Message,
    Loading,
    NotFound,
  },
  setup() {
    const { axiosGet, axiosPost, axiosPatch } = useAxios()
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
    const editProfile = ref(false)  // 프로필 수정 상태인지 확인
    const isNickAvail = ref(false)

    // 프로필 수정 항목
    const newAllergies = ref()
    const newNickname = ref('')
    const newIntroduce = ref('')

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
          console.error(err)
        })
    }

    const setCommPage = (page) => {
      curCommPage.value = page
      getCommentList(page)
    }

    const allergyCheckData = ref([  // 현재 사용자의 알레르기 데이터
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

    const allergyData = new Map()

    const checkSelected = () => {
      for (let i = 0; i < allergyCheckData.value.length; i++) {
        allergyData.set(allergyCheckData.value[i].name, allergyCheckData.value[i].selected)
      }
    }

    watch(allergyCheckData.value, () => {
      checkSelected()
    })

    const editProfileChange = () => {
      editProfile.value = !editProfile.value
      newNickname.value = userData.value.nickname
      newIntroduce.value = userData.value.introduce
      imageSrc.value = userData.value.profileImg
      const newAllergies = new Map(Object.entries(userData.value.userAllergyInfo))
      for (let i = 0; i < newAllergies.size; i++) {
        allergyCheckData.value[i].selected = newAllergies.get(allergyCheckData.value[i].name)
      }
    }

    const nicknameValidation = ref(false) // 닉네임 정규식 검사 결과
    const duplicateNickname = ref(false)  // 닉네임 중복 여부
    const duplicateNicknameCheck = ref(false) // 닉네임 중복체크 여부
    const tempNickname = ref('')

    const checkNickname = () => { // 중복확인 버튼 클릭시 동작하는 함수
      if (newNickname.value === userData.value.nickname) {
        alert('현재 닉네임과 동일합니다.')
      } else {  // 현재 닉네임과 다르면
        // 닉네임 정규식 검사
        const validateNickname = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]{2,15}$/
        nicknameValidation.value = !(!validateNickname.test(newNickname.value) || !newNickname.value)
        if (nicknameValidation.value) { // 정규식 검사에 통과하면
          nicknameCheck() // 닉네임 중복검사 함수 실행
        } else {
          alert('한글과 영문 대 소문자 2~15자를 사용하세요.\n(특수기호, 숫자, 공백 사용 불가)')
        }
      }
    }

    const nicknameCheck = () => {
      axiosGet(`/api/v1/users/${newNickname.value}/exists`, (res) => {
        if (res.data) {
          alert('이미 사용중인 닉네임입니다.')
          duplicateNickname.value = true  // 중복된 닉네임 = true
        } else {
          alert('사용가능한 닉네임입니다.')
          tempNickname.value = newNickname.value // 중복 확인이 완료된 닉네임을 임시로 저장
          duplicateNicknameCheck.value = true // 닉네임 중복 체크했는지? = true
          duplicateNickname.value = false // 중복된 닉네임 = false
        }
      }, (err) => {
        console.error(err)
      })
    }

    // 프로필 수정
    const updateProfile = () => {
      const promiseList = []

      if(newIntroduce.value !== userData.value.introduce) {
        promiseList.push(axiosPatch('/api/v1/users/introduce', { introduce: newIntroduce.value }))
      }
      // if()
      let newAllergies = {}
      allergyCheckData.value.forEach((data) => {
        newAllergies[data.name] = data.selected
      })
      promiseList.push(axiosPatch('/api/v1/users/allergies', newAllergies))

      updateImage()

      if (newNickname.value === userData.value.nickname) {
        Promise.all(promiseList)
            .then(() => {
              alert('변경되었습니다.')
              router.push(`/profile/${newNickname.value}`).then(() => { router.go() })
            }).catch(() => {
          alert('닉네임 중복 또는 한 줄 소개를 확인해주세요.')
        })
      } else {
        if (!duplicateNicknameCheck || newNickname.value === '') {
          alert('닉네임 중복확인이 필요합니다.')
        } else {
          if (tempNickname.value === newNickname.value) {
            promiseList.push(axiosPatch('/api/v1/users/nickname', { nickname: newNickname.value }))
            Promise.all(promiseList)
                .then(() => {
                  alert('변경되었습니다.')
                  store.commit('nickname', newNickname.value)
                  router.push(`/profile/${newNickname.value}`).then(() => { router.go() })
                }).catch(() => {
              alert('닉네임 중복 또는 한 줄 소개를 확인해주세요.')
            })
          } else { // 중복 확인이 완료된 닉네임과 입력된 닉네임이 다르면
            alert('닉네임 중복확인이 필요합니다.')
            duplicateNicknameCheck.value = false  // 닉네임 중복 체크 했는지? = false
          }
        }
      }
    }

    // 프로필 이미지 업로드
    const input_file = ref(null)
    const output_file = ref(null)
    const fileName = ref('')
    const filePath = ref('')
    let imgUrl

    const fileChange = () => {
      const blobURL = URL.createObjectURL(input_file.value.files[0])
      const img = new Image()
      img.src = blobURL
      img.onload = function () {
        imageSizeChange(img,input_file.value.files[0].size)
        let list = new DataTransfer();
        list.items.add(new File([dataURItoBlob(imgUrl)], input_file.value.files[0].name,{
          type: input_file.value.files[0].type,
        }));
        output_file.value = list.files
      }
      fileName.value = input_file.value.files[0].name
      requestAuth()
    }

    const imageSizeChange = (image,size) => {
      let canvas = document.createElement("canvas"),
          max_size = 600,
          width = image.width,
          height = image.height;
      if (width > height) {
        // 가로가 길 경우
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        // 세로가 길 경우
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      if(size>3*1024*1024){
        imgUrl = canvas.toDataURL("image/jpeg", 0.5);
      }
      else{
        imgUrl = canvas.toDataURL("image/jpeg", 1);
      }
    }


    const dataURItoBlob = (dataURI) => {
      let byteString = atob(dataURI.split(',')[1])
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      let ab = new ArrayBuffer(byteString.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], {type: mimeString})
    }

    const requestAuth = () => {
      axiosPost('/api/v1/profiles/images', {
        file_name: fileName.value,
        image_request_type: 'POST',
      }, (res) => {
        filePath.value = res.data.substring(res.data.indexOf('profile_image')+14, res.data.indexOf('?')) //이미지이름.확장자
        uploadImage(res.data)
      }, (err) => {
        console.error(err)
      })
    }

    const uploadImage = (awsURL) => { // 백엔드 서버에 URL 요청
      axios.put(awsURL, output_file.value[0], {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then(() => {
        insertImage(filePath.value)
      }).catch((err) => {
        console.error(err)
      })
    }

    const imageSrc = ref()
    const insertImage = (imageUrl) => { // 프로필 이미지 업로드
      axiosPost('/api/v1/profiles/images', {
        file_name: imageUrl,  // 이미지이름.확장자
        image_request_type: "GET",
      }, (res) => {
        imageSrc.value = res.data.substring(0, res.data.indexOf('?'))
      }, (err) => {
        console.error(err)
      })
    }

    const updateImage = () => {
      axiosPatch('/api/v1/users/profile_images', {
        profileImageUrl: imageSrc.value
      })
    }

    const updatePassword = () => {
      router.push({name : 'ChangePassword'})
    }

    // Profile.vue onMounted
    const loading = ref(0)
    onMounted(() => {
      // 사용자 정보
      axiosGet(`/api/v1/profiles/${route.params.nickname}`
          , (res) => {
            userData.value = res.data
            imageSrc.value = userData.value.profileImg
            newNickname.value = userData.value.nickname
            newIntroduce.value = userData.value.introduce
            const newAllergies = new Map(Object.entries(res.data.userAllergyInfo))
            for (let i = 0; i < newAllergies.size; i++) {
              allergyCheckData.value[i].selected = newAllergies.get(allergyCheckData.value[i].name)
            }
            loading.value = 1
          }, (err) => {
            loading.value = -1
            console.error(err)
          })

      getFoodList(1)  // 즐겨찾기 식품 정보
      getPostList(1)  // 작성 글 정보
      getCommentList(1)  // 작성 댓글 정보
    })

    return {
      loading,
      checkNickname,
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
      input_file,
      filePath,
      fileChange,
      nicknameCheck,
      updateProfile,
      updatePassword,
      isNickAvail,
      imageSrc,
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
</style>