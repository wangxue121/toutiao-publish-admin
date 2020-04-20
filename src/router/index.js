import Vue from 'vue'
import VueRouter from 'vue-router'
// index.vue可以省略
// @表示src目录  好处是不受文件路径影响
// import Login from '@/views/login/index.vue'
import Login from '@/views/login'
Vue.use(VueRouter)
// 路由配置表
const routes = [{
  path: '/login',
  name: 'login',
  component: Login
}]

const router = new VueRouter({
  routes
})

export default router
