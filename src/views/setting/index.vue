<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="12">
      <div class="text">
        <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="编号:">{{user.id}}
          </el-form-item>
            <el-form-item label="手机号:">{{user.mobile}}
          </el-form-item>
            <el-form-item label="媒体名称:">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍:">
            <el-input type="textarea" v-model="user.intro"></el-input>
          </el-form-item>
            <el-form-item label="邮箱:">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- vue 操作dom
      vue 提供了一个属性 ref
      vue 通过$refs.file 获取这个dom元素 -->
      </el-col>
        <el-col :offset="4" :span="8">
        <!-- <el-avatar
        shape="square"
        :size="200"
        fit="cover"
        :src="user.photo">
        </el-avatar> -->
        <!-- <p @click = "$refs.file.click()">点击修改头像</p>  给input 添加ref属性 也可以实现点击上传图片 -->
        <!-- <label for="file">点击修改头像</label>  给input 添加id也可以实现点击上传图片-->
        <!-- 点击头像和文字都可以上传文件 -->
        <label for="file">
        <el-avatar
        shape="square"
        :size="200"
        fit="cover"
        :src="user.photo">
        </el-avatar>
          <p>点击修改头像</p>
          </label>
        <input
        id="file"
        type="file"
        v-show='false'
        ref="file"
        @change=onFileChange()>
        </el-col>
      </el-row>
      <el-dialog
        append-to-body
        title="头像"
        :visible.sync="dialogVisible">
        <img :src="previewImage" alt="">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'setting',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        desc: ''
      },
      user: {},
      dialogVisible: false, // 控制弹出层的显示与隐藏
      previewImage: '' // 预览图片
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadUser () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    onFileChange () {
      // 预览图片
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      // console.log(blobData)
      this.previewImage = blobData
      // console.log('haha')

      // 展示弹出层 预览图片
      this.dialogVisible = true
      // 解决相同文件不触发 change事件
      // 相当于每次点击之后都把value值变为空
      this.$refs.file.value = ''
    }
  }
}

</script>
<style scoped lang='less'>
</style>
