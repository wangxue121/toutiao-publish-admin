<template>
    <div class="login-container">
        <div class="login-form-wrap">
            <!-- 头部图片 -->
          <div class="login-head">
            <div class="logo"></div>
          </div>
        <!--
            el-form 表单组件
            每个表单都必须使用 el-form-item 组件包裹
         -->
        <el-form class="login-form" ref="form" :model="user">
            <el-form-item>
                <el-input  v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox class="login-text" v-model="checked">我已阅读并同意用户的协议和请求</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button  class="login-btn" type="primary" @click="onLogin">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据
      const user = this.user

      // 表单验证
      // 通过验证，提交表单
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data用来设置post请求体
        data: user
      // 登录成功
      }).then(res => {
        console.log(res)
      // 登录失败
      }).catch(err => {
        console.log('登录失败', err)
      })
      // 处理后端乡音结果
      // 成功：XXX
      // 失败：XXX
    }
  }
}
</script>
<style scoped lang="less">
    .login-container{
        // 固定定位
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        // flex 布局
        display: flex;
        flex-direction: column;
        // 子项整体居中
        justify-content: center;
        // 子项垂直居中
        align-items: center;
        // 背景图
        background: url("./login_bg.jpg") no-repeat;
        background-size: cover;
        .login-form-wrap{
            min-width: 300px;
            padding: 30px 50px;
            background-color: #fff;
            .login-head{
                display: flex;
                justify-content: center;
                .logo{
                width: 200px;
                height: 60px;
                background: url("./logo_index.png") no-repeat;
                background-size: contain;
                }
            }}
        .login-form{
            .login-text{
                color: #000;
            }
            .login-btn{
                width: 100%;
            }
        }
    }
</style>
