<template>
<el-row :gutter="20">
    <el-col :span="8"><div class="grid-content bg-purple"><el-button class="box" @click="goSearch" type="warning">查找</el-button></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"><el-button class="box" @click="goInsert" type="primary">导入</el-button></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
  </el-row>
</template>
<script scope>
import { getCurrentInstance } from 'vue'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    console.log(proxy.$router)
    return {
      proxy
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goInsert () {
      const that = this
      that.proxy.$router.push({
        path: '/Insect'
      })
    },
    goSearch () {
      const that = this
      that.proxy.$router.push({
        path: '/Search'
      })
    }
  }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.box{
  font-size:30px;
  width:100%;
  height:600px;
  margin: 50px;
}
</style>
