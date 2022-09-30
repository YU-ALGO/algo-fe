<template>
  <div v-if="loading">
    <NotFound/>
  </div>
  <div v-else>
    <PostList :boardName="boardName"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAxios from '@/modules/axios'
import PostList from '@compo/PostList.vue'
import NotFound from '@compo/NotFound'

export default {
  components: {
    PostList,
    NotFound,
  },

  setup() {
    const { axiosGet } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const boardId = route.params.id
    const boardName = ref('')
    const loading = ref(false)

    onMounted(() => {  // get board name
      loading.value = true
      axiosGet(`/api/v1/boards/${boardId}`
      , (res) => {
        boardName.value = res.data
            loading.value = false
      }, (res) => {
        console.error(res)
            loading.value = false
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
      loading,
    }
  }
}
</script>

<style scoped>

</style>