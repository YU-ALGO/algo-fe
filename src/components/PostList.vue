<template>
  <div class="container">
    <div class="card mt-4 shadow p-3 mb-5 bg-body">
      <div class="card-body">
        <h4 class="card-title mb-4">{{ boardName }}</h4>
        <div class="row">
          <div class="col-2">
            <select v-model="selectedSort" class="form-select">
              <option value="createdAt,DESC">작성일</option>
              <option value="viewCount,DESC">조회수</option>
              <option value="likeCount,DESC">추천수</option>
            </select>
          </div>
          <div class="col-2 ms-auto">
            <select v-model="selectedSearch" class="form-select">
              <option value="TITLE">제목</option>
              <option value="AUTHOR">작성자</option>
              <option value="TITAUTH">제목 + 작성자</option>
            </select>
          </div>
          <div class="col-4">
            <div class="input-group">
              <input type="search" class="form-control" v-model="searchText" @keyup.enter="searchPost" placeholder="Search"/>
              <button class="btn btn-primary" @click="searchPost">
                <i class="ri-search-line"></i>
              </button>
            </div>
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
                <td style="width: 800px">
                  <a class="text-body text-decoration-none fw-bold" :href="`/boards/views/${post.id}`">{{ post.title }}</a>
                  <label v-show="post.comment_count !== 0" class="text-danger">&nbsp;[{{post.comment_count}}]</label>
                </td>
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
          <nav aria-label="Page navigation">
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
// import useAxios from '@/modules/axios'
import axios from 'axios'

export default {
  props: {
    boardName: {
      type: String,
      required: true
    }
  },
  setup() {
    // const { axiosGet } = useAxios()
    const route = useRoute()
    const boardId = route.params.id

    // Pagination
    const currentPage = ref(1)  // 현재 페이지
    const numberOfPages = ref(1)
    const postList = ref('')

    // Search
    const selectedSearch = ref('TITLE')
    const searchText = ref('')  // 검색
    const selectedSort = ref('createdAt,DESC') // 정렬

    const getPostList = async (page = currentPage.value) => {
      currentPage.value = page
      // axios
      // ](`/api/v1/boards/${boardId}/posts?page=${page}&size=5`
      // , (res) => {
      //   numberOfPages.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
      //   if (res.data.length !== 0) {
      //     postList.value = res.data
      //   } else {
      //     postList.value = null
      //   }
      // }, (err) => {
      //   console.error(err)
      // })
      try {
        const res = await axios.get(`http://be2.algo.r-e.kr:8088/api/v1/boards/${boardId}/posts?page=${page}&size=5&sort=${selectedSort.value}&keyword=${searchText.value}&searchType=${selectedSearch.value}`)
        // const res = await axios.get(`http://be2.algo.r-e.kr:8088/api/v1/boards/1/posts?page=1&size=5`)
        numberOfPages.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          postList.value = res.data
          // console.log(postList)
        } else {
          postList.value = null
        }
      } catch (error) {
        console.log(error)
      }
    }

    const searchPost = () => {
      getPostList(1)
    }

    onMounted(() => {
      getPostList()
    })

    watch(selectedSort, () => {
      getPostList(1)
    })
    
    return {
      selectedSearch,
      selectedSort,
      postList,
      boardId,
      currentPage,
      numberOfPages,
      getPostList,
      searchPost,
      searchText,
    }
  }
}
</script>

<style scoped>

</style>