<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <el-table
      :data="comment"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.comment_status ? '打开评论' :'关闭评论'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
       <template slot-scope="scope">
        <el-switch
          v-model="scope.row.comment_status "
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="onStatusChange(scope.row)">
        </el-switch>
       </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
    </el-card>
  </div>
</template>

<script>
import {
  getComment,
  updataCommentStatus
} from '@/api/comment'
export default {
  name: 'comment',
  components: {},
  props: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      comment: [], // 评论数据列表
      pageSize: 20,
      totalCount: 0,
      page: 1

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      // 保证分页组件激活的页码 和请求数据的页码一致
      this.page = page
      getComment({
        page,
        per_page: this.pageSize, // 不写的话就是每页默认10条
        response_type: 'comment'
      }).then(res => {
        console.log(res)
        this.comment = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    // pageSize 改变时会触发 (每页条数)
    handleSizeChange (page) {
      this.loadArticles(page)
    },
    // currentPage 改变时会触发 (当前页)
    handleCurrentChange (page) {
      this.loadArticles(page)
    },
    onStatusChange (comment) {
      updataCommentStatus(comment.id.toString(), comment.comment_status).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: res.allow_comment ? '开启文章评论' : '关闭文章评论'
        })
      })
    }
  }
}
</script>

<style scoped lang='less'>
</style>
