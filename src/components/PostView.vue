<template>
  <div v-if="loading">

  </div>
  <div class="container" v-else>
    <div class="card mt-4 shadow p-3 mb-5 bg-body">
      <div class="card-body">
        <h3 class="card-title mb-4">{{ postData.title }}</h3>
        <p class="card-text">
          작성자 : {{ postData.author }} <br/> 작성일 : {{ postData.created_at }} <br/> 조회수 : {{ postData.view_count }} <br/> 추천수 : {{ postData.like_count }}
        </p>
        <hr/>
        <p v-html="postData.content" class=""></p>

        <div class="form-inline row mt-2">
          <div class="text-lg-end mt-2">
            <button type="button" @click="thumbsUp" class="btn" :class="postData.is_like ? 'btn-warning' : 'btn-outline-warning'">
              <svg v-if="!postData.is_like" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
              </svg>
            </button>
            <!--            <button class="btn btn-primary m-2" @click="moveToEditPage">수정</button>-->
            <router-link class="btn btn-primary m-2" :to="{name: 'PostWrite', query : { editable: true }}">수정</router-link>
            <button class="btn btn-danger" @click="deletePost">삭제</button>
            <button class="btn btn-primary m-2" @click="moveToPostListPage">목록</button>
          </div>
        </div>
      </div>
      <!-- Comments body-->
      <div class="row card-body">
        <!-- Comment form-->
        <form>
          <textarea
              class="form-control mb-3" rows="3" v-model="comment"
              style="resize:none; overflow: hidden"
              placeholder="댓글을 남겨보세요"
              @keydown="resize"
              @keyup="resize"
              ref="textarea"></textarea>
          <button class="btn btn-primary float-end" type="button" @click="addComment">등록</button>
        </form>
        <!-- Comment with nested comments-->
        <div class="mb-4">
          <div :class="comment.parent === 0 ? 'mt-4 ms-3' : 'mt-2 ms-5'" v-for="comment in commentList" :key="comment.id">
            <div class="fw-bold">{{ comment.author }}</div>
            <div v-if="!comment.is_deleted">{{ comment.content }}</div>
            <div v-else>삭제된 댓글입니다.</div>
            <div><code>{{ comment.created_at }}</code></div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="d-flex justify-content-center">
        <nav aria-label="Comment list page navigation">
          <ul class="pagination">
            <li v-if="currCommPage !== 1" class="page-item">
              <a style="cursor: pointer" class="page-link" @click="getCommentList(currCommPage - 1)">이전</a>
            </li>
            <li v-for="page in numOfCommPage" :key="page" class="page-item" :class="currCommPage === page ? 'active' : ''">
              <a style="cursor: pointer" class="page-link" @click="getCommentList(page)">{{ page }}</a>
            </li>
            <li v-if="currCommPage !== numOfCommPage" class="page-item">
              <a style="cursor: pointer" class="page-link" @click="getCommentList(currCommPage + 1)">다음</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAxios from '@/modules/axios'
import axios from "axios";

export default {
  setup() {
    const { axiosGet, axiosDelete, axiosPost } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const postId = route.params.id
    const loading = ref(false)

    const postData = ref({
      title: '',
      content: '',
      author: '',
      created_at: '',
      view_count: '',
      like_count: '',
      is_like: '',
    })

    // comment variables
    const textarea = ref(null)
    const comment = ref('')
    const commentList = ref(null)
    const currCommPage = ref(1)
    const numOfCommPage = ref(1)

    const moveToPostListPage = () => {
      router.go(-1)
    }

    const deletePost = () => {
      if(confirm('정말 게시글을 삭제하시겠습니까?')) {
        axiosDelete(`/api/v1/boards/1/posts/${postId}`
        , () => {
          alert("게시글이 삭제되었습니다.")
          router.go(-1)
        }, () => {
          alert('게시글을 삭제할 수 없습니다.')
        })
      }
    }

    const thumbsUp = () => {  // 게시글 추천
      if (postData.value.is_like) {
        if(confirm('추천을 취소하시겠습니까??')) {
          axiosDelete(`/api/v1/boards/1/posts/${postId}/likes`, () => {
            location.reload()
          }, () => {
            alert('추천취소 실패ㅠ')
          })
        }
      } else {
        if(confirm('이 게시글을 추천하시겠습니까?')) {
          axiosPost(`/api/v1/boards/1/posts/${postId}/likes`, {}
              , () => {
                location.reload()
              }, () => {
                alert("추천실패ㅠ")
              })
        }
      }
    }

    const resize = () => {
      textarea.value.style.height = '1px'
      textarea.value.style.height = (12 + textarea.value.scrollHeight) + 'px'
    }

    const addComment = () => {
      axiosPost(`/api/v1/boards/1/posts/${postId}/comments`, {
        content: comment.value,
        parent: 0
      }, () => {
        router.go()
      }, (err) => {
        console.error(err)
      })
    }

    const getCommentList = async (page = currCommPage.value) => {
      currCommPage.value = page
      // axiosGet(`/api/v1/boards/1/posts/${postId}/comments?page=${page}&size=5`
      //     , (res) => {
      //       numOfCommPage.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
      // //       console.log(res.headers)
      //       if (res.data.length !== 0) {
      //         commentList.value = res.data
      //       } else {
      //         commentList.value = []
      //       }
      //     }, (err) => {
      //       commentList.value = []
      //       console.error(err)
      //     })
      try {
        const res = await axios.get(`http://be2.downbit.r-e.kr:8088/api/v1/boards/1/posts/${postId}/comments?page=${page}&size=5`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          withCredentials: true,
        })
        numOfCommPage.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        console.log(res)
        if (res.data.length !== 0) {
          commentList.value = res.data
        } else {
          commentList.value = []
        }
      } catch (err) {
        console.error(err)
      }

    }

    onMounted(() => {
      loading.value = true

      // get post data
      axiosGet(`/api/v1/boards/1/posts/${postId}`
          , (res) => {
            postData.value = res.data
            loading.value = false
          }, (err) => {
            loading.value = false
            console.error(err)
          })

      // get comments data
      getCommentList()
    })

    return {
      postId,
      loading,
      postData,
      comment,
      currCommPage,
      numOfCommPage,
      commentList,
      textarea,
      moveToPostListPage,
      deletePost,
      thumbsUp,
      resize,
      addComment,
      getCommentList,
    }
  }
}
</script>

<style scoped>

</style>