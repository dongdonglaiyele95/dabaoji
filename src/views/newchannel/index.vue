<template>
 <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="渠道代号">
    <el-input clearable v-model="ruleForm.code"></el-input>
  </el-form-item>
  <el-form-item label="渠道名称">
    <el-input clearable v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="渠道官网">
    <el-input clearable v-model="ruleForm.net"></el-input>
  </el-form-item>
  <el-form-item label="登录验证地址">
    <el-input clearable v-model="ruleForm.address"></el-input>
  </el-form-item>
  <el-form-item label="公钥">
    <el-input clearable v-model="ruleForm.key"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存渠道信息</el-button>
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return{
      ruleForm:{
        name: '',
        code:'',
        net:'',
        address:'',
        key:''
      }
    }
  },
  methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
    }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
</style>
