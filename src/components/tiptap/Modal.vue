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
          <button class="btn btn-success" @click="requestAuth" :disabled="!validImage">
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
import { axios } from '@bundled-es-modules/axios'

export default {
  setup(props, context) {
    const { axiosPost, axiosPut } = useAxios()
    const imageSrc = ref('')
    const show = ref(false)
    const file = ref(null)
    const fileName = ref('')
    // const formData = new FormData()

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
      // formData.append('image', file.value.files[0])
      console.log(file.value.files)
      fileName.value = file.value.files[0].name
    }

    const filePath = ref('')

    const requestAuth = () => { // 이미지 업로드 권한 취득
      axiosPost('http://be2.algo.r-e.kr:8088/api/v1/posts/images', {
        file_name: fileName.value,
        image_request_type: "POST",
      }, (response) => {
        filePath.value = response.data.substring(response.data.indexOf('post_image')+11,response.data.indexOf('?'))
        uploadImage(response.data)
      }, (err) => {
        console.error(err)
      })
    }

    const uploadImage = (awsURL) => { // 백엔드 서버에 URL 요청
      axios.put(awsURL, file.value.files[0], {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      }).then((res) => {
        insertImage(filePath.value)
        // console.log(res)
      }).catch((err) => {
        console.error(err)
      })
    }

    const insertImage = (imageUrl) => { // 이미지 글쓰기 본문에 삽입
      axiosPost('http://be2.algo.r-e.kr:8088/api/v1/posts/images', {
        file_name: imageUrl,
        image_request_type: "GET",
      }, (response) => {
        imageSrc.value = response.data
        context.emit('onConfirm', {
          src: imageSrc.value
        })
        closeModal()
      }, (err) => {
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
      requestAuth,
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