<template>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <div class="aside-logo" style="background-color:#002033">
        <img src="@/views/logo_admin.png" alt="" />
      </div>
        <app-aside class="aside-menu" />
    </el-aside>
    <el-container>
      <el-header class="header">
         <div class="left">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客科技教育有限公司</span>
        </div>
        <div class="right">
          <img :src="user.photo" alt="">
          <el-dropdown>
            <span>{{user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            </div>
          </el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>

  <!-- <div class="layout-container">
      <div>顶部导航栏</div>

      子路由出口 首页渲染的出口
      <router-view />
      <div>侧边导航栏</div>
  </div> -->
</template>

<script>
import AppAside from './component/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      // 当前登录用户信息
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    }
  }
}

</script>
<style scoped lang='less'>
.container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .aside {
      color: #fff;
      overflow: hidden;
      .aside-menu{
          height: 100%;
          background-color: #002033;
      }
    }
    .aside-logo{
       padding: 10px 25px 0px 25px;
       img{
           width: 140px;
       }
      }
    .header {
    background-color: #fff;
    border-bottom:1px solid #ccc ;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right{
        display: flex;
        align-items: center;
        span{
          font-weight: 700;
        }
    }
    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
    }
}

</style>
