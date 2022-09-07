<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h1>이미지 업로드</h1>
      <header class="tab-header">
        <button @click="tab = 0" :class="{ active: tab === 0 }">Link</button>
        <button @click="tab = 1" :class="{ active: tab === 1 }">Upload (Drag&amp;Drop)</button>
        <button @click="tab = 2" :class="{ active: tab === 2 }">Upload (Simple)</button>
      </header>

      <div v-if="tab == 0">
        <p>Here is a test image URL</p>
        <pre>https://i.imgur.com/0ogkTp7.jpg</pre>
        <label for="url">Image URL:</label>
        <input v-model="imageSrc" id="url" />
      </div>
      <div v-if="tab == 1">
        <vue3Dropzone
            ref="myVueDropzone"
            id="dropzone"
            @vdropzone-success="vFileUploaded"
            :options="dropzoneOptions"
        >
        </vue3Dropzone>
      </div>
      <div v-if="tab == 2">
        <label for="up">Really simple input upload:</label>
        <input type="file" @change="fileChange" id="up" ref="file"/>
      </div>

      <footer class="modal-footer">
        <button
            @click="insertImage"
            class="success"
            :title="validImage ? '' : 'Image URL needs to be valid'"
            :disabled="!validImage"
        >
          업로드
        </button>
        <button @click="show = false" class="danger">닫기</button>
      </footer>
    </div>
  </div>
</template>

<script>
import vue3Dropzone from 'vue3-dropzone'
//import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from 'axios'
import { ref, reactive, computed } from 'vue'

export default {
  components: {
    vue3Dropzone,
  },

  setup(props, context) {
    const imageSrc = ref('')
    const show = ref(false)
    const tab = ref(2)
    const file = ref(null)
    const dropzoneOptions = reactive({
      url: 'https://httpbin.org/post',
      thumbnailWidth: 200,
      dictDefaultMessage: 'UPLOAD A FILE'
    })

    const validImage = computed(() => {
      return (
          imageSrc.value.match(/unsplash/) !== null ||
          imageSrc.value.match(/\.(jpeg|jpg|gif|png)$/) != null
      )
    })

    const showModal = () => {
      show.value = true
    }

    const vFileUploaded = (file) => {
      alert('Your image has been uploaded to the server')
      alert('NOTE THIS IS A DUMMY DEMO, THERE IS NO BACKEND')

      /** Here is where you get your URL/Base64 string or what ever.*/

      imageSrc.value = 'https://source.unsplash.com/random/500x300'
    }

    const fileChange = () => {
      const uploadUrl = 'https://httpbin.org/post'
      const formData = new FormData()

      formData.append('image', file.value.files[0])

      console.log('Uploading...')
      for (let [key, val] of formData) {
        console.log(key, val)
      }

      axios.post(uploadUrl).then((data) => {
        // Take the URL/Base64 from `data` returned from server
        alert('서버에 이미지가 업로드 되었습니다.')

        imageSrc.value = 'https://source.unsplash.com/random/500x300'
      })
    }

    const closeModal = () => {
      show.value = false
      imageSrc.value = ''
      tab.value = 1
    }

    const insertImage = () => {
      const data = {
        src: imageSrc.value,
        // alt: 'YOU CAN ADD ALT',
        // title: 'YOU CAN ADD TITLE'
      }
      context.emit('onConfirm', data)
      closeModal()
    }

    return {
      imageSrc,
      show,
      tab,
      file,
      dropzoneOptions,
      validImage,
      showModal,
      vFileUploaded,
      fileChange,
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
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 90%;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
}

.modal-footer {
  margin-top: 10px;
}

label {
  display: block;
  margin: 0.25em 0;
}

button {
  font-family: inherit;
  font-size: 100%;
  padding: 0.5em 1em;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  border: 1px solid #999;
  border: transparent;
  background-color: #e6e6e6;
  text-decoration: none;
  border-radius: 2px;
  cursor: pointer;
}

button.danger {
  background: rgb(202, 60, 60);
}

button.success {
  background: rgb(28, 184, 65);
}

button:disabled {
  opacity: 0.3;
}

button + button {
  margin-left: 10px;
}

.tab-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #222;
}

.tab-header button {
  color: #222;
  background: none;
  border: 0;
  flex: 1;
  padding: 5px 10px;
  cursor: pointer;
}

.tab-header button.active {
  background-color: #222;
  color: #fff;
}
</style>