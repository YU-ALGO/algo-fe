import Join from '@compo/Join.vue'
import Login from '@compo/Login.vue'
import PostWrite from '@compo/PostWrite.vue'
import NotFound from '@compo/NotFound.vue'
import TermOfService from '@compo/TermOfService.vue'

import MainView from '@views/index.vue'
import Board from '@views/boards/_id.vue'
import PostView from '@/views/boards/views/_id.vue'
import FoodView from '@views/food/index.vue'
import Profile from '@views/profile/_nickname.vue'

import { createRouter, createWebHistory } from 'vue-router'
import useAxios from '@/modules/axios'
import store from '@/store/index'

const { axiosGet } = useAxios()

const isAdmin = () => (to, from, next) => {
  if (store.state.isLogin) {
    if (store.state.isAdmin) {
      axiosGet('/api/v1/admin', next(), () => {
        alert('관리자만 접속할 수 있습니다.')
        router.go(-1)
      })
    } else {
      alert('관리자만 접속할 수 있습니다.')
      router.go(-1)
    }
  } else {
    alert('로그인이 필요한 서비스입니다.')
    router.push('/login')
  }
}

const isLogin = () => (to, from, next) => {
  if (store.state.isLogin) {  // 로그인 된 상태
    return next()
  } else {
    alert('로그인이 필요한 서비스입니다.')
    router.push('/login')
  }
}

const loginCheck = () => (to, from, next) => {
  if (!store.state.isLogin) {
    return next()
  } else {
    alert('이미 로그인되어 있습니다.')
    router.go(-1)
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
    beforeEnter: isLogin(),
    props: true,
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
    path: '/profile/:nickname',
    name: 'Profile',
    component: Profile,
    beforeEnter: isLogin()
  },
  {
    path: '/boards/:id',
    name: 'Board',
    component: Board,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/admin/index'),
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
