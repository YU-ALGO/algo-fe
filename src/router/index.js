import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/index'
import Profile from '../views/profile/index'
import FoodView from '../views/food/index'
import Join from '../components/Join'
import Login from '../components/Login'
import PostWrite from '../components/PostWrite'
import Board from '../views/boards/_id'
// import Boards from '../views/boards/index'
import Admin from '../views/admin/index'
import PostView from '../views/boards/views/_id'

const routes = [
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
  },
  {
    path: '/boards/views/:id',
    name: 'Post',
    component: PostView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
})

export default router
