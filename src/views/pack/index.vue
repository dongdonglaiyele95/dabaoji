<template>
  <el-form :model="packForm" ref="packForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="添加游戏包" prop="gamepack">
      <el-select clearable v-model="packForm.packChoice" placeholder="请选择游戏包">
        <el-option label="10000" value="0"></el-option>
        <el-option label="10001" value="1"></el-option>
        <el-option label="10002" value="2"></el-option>
        <el-option label="10003" value="3"></el-option>
        <el-option label="10004" value="4"></el-option>
        <el-option label="10005" value="5"></el-option>
        <el-option label="10006" value="6"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">开始打包</el-button>
    </el-form-item>
    <hr>
    <el-form-item>
      <el-input type="textarea"  :rows="28" placeholder="打包日志" v-model="packForm.textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      packForm: {
        packChoice: "",
        textarea:""
      }
    };
  }
};
</script>

<style lang="less" scoped>
</style>
