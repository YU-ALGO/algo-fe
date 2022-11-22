<template>
  <!-- load fail -->
  <div v-if="loading === -1">
    <NotFound/>
  </div>
  <!-- loading -->
  <div v-else-if="loading === 0">
    <Loading/>
  </div>
  <!-- load success -->
  <div v-else>
    <PostList :boardName="boardName"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useAxios from '@/modules/axios'
import PostList from '@compo/PostList.vue'
import NotFound from '@compo/NotFound'
import Loading from '@compo/Loading'

export default {
  components: {
    PostList,
    NotFound,
    Loading,
  },

  setup() {
    const { axiosGet } = useAxios()
    const route = useRoute()
    const boardId = route.params.bid
    const boardName = ref('')
    const loading = ref(0)

    onMounted(() => {  // get board name
      axiosGet(`/api/v1/boards/${boardId}`
      , (res) => {
        boardName.value = res.data.toString()
            loading.value = 1
      }, (res) => {
        console.error(res)
            loading.value = -1
      })
    })


    return {
      boardId,
      boardName,
      loading,
    }
  }
}
</script>

<style scoped>

</style>