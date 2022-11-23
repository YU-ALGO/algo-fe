<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-6">
        <div class="row">
          <div class="container" style="height:200%">
            <div class="row justify-content-between">
              <h4>공지사항</h4>
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
                    <tr v-for="post in noticePosts.slice(0, 4)" :key="post.id">
                      <th scope="row">{{ post.id }}</th>
                      <td>
                        <a class="text-link text-body" :href="`/boards/1/posts/${post.id}`">{{ post.title }}</a>
                        <label v-show="post.comment_count !== 0" class="text-danger">&nbsp;[{{
                            post.comment_count
                          }}]</label>
                      </td>
                      <td>{{ post.author }}</td>
                      <td>{{ post.created_at.split(' ')[0] }}</td>
                      <td>{{ post.view_count }}</td>
                      <td>{{ post.like_count }}</td>
                    </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="container" style="height:200%">
            <div class="row justify-content-between">
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
                    <tr v-for="post in topPosts" :key="post.id">
                      <th scope="row">{{ post.id }}</th>
                      <td>
                        <a class="text-link text-body" :href="`/boards/${post.boardId}/posts/${post.id}`">{{
                            post.title
                          }}</a>
                        <label v-show="post.comment_count !== 0" class="text-danger">&nbsp;[{{
                            post.comment_count
                          }}]</label>
                      </td>
                      <td>{{ post.author }}</td>
                      <td>{{ post.created_at.split(' ')[0] }}</td>
                      <td>{{ post.view_count }}</td>
                      <td>{{ post.like_count }}</td>
                      <!-- <td><a
                          href=""
                          target='_blank'>테스트</a> [9]
                      </td>
                      <td>작성자</td>
                      <td>2022.09.21</td>
                      <td>111</td>
                      <td>222</td> -->
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <h4>알아두면 좋은 식품지식</h4>
          <div id="carouselExampleFade" class="carousel slide carousel-fade flex-fill" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="http://kids.hyundai.com/upload/image/FU/201709/170914_safety_img02.jpg" class="d-block w-100"
                     alt="..." style="width: 625px; height: 310px; margin-left: auto;margin-right: auto;">
              </div>
              <div class="carousel-item">
                <img
                    src="http://kids.hyundai.com/upload/image/FU/201709/170914_safety_img03.jpg"
                    class="d-block w-100" alt="..."
                    style="width: 625px; height: 310px; margin-left: auto;margin-right: auto;">
              </div>
              <div class="carousel-item">
                <img
                    src="http://kids.hyundai.com/upload/image/FU/201709/170914_safety_img04.png"
                    class="d-block w-100" alt="..."
                    style="width: 625px; height: 310px; margin-left: auto;margin-right: auto;">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="row mt-4">
          <h4>바로가기</h4>
          <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
            <button type="button" class="btn btn-outline-dark btn-light"
                    onclick="window.open('https://www.foodsafetykorea.go.kr/portal/board/board.do?menu_grp=MENU_NEW01&menu_no=3120&bbs_no=bbs001&ntctxt_no=1078398&nticmatr_yn=N&bbs_type_cd=01&ans_yn=N&order_type=01&ctgry_type_cd=CTG_TYPE01&list_img_use_yn=N&atch_file_posbl_yn=Y&cmt_yn=N&kword_use_yn=N&natn_cd_use_yn=N&tag_use_yn=N&meta_use_yn=Y&search_type=title&show_cnt=10');">
              <h2 class="mt-1"><i class="bi bi-lightbulb"></i></h2>
              <h5 class="mt-3">식품<br>안전지식</h5>
            </button>
            <button type="button" class="btn btn-outline-dark btn-light"
                    onclick="window.open('https://www.foodsafetykorea.go.kr/portal/board/boardDetail.do?menu_no=3409&menu_grp=MENU_NEW05&bbs_no=bbs820&ntctxt_no=1064525&start_idx=2&nticmatr_yn=N&bbs_type_cd=03&ans_yn=N&order_type=01&list_img_use_yn=Y&atch_file_posbl_yn=Y&cmt_yn=N&kword_use_yn=N&natn_cd_use_yn=N&tag_use_yn=N&meta_use_yn=N&show_cnt=12');">
              <h2 class="mt-1"><i class="bi bi-virus"></i></h2>
              <h5 class="mt-3">알레르기<br>정보</h5>
            </button>
            <button type="button" class="btn btn-outline-dark btn-light"
                    onclick="window.open('https://www.mfds.go.kr/index.do');">
              <h2 class="mt-1"><i class="bi bi-capsule-pill"></i></h2>
              <h5 class="mt-3">식품안전<br>의약처</h5>
            </button>
            <button type="button" class="btn btn-outline-dark btn-light"
                    onclick="window.open('https://www.foodsafetykorea.go.kr/portalmobile/content/detail.do?bbs_no=bbs427&ntctxt_no=1069305');">
              <h2 class="mt-1"><i class="bi bi-capsule-pill"></i></h2>
              <h5 class="mt-3">식중독<br>예방</h5>
            </button>
          </div>
          <p></p>
        </div>
      </div>
    </div>
    <br/>

    <h4>식품 안전 영상</h4>
    <div class="card-group">
      <div class="card" style="height: 300px;">
        <div class="card-body">
          <iframe width="100%" height="100%" src='https://www.youtube.com/embed/${firstURL}'
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
        </div>
      </div>
      <div class="card" style="height: 300px;">
        <div class="card-body">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/b_MDW7gwnqg"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
        </div>
      </div>
      <div class="card" style="height: 300px;">
        <div class="card-body">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/h87bmuEvVlI"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import useAxios from '@/modules/axios'

export default {
  setup() {
    const {axiosGet} = useAxios()

    const firstURL = ref('fo2vhh8cbfI')
    const secondURL = ref('b_MDW7gwnqg')
    const thirdURL = ref('h87bmuEvVlI')

    const noticePosts = ref('')
    const topPosts = ref('')

    onMounted(() => {
      // 공지사항 get
      axiosGet('/api/v1/boards/1/posts', (res) => {
        noticePosts.value = res.data
      })

      // TOP 게시글 get
      axiosGet('/api/v1/boards/posts/top?size=4', (res) => {
        topPosts.value = res.data
        console.log(topPosts)
      })
    })

    return {
      firstURL,
      secondURL,
      thirdURL,
      noticePosts,
      topPosts,
    }
  }
}
</script>

<style scoped>
.text-link {
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}
</style>