import Vue from 'vue'
import VueRouter from 'vue-router'
// index.vue可以省略
// @表示src目录  好处是不受文件路径影响
// import Login from '@/views/login/index.vue'
import Login from '@/views/login/'
import Layout from '@/views/layout/'
import Home from '@/views/home/'

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
    path: '', // path为空会作为默认子路由渲染
    name: 'home',
    component: Home
  }]
}
]

const router = new VueRouter({
  routes
})
export default router
