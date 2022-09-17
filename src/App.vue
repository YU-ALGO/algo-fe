<template>
  <NavBar/>
  <div class="container">
    <router-view :key="route.fullPath"/>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute()
    return {
      route,
    }
  },
}
</script>

<style scoped>
</style>