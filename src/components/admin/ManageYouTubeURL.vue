<template>
  <div class="row card mt-4 shadow p-3 mb-5 bg-body">
    <h2 class="mt-2">Youtube URL 관리</h2>
    <hr/>
    <div>
      <div class="row g-3 align-items-center">
      </div>
      <table class="table" style="width: 800px">
        <thead>
        <tr>
          <th scope="col" style="width: 50px">ID</th>
          <th scope="col" style="width: 550px">URL</th>
          <th style="width: 70px"/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="url in urlList" :key="url.id">
          <th scope="row" style="vertical-align: middle;">{{ url.id }}</th>
          <td v-if="!url.editMode" style="vertical-align: middle;">{{ url.URL }}</td>
          <td v-else>
            <div class="row">
              <div class="col">
                <input v-if="url.id === 0" v-model="firstURL" type="text" class="form-control">
                <input v-else-if="url.id === 1" v-model="secondURL" type="text" class="form-control">
                <input v-else v-model="thirdURL" type="text" class="form-control">
              </div>
              <div class="col">
                <button class="btn btn-primary" @click="applyURL">적용</button>
                <button class="btn btn-danger m-2" @click="editModeChange(url.id)">취소</button>
              </div>
            </div>
          </td>
          <td v-if="!url.editMode"><button class="btn btn-primary" @click="editModeChange(url.id)">수정</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex' // vuex 스토어 사용

export default {
  setup() {
    const store = useStore() //vuex 스토어 사용
    const firstURL = ref('fo2vhh8cbfI')
    const secondURL = ref('b_MDW7gwnqg')
    const thirdURL = ref('h87bmuEvVlI')

    const urlList = ref([
      {id: 0, URL: 'https://www.youtube.com/embed/'+firstURL.value, editMode: false},
      {id: 1, URL: 'https://www.youtube.com/embed/'+secondURL.value, editMode: false},
      {id: 2, URL: 'https://www.youtube.com/embed/'+thirdURL.value, editMode: false}
    ])

    const editMode = ref(false)

    const editModeChange = (id) => {
      urlList.value[id].editMode = !urlList.value[id].editMode
    }

    const applyURL = async () => {
      store.dispatch('setYoutubeURL', {
        firstURL: firstURL.value,
        secondURL: secondURL.value,
        thirdURL: thirdURL.value,
      }).catch((err) => {
        console.error(err)
      })
    }

    return {
      urlList,
      firstURL,
      secondURL,
      thirdURL,
      editModeChange,
      editMode,
      applyURL
    }
  }
}
</script>

<style scoped>

</style>