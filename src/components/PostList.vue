<template>
  <div class="container">
    <div class="card mt-4 shadow p-3 mb-5 bg-body">
      <div class="card-body">
        <h4 class="card-title mb-4">{{ boardName }}</h4>

        <div class="row">
          <div class="col-12 col-md-2 align-self-lg-end">
            <select v-model="selected" class="form-select">
              <option value="1">제목</option>
              <option value="2">내용</option>
              <option value="3">작성자</option>
            </select>
          </div>
          <div class="col-12 col-md-8">
            <input type="text" class="form-control"/>
          </div>
          <div class="col-12 col-md-2 align-self-center">
            <button class="btn btn-primary mx-auto w-100">검색</button>
          </div>
        </div>

        <div class="card shadow-sm mt-4">
          <div class="card-body">
            <table class="table table-hover" style="text-align: center">
              <thead>
              <tr>
                <th style="width: 100px">번호</th>
                <th style="width: 800px">제목</th>
                <th style="width: 100px">작성자</th>
                <th style="width: 300px">작성일</th>
                <th style="width: 100px">조회수</th>
                <th style="width: 100px">추천수</th>
              </tr>
              </thead>
              <tbody v-if="postList">
              <tr v-for="post in postList" :key="post.id">
                <th style="width: 100px" scope="row">{{ post.id }}</th>
                <td style="width: 800px"><a :href="`/boards/views/${post.id}`">{{ post.title }}</a></td>
                <td style="width: 100px">{{ post.author }}</td>
                <td style="width: 300px">{{ post.created_at }}</td>
                <td style="width: 100px">{{ post.view_count }}</td>
                <td style="width: 100px">{{ post.like_count }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="form-inline row mt-2">
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
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from "axios";

export default {
  props: {
    boardName: {
      type: String,
      required: true
    }
  },
  setup() {
    const selected = ref('1')
    const route = useRoute()
    const boardId = route.params.id

    // Pagination
    const currentPage = ref(1)  // 현재 페이지
    const numberOfPages = ref(1)
    const postList = ref(null)

    const getPostList = async (page = currentPage.value) => {
      currentPage.value = page
      try {
        const res = await axios.get(`http://be2.downbit.r-e.kr:8088/api/v1/boards/${boardId}/posts?page=${page}&size=5`)
        numberOfPages.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
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
      selected,
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