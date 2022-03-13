<template>
 <el-page-header content="返回" @click="goBack" />
  <el-form ref="formRef" :model="form" label-width="250px" :rules="rules">
    <el-form-item label="工号" prop="id">
      <el-input v-model="form.id" disabled></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" disabled></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="id_number">
      <el-input v-model="form.id_number" disabled></el-input>
    </el-form-item>
    <el-form-item label="工作单位" prop="work_unit">
      <el-input v-model="form.work_unit" disabled></el-input>
    </el-form-item>
    <el-form-item label="是否最新简历">
      <el-switch v-model="form.resume_state" disabled></el-switch>
    </el-form-item>
    <el-form-item label="年限起算时间" prop="start_time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.start_time"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
          disabled
        ></el-date-picker>
      </el-col>
      </el-form-item>
        <!-- <span class="text-gray-500">-</span> -->
      <div v-if="form.resume_state">
      <el-form-item label="年限终止时间" prop="end_time">
        <el-col :span="11">
          <el-date-picker
          disabled
          v-model="form.end_time"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
          ></el-date-picker>
        </el-col>
    </el-form-item>
      </div>
    <el-form-item label="年限计算">
      <el-input v-model="form.time" disabled></el-input>
    </el-form-item>
    <el-form-item label="是否计算享受住房货币补贴年限">
      <el-switch v-model="form.subsidy_state" disabled></el-switch>
    </el-form-item>
    <el-form-item label="计算补贴享受年限">
      <el-input v-model="form.subsidy" disabled></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" type="textarea" disabled></el-input>
    </el-form-item>
  </el-form>
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
    goBack () {
      const that = this
      that.proxy.$router.go(-1)
    },
    sendIndexTable () {
      const that = this
      console.log(123123, that.proxy.$route.params)
      this.form = that.proxy.$route.params
    }
  },
  mounted () {
    this.sendIndexTable()
    // this.getTable()
  }
}
</script>
<style>
</style>
