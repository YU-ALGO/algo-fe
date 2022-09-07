<template>
  <router-link :to="{ name:'PostWrite' }" class="btn btn-primary me-2">글쓰기</router-link>
  <table class="table table-light">
    <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>작성자</th>
      <th>작성일</th>
      <th>조회수</th>
      <th>공감수</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="post in sliced_data" :key="post.no">
      <th scope="row">{{ post.no }}</th>
      <td><a :href="`/boards/views/${post.no}`">{{ post.title }}</a></td>
      <td>{{ post.writer }}</td>
      <td>{{ post.date }}</td>
      <td>{{ post.views }}</td>
      <td>{{ post.like }}</td>
    </tr>
    </tbody>
  </table>

  <nav class="blog-pagination text-center" aria-label="Pagination">
    <a class="btn rounded-pill" :class="[page === 1 ? 'btn-outline-secondary disabled' : 'btn-outline-primary',]" @click="page--" href="#">Prev</a>
    {{ page }}
    <a class="btn rounded-pill" :class="[page === total_pages ? 'btn-outline-secondary disabled' : 'btn-outline-primary',]" @click="page++" href="#">Next</a>
  </nav>
  <br/>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      total_rows.value = data.length
    })
    const rows = ref(5)
    const total_rows = ref(0)
    const page = ref(1)
    const total_pages = computed(() => {
      return Math.ceil(total_rows.value / rows.value)
    })
    const sliced_data = computed(() => {
      return data.slice((page.value - 1) * rows.value, page.value * rows.value)
    })

    const data = reactive([
      {
        no: 1,
        title: 'test1',
        writer: 'aaa',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 2,
        title: 'test2',
        writer: 'bbb',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 3,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 4,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 5,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 6,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 7,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 8,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 9,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 10,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 11,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 12,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 13,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 14,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      },
      {
        no: 15,
        title: 'test3',
        writer: 'ccc',
        date: '2022.08.24 10:52',
        views: 1,
        like: 0,
      }
    ])

    return {
      data,
      page,
      total_pages,
      sliced_data
    }
  },
}
</script>

<style scoped>

</style>