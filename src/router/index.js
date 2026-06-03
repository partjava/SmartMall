import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

// 路由懒加载
const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const List = () => import('../views/List.vue')
const Details = () => import('../views/Details.vue')
const Fenlei = () => import('../views/Fenlei.vue')
const Shopcart = () => import('../views/Shopcart.vue')
const Order = () => import('../views/Order.vue')
const AboutView = () => import('../views/AboutView.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      { path: '', component: List },
      { path: 'Details/:id', name: 'Details', component: Details },
      { path: 'Fenlei', component: Fenlei },
      {
        path: 'Shopcart',
        component: Shopcart,
        meta: { requiresAuth: true }
      },
      {
        path: 'Order',
        component: Order,
        meta: { requiresAuth: true }
      },
      { path: 'About', component: AboutView }
    ]
  },
  { path: '/Login', name: 'Login', component: Login },
  { path: '/Register', name: 'Register', component: Register },
  // 404 兜底
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isLoggedIn) {
    next({ path: '/Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
