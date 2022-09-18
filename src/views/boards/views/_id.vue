<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else>
    <div class="mt-3">
      작성자: {{ postData.author }}
      <br/>
      작성일: {{ postData.created_at }}
    </div>
    <hr/>
    <div class="form-group">
      <label>제목</label>
      <p class="form-control">{{ postData.title }}</p>
    </div>
    <div class="col-12"> <!-- 필요성? -->
      <div class="form-group">
        <label>내용</label>
        <p v-html="postData.content" class="form-control"></p>
      </div>
    </div>
  </div>
  <button class="btn btn-primary me-2" disabled="disabled">수정</button>
  <button class="btn btn-danger me-2" @click="deletePost">삭제</button>
  <button class="btn btn-outline-dark me-2" @click="moveToPostListPage">취소</button>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAxios from '@/modules/axios'

export default {
  setup() {
    const { axiosGet, axiosDelete } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const postId = route.params.id
    const loading = ref(false)
    const postData = ref({
      title: '',
      content: '',
      author: '',
      created_at: '',
      like_count: '',
    })

    const post = ref(null) // 무엇에 쓰는 변수인고?
    const getPost = () => {
      loading.value = true
      axiosGet(`/api/v1/boards/1/posts/${postId}`
      , (res) => {
        postData.value = res.data
        loading.value = false
      }, (res) => {
        loading.value = false
        console.error(res)
      })
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

    const moveToPostListPage = () => {
      router.go(-1)
    }

    getPost()

    return {
      post,
      postData,
      loading,
      moveToPostListPage,
      deletePost,
    }
  }
}
</script>

<style scoped>

</style>