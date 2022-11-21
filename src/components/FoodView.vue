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
                <div class="col mb-2">
                  <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="https://cdn.dominos.co.kr/admin/upload/goods/20200508_780B32i8.jpg"
                         width="250px" height="200px" alt="...">
                    <!-- Product details-->
                    <div class="card-body p-4">
                      <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder" style="display:inline">맛있는 핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left: 5px;">&#x2764;</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col mb-2">
                  <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="https://cdn.dominos.co.kr/admin/upload/goods/20200508_780B32i8.jpg"
                         width="250px" height="200px" alt="...">
                    <!-- Product details-->
                    <div class="card-body p-4">
                      <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder" style="display:inline">맛있는 핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left: 5px;">&#x2764;</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col mb-2">
                  <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="https://cdn.dominos.co.kr/admin/upload/goods/20200508_780B32i8.jpg"
                         width="250px" height="200px" alt="...">
                    <!-- Product details-->
                    <div class="card-body p-4">
                      <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder" style="display:inline">맛있는 핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left: 5px;">&#x2764;</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col mb-2">
                  <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="https://cdn.dominos.co.kr/admin/upload/goods/20200508_780B32i8.jpg"
                         width="250px" height="200px" alt="...">
                    <!-- Product details-->
                    <div class="card-body p-4">
                      <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder" style="display:inline">맛있는 핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left: 5px;">&#x2764;</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col mb-2">
                  <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="https://cdn.dominos.co.kr/admin/upload/goods/20200508_780B32i8.jpg"
                         width="250px" height="200px" alt="...">
                    <!-- Product details-->
                    <div class="card-body p-4">
                      <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder" style="display:inline">맛있는 핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left: 5px;">&#x2764;</a>
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
import { onMounted, ref } from 'vue'
import useAxios from '@/modules/axios'

export default {
  setup() {
    const { axiosGet, axiosPost, axiosDelete } = useAxios()
    const route = useRoute()
    const router = useRouter()
    const foodId = route.params.id
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
        console.log(res)
            foodData.value = res.data
          }, (err) => {
            console.error(err)
          })
    })

    return {
      foodId,
      foodData,
      moveToFoodListPage,
      favorite,
    }
  }
}
</script>

<style scoped>

</style>