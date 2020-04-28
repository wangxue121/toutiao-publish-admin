import Vue from 'vue'
import VueRouter from 'vue-router'
// index.vue可以省略
// @表示src目录  好处是不受文件路径影响
// import Login from '@/views/login/index.vue'
import Login from '@/views/login/'
import Layout from '@/views/layout/'
import Home from '@/views/home/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
import Comment from '@/views/comment/'

Vue.use(VueRouter)
// 路由配置表
const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
{
  // path 为空默认子路由会渲染到父路由里
  // lauout 是侧边导航栏和顶部导航栏
  path: '/',
  name: 'layout',
  component: Layout,
  // 首页
  children: [{
    path: '', // path为空会作为默认子路由渲染 首页
    name: 'home',
    component: Home
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  },
  {
    path: '/publish',
    name: 'publish',
    component: Publish
  },
  {
    path: '/image',
    name: 'image',
    component: Image
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  }]
}
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果没有登录，则跳到登录页面 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 如果已经登录允许通过
      next()
    } else {
      // 没有登录跳转到登录页
      next('/login')
    }
  } else {
    // 登录页面允许正常通过
    next()
  }
})
export default router
