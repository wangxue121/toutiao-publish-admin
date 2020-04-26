<template>
  <div class="publish-container">
<el-card class="box-card">
    <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
    </el-breadcrumb>
      </div>
    <el-form ref="form" :model="article" label-width="70px">
    <el-form-item label="标题:">
        <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="内容:">
        <el-input type="textarea" v-model="article.content"></el-input>
    </el-form-item>
    <el-form-item label="封面:">
      <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道:">
        <el-select v-model="article.channel_id" placeholder="请选择频道">
        <el-option
        v-for="(channel, index) in channels"
        :key="index"
        :label="channel.name"
        :value="channel.id"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click = 'onPublish(false)'>发布</el-button>
        <el-button @click = 'onPublish(true)'>存为草稿</el-button>
    </el-form-item>
</el-form>
</el-card>

  </div>
</template>

<script>
// 获取频道列表
import {
  getArticleChannels,
  addArticle,
  getArticle, // 获取文章
  updateArticle // 修改文章
} from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型
          images: [] // 封面图片地址
        },
        channel_id: null // 文章所属频道的id
      }
    }
  },
  computed: {},
  watch: {},
  created () { // 组件初始化完毕
    // 获取数据
    this.loadChannels()
    // 做出判断 因为编辑和发布在同一页面 如果地址栏有id那么就是编辑 就加载文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单
      const articleId = this.$route.query.id
      // 如果存在id 那么就是修改文章，执行修改操作 否则执行添加操作
      if (articleId) {
        updateArticle(articleId, this.article, draft).then(res => {
          // console.log(res)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // 发布成功跳到内容管理界面
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article).then(res => {
          // 处理响应结果
          // console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          // 发布成功跳到内容管理界面
          this.$router.push('/article')
        })
      }
    },

    // 修改文章 加载文章内容
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    }
  }
}

</script>
<style scoped lang='less'>
</style>
