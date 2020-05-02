<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
          <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <!-- 标签页 -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="粉丝列表" name="first">
              粉丝列表
              <el-row :gutter="10">
                <el-col v-for="(item, i) in updatefans"
                :key="i"
                :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                  <div class="fans">
                    <el-avatar
                    shape="circle"
                    :size="90"
                    fit="cover"
                    :src="item.photo">
                    </el-avatar>
                    <p>{{item.name}}</p>
                    <el-row>
                      <el-button
                      type="success"
                      plain
                      icon="el-icon-plus"
                      size="small">成功按钮</el-button>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
          </el-tab-pane>
          <el-tab-pane label="粉丝画像" name="second">
                粉丝画像
            <!-- 1、为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div ref="main" style="width: 600px;height:400px;"></div>
          </el-tab-pane>
        </el-tabs>
        <!-- 分页 -->
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          :current-page.sync="page"
          @current-change="onChangPage"
          >
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getFans } from '@/api/fans'

// 2、导入ecahrts
import echarts from 'echarts'
export default {
  name: 'getFans',
  components: {},
  props: {},
  data () {
    return {
      activeName: 'first',
      updatefans: [],
      totalCount: 0,
      pageSize: 50,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadfans()
  },
  mounted () {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)

    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    }
    // 4、使用指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onloadfans (page = 1) {
      getFans({
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.totalCount = res.data.data.total_count
        this.updatefans = res.data.data.results
      })
    },
    onChangPage (value) {
      this.onloadfans(value)
    }
  }
}
</script>

<style scoped lang='less'>
.fans {
  height: 200px;
  border: 1px dashed #ccc;
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.pagination{
  margin-top: 20px;
}
</style>
