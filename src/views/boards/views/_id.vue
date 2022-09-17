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
import axios from 'axios'

export default {
  setup() {
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

    const post = ref(null)
    const getPost = async () => {
      loading.value = true
      try {
        const res = await axios.get(`http://be2.downbit.r-e.kr:8088/api/v1/boards/1/posts/${postId}`)
        postData.value = res.data
        loading.value = false
      } catch (error) {
        loading.value = false
        console.log(error)
      }
    }

    const deletePost = async () => {
      if(confirm("정말 게시글을 삭제하시겠습니까?")) {
        try {
          await axios.delete(`http://be2.downbit.r-e.kr:8088/api/v1/boards/1/posts/${postId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            withCredentials: true
          })
          alert("게시글이 삭제되었습니다.")
          router.go(-1)
        } catch (err) {
          alert('게시글을 삭제할 수 없습니다.')
        }
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