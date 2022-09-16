<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <Table class="table table-light">
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
          <tbody v-if="!postList">
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
        </Table>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-2 mt-2">
      <div></div>
      <router-link :to="{name: 'PostWrite'}" class="btn btn-primary">글쓰기</router-link>
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
        postList.value = res.data
      } catch (error) {
        console.log(error)
      }
    }

    getPostList()
    return {
      postList,
    }
  }
}
</script>

<style scoped>

</style>