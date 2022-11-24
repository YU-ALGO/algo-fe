<template>
          <div class="glide">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li class="glide__slide">
                  <img src="https://www.foodsafetykorea.go.kr/uploadimg/20221024/20221024013603_1666586163317.jpg" alt="아이유2" height="300" width="500">
                </li>
                <li class="glide__slide">
                  <img src="https://image.newsis.com/2018/01/22/NISI20180122_0000097809_web.jpg" alt="교수님1" height="300" width="500">
                </li>
                <li class="glide__slide">
                  <img src="https://mblogthumb-phinf.pstatic.net/MjAxNzEyMDdfMjgw/MDAxNTEyNjA4NzczMTUw.oRoTk6xlr0Rffp5EcHngbkrD3JH-BjljkAERCjGrWt8g.-N0jfqfKPMZZzKkS3NpkryyMrUDslHemmsSG-X8XcxUg.JPEG.ynuniv/1.jpg?type=w2" alt="교수님2" height="300" width="500">
                </li>
              </ul>
            </div>
            <div class="glide__arrows d-flex justify-content-center mt-2" data-glide-el="controls">
              <button class="btn btn-primary me-1" data-glide-dir="<">이전</button>
              <button class="btn btn-primary ms-1" data-glide-dir=">">다음</button>
            </div>
          </div>
</template>

<script>
import Glide from '@glidejs/glide'

export default {
  mounted() {
    new Glide('.glide').mount()
  },
}
</script>

<style scoped>
@import '@glidejs/glide/dist/css/glide.core.min.css'
</style>