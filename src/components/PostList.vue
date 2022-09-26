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
    <div class="d-flex justify-content-center">
      <!-- Pagination -->
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="currentPage !== 1" class="page-item">
            <a style="cursor: pointer" class="page-link" @click="getPostList(currentPage - 1)">이전</a>
          </li>
          <li v-for="page in numberOfPages" :key="page" class="page-item" :class="currentPage === page ? 'active' : ''">
            <a style="cursor: pointer" class="page-link" @click="getPostList(page)">{{ page }}</a>
          </li>
          <li v-if="currentPage !== numberOfPages" class="page-item">
            <a style="cursor: pointer" class="page-link" @click="getPostList(currentPage + 1)">다음</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useAxios from '@/modules/axios'

export default {
  setup() {
    const route = useRoute()
    const boardId = route.params.id
    const { axiosGet } = useAxios()

    // Pagination
    const currentPage = ref(1)  // 현재 페이지
    const numberOfPages = ref(1)

    const postList = ref(null)

    const getPostList = (page = currentPage.value) => {
      currentPage.value = page
      axiosGet(`/api/v1/boards/${boardId}/posts?page=${page}&size=5`
      , (res) => {
        numberOfPages.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          postList.value = res.data
        } else {
          postList.value = null
        }
      }, (res) => {
        console.error(res)
      })
    }

    onMounted(() => {
      getPostList()
    })
    
    return {
      postList,
      boardId,
      currentPage,
      numberOfPages,
      getPostList,
    }
  }
}
</script>

<style scoped>

</style>