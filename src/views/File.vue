<template>
<div>
  <div class="flex">
    <el-upload action="/" :on-change='onChange' :auto-upload='false' :show-file-list="false" accept=".xls, .xlsx">
      <el-button size="small" style="margin:10px" type="primary" class="upload-bom"><i class="iconfont iconxlsx iconXlSX-sty"></i>
      <span class="iconXlSX-sty-test">文件</span></el-button>
    <!--              <div slot="tip" v-if='fileData'>{{ fileData.name }}</div>-->
    </el-upload>
    <el-input style="width:400px;margin-top:5px;" @change="input()" v-model="tableName" clearable placeholder="这里是可以清空的,表格名称格式为tb_XXX"></el-input>
    <el-button size="small" style="margin:10px" type="success" :disabled="disable" class="upload-bom" @click="createTable">保存</el-button>
    <el-button size="small" :disabled="loading" type="warning" style="margin:10px" class="upload-bom" @click="goHistry">历史</el-button>
  </div>
  <el-table v-loading="loading" element-loading-text="加载中..." :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50" element-loading-background="rgba(0, 0, 0, 0.8)" :data="outputs" style="margin-top: 20px" >
    <template v-for="(item,index) in tableHead">
    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>
  </template>
  </el-table>
</div>
</template>
<script scope>
import XLSX from 'xlsx'
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
      tableHead: [],
      outputs: [],
      excelHand: [],
      fileData: '',
      tableName: '',
      disable: true,
      loading: false
    }
  },
  methods: {
    input () {
      this.disable = true
      if (this.tableName !== '') {
        this.disable = false
      }
    },
    onChange (file, fileList) {
      this.fileData = file
      this.readExcel()
    },
    readExcel (e) {
      this.loading = true
      this.tableHead = []
      this.outputs = []
      this.excelHand = []
      const that = this
      const files = that.fileData
      // console.log(files)
      // console.log(files.size)
      if (!files) {
        return false
      } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0]
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
          that.outputs = []
          var headersey = []
          console.log(ws)
          for (var key in ws[0]) {
            headersey.push(key)
          }
          that.excelHand = headersey
          for (var j = 0; j < headersey.length; j++) {
            that.tableHead.push(
              {
                column_name: headersey[j], column_comment: headersey[j]
              }
            )
          }
          for (var i = 0; i < ws.length; i++) {
            var sheetData = {}
            for (var k = 0; k < headersey.length; k++) {
              sheetData[headersey[k]] = ws[i][headersey[k]]
            }
            that.outputs.push(sheetData)
          }
          this.$refs.upload.value = ''
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files.raw)
      this.loading = false
    },
    createTable () {
      this.loading = true
      const that = this
      var hand = []
      hand.push('id int primary key not null auto_increment')
      for (var i = 0; i < that.tableHead.length; i++) {
        hand.push(that.tableHead[i].column_name + ' varchar (255)')
      }
      var sqlBodys = hand.join(', ')
      console.log(sqlBodys)
      axios.get('/api/createTable', {
        params: {
          sqlBody: sqlBodys,
          tableName: that.tableName
        }
      }).then(res => {
        var sqlSingal = []
        var sqlAll = []
        for (var j = 0; j < that.outputs.length; j++) {
          for (var hands in that.excelHand) {
            sqlSingal.push(that.outputs[j][that.excelHand[hands]])
          }
          sqlAll.push(sqlSingal.join('\',\''))
          sqlSingal = []
        }
        // var sqlDetail = sqlAll.join(',')
        axios.post('/api/insertTable', {
          params: {
            tableName: that.tableName,
            sqlBody: sqlAll
          }
        }).then(res => {
          this.loading = false
        })
      })
    },
    goHistry () {
      const that = this
      that.proxy.$router.push({
        path: '/histry'
      })
    }
  }
}
</script>
<style>
 .flex{
   display: flex;
   flex-direction: row;
 }
</style>
