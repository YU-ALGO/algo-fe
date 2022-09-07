import { createRouter, createWebHistory } from 'vue-router'
import BoardsView from '../views/BoardView.vue'
import Join from '../components/Join.vue'
import Login from '../components/Login.vue'
import MainView from '../views/MainView.vue'
import PostWrite from '../components/PostWrite.vue'
import Profile from '../components/Profile.vue'
import StockView from '../views/StockView.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
  },
  {
    path: '/stock',
    name: 'Stock',
    component: StockView,
  },
  {
    path: '/boards/1',
    name: 'FreeBoard',
    component: BoardsView,
  },
  {
    path: '/write',
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
})

export default router
