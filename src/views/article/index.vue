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
    <el-radio-group v-model="form.resource">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
      <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
      <el-radio label="审核失败"></el-radio>
      <el-radio label="已删除"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道 :">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期 :">
    <el-date-picker
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">筛选</el-button>
  </el-form-item>
  </el-form>
</el-card>
<!-- 表格 -->
<el-card class="bottom-card">
   <div slot="header" class="clearfix" size="small">
    根据筛选条件共查询到 46147 条结果：
  </div>
  <!-- 把需要展示的数据绑定个el-table 中的data属性
       :data="articles"
       注意：你不用去v-for 遍历，他自己会遍历
       prop 用来设定要渲染的列表数据字段
   -->
 <el-table
    :data="articles"
    stripe
    style="width: 100%"
    class="list-table"
    size='small'>
    <el-table-column
      prop=""
      label="封面">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <!-- 如果需要在自定义列模板上获取数据就在template上声明
      slot-scope="scope"  scope 是自己起的名字随便-->
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
      <template>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          plain
          circle
          ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          plain
          circle
          ></el-button>
      </template>
    </el-table-column>
  </el-table>
     <!-- 分页 -->
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</el-card>
  </div>
</template>

<script>
// 导入
import { getArticles } from '@/api/article'

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
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'warning' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
  // 生命周期钩子函数
  // create 是组件初始化完毕 获取数据
    this.loadArticles()
  },
  mounted () {},
  methods: {
    loadArticles () {
      // 调用
      getArticles().then(res => {
        // console.log(res)
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
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
</style>
