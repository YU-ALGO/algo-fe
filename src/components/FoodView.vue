<template>
  <div class="row">
    <div class="mt-4">
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title" style="display:inline">{{ foodData.food_name }}</h5>
          <button class="btn mt-auto" :class="foodData.is_like ? 'btn-warning' : 'btn-outline-warning'" @click="favorite" style=" float: right;">
            <i v-if="!foodData.is_like" class="bi-star"></i>
            <i v-else class="bi-star-fill"></i>
          </button>
          <button type="button" class="btn btn-primary" style=" float: right;margin-right: 5px;" @click="moveToFoodListPage">목록</button>
          <hr/>
          <div class="card border-light mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="foodData.food_image_url" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body" style="padding-top: 0px;padding-bottom: 0px;">
                  <table class="table">
                    <thead>
                    <tr>
                      <th scope="col" style="width: 150px"></th>
                      <th scope="col" style="width: 500px"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row">식품보고번호</th>
                      <td>{{ foodData.code }}</td>
                    </tr>
                    <tr>
                      <th scope="row">식품 종류</th>
                      <td>{{ foodData.product_kind }}</td>
                    </tr>
                    <tr>
                      <th scope="row">영양 성분</th>
                      <td>{{ foodData.nutrition }}</td>
                    </tr>
                    <tr>
                      <th scope="row">원재료명</th>
                      <td>{{ foodData.raw_materials }}</td>
                    </tr>
                    <tr>
                      <th scope="row">알레르기 성분</th>
                      <td>{{ foodData.allergy }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <router-link v-if="isAdmin" class="btn btn-primary mt-2" :to="{ name: 'FoodWrite', query: { id: foodData.id, editable: true } }">수정</router-link>
              <button class="btn btn-danger mt-2">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">추천 상품</h5>
          <hr/>
          <section class="py-2">
            <div class="container px-4 px-lg-1">
              <div class="row gx-4 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">
                <div v-for="recFood in recFoodList" :key="recFood.id" class="col mb-2">
                  <div class="card h-100">
                    <img class="card-img-top" :src=recFood.food_image_url width="250" height="200" alt="...">
                    <div class="card-body p-4">
                      <div class="text-center">
                        <h5 class="fw-bolder" style="display:inline">{{ recFood.food_name }}</h5>
                      </div>
                      <div class="text-center mt-2">
                        <button class="btn btn-outline-warning">
                          <i class="bi bi-star"></i> | {{ recFood.like_count }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import useAxios from '@/modules/axios'
import store from '@/store/index'

export default {
  setup() {
    const { axiosGet, axiosPost, axiosDelete } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const foodId = route.params.id
    const isAdmin = ref(false)
    const foodData = ref({
      raw_materials: '',
      allergy: '',
      food_image_url: '',
      code: '',
      food_name: '',
      is_like: '',
      like_count: '',
      nutrition: '',
      product_kind: '',
    })

    const checkPermission = () => {
      isAdmin.value = false
      if (store.state.isLogin) {
        if (store.state.isAdmin) {
          axiosGet('/api/v1/admin', () => {
            isAdmin.value = true
          }, () => {
            isAdmin.value = false
          })
        }
      }
    }

    const recFoodList = ref('')

    const favorite = () => {
      if (foodData.value.is_like) {
        axiosDelete(`/api/v1/foods/${foodId}/likes`
            , () => {
              location.reload()
            }, () => {
              alert('오류가 발생했습니다.')
            })
      } else {
        axiosPost(`/api/v1/foods/${foodId}/likes`
            , {}
            , () => {
              alert('즐겨찾기에 추가되었습니다.')
              location.reload()
            }, () => {
              alert("오류가 발생했습니다.")
            })
      }
    }

    const moveToFoodListPage = () => {
      router.go(-1)
    }

    onMounted(() => {
      // get post data
      axiosGet(`/api/v1/foods/${foodId}`
          , (res) => {
        // console.log(res)
            foodData.value = res.data
          }, (err) => {
            console.error(err)
          })
      axiosGet('/api/v1/foods/recommendation', (res) =>{
        recFoodList.value = res.data
      }, (err) => {
        console.error(err)
      })
      checkPermission()
    })

    return {
      foodId,
      foodData,
      moveToFoodListPage,
      favorite,
      recFoodList,
      checkPermission,
      isAdmin,
    }
  }
}
</script>

<style scoped>

</style>