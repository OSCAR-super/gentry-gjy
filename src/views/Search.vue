<template>
 <el-page-header content="返回" @click="goBack" />
<el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="name" :disabled="boolean" @change="SearchName()" clearable placeholder="姓名"></el-input></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="id" :disabled="change" @change="SearchId()" clearable placeholder="工号"></el-input></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">
      <el-date-picker
        v-model="time"
        type="date"
        placeholder="选择一个时间"
      >
      </el-date-picker></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"><el-button @click="Search()" type="primary">搜索</el-button></div></el-col>
</el-row>
</template>
<script scope>
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
      id: '',
      name: '',
      time: '',
      boolean: false,
      change: false
    }
  },
  methods: {
    SearchName () {
      if (this.name !== '') {
        this.change = true
      } else {
        this.change = false
      }
    },
    SearchId () {
      if (this.id !== '') {
        this.boolean = true
      } else {
        this.boolean = false
      }
    },
    goBack () {
      const that = this
      that.proxy.$router.go(-1)
    },
    Search () {
      var that = this
      axios.get('/api/searchUser', {
        params: {
          id: that.id,
          name: that.name,
          id_number: that.time
        }
      }).then(res => {
        console.log(res.data)
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
</style>
