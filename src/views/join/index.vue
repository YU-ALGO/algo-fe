<template>
  <div>
    <NewUserEmail v-if="step === 1" @username="emailData"/>
    <NewUserPassword v-else-if="step === 2" :username="username" @password="passData"/>
    <NewUserProfile v-else :username="username" :password="password"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import NewUserEmail from '@compo/join/NewUserEmail.vue'
import NewUserPassword from '@compo/join/NewUserPassword.vue'
import NewUserProfile from '@compo/join/NewUserProfile.vue'
export default {
  components: {
    NewUserEmail,
    NewUserPassword,
    NewUserProfile,
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const step = ref(1)

    const emailData = (data) => {
      username.value = data
      step.value = 2
    }

    const passData = (data) => {
      password.value = data
      step.value = 3
    }

    return {
      username,
      password,
      step,
      emailData,
      passData,
    }
  }
}
</script>

<style scoped>

</style>