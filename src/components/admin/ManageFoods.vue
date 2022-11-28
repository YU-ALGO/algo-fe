<template>
  <div class="row card mt-4 shadow p-3 mb-5 bg-body">
    <h2 class="mt-2">식품 관리</h2>
    <hr/>
      <div class="input-group mb-2">
        <input type="search" class="form-control" v-model="searchText" @keyup.enter="searchPost" placeholder="식품명 검색"/>
        <button class="btn btn-primary" @click="searchPost">
          <i class="bi bi-search"></i>
        </button>
      </div>
    <div>
      <table class="table" style="width: 800px">
        <thead>
        <tr>
          <th scope="col" style="width: 50px">#</th>
          <th scope="col" style="width: 50px">ID</th>
          <th scope="col" style="width: 700px">식품명</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="food in foodList" :key="food.id">
          <th scope="row">
            <input type="checkbox" name="checkbox_name" value="checkbox_value">
          </th>
          <td>{{ food.id }}</td>
          <td><a class="food-name" :href="`/foods/edit/${food.id}`">{{ food.food_name }}</a></td>
        </tr>
        </tbody>
      </table>
    </div>
      <div class="d-flex justify-content-center mt-4">
        <!-- Pagination -->
        <Pagination :currentPage="currentPage" :pageDisplayCount="pageDisplayCount" :totalPageCount="totalPageCount" @change="setPage" />
      </div>
    <router-link :to="{name: 'FoodWrite'}" class="btn btn-primary">식품 추가</router-link>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Pagination from '@compo/common/Pagination'
import axios from 'axios'

export default {
  components: {
    Pagination,
  },
  setup() {
    const currentPage = ref(1)
    const pageDisplayCount = ref(10)
    const totalPageCount = ref()
    const searchText = ref('')
    const foodList = ref('')  // getFoodList()로 가져온 식품 데이터

    const setPage = (page) => {
      currentPage.value = page
      getFoodList(page)
    }

    const searchPost = () => {
      getFoodList(1)
    }

    const getFoodList = (page = currentPage.value) => {
      axios.get(`http://be.algo.r-e.kr:8088/api/v1/foods?page=${page}&size=10&keyword=${searchText.value}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
      }).then((res) => {
        totalPageCount.value = parseInt(res.headers['x-page-count']) === 0 ? 1 : parseInt(res.headers['x-page-count'])
        if (res.data.length !== 0) {
          foodList.value = res.data
        } else {
          foodList.value = null
        }
      }).catch((err) => {
        console.error(err)
      })
    }

    onMounted(() => {
      getFoodList(1)
    })

    return {
      currentPage,
      pageDisplayCount,
      totalPageCount,
      getFoodList,
      setPage,
      foodList,
      searchText,
      searchPost,
    }
  }
}
</script>

<style scoped>
.food-name {
  text-decoration: none;
  color:black;
}
.food-name:hover {
  text-decoration: underline;
  color: blue;
}
</style>