<template>
  <div class="row">
    <div class="col-2 mt-4">
      <div class="position-sticky" style="top: 2rem;">
        <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end sticky-top">
          <nav class="nav nav-pills flex-column">
            <a class="nav-link" href="#Board_Manage">게시판 관리</a>
            <a class="nav-link" href="#User_Manage">전체 회원 관리</a>
            <a class="nav-link" href="#Youtube_URL">Youtube URL 관리</a>
            <a class="nav-link" href="#Food_Manage">식품 관리</a>
          </nav>
        </nav>
      </div>
    </div>
    <div class="col-8">
      <!-- 게시판 관리 -->
      <div class="row" id="Board_Manage">
        <div class="row card mt-4 shadow p-3 mb-5 bg-body">
          <h2 class="mt-2">Admin Page(게시판 관리)</h2>
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
                <button class="btn btn-primary" @click="createBoards">만들기</button>
                <br/>
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
                  <option v-for="board2 in boardModifyNameList" :key="board2.id" :value="board2.id">{{
                      board2.name
                    }}
                  </option>
                </select>
              </div>
              <div class="col-auto">
                <input class="form-control" v-model="modifyBoardName" @keyup.enter="modifyBoards">
              </div>
              <div class="col-auto">
                <button class="btn btn-primary" @click="modifyBoards">변경하기</button>
                <br/>
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
                  <option v-for="board in boardDeleteNameList" :key="board.id" :value="board.id">{{
                      board.name
                    }}
                  </option>
                </select>
              </div>
              <div class="col-auto">
                <button class="btn btn-danger" @click="deleteBoards">삭제하기</button>
                <br/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 전체 회원 관리 -->
      <div class="row" id="User_Manage">
        <div class="row card mt-4 shadow p-3 mb-5 bg-body">
          <h2 class="mt-2">Admin Page(전체 회원 관리)</h2>
          <hr/>
          <div>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">닉네임</th>
                <th scope="col">이메일</th>
                <th scope="col">회원등급</th>
                <th scope="col">가입일</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row"><input type="checkbox" name="checkbox_name" value="checkbox_value"></th>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
              </tr>
              <tr>
                <th scope="row"><input type="checkbox" name="checkbox_name" value="checkbox_value"></th>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
              </tr>
              <tr>
                <th scope="row"><input type="checkbox" name="checkbox_name" value="checkbox_value"></th>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
              </tr>
              <tr>
                <th scope="row"><input type="checkbox" name="checkbox_name" value="checkbox_value"></th>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
                <td>마상균 굉장하다</td>
              </tr>
              </tbody>
            </table>
            <hr/>
            <div class="row">
              <div class="col-4 ms-auto">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <a class="page-link">Previous</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active" aria-current="page">
                      <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                      <a class="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-4">
                <button type="button" class="btn btn-danger" style="float:right">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Youtube URL 관리 -->
      <div class="row" id="Youtube_URL">
        <ManageYouTubeURL/>
      </div>

      <!-- 식품 관리 -->
      <div class="row" id="Food_Manage">
        <ManageFoods/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import useAxios from '@/modules/axios'
import ManageFoods from '@/components/admin/ManageFoods.vue'
import ManageYouTubeURL from '@compo/admin/ManageYouTubeURL'

export default {
  components: {
    ManageYouTubeURL,
    ManageFoods,
  },
  setup() {
    const createBoardName = ref('')
    const modifyBoardName = ref('')
    const selected = ref(0)
    const selectedModify = ref(0)
    const boardDeleteNameList = ref('')
    const boardModifyNameList = ref('')
    const router = useRouter()
    const {axiosGet, axiosPost, axiosPatch, axiosDelete} = useAxios()

    onMounted(() => {  // get board name
      axiosGet('/api/v1/boards'
          , (res) => {
            boardDeleteNameList.value = {...res.data}  // 객체이므로 reactive 권장
            boardModifyNameList.value = {...res.data}
          }, (res) => {
            console.error(res)
          })
    })

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