<template>
  <h1>Profile Component</h1>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useCookies } from 'vue3-cookies'
import useAxios from '@/modules/axios.js'
import router from '@/router'



export default {
  setup() {
    const { axiosPost } = useAxios()
    const { cookies } = useCookies()
    const store = useStore()

    const needLogin = computed(() => {
      return store.getters['needLogin']
    })

    onBeforeMount(() => {
      if(needLogin.value) {
        alert('로그인이 필요합니다!')
        router.push('/')
      } else {
        axiosPost('/api/v2/token/validate', {
          accessToken: cookies.get('accessToken'),
        }, (res) => {
          console.log(res)
        }, (err) => {
          console.log(err)
        })
        // axios.post('http://anycar8515.iptime.org:8088/api/v2/token/validate',
        //     {
        //       accessToken: cookies.get('accessToken'),
        //     },
        //     {
        //       headers : {
        //         authorization: 'Bearer ' + cookies.get('accessToken'),
        //       }
        //     }
        // ).then(function (res) {
        //   console.log(res)
        // }).catch(function (err) {
        //   console.log(err);
        // })
      }
    })
  },
}
</script>

<style scoped>

</style>