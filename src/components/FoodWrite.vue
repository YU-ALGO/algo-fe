<template>
  <div class="row">
    <div class="col-1">
    </div>
    <div class="col-10 mt-4">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">새로운 식품 추가</h4>
          <div class="row">
            <div class="col-4">
              <div class="card">
                <img src="../assets/defaultImage.png"
                     width="250px" height="200px" class="card-img-top" alt="...">
                <div class="card-body text-center">
                  <button type="button" class="btn btn-primary">사진 추가</button>
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-3">
                  <h5 class="form-label">식품명</h5>
                </div>
                <div class="col-9">
                  <input type="text" class="form-control" id="food_name" v-model="foodName">
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-3">
                  <h5 class="form-label">식품보고번호</h5>
                </div>
                <div class="col-9">
                  <input type="text" class="form-control" id="food_report_number" v-model="foodCode">
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-3">
                  <h5 class="form-label">식품 종류</h5>
                </div>
                <div class="col-9">
                  <input type="text" class="form-control" id="product_kind" v-model="foodKind">
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-3">
                  <h5 class="form-label">영양 성분</h5>
                </div>
                <div class="col-9">
                  <input type="text" class="form-control" id="nutrition" v-model="foodNutirition">
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-3">
                  <h5 class="form-label">원재료명</h5>
                </div>
                <div class="col-9">
                  <input type="text" class="form-control" id="raw_materials" v-model="foodRawMeterials">
                </div>
              </div>

              <div class="mb-3 mt-4">
                <div class="card p-3 mb-3 bg-body">
                  <h5>알레르기 정보</h5>
                  <div>
                    <div class="form-check form-check-inline" v-for="data in allergyCheckData" :key="data.id">
                      <input class="form-check-input" type="checkbox" v-model="data.selected" :id="`${data.name}`" :value="`${data.name}`">
                      <span class="form-check-label">{{ data.foodName }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button type="button" class="btn btn-primary" @click="onSave" style=" float: right;margin-left: 5px;">저장</button>
                <button type="button" class="btn btn-primary" @click="moveToAdminPage" style=" float: right;">목록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import router from "@/router";
import useAxios from '@/modules/axios'

export default {
  setup() {
    const { axiosPost } = useAxios()
    const allergyData = new Map()

    const allergyCheckData = ref([  // 현재 사용자가 선택한 알레르기 데이터
      {id: 1, name: 'squid', foodName: '오징어', selected: false},
      {id: 2, name: 'eggs', foodName: '난류', selected: false},
      {id: 3, name: 'chicken', foodName: '닭', selected: false},
      {id: 4, name: 'wheat', foodName: '밀', selected: false},
      {id: 5, name: 'nuts', foodName: '견과류', selected: false},
      {id: 6, name: 'milk', foodName: '우유', selected: false},
      {id: 7, name: 'pork', foodName: '돼지고기', selected: false},
      {id: 8, name: 'beef', foodName: '소고기', selected: false},
      {id: 9, name: 'clams', foodName: '조개류', selected: false},
      {id: 10, name: 'sulphite', foodName: '아황산류', selected: false},
      {id: 11, name: 'buckwheat', foodName: '메밀', selected: false},
      {id: 12, name: 'crab', foodName: '게', selected: false},
      {id: 13, name: 'shrimp', foodName: '새우', selected: false},
      {id: 14, name: 'soybean', foodName: '대두', selected: false},
      {id: 15, name: 'tomato', foodName: '토마토', selected: false},
      {id: 16, name: 'fish', foodName: '생선', selected: false},
      {id: 17, name: 'sesame', foodName: '참깨', selected: false},
      {id: 18, name: 'fruit', foodName: '과일', selected: false},
      {id: 19, name: 'garlic', foodName: '마늘', selected: false},
      {id: 20, name: 'vegetable', foodName: '채소', selected: false},
    ])

    const foodName = ref('테스트 식품')
    const foodCode = ref('1234567')
    const foodKind = ref('닭고기')
    const foodNutirition = ref('초콜릿, 라면')
    const foodRawMeterials = ref('오렌지, 바나나, 치즈, 아이스크림')
    const foodImage = ref('https://www.anewsa.com/news_images/2018/01/22/mark/20180122162218.jpg')

    watch(allergyCheckData.value, () => {
      checkSelected()
    })

    const checkSelected = () => {
      for (let i = 0; i < allergyCheckData.value.length; i++) {
        allergyData.set(allergyCheckData.value[i].name, allergyCheckData.value[i].selected)
      }
    }

    const onSave = () => {
      axiosPost('/api/v1/foods', {
        code: foodCode.value,
        nutrition : foodNutirition.value,
        allergy : Object.fromEntries(allergyData),
        food_name : foodName.value,
        raw_materials : foodRawMeterials.value,
        product_kind : foodKind.value,
        food_image_url : foodImage.value,
      }, () => {
        alert('식품 추가가 완료되었습니다!')
        router.push(`/admin`)
      }, (err) => {
        console.error(err)
      })
    }

    const moveToAdminPage = () => {
      router.push(`/admin`)
    }

    return {
      allergyCheckData,
      foodName,
      foodCode,
      foodKind,
      foodNutirition,
      foodRawMeterials,
      onSave,
      moveToAdminPage,
    }
  }
}
</script>

<style scoped>

</style>