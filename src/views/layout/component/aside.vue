<template>
    <!--default-active="2" 是当前激活菜单的index
    collpase 是控制收起展开功能
    default-active="/"
    -->
    <el-menu
    :default-active="$router.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    >
    <!-- :collapse="isCollapse" -->
    <!-- router 路由-->
    <div class="aside-logo" style="background-color:#002033">
      <img src="@/views/logo_admin.png" alt="" />
    </div>
    <el-menu-item index="/">
    <i class="el-icon-s-home"></i>
    <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="article">
    <i class="el-icon-document"></i>
    <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="image">
    <i class="el-icon-picture"></i>
    <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="publish">
    <i class="el-icon-s-promotion"></i>
    <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="comment">
    <i class="el-icon-s-comment"></i>
    <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="fans">
    <i class="el-icon-magic-stick"></i>
    <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="setting">
    <i class="el-icon-setting"></i>
    <span slot="title">个人设置</span>
    </el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}

</script>
<style scoped lang='less'>
  .aside-logo{
       padding: 10px 25px 0px 18px;
       img{
           width: 140px;
       }
      }
</style>
