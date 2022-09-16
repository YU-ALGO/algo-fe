<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>공감수</th>
            </tr>
          </thead>
          <tbody v-if="postList">
            <tr v-for="post in postList" :key="post.id">
              <th scope="row">{{ post.id }}</th>
              <td><a :href="`/boards/views/${post.id}`">{{ post.title }}</a></td>
              <td>{{ post.author }}</td>
              <td>{{ post.created_at }}</td>
              <td>0</td>
              <td>{{ post.like_count }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            등록된 게시글이 없습니다.
          </tbody>
        </table>
      </div>
    </div>
    <div class="form-inline row">
      <div class="text-lg-end mt-2">
        <router-link :to="{name: 'PostWrite'}" class="btn btn-primary">글쓰기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const route = useRoute()
    const boardId = route.params.id

    const postList = ref(null)
    const getPostList = async () => {
      try {
        const res = await axios.get(`http://be.downbit.r-e.kr:8088/api/v1/boards/${boardId}/posts`)
        if (res.data.length !== 0) {
          postList.value = res.data
        } else {
          postList.value = null
        }
      } catch (error) {
        console.log(error)
      }
    }

    getPostList()
    return {
      postList,
      boardId
    }
  }
}
</script>

<style scoped>

</style>