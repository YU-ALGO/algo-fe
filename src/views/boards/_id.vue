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
import useAxios from '@/modules/axios'
import PostList from '@compo/PostList.vue'

export default {
  components: {
    PostList,
  },

  setup() {
    const { axiosGet } = useAxios()
    const router = useRouter()
    const route = useRoute()
    const boardId = route.params.id
    const boardName = ref('')

    const getBoardName = async () => {
      await axiosGet(`/api/v1/boards/${boardId}`
      , (res) => {
        boardName.value = res
      }, (err) => {
        console.log(err)
      })
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