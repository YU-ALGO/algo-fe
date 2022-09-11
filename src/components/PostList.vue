<template>
  <div>
    <table class="table table-light mt-md-4">
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
      <tbody>
      <tr v-for="post in postList" :key="post.id">
        <th scope="row">{{ post.id }}</th>
        <td><a :href="`/boards/views/${post.id}`">{{ post.title }}</a></td>
        <td>{{ post.author }}</td>
        <td>{{ post.created_at }}</td>
        <td>0</td>
        <td>{{ post.like_count }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Pagination -->
<!--    <nav aria-label="Page navigation example">-->
<!--      <ul class="pagination">-->
<!--        <li v-if="currentPage !== 1" class="page-item">-->
<!--          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">이전</a>-->
<!--        </li>-->
<!--        <li v-for="page in numberOfPages" :key="page" class="page-item" :class="currentPage === page ? 'active' : ''">-->
<!--          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{ page }}</a>-->
<!--        </li>-->
<!--        <li v-if="currentPage !== numberOfPages" class="page-item">-->
<!--          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">다음</a>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </nav>-->

<!--    <nav class="blog-pagination text-center" aria-label="Pagination">-->
<!--      <a class="btn rounded-pill" :class="[page === 1 ? 'btn-outline-secondary disabled' : 'btn-outline-primary',]" @click="page&#45;&#45;" href="#">Prev</a>-->
<!--      {{ page }}-->
<!--      <a class="btn rounded-pill" :class="[page === total_pages ? 'btn-outline-secondary disabled' : 'btn-outline-primary',]" @click="page++" href="#">Next</a>-->
<!--    </nav>-->
    <br/>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const route = useRoute()
    const boardId = route.params.id

    const postList = ref(null)
    const getPostList = async () => {
      try {
        const res = await axios.get(`http://munis.ddns.net:8088/api/v1/boards/${boardId}/posts`)
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