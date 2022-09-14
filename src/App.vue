<template>
  <NavBar/>
  <div class="container">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import NavBar from '@compo/NavBar'

export default {
  components: {
    NavBar,
  },
}
</script>

<style scoped>

</style>