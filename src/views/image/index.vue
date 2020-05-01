<template>
<div class="Image-container" >
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
   <image-list></image-list>
  <!-- 全部和收藏两个单选按钮 -->
   <!-- <div class="top">
    <el-radio-group v-model="collect" @change="onCollectChange">
      <el-radio-button :label="false" >全部</el-radio-button>
      <el-radio-button :label="true" >收藏</el-radio-button>
    </el-radio-group>
     <el-button size="small" type="warning" @click="dialogimgleVisible = true">上传素材</el-button>
  </div> -->
  <!-- 响应式布局 -->
  <!-- <el-row :gutter="10">
  <el-col
    v-for="(img, index) in images"
    :key=index
    :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <div class="demo-image">
    <el-image
      style="height: 150px"
      :src="img.url"
      fit="cover">
      </el-image> -->
      <!-- 收藏和删除 -->
     <!-- <div class="little">
       <el-button
       size="mini"
       circle
      type="success"
      :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
      @click="oncllectImg(img)"
      :loading="img.loading"
      ></el-button>
      <el-button
      size="mini"
      circle
      icon='el-icon-delete'
      type="danger"
      @click="ondeleteImg(img.id)"
      :loading="img.loading"
       ></el-button> -->
         <!-- <i :class='{
             // 收藏是实心的是 el-icon-star-on
             // false 是取消收藏  true是收藏
             "el-icon-star-off": !img.is_collected,
             "el-icon-star-on": img.is_collected,
             "star":true
         }' @click="oncllectImg(img)"></i>
         <i class='el-icon-delete' @click="ondeleteImg(img.id)"></i> -->
     <!-- </div>
</div>
  </el-col>
</el-row> -->
<!-- 分页 -->
<!-- <el-pagination
  style="margin-top:20px"
  background
  layout="prev, pager, next"
  :total="totalCount"
  :page-size="pageSize"
  :current-page.sync="page"
  @current-change="onCurrentChange">
</el-pagination> -->
</el-card>
<!-- 图片上传 -->
<!-- <el-dialog title="上传素材" :visible.sync="dialogimgleVisible" :append-to-body="true"> -->
    <!-- name 上传文件名字
    show-file-list 上传文件列表 默认是true
    on-success 点击文件列表中已上传文件时的钩子
    v-if="dialogimgleVisible 会随着对话框的显示与隐藏进行销毁上传记录  -->
    <!-- upload 组件本身就支持请求提交操作 就是不需要自己去发送请求
    请求路径：action ,必须写完整路径
    请求头：headers
    -->
  <!-- <el-upload
    v-if="dialogimgleVisible"
    class="upload-demo"
    drag
    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
    multiple
    :headers="uploadHeaders"
    name="image"
    :on-success="onUploadSuccess"
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</el-dialog> -->
</div>
</template>

<script>
import ImageList from './components/image-list'
// import {
//   getImages, // 获取素材
//   deleteImage, // 删除素材
//   collectImage // 收藏
// } from '@/api/image/'

export default {
  name: 'ImageIndex',
  components: { ImageList }
  // props: {},
  // data () {
  //   const user = JSON.parse(window.localStorage.getItem('user'))
  //   return {
  //     collect: false,
  //     images: [],
  //     dialogimgleVisible: false,
  //     uploadHeaders: {
  //       Authorization: `Bearer ${user.token}`
  //     },
  //     pageSize: 10,
  //     totalCount: 0
  //   }
  // },
  // computed: {},
  // watch: {},
  // created () {
  //   this.loadImages(false, 1)
  // },
  // mounted () {},
  // methods: {
  //   // 获取素材
  //   loadImages (collect = false, page = 1) {
  //     // 重置高亮页码，防止数据和页码不对应
  //     this.page = page
  //     getImages({
  //       collect,
  //       page,
  //       per_page: this.pageSize
  //     }).then(res => { // 接口文档 参数 collect
  //       // // console.log(res)
  //       // this.images = res.data.data.results
  //       // const { results, total_count: totalCount } = res.data.data
  //       // this.images = results
  //       // this.totalCount = totalCount
  //       const results = res.data.data.results
  //       results.forEach(img => {
  //         // img 对象本来没有 loading 数据
  //         // 我们这里收到的往里面添加该数据是用来控制每个收藏按钮的 loading 状态
  //         img.loading = false
  //       })
  //       this.images = results
  //       this.totalCount = res.data.data.total_count
  //     })
  //   },
  //   onCollectChange (value) {
  //     this.loadImages(value)
  //   },
  //   onUploadSuccess () {
  //     // 关闭弹出层
  //     this.dialogimgleVisible = false
  //     // 更新素材列表 (加载全部)
  //     this.loadImages(false)
  //   },
  //   // 分页
  //   onCurrentChange (page) {
  //     this.loadImages(false, page)
  //   },

  //   ondeleteImg (imageId) {
  //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       // console.log(imageId)
  //       deleteImage(imageId).then(() => {
  //         this.loadImages()
  //         this.$message({
  //           type: 'success',
  //           message: '删除成功!'
  //         })
  //       })
  //     }).catch(() => {
  //       this.$message({
  //         type: 'info',
  //         message: '已取消删除'
  //       })
  //     })
  //   },

  //   oncllectImg (img) {
  //     img.loading = true // 开启loading
  //     // console.log(img)
  //     collectImage(img.id, !img.is_collected).then(() => {
  //       // console.log(res)
  //       img.is_collected = !img.is_collected
  //       img.loading = false // 关闭loading
  //     })
  //   }
  // }
}

</script>
<style scoped lang='less'>
.top {
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.demo-image{
position: relative;
.little{
    position: absolute;
    top: 125px;
    // left: 70px;
    color: #dfdfad;
    font-size: 20px;
    height: 25px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, .5);
}
}
</style>
