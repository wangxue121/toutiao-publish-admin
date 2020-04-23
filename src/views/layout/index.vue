<template>
<!-- width='auto' 宽度设置为自动 -->
  <el-container class="container">
    <el-aside class="aside"
       width="auto">
      <app-aside
      class="aside-menu"
      :is-collapse="isCollapse">
        </app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
         <div class="left">
        <i :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse
            }"
              @click="isCollapse = !isCollapse"></i>
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
                <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            </div>
          </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
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
      user: {},
      isCollapse: false // 侧边菜单栏的展示状态
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
    },
    onLogout () {
      this.$confirm('你确认要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确认取消 清除用户的登录状态
        window.localStorage.removeItem('user')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
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
