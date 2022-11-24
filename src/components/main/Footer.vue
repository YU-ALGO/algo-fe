<template>
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p class="col-md-4 mb-0 text-muted">© 2022 ALGo</p>

      <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <img src="/food.ico" alt="" width="40" height="32">
      </a>

      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">메인화면</a></li>
        <li class="nav-item"><a :href="'/foods'" class="nav-link px-2 text-muted">식품정보</a></li>
<!--        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">공지사항</a></li>-->
<!--        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">자유게시판</a></li>-->
        <li class="nav-item"><a href="/about" class="nav-link px-2 text-muted">About</a></li>
        <li class="nav-item"><a href="http://be.algo.r-e.kr:8088/swagger-ui/index.html" target="_blank" class="nav-link px-2 text-muted">Swagger</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>