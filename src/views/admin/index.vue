<template>
  <div>
    <h2>Admin Page</h2>
    <hr/>
    <div>
      <h2>게시판 생성</h2>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label class="col-form-label">게시판 이름</label>
        </div>
        <div class="col-auto">
          <input v-model="inputBoardName" class="form-control">
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click="createBoards">만들기</button><br/>
        </div>
      </div>
    </div>
    <br/>
    <div>
      <h2>게시판 이름 변경 (구현중)</h2>
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label class="col-form-label">게시판 이름</label>
        </div>
        <div class="col-auto">
          <input class="form-control" disabled="disabled">
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click="modifyBoards" disabled="disabled">변경하기</button><br/>
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
            <option v-for="board in boardName" :key="board.id" :value="board.id">{{ board.name }}</option>
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
// import axios from "axios";

import axios from "axios";
import { ref } from "vue";

export default {
  setup() {

    const inputBoardName = ref('')
    const selected = ref(0)
    const boardName = ref('')
    const getBoardName = async () => {
      try {
        const res = await axios.get(`http://munis.ddns.net:8088/api/v1/boards`)
        boardName.value = res.data
      } catch (error) {
        console.log(error)
      }
    }

    getBoardName()

    const createBoards = async () => {
      try {
        await axios.post('http://munis.ddns.net:8088/api/v1/boards', {
          name: inputBoardName.value
        })
        alert("게시판이 생성되었습니다.")
        window.location.reload()
      } catch (err) {
        console.log(err)
      }
    }

    const modifyBoards = async () => {
      // try {
      //   const res = await axios.patch('http://munis.ddns.net:8088/api/v1/boards/6', {
      //     name: 'xpert'
      //   })
      //   console.log(res)
      // } catch (err) {
      //   console.log(err)
      // }
    }

    const deleteBoards = async () => {
      if (selected.value !== 0) {
        try {
          const res = await axios.delete(`http://munis.ddns.net:8088/api/v1/boards/${selected.value}`)
          alert("게시판이 삭제되었습니다.")
          window.location.reload()
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }
    }

    return {
      createBoards,
      modifyBoards,
      deleteBoards,
      boardName,
      selected,
      inputBoardName,
    }
  }
}
</script>

<style scoped>

</style>