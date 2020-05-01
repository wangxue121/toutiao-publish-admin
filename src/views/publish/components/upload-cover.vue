<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <!-- src绑定的是父传子传进来的coverImage data中props的数据-->
      <el-image
        class="cover-image"
        ref="cover-image"
        style="width: 200px; height: 200px"
        :src='coverImage'
        fit="cover">
        </el-image>
    </div>
    <el-dialog
        title="选择图片"
        :visible.sync="dialogVisible"
        width="50%"
        append-to-body>
        <!-- tab栏切换 -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="素材库" name="first">
              素材库
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="second">
              <input
              type="file"
              ref="file"
              @change='onFileChagne()'>

              <img
              class="cover-wrap"
              @click="$refs.file.click()"
              src=""
              alt=""
              ref='preview-image'>
            </el-tab-pane>
        </el-tabs>

    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
        type="primary"
        @click="onCoverComfirm()"
        >确 定</el-button>
    </span>
</el-dialog>

  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
export default {
  name: 'UploadCover',
  components: {},
  props: ['cover-image'], // 父传子
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      url: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onFileChagne () {
      // console.log('hahah')
      // 1. 获取文件对象
      const file = this.$refs.file.files[0]

      // 2. 图片预览
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
    },
    onCoverComfirm () {
      // 如果tab是上传文件 并且input-file 有选择的文件，才执行上传文件的操作
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) { // 如果没有选择文件
          this.$message('请选择上传的文件')
          return
        }
        // 执行文件上传操作  根据接口文档 image
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          // console.log(res)
          // 关闭弹出层
          this.dialogVisible = false
          // 展示上传的文件
          // this.$refs['cover-image'].src = res.data.data.url
          this.url = res.data.data.url

          // 将图片地址发送给父组件(子传父)
          this.$emit('update-cover', res.data.data.url)
        })
      }
    }
  }
}

</script>
<style scoped lang='less'>
.cover-wrap{
  float: left;
  margin-right: 10px;
  height: 200px;
  width: 200px;
  border: 1px dashed #ccc;
  background:url(../pic_bg.png) no-repeat;
  background-size: cover;
}
</style>
