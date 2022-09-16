<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">이미지 추가</h3>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input class="form-control" type="file" accept=".jpg, .jpeg, .gif, .png" @change="fileChange" ref="file"/>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="btn btn-outline-secondary">
            닫기
          </button>
          <button class="btn btn-success" @click="insertImage" :disabled="!validImage">
            추가
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'

export default {
  setup(props, context) {
    const imageSrc = ref('')
    const show = ref(false)
    const file = ref(null)
    const fileName = ref('')
    const formData = new FormData()

    const validImage = computed(() => {
      return fileName.value.match(/\.(jpe?g|gif|png)$/) !== null
    })

    const showModal = () => {
      show.value = true
    }

    const closeModal = () => {
      imageSrc.value = ''
      show.value = false
      file.value = null
    }

    const fileChange = () => {
      formData.append('image', file.value.files[0])
      console.log(file.value.files)
      fileName.value = file.value.files[0].name
    }

    const insertImage = () => {
      const uploadUrl = 'https://httpbin.org/post'

      axios.post(uploadUrl, formData).then((data) => {
        imageSrc.value = 'https://source.unsplash.com/random/500x300'
        context.emit('onConfirm', {
          src: imageSrc.value,
          // alt: 'YOU CAN ADD ALT',
          // title: 'YOU CAN ADD TITLE'
        })
        closeModal()
      })
    }

    return {
      imageSrc,
      show,
      file,
      validImage,
      showModal,
      fileChange,
      closeModal,
      insertImage,
    }
  },
}
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>