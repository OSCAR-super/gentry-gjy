<template>
  <el-page-header content="历史数据库" @click="goBack" />
  <template v-for="(item, index) in tableNameList" :key="index">
    <el-button @click="button" class="box" type="primary" plain>{{item}}</el-button>
  </template>
</template>
<script>
import axios from 'axios'
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
      tableNameList: []
    }
  },
  methods: {
    button (index) {
      const that = this
      that.proxy.$router.push({
        name: 'table', params: { tbName: index.target.outerText }
      })
    },
    goBack () {
      const that = this
      that.proxy.$router.go(-1)
    },
    getTable () {
      axios.get('http://127.0.0.1:3000' + '/api/historyTable', {
        params: {}
      }).then(res => {
        this.tableNameList = res.data
      })
    }
  },
  mounted () {
    this.getTable()
  }
}
</script>
<style>
.box{
  width:15%;
  height:100px;
  margin: 50px;
}
</style>
