<template>
  <div>
    <h2 class="mt-2">Admin Page</h2>
    <hr/>
    <div>
      <h2>게시판 생성</h2>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label class="col-form-label">게시판 이름</label>
        </div>
        <div class="col-auto">
          <input v-model="createBoardName" class="form-control" @keyup.enter="createBoards">
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click="createBoards">만들기</button><br/>
        </div>
      </div>
    </div>
    <br/>
    <div>
      <h2>게시판 이름 변경</h2>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label class="col-form-label">변경할 게시판</label>
        </div>
        <div class="col-auto">
          <select v-model="selectedModify" class="form-select">
            <option value="0">게시판목록</option>
            <option v-for="board2 in boardModifyNameList" :key="board2.id" :value="board2.id">{{ board2.name }}</option>
          </select>
        </div>
        <div class="col-auto">
          <input class="form-control" v-model="modifyBoardName" @keyup.enter="modifyBoards">
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click="modifyBoards">변경하기</button><br/>
        </div>
      </div>
    </div>
    <br/>
    <div>
      <h2>게시판 삭제</h2>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <select v-model="selected" class="form-select">
            <option value="0">게시판목록</option>
            <option v-for="board in boardDeleteNameList" :key="board.id" :value="board.id">{{ board.name }}</option>
          </select>
        </div>
        <div class="col-auto">
          <button class="btn btn-danger" @click="deleteBoards">삭제하기</button><br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAxios from '@/modules/axios'

export default {
  setup() {
    const createBoardName = ref('')
    const modifyBoardName = ref('')
    const selected = ref(0)
    const selectedModify = ref(0)
    const boardDeleteNameList = ref('')
    const boardModifyNameList = ref('')
    const router = useRouter()
    const { axiosGet, axiosPost, axiosPatch, axiosDelete } = useAxios()

    const getBoardName = () => {
      axiosGet('/api/v1/boards'
      , (res) => {
        boardDeleteNameList.value = { ...res.data }  // 객체이므로 reactive 권장
        boardModifyNameList.value = { ...res.data }
      }, (res) => {
        console.error(res)
      })
    }

    getBoardName()

    const createBoards = () => {
      axiosPost('/api/v1/boards', {
        name: createBoardName.value
      }, () => {
        alert('게시판이 생성되었습니다.')
        router.go(0)
      }, (res) => {
        console.error(res)
      })
    }

    const modifyBoards = () => {
      if (selectedModify.value !== 0) {
        if (confirm("정말 게시판 이름을 변경하시겠습니까?")) {
          axiosPatch(`/api/v1/boards/${selectedModify.value}`
          , {
            name: modifyBoardName.value
          }, () => {
            alert("게시판 이름이 수정되었습니다.")
            router.go(0)
          }, (res) => {
            console.error(res)
          })
        }
      }
    }

    const deleteBoards = () => {
      if (selected.value !== 0) {
        if (confirm("정말 게시판을 삭제하시겠습니까?")) {
          axiosDelete(`/api/v1/boards/${selected.value}`
          , (res) => {
            alert('게시판이 삭제되었습니다.')
            router.go(0)
            console.log(res.data)
          }, (res) => {
            console.error(res)
          })
        }
      }
    }

    return {
      createBoards,
      modifyBoards,
      deleteBoards,
      boardDeleteNameList,
      boardModifyNameList,
      selected,
      selectedModify,
      createBoardName,
      modifyBoardName,
    }
  },
}
</script>

<style scoped>

</style>