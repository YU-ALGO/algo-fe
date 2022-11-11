import Join from '@compo/Join.vue'
import Login from '@compo/Login.vue'
import PostWrite from '@compo/PostWrite.vue'
import FoodView from '@compo/FoodView.vue'
import TermOfService from '@compo/TermOfService.vue'
import ChangePassword from '@compo/ChangePassword.vue'
import NotFound from '@compo/NotFound.vue'

import MainView from '@views/index.vue'
import Board from '@views/boards/_id.vue'
import PostView from '@/views/boards/views/_id.vue'
import FoodList from '@views/food/index.vue'
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
    path: '/boards/:id',
    name: 'Board',
    component: Board,
  },
  {
    path: '/boards/:id/write',
    name: 'PostWrite',
    component: PostWrite,
    beforeEnter: isLogin(),
    props: true,
  },
  {
    path: '/boards/views/:id',
    name: 'Post',
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
    name: 'Food',
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
    path: '/term',
    name: 'Term',
    component: TermOfService,
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
  // {  // page for test
  //   path: '/test',
  //   name: 'TestPage',
  //   component: FoodView,
  // },
  {
    path: '/changepw',
    name: 'ChangePassword',
    component: ChangePassword,
    beforeEnter: isLogin(),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
})

export default router
