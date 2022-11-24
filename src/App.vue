<template>
  <NavBar/>
  <div class="container">
    <router-view :key="route.fullPath"/>
  </div>
  <Footer/>
</template>

<script setup>
import { useRoute } from 'vue-router'
import NavBar from '@compo/common/NavBar.vue'
import Footer from '@compo/main/Footer.vue'

const route = useRoute()
</script>

<style scoped>
</style>