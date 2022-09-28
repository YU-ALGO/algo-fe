<template>
  <div>
    <!--    <h1>Main Page</h1>-->
  </div>
  <br/>
  <!--    https://stackblitz.com/edit/vue3-glidejs?file=src%2Fcomponents%2FCarousel.vue-->
  <div class="container">
    <div class="row justify-content-between">
      <div class="col-7">
        <h4>TOP 게시글</h4>
        <div class="card">
          <div class="card-body">
            <table class="table table-hover" style="text-align: center">
              <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
                <th>추천수</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">2</th>
                <td><a href="https://www.yu.ac.kr/main/bachelor/bachelor-guide.do?mode=view&articleNo=4060570&article.offset=0&articleLimit=10&srYearMonth=2022-09" target='_blank'>2022학년도 2학기 중간시험 실시 안내</a> [9]</td>
                <td>수업학적팀</td>
                <td>2022.09.21</td>
                <td>291</td>
                <td>900</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td><a href="https://www.yu.ac.kr/main/bachelor/bachelor-guide.do?mode=view&articleNo=4001889" target='_blank'>2022학년도 2학기 수강취소 신청 안내</a> [100]</td>
                <td>수업학적팀</td>
                <td>2022.09.16</td>
                <td>100</td>
                <td>400</td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>
      </div>
      <div class="col-5">
        <ImageGlide/>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import ImageGlide from '@compo/ImageGlide'
import Footer from '@compo/Footer'

export default {
  components: {
    ImageGlide,
    Footer,
  },
}
</script>

<style scoped>
@import '@glidejs/glide/dist/css/glide.core.min.css';
</style>