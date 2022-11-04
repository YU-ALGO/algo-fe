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
          <button class="btn btn-success" @click="uploadImage" :disabled="!validImage">
            추가
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import useAxios from '@/modules/axios'
import axios from 'axios' // 임시로 사용

export default {
  setup(props, context) {
    const { axiosPost } = useAxios()
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
      // console.log(file.value.files)
      fileName.value = file.value.files[0].name
    }

    const uploadImage = () => { // 서버에 이미지 업로드
      axios.post('http://be2.algo.r-e.kr:8088/api/v1/boards/1/posts/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        insertImage(res.data)
      }).catch((error) => {
        console.error(error)
      })
    }

    const insertImage = (imageUrl) => { // 이미지 글쓰기 본문에 삽입
      axios.get(`http://be2.algo.r-e.kr:8088/api/v1/boards/1/posts/images/${imageUrl}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((response) => {
            console.log(response)
            imageSrc.value = response.data
            context.emit('onConfirm', {
              src: imageSrc.value
            })
            closeModal()
          }).catch((err) => {
        console.error(err)
      })
    }

    return {
      imageSrc,
      show,
      file,
      validImage,
      showModal,
      closeModal,
      fileChange,
      uploadImage,
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