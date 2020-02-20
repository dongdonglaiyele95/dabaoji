<template>
 <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="选择渠道" prop="channel">
    <el-select clearable v-model="ruleForm.channel" placeholder="请选择活动区域">
      <el-option label="渠道1" value="1"></el-option>
      <el-option label="渠道2" value="2"></el-option>
      <el-option label="渠道3" value="3"></el-option>
      <el-option label="渠道4" value="4"></el-option>
      <el-option label="渠道5" value="5"></el-option>
      <el-option label="渠道6" value="6"></el-option>
      <el-option label="渠道7" value="7"></el-option>
      <el-option label="渠道8" value="8"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="游戏路劲">
    <el-input  v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="包名">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="证书">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="描述文件">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="游戏名字">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="版本号">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="渠道名称">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="渠道SDK版本">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="URL">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="PLAT">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="name">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="游戏路径">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="游戏路径">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="游戏路径">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="游戏路径">
    <el-input></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存游戏信息</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return{
      ruleForm:{
        name: '',
        channel: '',
      }
    }
  },
  methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
</style>
