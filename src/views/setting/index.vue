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
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="编号:">111
          </el-form-item>
            <el-form-item label="手机号:">123456
          </el-form-item>
            <el-form-item label="媒体名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍:">
            <el-input type="textarea" v-model="form.intro"></el-input>
          </el-form-item>
            <el-form-item label="邮箱:">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      </el-col>
        <el-col :offset="4" :span="8">
        <el-avatar shape="square" :size="200" fit="cover" src=https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg></el-avatar>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'setting',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        desc: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}

</script>
<style scoped lang='less'>
</style>
