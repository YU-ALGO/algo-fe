<template>
  <div>
    <div class="d-flex justify-content-between mb-2 mt-2">
      <h2>{{ boardName }}</h2>
      <button class="btn btn-primary" @click="moveToWritePage">글쓰기</button>
    </div>
    <PostList/>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

export default {
  components: {
    PostList,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const boardId = route.params.id
    const boardName = ref('')

    const getBoardName = async () => {
      try {
        const res = await axios.get(`http://munis.ddns.net:8088/api/v1/boards/${boardId}`)
        boardName.value = res.data
      } catch (error) {
        console.log(error)
      }
    }

    getBoardName()

    const moveToWritePage = () => {
      router.push({
        name: 'PostWrite'
      })
    }

    return {
      boardId,
      boardName,
      moveToWritePage,
    }
  }
}
</script>

<style scoped>

</style>