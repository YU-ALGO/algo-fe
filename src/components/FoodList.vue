<template>
  <div class="container">
    <div class="row">
      <div class="col-2 mt-4">
        <div class="accordion position-sticky" style="top: 2rem;">
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#leftMenu">
                최근 본 식품
              </button>
            </div>
            <div id="leftMenu" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <ul class="list-group list-group-flush text-center">
                  <li class="list-group-item">민트 초코</li>
                  <li class="list-group-item">하와이안 피자</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-8 card mt-4 shadow p-3 mb-5 bg-body">
        <div class="card-body">
          <h4 class="card-title mb-4">식품 정보</h4>
          <div class="input-group mb-3">
            <input type="search" class="form-control" placeholder="식품명을 입력하세요.">
            <button type="button" class="btn btn-primary">
              <i class="ri-search-line"></i>
            </button>
          </div>
          <div class="card mt-4 p-3 mb-3 bg-body">
            <h5 class="card-title mb-3">알레르기</h5>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op1">
                <label class="form-check-label" for="inlineCheckbox1">오징어</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op2">
                <label class="form-check-label" for="inlineCheckbox2">난류</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op3">
                <label class="form-check-label" for="inlineCheckbox2">닭</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op4">
                <label class="form-check-label" for="inlineCheckbox2">밀</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op5">
                <label class="form-check-label" for="inlineCheckbox2">견과류</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op6">
                <label class="form-check-label" for="inlineCheckbox2">우유</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op7">
                <label class="form-check-label" for="inlineCheckbox2">돼지고기</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op8">
                <label class="form-check-label" for="inlineCheckbox2">소고기</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op9">
                <label class="form-check-label" for="inlineCheckbox2">조개류</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op10">
                <label class="form-check-label" for="inlineCheckbox2">아황산류</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op11">
                <label class="form-check-label" for="inlineCheckbox2">메밀</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op12">
                <label class="form-check-label" for="inlineCheckbox2">게</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op13">
                <label class="form-check-label" for="inlineCheckbox2">새우</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op14">
                <label class="form-check-label" for="inlineCheckbox2">대두</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op15">
                <label class="form-check-label" for="inlineCheckbox2">토마토</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op16">
                <label class="form-check-label" for="inlineCheckbox2">생선</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op17">
                <label class="form-check-label" for="inlineCheckbox2">참깨</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op18">
                <label class="form-check-label" for="inlineCheckbox2">과일</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op19">
                <label class="form-check-label" for="inlineCheckbox2">마늘</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="op20">
                <label class="form-check-label" for="inlineCheckbox2">채소</label>
              </div>
            </div>
          </div>
          <section class="py-2">
            <div class="container px-4 px-lg-1">
              <div class="row gx-4 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-2">
                  <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="https://cdn.dominos.co.kr/admin/upload/goods/20200508_780B32i8.jpg"
                         width="250px" height="200px" alt="...">
                    <!-- Product details-->
                    <div class="card-body p-4">
                      <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
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
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
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
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
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
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
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
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
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
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
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
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
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
                        <h5 class="fw-bolder" style="display:inline">맛있는핏자</h5>
                        <!-- Product actions-->
                        <a class="btn btn-outline-dark mt-auto" style="margin-left:5px;padding-right: 6px;padding-left: 6px;padding-top: 4px;">&#x2764;</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="d-flex justify-content-center mt-4">
            <!-- Pagination -->
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li class="page-item active"><a class="page-link">1</a></li>
                <li class="page-item"><a class="page-link">2</a></li>
                <li class="page-item"><a class="page-link">3</a></li>
                <li class="page-item"><a class="page-link">다음</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div class="col-2 mt-4">
        <div class="accordion position-sticky" style="top: 2rem;">
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rightMenu">
                추천 식품
              </button>
            </div>
            <div id="rightMenu" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <ul class="list-group list-group-flush text-center">
                  <li class="list-group-item">딸기</li>
                  <li class="list-group-item">당근</li>
                  <li class="list-group-item">수박</li>
                  <li class="list-group-item">참외</li>
                  <li class="list-group-item">메론</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>