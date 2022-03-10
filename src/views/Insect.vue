<template>
 <el-page-header content="返回" @click="goBack" />
  <el-form ref="formRef" :model="form" label-width="250px" :rules="rules">
    <el-form-item label="工号" prop="id">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="id_number">
      <el-input v-model="form.id_number"></el-input>
    </el-form-item>
    <el-form-item label="工作单位" prop="work_unit">
      <el-input v-model="form.work_unit"></el-input>
    </el-form-item>
    <el-form-item label="是否最新简历">
      <el-switch v-model="form.resume_state" @change="switchInput()"></el-switch>
    </el-form-item>
    <el-form-item label="年限起算时间" prop="start_time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.start_time"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
          @change="input()"
        ></el-date-picker>
      </el-col>
      </el-form-item>
        <!-- <span class="text-gray-500">-</span> -->
      <div v-if="form.resume_state">
      <el-form-item label="年限终止时间" prop="end_time">
        <el-col :span="11">
          <el-date-picker
          v-model="form.end_time"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
          @change="input()"
          ></el-date-picker>
        </el-col>
    </el-form-item>
      </div>
    <el-form-item label="年限计算">
      <el-input v-model="form.time" disabled></el-input>
    </el-form-item>
    <el-form-item label="是否计算享受住房货币补贴年限">
      <el-switch v-model="form.subsidy_state" @change="change()"></el-switch>
    </el-form-item>
    <el-form-item label="计算补贴享受年限">
      <el-input v-model="form.subsidy" disabled></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="onClean">重置</el-button>
    </el-form-item>
  </el-form>
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
      form: {
        id: '',
        name: '',
        id_number: '',
        work_unit: '',
        resume_state: true,
        start_time: '',
        end_time: '',
        time: '',
        subsidy_state: false,
        subsidy: '',
        remark: ''
      },
      rules: {
        id: [
          { required: true, message: '工号必填', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        id_number: [
          { required: true, message: '身份证号必填', trigger: 'blur' }
        ],
        work_unit: [
          { required: true, message: '工作单位必填', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '起算时间必填', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '结束时间必填', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    change () {
      if (this.form.subsidy_state) {
        this.form.subsidy = this.form.time
      } else {
        this.form.subsidy = 0
      }
    },
    goBack () {
      const that = this
      that.proxy.$router.go(-1)
    },
    switchInput () {
      const that = this
      if (!that.form.resume_state) {
        this.form.end_time = ''
      }
      if (!that.form.resume_state && this.form.start_time !== '') {
        this.input()
      }
    },
    input () {
      const that = this
      var date
      if (that.form.resume_state) {
        date = { newDate: this.form.end_time, startDate: this.form.start_time }
      } else {
        date = { newDate: new Date(), startDate: this.form.start_time }
        this.form.end_time = ''
      }
      if (!(this.form.end_time === '' && this.form.resume_state)) {
        for (var i in date) {
          var seperator1 = '-'
          var year = date[i].getFullYear()
          var month = date[i].getMonth() + 1
          var strDate = date[i].getDate()
          var minute = date[i].getMinutes()
          var hour = date[i].getHours()
          var second = date[i].getSeconds()
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
          date[i] = currentdate
        }
        let date1 = date.newDate.split('-')
        date1 = parseInt(date1[0]) * 12 + parseInt(date1[1])
        let date2 = date.startDate.split('-')
        date2 = parseInt(date2[0]) * 12 + parseInt(date2[1])
        this.form.time = date1 - date2
        if (this.form.subsidy_state) {
          this.form.subsidy = this.form.time
        } else {
          this.form.subsidy = 0
        }
      }
    },
    onClean () {
      this.form = {
        id: '',
        name: '',
        id_number: '',
        work_unit: '',
        resume_state: true,
        start_time: '',
        end_time: '',
        time: '',
        subsidy_state: false,
        subsidy: '',
        remark: ''
      }
    },
    onSubmit () {
      var that = this
      axios.get('/api/addMaster', {
        params: {
          id: that.form.id,
          name: that.form.name,
          id_number: that.form.id_number,
          work_unit: that.form.work_unit,
          resume_state: that.form.resume_state,
          start_time: that.form.start_time,
          end_time: that.form.end_time,
          subsidy_state: that.form.subsidy_state,
          remark: that.form.remark
        }
      }).then(res => {
      })
    }
  }
}
</script>
<style>
</style>
