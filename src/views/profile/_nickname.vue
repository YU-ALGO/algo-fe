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
    <Profile/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAxios from '@/modules/axios'
import Profile from '@compo/Profile.vue'
import NotFound from '@compo/NotFound'
import Loading from '@compo/Loading'

export default {
  components: {
    Profile,
    NotFound,
    Loading,
  },

  setup() {
    const { axiosGet } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const nickname = route.params.nickname
    const loading = ref(1)

    onMounted(() => {
      // axiosGet(`/api/v1/profiles/${nickname}`
      // , (res) => {
      //   console.log(res)
      //   loading.value = 1
      // }, (res) => {
      //   console.error(res)
      //       loading.value = -1
      // })
    })

    return {
      loading,
    }
  }
}
</script>

<style scoped>

</style>