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
import { ref } from 'vue'
import Profile from '@compo/user/Profile.vue'
import NotFound from '@compo/common/NotFound'
import Loading from '@compo/common/Loading'

export default {
  components: {
    Profile,
    NotFound,
    Loading,
  },

  setup() {
    const loading = ref(1)

    return {
      loading,
    }
  }
}
</script>

<style scoped>

</style>