<template>
   <el-page-header content="数据库" @click="goBack" />
   <div class="flex">
   <el-button style="margin:10px" :disabled="disable" class="t" type="danger" @click="deleteTable">删除</el-button>
   <el-popover placement="right" :width="500" trigger="click">
      <template #reference>
        <el-button style="margin:10px" class="t" type="success">增加</el-button>
      </template>
    <el-form status-icon label-width="120px" class="demo-ruleForm">
      <template v-for="(item,index)  in addList" :key="index">
        <el-form-item :label="item.column_name" v-if="item.column_name != 'id'">
          <el-input v-model="item.column_comment"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    </el-popover>
   <el-popover placement="right" :width="500" trigger="click">
      <template #reference>
        <el-button :disabled="disable" style="margin:10px" class="t" type="warning">修改</el-button>
      </template>
    <el-form status-icon label-width="120px" class="demo-ruleForm">
      <template v-for="(item,index)  in changeList" :key="index">
        <el-form-item :label="item.column_name" v-if="item.column_name != 'id'">
          <el-input v-model="item.column_comment"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitChangeForm()">提交</el-button >
        <el-button @click="resetChangeForm()">重置</el-button>
      </el-form-item>
    </el-form>
    </el-popover>
  </div>
   <el-table v-loading="loading" element-loading-text="加载中..." :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50" element-loading-background="rgba(0, 0, 0, 0.8)"  @selection-change="handleSelectionChange"  :data="outputs" style="margin-top: 20px" >
    <template v-for="(item,index) in tableHead">
      <el-table-column type="selection" width="55" :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name == 'id'"></el-table-column>
      <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import axios from 'axios'
import { getCurrentInstance } from 'vue'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    return {
      proxy
    }
  },
  data () {
    return {
      tableHead: [],
      tableName: '',
      outputs: [],
      multipleSelection: [],
      addList: [],
      nonList: [],
      changeList: [],
      loading: false,
      disable: true
    }
  },
  methods: {
    deleteTable () {
      axios.get('http://127.0.0.1:3000' + '/api/deleteTable', {
        params: {
          tableName: this.tableName,
          multipleSelection: this.multipleSelection
        }
      }).then(res => {
        this.tableNameList = res.data
        this.tableHead = []
        this.addList = []
        this.nonList = []
        this.getIndexTable()
      })
    },
    submitForm () {
      var sqlBody = []
      for (var i in this.addList) {
        if (this.addList[i].column_name !== 'id') {
          console.log(this.addList[i].column_comment)
          sqlBody.push(this.addList[i].column_comment)
        }
      }
      axios.get('http://127.0.0.1:3000' + '/api/addTable', {
        params: {
          tableName: this.tableName,
          addList: sqlBody
        }
      }).then(res => {
        this.tableHead = []
        this.addList = []
        this.nonList = []
        this.getIndexTable()
      })
    },
    submitChangeForm () {
      var sqlBody = []
      var id
      for (var i in this.changeList) {
        if (this.changeList[i].column_name === 'id') {
          id = this.changeList[i].column_comment
        }
        sqlBody.push(this.changeList[i].column_comment)
      }
      axios.get('http://127.0.0.1:3000' + '/api/changeTable', {
        params: {
          tableName: this.tableName,
          changeList: sqlBody,
          id: id
        }
      }).then(res => {
        this.tableHead = []
        this.addList = []
        this.nonList = []
        this.getIndexTable()
      })
    },
    resetForm () {
      this.addList = []
    },
    resetChangeForm () {
      this.changeList = this.nonList
    },
    handleSelectionChange (val) {
      var that = this
      if (val.length > 0) {
        for (var i in val) {
          this.multipleSelection.push(val[i].id)
        }
        that.changeList = []
        that.nonList = []
        for (var key in val[val.length - 1]) {
          that.changeList.push(
            {
              column_name: key, column_comment: val[val.length - 1][key]
            }
          )
          that.nonList.push(
            {
              column_name: key, column_comment: val[val.length - 1][key]
            }
          )
        }
      }
      if (val.length !== 0) {
        this.disable = false
      }
    },
    getIndexTable () {
      this.loading = true
      const that = this
      this.tableName = that.proxy.$route.params.tbName
      axios.get('http://127.0.0.1:3000' + '/api/showTable', {
        params: {
          tableName: this.tableName
        }
      }).then(res => {
        that.outputs = []
        var headersey = []
        for (var key in res.data[0]) {
          headersey.push(key)
        }
        for (var j = 0; j < headersey.length; j++) {
          that.tableHead.push(
            {
              column_name: headersey[j], column_comment: headersey[j]
            }
          )
          that.addList.push(
            {
              column_name: headersey[j], column_comment: ''
            }
          )
          that.nonList.push(
            {
              column_name: headersey[j], column_comment: ''
            }
          )
        }
        for (var i = 0; i < res.data.length; i++) {
          var sheetData = {}
          for (var k = 0; k < headersey.length; k++) {
            sheetData[headersey[k]] = res.data[i][headersey[k]]
          }
          that.outputs.push(sheetData)
        }
      })
      this.loading = false
    },
    goBack () {
      const that = this
      that.proxy.$router.go(-1)
    }
  },
  mounted () {
    this.getIndexTable()
    // this.getTable()
  }
}
</script>
<style>
.flex{
  position: absolute;
  top:6.5%;
  left:23%;
}
</style>
