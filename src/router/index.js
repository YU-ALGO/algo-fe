import Join from '@compo/Join'
import Login from '@compo/Login'
import PostWrite from '@compo/PostWrite'
import NotFound from '@compo/NotFound'
import TermOfService from '@compo/TermOfService'

import MainView from '@views/index'
import Profile from '@views/profile/index'
import FoodView from '@views/food/index'
import Board from '@views/boards/_id'
// import Boards from '@views/boards/index'
import Admin from '@views/admin/index'
import PostView from '@views/boards/views/_id'

import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

const requireAuth = () => (to, from, next) => {
  axios.get(`http://be.downbit.r-e.kr:8088/api/v1/admin`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
  })
      .then(function (res) {
        console.log(res)
        return next();
      })
      .catch(function (err) {
        console.log('오류 : ' + err)
        alert('관리자만 접속할 수 있습니다!')
        router.push('/')
      })
};

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
    beforeEnter: requireAuth()
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
