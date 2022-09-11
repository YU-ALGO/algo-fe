<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else>
    <div class="mt-3">
      작성자 : {{ postData.author }}
      <br/>
      작성일 : {{ postData.created_at }}
    </div>
    <hr/>
    <div class="form-group">
      <label>제목</label>
      <input v-model="postData.title" type="text" class="form-control">
    </div>
    <div class="col-12">  <!-- Todo 수정 상태일때만 표시 -->
      <div class="form-group">
        <label>내용</label>
        <textarea v-model="postData.content" class="form-control" cols="30" rows="10"> </textarea>
      </div>
    </div>
  </div>
  <button class="btn btn-primary" disabled="disabled">등록</button>
  <button class="btn btn-outline-dark m-lg-2" @click="moveToPostListPage">취소</button>
</template>

<script>
import axios from "axios";
import { ref } from 'vue'
import { useRoute, useRouter } from "vue-router";

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
        const res = await axios.get(`http://munis.ddns.net:8088/api/v1/boards/1/posts/${postId}`)
        postData.value = res.data
        loading.value = false
      } catch (error) {
        loading.value = false
        console.log(error)
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
    }
  }
}
</script>

<style scoped>

</style>