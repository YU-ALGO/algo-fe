<template>
  <div>
    <div class="container mt-md-2">
      <h2>{{ boardName }}</h2>
    </div>
    <PostList/>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PostList from '@compo/PostList.vue'

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
        const res = await axios.get(`http://be2.downbit.r-e.kr:8088/api/v1/boards/${boardId}`)
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