<template>
  <div class="article-container" >
    <el-card class="filter-card">
  <div slot="header" class="clearfix">
    <span>
       <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    </span>
  </div>
  <!-- 筛选开始 -->
    <!-- size用于设置组件的尺寸  label-width="80px"  是左侧宽度-->
    <el-form ref="form" :model="form" label-width="50px" size="mini">
  <el-form-item label="状态 :">
    <!-- form.status 数据显示的状态
    label 就是radio的value -->
    <el-radio-group v-model="status">
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道 :">
    <el-select v-model="channelId" placeholder="请选择活动区域">
      <el-option
      label="全部"
      :value="null">
      </el-option>
      <!-- channel 频道 channels 频道列表 -->
      <el-option
        :label = "channel.name"
        :value = "channel.id"
        v-for = "(channel, index) in channels "
        :key = 'index'
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期 :">
    <el-date-picker
      v-model="rangeDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
        :default-time="['12:00:00']"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      />
  </el-form-item>

  <el-form-item>
    <!-- button按钮的click事件有一个默认参数，当我们没有指定参数的时候，会自动传入一个无用数据 -->
    <el-button
    type="primary"
    :disabled="loading"
    @click="loadArticles(1)">筛选</el-button>
  </el-form-item>
  </el-form>
</el-card>

<!-- 表格 -->
<el-card class="bottom-card">
  <div slot="header" class="clearfix" size="small">
    根据筛选条件共查询到 {{totalCount}} 条结果：
  </div>
  <!-- 把需要展示的数据绑定个el-table 中的data属性
       :data="articles"
       注意：你不用去v-for 遍历，他自己会遍历
       prop 用来设定要渲染的列表数据字段
   -->
  <el-table
    v-loading="loading"
    :data="articles"
    stripe
    style="width: 100%"
    class="list-table"
    size='small'>
    <el-table-column
      prop=""
      label="封面">
      <template slot-scope="scope">
        <!-- 设置 如果没有图片位置显示暂无图片 -->
         <img v-if="scope.row.cover.images[0]" class="article-cover"
        :src="scope.row.cover.images[0]" alt="">

        <img v-else class="article-cover"
        src="./error.gif" alt="">
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <!-- 如果需要在自定义列模板上获取数据就在template上声明
      slot-scope="scope"  scope 是自己起的名字随便 scope.row 表示每一项-->
    <template slot-scope="scope">
      <el-tag :type='articleStatus[scope.row.status].type'>{{ articleStatus[scope.row.status].text}}</el-tag>
      <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
      <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>
      <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
      <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
      <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
    </template>
    </el-table-column>
    <el-table-column
      prop="pubdate"
      label="发布时间">
    </el-table-column>

    <!-- 自定义模板存放的位置 -->
       <!-- 圆的加circle -->
     <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- 编辑
        点击编辑跳转到publish页面
        任何数据和字符串拼接都自动的toString() 所以可以不写-->
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          plain
          circle
          @click="$router.push('/publish?id='+scope.row.id.toString())"
          ></el-button>
        <!-- 删除 -->
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          plain
          circle
          @click="onDeleteArticle(scope.row.id)"
          ></el-button>
      </template>
    </el-table-column>
  </el-table>
     <!-- 分页 -->
     <!-- :current-page.sync='page' 获取当前页码 -->
  <el-pagination
    background
    layout="prev, pager, next"
    :total="totalCount"
    @current-change="onCurrentChange"
    :page-size='pageSize'
    :disabled="loading"
    :current-page.sync='page'
    >
  </el-pagination>
  <!-- totalCount 数据总页数
    current-change 页数发生改变的时候会触发-->
</el-card>
  </div>
</template>

<script>
// 导入
import {
  getArticles,
  getArticleChannels,
  deleteArticle
} from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516'
      }],
      articles: [], // 文章数据列表
      // 文章状态优化
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'warning' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页显示的条数
      status: null, // 查询文章的状态 null就是全部
      channels: [], // 频道列表
      channelId: null, // 查询文章频道
      rangeDate: null,
      loading: true,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
  // 生命周期钩子函数
  // create 是组件初始化完毕 获取数据
  // 初始时要获取第一页的数据
    this.loadArticles(1)
    this.loadChannels() // 获取频道列表
  },
  mounted () {},
  methods: {
    // loadArticles 获取文章列表
    // 没传参数就等于1 传参了就是page
    loadArticles (page = 1) {
      // 重置高亮页码，防止数据和页码不对应
      this.page = page
      this.loading = true
      // getArticles 接收参数
      // 给getArticles 传参
      getArticles({
        // page:1, //当前页数
        page,
        // per_page: 10 // 每页显示条数
        per_page: this.pageSize,
        status: this.status, // 文章显示的状态
        channel_id: this.channelId,
        // 开始时间
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        // 截止时间
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        // console.log(res)
        // this.articles = res.data.data.results
        // this.totalCount=res.data.data.total_count
        // ES6提供的解构赋值
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onSubmit () {
      // console.log('submit!')
    },

    // page是点击的页码
    onCurrentChange (page) {
      // console.log(page) // 获取点击的页码
      this.loadArticles(page)
    },

    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },

    onDeleteArticle (articleId) {
      // console.log(articleId)
      // console.log(articleId.toString())
      this.$confirm('你确定要删除吗', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认删除
        // deleteArticle(articleId).then(res => {
        deleteArticle(articleId.toString()).then(res => {
          // console.log(res)
          // 删除成功 更新删除页的数据列表
          this.loadArticles(this.page)
        })
      }).catch(() => { // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // console.log('onDeleteArticle')
    }
  }
}

</script>
<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.bottom-card {
  margin-bottom: 20px;
}
.list-table{
  margin-bottom: 20px;
}
.article-cover {
width: 70px;
background-size: cover; // 最短边可以完全显示
}
</style>
