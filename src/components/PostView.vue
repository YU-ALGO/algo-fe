<template>
  <div v-if="loading">
    <div class="d-flex m-5 p-5 justify-content-center">
      <div class="spinner-border m-5 text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <div class="card mt-4 shadow p-3 mb-5 bg-body">
      <div class="card-body">
        <h3 class="card-title mb-4">{{ postData.title }}</h3>
        <p class="card-text">
          작성자 : {{ postData.author }} <br/> 작성일 : {{ postData.created_at }} <br/> 조회수 : {{ postData.view_count }} <br/> 추천수 : {{ postData.like_count }}
        </p>
        <hr/>
        <p v-html="postData.content" class=""></p>

        <div class="form-inline row mt-2">
          <div class="text-end mt-2">
            <button type="button" @click="thumbsUp" class="btn me-2" :class="postData.is_like ? 'btn-warning' : 'btn-outline-warning'">
              <i v-if="!postData.is_like" class="ri-thumb-up-line"></i>
              <i v-else class="ri-thumb-up-fill"></i>
            </button>
            <!-- <button class="btn btn-primary m-2" @click="moveToEditPage">수정</button> -->
            <router-link class="btn btn-primary me-2" :to="{ name: 'PostWrite', query: { editable: true } }">수정</router-link>
            <button class="btn btn-danger me-2" @click="deletePost">삭제</button>
            <button class="btn btn-primary" @click="moveToPostListPage">목록</button>
          </div>
        </div>
      </div>
      <!-- Comments body-->
      <div class="row card-body">
        <!-- Comment form-->
        <form>
          <textarea
              class="form-control mb-2"
              v-model="comment"
              style="resize:none; overflow: hidden"
              placeholder="댓글을 남겨보세요"
              @keydown="resize"
              @keyup="resize"
              ref="textarea"></textarea>
          <button class="btn btn-primary float-end" type="button" @click="addComment">등록</button>
        </form>
        <!-- Comment with nested comments-->
        <div class="mb-4">
          <div :class="comment.parent === null ? 'mt-2 ms-3' : 'mt-2 ms-5'" v-for="comment in commentList" :key="comment.id">
            <div class="row justify-content-end mb-4">
              <div class="col">
                <div v-if="!comment.is_deleted">
                  <span class="fw-bold me-3">{{ comment.author }}</span>
                  <code>{{ comment.created_at === comment.modified_at ? comment.created_at : comment.modified_at + ' (수정됨)' }}</code>
                  <div>{{ comment.content }}</div>
                </div>
                <div v-else>
                  <span class="invisible fw-bold me-3">deleted</span>
                  <code class="invisible">deleted</code>
                  <div>[삭제된 댓글입니다.]</div>
                </div>
              </div>
              <div v-if="!comment.is_deleted" class="col-1">
                <button class="menu-item" data-bs-toggle="dropdown">
                  <i class="ri-more-2-fill"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end text-center" style="min-width: 1px">
                  <li class="dropdown-item" @click="modifyId = comment.id; newComment = comment.content">수정</li>
                  <li class="dropdown-item" @click="deleteComment(comment.id)">삭제</li>
                  <li v-if="comment.parent === null" class="dropdown-item" @click="subCommId = comment.id; subComment = ''">답글</li>
                </ul>
              </div>
            </div>
            <!-- modify comment form -->
            <form v-show="comment.id === modifyId">
              <textarea
                  class="form-control mb-3"
                  v-model="newComment"
                  style="resize:none; overflow: hidden"
                  @keydown="modifyResize"
                  @keyup="modifyResize"
                  ref="modifyTextarea"></textarea>
              <div class="text-end">
                <button class="btn btn-primary me-2" type="button" @click="modifyComment(comment.id)">수정</button>
                <button class="btn btn-secondary" type="button" @click="modifyId = -1; newComment = ''">취소</button>
              </div>
            </form>
            <!-- add sub-comment form -->
            <form v-show="comment.id === subCommId">
              <textarea
                  class="form-control mb-3"
                  v-model="subComment"
                  style="resize:none; overflow: hidden"
                  @keydown="subResize"
                  @keyup="subResize"
                  ref="subTextarea"></textarea>
              <div class="text-end">
                <button class="btn btn-primary me-2" type="button" @click="addSubComment(comment.id)">등록</button>
                <button class="btn btn-secondary" type="button" @click="subCommId = -1; subComment = ''">취소</button>
              </div>
            </form>
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

export default {
  setup() {
    const { axiosGet, axiosPost, axiosDelete, axiosPatch } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const postId = route.params.id
    const loading = ref(true)

    const postData = ref({
      title: '',
      content: '',
      author: '',
      like_count: '',
      is_like: '',
      view_count: '',
      created_at: '',
    })

    // comment variables
    const textarea = ref(null)
    const comment = ref('')
    const commentList = ref(null)
    const currCommPage = ref(1)
    const numOfCommPage = ref(1)

    // modify variables
    const modifyId = ref(-1)
    const newComment = ref('')  // modify comment string variable
    const modifyTextarea = ref(null)

    // sub-comment variables
    const subCommId = ref(-1)
    const subComment = ref('')
    const subTextarea = ref(null)

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
          axiosDelete(`/api/v1/boards/1/posts/${postId}/likes`
              , () => {
                location.reload()
              }, () => {
                alert('추천취소 실패ㅠ')
              })
        }
      } else {
        if(confirm('이 게시글을 추천하시겠습니까?')) {
          axiosPost(`/api/v1/boards/1/posts/${postId}/likes`
              , {}
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

    const modifyResize = () => {
      modifyTextarea.value.map((textarea) => {
        textarea.style.height = '1px'
        textarea.style.height = (12 + textarea.scrollHeight) + 'px'
      })
    }

    const subResize = () => {
      subTextarea.value.map((textarea) => {
        textarea.style.height = '1px'
        textarea.style.height = (12 + textarea.scrollHeight) + 'px'
      })
    }

    const getCommentList = (page = currCommPage.value) => {
      currCommPage.value = page
      axiosGet(`/api/v1/boards/1/posts/${postId}/comments?page=${page}&size=5`
          , (res) => {
            numOfCommPage.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
            if (res.data.length !== 0) {
              commentList.value = res.data
            } else {
              commentList.value = []
            }
          }, (err) => {
            commentList.value = []
            console.error(err)
          })
    }

    const addComment = () => {
      axiosPost(`/api/v1/boards/1/posts/${postId}/comments`, {
        content: comment.value,
        parent: null
      }, () => {
        router.go()
      }, (err) => {
        console.error(err)
      })
    }

    const addSubComment = (parentCommId) => {
      axiosPost(`/api/v1/boards/1/posts/${postId}/comments`, {
        content: subComment.value,
        parent: parentCommId
      }, () => {
        router.go()
      }, (err) => {
        console.error(err)
      })
    }

    const modifyComment = (commentId) => {
      axiosPatch(`/api/v1/boards/1/posts/${postId}/comments/${commentId}`, {
        content: newComment.value
      }, () => {
        router.go()
      }, (err) => {
        console.error(err)
      })
    }

    const deleteComment = (commentId) => {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        axiosDelete(`/api/v1/boards/1/posts/${postId}/comments/${commentId}`
            , () => {
              router.go()
            }, (err) => {
              alert('삭제할 수 없습니다.')
              console.error(err)
            })
      }
    }

    onMounted(() => {
      // get post data
      axiosGet(`/api/v1/boards/1/posts/${postId}`
          , (res) => {
            postData.value = res.data
            loading.value = false
          }, (err) => {
            loading.value = true
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
      subComment,
      newComment,
      currCommPage,
      numOfCommPage,
      commentList,
      textarea,
      modifyTextarea,
      subTextarea,
      modifyId,
      subCommId,
      moveToPostListPage,
      deletePost,
      thumbsUp,
      resize,
      modifyResize,
      subResize,
      getCommentList,
      addComment,
      addSubComment,
      modifyComment,
      deleteComment,
    }
  }
}
</script>

<style scoped>

</style>