<template>
  <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="userName" prop="userName">
      <el-input type="text" v-model="loginForm.userName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">login</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
      <router-link to="/finished">已完成</router-link>
      <router-view/>
    </el-form-item>
  </el-form>
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
    var validateuser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.loginForm.checkPass !== '') {
          this.$refs.loginForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: 'test',
        password: '123456'
      },
      rules2: {
        userName: [
          { validator: validateuser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          axios.get('/api/login', {
            params: {
              userName: this.loginForm.userName,
              password: this.loginForm.password
            }
          }).then(res => {
            if (res.data.state === 1) {
              that.proxy.$router.push({
                path: '/finished'
              })
            } else {
              console.log('error submit!!')
            }
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
