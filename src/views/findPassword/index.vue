<template>
  <FindPassword v-if="stage === 1" @username="setData"/>
  <ChangeNewPassword v-else :username="username" />
</template>

<script>
import FindPassword from '@compo/password/FindPassword.vue'
import ChangeNewPassword from '@compo/password/ChangeNewPassword.vue'
import { ref } from 'vue'

export default {
  components: {
    FindPassword,
    ChangeNewPassword,
  },
  setup() {
    const stage = ref(1)
    const username = ref('')

    const setData = (data) => {
      username.value = data
      stage.value = 2
    }

    return {
      stage,
      username,
      setData,
    }
  }
}
</script>

<style scoped>

</style>