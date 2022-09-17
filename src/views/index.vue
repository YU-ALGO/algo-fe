<template>
  <div>
    <h1>Main Page</h1>
  </div>
<!--  <transition name="fade">-->
<!--    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>-->
<!--  </transition>-->
</template>

<script>
import { useToast } from '@/composables/toast'
import Toast from '@compo/Toast.vue'

export default {
  components: {
    Toast,
  },

  setup() {
    const { toastMessage, toastAlertType, showToast, triggerToast } = useToast();

    triggerToast('안녕하세요', 'success')

    return {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    }
  }
}
</script>

<style scoped>

</style>