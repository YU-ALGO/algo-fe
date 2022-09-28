<template>
  <NavBar/>
  <div class="container">
    <router-view :key="route.fullPath"/>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import NavBar from '@compo/NavBar.vue'

const route = useRoute()
</script>

<style scoped>
</style>