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
          <label class="col-form-label">삭제할 게시판</label>
        </div>
        <div class="col-auto">
          <select v-model="selectedModify" class="form-select">
            <option value="0">게시판목록</option>
            <option v-for="board2 in boardModifyNameList" :key="board2.id" :value="board2.id">{{ board2.name }}</option>
          </select>
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
import useAxios from '@/modules/axios'

export default {
  setup() {
    const inputBoardName = ref('')
    const selected = ref(0)
    const selectedModify = ref(0)
    const boardDeleteNameList = ref('')
    const boardModifyNameList = ref('')
    const { axiosPost } = useAxios()

    const getBoardName = async () => {
      await axiosGet('/api/v1/boards'
      , (res) => {
        boardDeleteNameList.value = { ...res }  // 객체이므로 reactive 권장
        boardModifyNameList.value = { ...res }
      }, (err) => {
        console.log(err)
      })
    }

    getBoardName()

    const createBoards = async () => {
      await axiosPost('/api/v1/boards', {
        name: inputBoardName.value
      }, () => {
        alert('게시판이 생성되었습니다.')
        window.location.reload()
      }, (err) => {
        console.log(err)
      })
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
        if (confirm("정말 게시판을 삭제하시겠습니까?")) {
          try {
            const res = await axios.delete(`http://be.downbit.r-e.kr:8088/api/v1/boards/${selected.value}`, {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
              withCredentials: true
            })
            alert("게시판이 삭제되었습니다.")
            window.location.reload()
            console.log(res)
          } catch (err) {
            console.log(err)
          }
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
      inputBoardName,
    }
  },
}
</script>

<style scoped>

</style>