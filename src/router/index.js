import Join from '@/components/Join'
import Login from '@/components/Login'
import PostWrite from '@/components/PostWrite'
import NotFound from '@/components/NotFound'
import TermOfService from '@/components/TermOfService'

import MainView from '@/views/index'
import Profile from '@/views/profile/index'
import FoodView from '@/views/food/index'
import Board from '@/views/boards/_id'
// import Boards from '@views/boards/index'
import Admin from '@/views/admin/index'
import PostView from '@/views/boards/views/_id'

import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import store from '../store/index'

const BASE_URL = 'http://be.downbit.r-e.kr:8088'

const isAdmin = () => (to, from, next) => {
  axios.get(BASE_URL + `/api/v1/admin`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
  })
      .then(function (res) {
        console.log(res)
        return next()
      })
      .catch(function (err) {
        console.log('오류 : ' + err)
        alert('관리자만 접속할 수 있습니다!')
        router.push('/')
      })
}

const isLogin = () => (to, from, next) => {
  if (!store.state.isLogin) {
    return next()
  } else {
    alert('로그인이 필요합니다!')
    router.push('/login')
  }
}

const loginCheck = () => (to, from, next) => {
  if (store.state.isLogin) {
    return next();
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
    path: '/boards/write',
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
