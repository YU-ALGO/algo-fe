<template>
  <div>
    <div class="container mt-md-2">
      <h2>{{ boardName }}</h2>
    </div>
    <PostList/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAxios from '@/modules/axios'
import PostList from '@compo/PostList.vue'

export default {
  components: {
    PostList,
  },

  setup() {
    const { axiosGet } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const boardId = route.params.id
    const boardName = ref('')

    onMounted(() => {  // get board name
      axiosGet(`/api/v1/boards/${boardId}`
      , (res) => {
        boardName.value = res.data
      }, (res) => {
        console.error(res)
      })
    })

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