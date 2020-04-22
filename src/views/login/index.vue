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

          配置表单验证：
          1.必须给el-form 组件绑定 model为表单数据对象
          2.给需要验证的表单项el-form-item 绑定prop属性
          注意：prop属性需要制定表单对象中的数据名称
          3.通过 el-form 组件的rules属性配置验证规则

          手动触发表单验证:
          1.给el-form 设置ref起一个名字（名字随意）
          2.通过 ref 获取 el-form 组件，调用组件的 validata进行验证
         -->
        <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
            <el-form-item prop="mobile">
                <el-input  v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item prop="agree">
                <el-checkbox class="login-text" v-model="user.agree">我已阅读并同意用户的协议和请求</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button  class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: 'false'
      },
      loginLoading: false,
      formRules: { // 表单验证规则
      // 要验证的数据名称 规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确格式的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确格式的验证码', trigger: 'change' }
        ],
        agree: [
          {
            // 自定义验证规则
            // rule 表示要验证字段的规则,vulue 会返回true/false
            // callback() 成功
            // callback(new Error('失败')) 失败传入一个错误对象 写错误消息
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据
      // const user = this.user
      // 表单验证
      // validata 方法是异步的  valid 参数返回true 或者false   err参数返回错误信息
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
        // console.log('失败')
        // 如果表单验证失败 就不用提交请求
          return
        }
        // 表单验证成功,请求登录
        this.login()
      })
    },
    login () {
      // 正在登录中 loading...
      this.loginLoading = true
      // 通过验证，提交表单
      login(this.user).then(res => {
        console.log(res)
        this.$message({
          message: '恭喜你, 登录成功',
          type: 'success'
        })
        // 关闭 loading
        this.loginLoading = false

        // 跳转到首页 编程式导航 两种方法都可 第一种是路由没有name
        // this.$router.push('/')

        this.$router.push({
          name: 'home'
        })
        // 登录失败
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('嘻嘻, 登录失败')
        this.loginLoading = false
      })
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
