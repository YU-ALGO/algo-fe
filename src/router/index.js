import Join from '@compo/Join.vue'
import Login from '@compo/Login.vue'
import PostWrite from '@compo/PostWrite.vue'
import NotFound from '@compo/NotFound.vue'
import TermOfService from '@compo/TermOfService.vue'

import MainView from '@views/index.vue'
import Profile from '@views/profile/index.vue'
import FoodView from '@views/food/index.vue'
import Board from '@views/boards/_id.vue'
// import Boards from '@views/boards/index'
import Admin from '@/views/admin/index.vue'
import PostView from '@/views/boards/views/_id.vue'

import { createRouter, createWebHistory } from 'vue-router'
import useAxios from '@/modules/axios'
import { useAuth } from '@/composables/auth'

const { axiosGet } = useAxios()
const state = useAuth()

const isAdmin = () => (to, from, next) => {
  axiosGet('/api/v1/admin', next(), () => {
    alert('관리자만 접속할 수 있습니다.')
    router.push('/')
  })
}

const isLogin = () => (to, from, next) => {
  if (state.isLogin) {  // 로그인 된 상태
    return next()
  } else {
    alert('로그인이 필요한 서비스입니다.')
    router.push('/login')
  }
}

const loginCheck = () => (to, from, next) => {
  if (!state.isLogin) { // 로그인 되지 않은 상태
    return next()
  } else {
    alert('이미 로그인되어 있습니다.')
  }
}

const routes = [
  {
    path: '/term',
    name: 'Term',
    component: TermOfService,
  },
  {
    path: '/',
    name: 'Main',
    component: MainView,
  },
  {
    path: '/food',
    name: 'Food',
    component: FoodView,
  },
  {
    path: '/boards/:id/write',
    name: 'PostWrite',
    component: PostWrite,
    beforeEnter: isLogin()
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loginCheck()
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
    beforeEnter: loginCheck()
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: isLogin()
  },
  {
    path: '/boards/:id',
    name: 'Board',
    component: Board,
  },
  // {
  //   path: '/boards',
  //   name: 'boards',
  //   component: Boards,
  // },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: isAdmin()
  },
  {
    path: '/boards/views/:id',
    name: 'Post',
    component: PostView,
    beforeEnter: isLogin()
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404"
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
})

export default router
