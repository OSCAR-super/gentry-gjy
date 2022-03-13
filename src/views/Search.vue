<template>
 <el-page-header content="返回" @click="goBack" />
<el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="name" :disabled="boolean" @change="SearchName()" clearable placeholder="姓名"></el-input></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="id" :disabled="change" @change="SearchId()" clearable placeholder="工号"></el-input></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">
      <el-date-picker
        @change="SearchTime()"
        :disabled="changeTime"
        v-model="time"
        type="date"
        placeholder="选择一个时间"
      >
      </el-date-picker></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"><el-button @click="SearchAll()" type="primary">搜索</el-button></div></el-col>
</el-row>
<el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="工号"
      width="100"
      prop="id">
    </el-table-column>
      <el-table-column
      label="姓名"
      width="100"
      prop="name">
    </el-table-column>
    <el-table-column
      label="身份证号"
      width="100"
      prop="id_number">
    </el-table-column>
    <el-table-column
      label="工作单位"
      width="100"
      prop="work_unit">
    </el-table-column>
    <el-table-column
      label="是否最新简历"
      :formatter="formatBoolean"
      width="100"
      prop="resume_state">
    </el-table-column>
    <el-table-column
      label="年限起算时间"
      :formatter="formatDate"
      width="100"
      prop="start_time">
    </el-table-column>
    <el-table-column
      label="年限终止时间"
      :formatter="formatDate"
      width="100"
      prop="end_time">
    </el-table-column>
    <el-table-column
      prop="time"
      label="年限计算"
      width="100">
    </el-table-column>
    <el-table-column
      prop="subsidy_state"
      :formatter="formatBoolean"
      label="是否计算享受住房货币补贴年限"
      width="100">
    </el-table-column>
    <el-table-column
      prop="subsidy"
      label="计算补贴享受年限"
      width="100">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>

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
      change: false,
      tableData: [],
      multipleSelection: [],
      changeTime: false
    }
  },
  methods: {
    formatDate (row, column) {
      const data = row[column.property]
      if (data === '') {
        return null
      } else {
        const dt = new Date(data)
        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
      }
    },
    formatBoolean (row, column) {
      const boolean = row[column.property]
      if (boolean === 1) {
        return '是'
      } else {
        return '否'
      }
    },
    SearchTime () {
      if (this.time !== null) {
        this.boolean = true
        this.change = true
      } else {
        this.boolean = false
        this.change = false
      }
    },
    SearchName () {
      if (this.name !== '') {
        this.changeTime = true
        this.change = true
      } else {
        this.changeTime = false
        this.change = false
      }
    },
    SearchId () {
      if (this.id !== '') {
        this.changeTime = true
        this.boolean = true
      } else {
        this.changeTime = false
        this.boolean = false
      }
    },
    goBack () {
      const that = this
      that.proxy.$router.go(-1)
    },
    SearchAll () {
      if (this.time !== null) {
        this.Search()
      } else {
        console.log(1)
        // axios.get('/api/searchAllUser').then(res => {
        //   console.log(res.data)
        //   var compare = function (obj1, obj2) {
        //     var val1 = obj1.id
        //     var val2 = obj2.id
        //     if (val1 < val2) {
        //       return -1
        //     } else if (val1 > val2) {
        //       return 1
        //     } else {
        //       return 0
        //     }
        //   }
        //   res.data = res.data.sort(compare)
        //   for (var i in res.data) {
        //     if (i > 0) {
        //       if (res.data[i].id === res.data[i++].id) {
        //         res.data[i]
        //       }
        //       console.log(res.data)
        //     }
        //   }
        // })
      }
    },
    handleEdit (index, row) {
      const that = this
      console.log(index)
      that.proxy.$router.push({
        name: 'show', params: row
      })
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
        this.tableData = []
        var compare = function (obj1, obj2) {
          var val1 = obj1.id
          var val2 = obj2.id
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
        res.data = res.data.sort(compare)
        for (var i in res.data) {
          var date
          if (res.data[i].resume_state) {
            date = { newDate: res.data[i].end_time, startDate: res.data[i].start_time }
          } else {
            date = { newDate: new Date(), startDate: res.data[i].start_time }
          }
          for (var ii in date) {
            var seperator1 = '-'
            var year = new Date(date[ii]).getFullYear()
            var month = new Date(date[ii]).getMonth() + 1
            var strDate = new Date(date[ii]).getDate()
            var minute = new Date(date[ii]).getMinutes()
            var hour = new Date(date[ii]).getHours()
            var second = new Date(date[ii]).getSeconds()
            if (month >= 1 && month <= 9) {
              month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = '0' + strDate
            }
            if (hour >= 0 && hour <= 9) {
              hour = '0' + hour
            }
            if (minute >= 0 && minute <= 9) {
              minute = '0' + minute
            }
            if (second >= 0 && second <= 9) {
              second = '0' + second
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate
            date[ii] = currentdate
          }
          let date1 = date.newDate.split('-')
          date1 = parseInt(date1[0]) * 12 + parseInt(date1[1])
          let date2 = date.startDate.split('-')
          date2 = parseInt(date2[0]) * 12 + parseInt(date2[1])
          res.data[i].time = date1 - date2
          if (res.data[i].subsidy_state) {
            res.data[i].subsidy = res.data[i].time
          } else {
            res.data[i].subsidy = 0
          }
          this.tableData.push(res.data[i])
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
