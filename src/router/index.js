import Join from '@views/join/index.vue'
import Login from '@compo/user/Login.vue'
import PostWrite from '@compo/post/PostWrite.vue'
import FoodView from '@compo/food/FoodView.vue'
import ChangePassword from '@compo/user/ChangePassword.vue'
import NotFound from '@compo/common/NotFound.vue'
import FoodWrite from '@compo/food/FoodWrite.vue'
import Message from '@compo/user/Message.vue'
import About from '@compo/main/About.vue'

import MainView from '@views/index.vue'
import Board from '@views/boards/_bid.vue'
import PostView from '@views/boards/views/_pid.vue'
import FoodList from '@views/food/index.vue'
import Profile from '@views/profile/_nickname.vue'
import FindPassword from '@views/findPassword/index.vue'

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
    router.push({name : 'Login'})
  }
}

const isLogin = () => (to, from, next) => {
  if (store.state.isLogin) {  // 로그인 된 상태
    return next()
  } else {
    router.push({name : 'Login'})
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
    path: '/',
    name: 'Main',
    component: MainView,
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
    beforeEnter: loginCheck()
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loginCheck()
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/admin/index'),
    beforeEnter: isAdmin()
  },
  {
    path: '/boards/:bid',
    name: 'Board',
    component: Board,
  },
  {
    path: '/boards/:bid/write',
    name: 'PostWrite',
    component: PostWrite,
    beforeEnter: isLogin(),
    props: true,
  },
  {
    path: '/boards/:bid/posts/:pid',
    name: 'PostView',
    component: PostView,
    beforeEnter: isLogin()
  },
  {
    path: '/foods',
    name: 'FoodList',
    component: FoodList,
    beforeEnter: isLogin(),
  },
  {
    path: '/foods/:id',
    name: 'FoodView',
    component: FoodView,
    beforeEnter: isLogin(),
  },
  {
    path: '/profile/:nickname',
    name: 'Profile',
    component: Profile,
    beforeEnter: isLogin()
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404"
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound,
  },
  {
    path: '/user/changepw',
    name: 'ChangePassword',
    component: ChangePassword,
    beforeEnter: isLogin(),
  },
  {
    path: '/food/write',
    name: 'FoodWrite',
    component: FoodWrite,
    beforeEnter: isAdmin(),
    props: true,
  },
  {
    path: '/user/findpw',
    name: 'FindPassword',
    component: FindPassword,
    beforeEnter: loginCheck(),
  },
  {
    path: '/user/message',
    name: 'Message',
    component: Message,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
