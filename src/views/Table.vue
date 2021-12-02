<template>
   <el-page-header content="数据库" @click="goBack" />
   <div class="flex">
   <el-button style="margin:10px" class="t" type="danger" @click="deleteTable">删除</el-button>
   <el-popover placement="right" :width="500" trigger="click">
      <template #reference>
        <el-button style="margin:10px" class="t" type="success">增加</el-button>
      </template>
    <el-form status-icon label-width="120px" class="demo-ruleForm">
      <template v-for="(item,index)  in addList" :key="index">
        <el-form-item :label="item.column_name">
          <el-input v-model="item.column_comment"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Submit</el-button >
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
    </el-popover>
  </div>
   <el-table @selection-change="handleSelectionChange"  :data="outputs" style="margin-top: 20px" >
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
      nonList: []
    }
  },
  methods: {
    deleteTable () {
      axios.get('/api/deleteTable', {
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
      console.log(this.addList)
    },
    resetForm () {
      this.addList = this.nonList
    },
    handleSelectionChange (val) {
      if (val.length > 0) {
        for (var i in val) {
          this.multipleSelection.push(val[i].id)
        }
      }
    },
    getIndexTable () {
      const that = this
      this.tableName = that.proxy.$route.params.tbName
      axios.get('/api/showTable', {
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
