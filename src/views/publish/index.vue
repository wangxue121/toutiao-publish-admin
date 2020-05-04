<template>
  <div class="publish-container">
<el-card class="box-card">
    <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
    </el-breadcrumb>
      </div>
      <!-- prop属性设置为需要验证的名字  ref 获取都没元素 -->
    <el-form ref="publish-form" :model="article" label-width="70px" :rules="ruleForm">
    <el-form-item label="标题:" prop="title">
        <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="内容:" prop="content">
      <div>
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height = "300"
            placeholder = '请输入文章内容'
          />
        </div>
    </el-form-item>
    <!-- 文章封面 -->
    <el-form-item label="封面:">
      <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>

<!-- 我们需要把选择的封面图片放到article.cvoer.image数组中 -->

      <!-- 做判断大于0 做遍历 -->
      <template v-if="article.cover.type>0">
        <upload-cover
        v-for="(cover,index) in article.cover.type"
        :key="cover"
        @update-cover='onUpdateCover(index,$event)'
        :cover-image="article.cover.images[index]"
        />
      </template>
    </el-form-item>
    <el-form-item label="频道:" prop="channel_id">
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
import UploadCover from './components/upload-cover'
// 获取频道列表
import {
  getArticleChannels,
  addArticle,
  getArticle, // 获取文章
  updateArticle // 修改文章
} from '@/api/article'

import {
  // 富文本编辑器配置
  ElementTiptap,
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Preview,
  TextColor,
  Image
} from 'element-tiptap'

// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/image'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },

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
      },
      // 富文本编辑器配置
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Preview(),
        new TextColor(),
        new Image({
          // 默认把图片生成base64 字符串和内容存储到一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 图片上传
            const fd = new FormData()
            fd.append('image', file)
            // 这个 return 返回的是Promise 对象
            // 因为 axios 本身就是返回的 Proimse 对象
            return uploadImage(fd).then(res => {
              // console.log(res)
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          } // 图片上传方法，返回一个Promise<url>
        })
      ],
      ruleForm: {
        // blur 失去焦点  change是发生改变
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [{
          validator (rule, value, callback) {
            if (value === '<p></p>' || value === '') {
              callback(new Error('内容不能为空')) // 验证失败
            } else {
              callback() // 验证通过
            }
          }
        },
        { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道' }
        ]
      }
    }
  },
  computed: {
  },
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
    // onPublish (draft = false) {
    //   // 找到数据接口
    //   // 封装请求方法
    //   // 请求提交表单
    //   const articleId = this.$route.query.id
    //   // 如果存在id 那么就是修改文章，执行修改操作 否则执行添加操作
    //   if (articleId) {
    //     updateArticle(articleId, this.article, draft).then(res => {
    //       // console.log(res)
    //       this.$message({
    //         message: '修改成功',
    //         type: 'success'
    //       })
    //       // 发布成功跳到内容管理界面
    //       this.$router.push('/article')
    //     })
    //   } else {
    //     addArticle(this.article).then(res => {
    //       // 处理响应结果
    //       // console.log(res)
    //       this.$message({
    //         message: `${draft ? '存入草稿' : '发布'}成功`,
    //         type: 'success'
    //       })
    //       // 发布成功跳到内容管理界面
    //       this.$router.push('/article')
    //     })
    //   }
    // },

    // 作了表单验证的
    onPublish (draft = false) {
      this.$refs['publish-form'].validate(valid => {
        if (!valid) { // 如果验证失败 停止提交表单
          return
        }
        // 验证通过，提交表单
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
      })
    },

    // 修改文章 加载文章内容
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    },
    onUpdateCover (index, url) {
      // console.log(url)
      this.article.cover.images[index] = url
    }
  }
}

</script>
<style scoped lang='less'>
</style>
