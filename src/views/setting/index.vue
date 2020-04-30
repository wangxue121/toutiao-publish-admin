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
            <el-button
          :loading="updateProfileLoading"
          type="primary" @click="onSaveSetting">保存设置</el-button>
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
            :src="user.photo"
          >
          </el-avatar>
            <p>点击修改头像</p>
        </label>
        <input
          id="file"
          type="file"
          v-show='false'
          ref="file"
          @change=onFileChange()
        >
        </el-col>
      </el-row>
      <el-dialog
        append-to-body
        title="头像"
        :visible.sync="dialogVisible"
        @opened='onPropImage'
        @closed='onDialogClosed'>
        <img
          :src="previewImage"
          alt=""
          ref= 'preview-image'
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
          type="primary"
          @click="onUpdataPhoto"
          >确 定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getUserProfile,
  updataUserPhoto,
  updataUserProfile
} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
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
      previewImage: '', // 预览图片
      cropper: null, // 裁切器实例
      updateProfileLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        // console.log(res)
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
    },
    onPropImage () {
      // 获取图片dom节点
      const image = this.$refs['preview-image']
      // 第一次初始化好以后，如果粗腰预览的剪裁图片发生改变，裁切器不会默认更新，如果需要预览的图片不发生变化了，那么有两种方法
      // 方法1.销毁裁切器，重新初始化
      // 方法2.裁切器的 replace 方法

      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return // 如果为true代码停止执行
      }
      // 初始化裁切器
      this.cropper = new Cropper(image, {
        // aspectRatio: 16 / 9,
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }

        // 裁切器的配置
        aspectRatio: 1, // 初始化比例
        // aspectRatio: 2 / 4,
        viewMode: 1, // 1是限制裁切框不要超过画布大小, 0没限制, 2限制最小画布容器
        dragMode: 'none', // 定义裁纸器的拖动模式 none是什么都不做
        cropBoxResizable: true,
        background: true
      })
    },
    // 方法1.销毁裁切器
    onDialogClosed () { // 弹出层关闭执行的
      // 对话框关闭销毁裁切器
      // 在data中设置copper：null 避免这里访问不到cropper
      this.cropper.destroy()
    },
    onUpdataPhoto () {
      // 获取剪裁的图片
      this.cropper.getCroppedCanvas().toBlob(file => {
        // console.log(file)
        const fd = new FormData()
        // fd.append(字段名称,file)
        fd.append('photo', file)
        // 提交fd
        updataUserPhoto(fd).then(res => {
          // console.log(res)
          // 关闭对话框
          this.dialogVisible = false
          // 更新视图显示
          this.loadUser()
        })
      }
      )
    },
    onSaveSetting (data) {
      this.updateProfileLoading = true
      // 先表单验证通过验证提交表单
      const { name, intro, email } = this.user
      updataUserProfile({
        name,
        intro,
        email
      }).then(res => {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.updateProfileLoading = false
      })
    }
  }
}

</script>
<style scoped lang='less'>
  /* Ensure the size of the image fit the container perfectly */
  img {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
</style>
