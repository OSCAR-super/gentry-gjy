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
  </el-form>
</template>