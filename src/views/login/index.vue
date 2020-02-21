<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px">

    <el-form-item>
      <el-button type="success" @click="addGame">添加其他配置</el-button>
    </el-form-item>

    <el-form-item :key="game.key" v-for="game in ruleForm.games">
      <el-input v-model="game.key"></el-input>
      <el-input v-model="game.value"></el-input>
      <el-button @click.prevent="removeGame(game)">删除</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        games: [
          {
            key: "",
            value: ""
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    removeGame(item) {
      var index = this.ruleForm.games.indexOf(item);
      if (index !== -1) {
        this.ruleForm.games.splice(index, 1);
      }
    },
    addGame() {
      this.ruleForm.games.push({
        key: "",
        value: ""
      });
    }

  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 200px;
  margin-right: 20px;
}
</style>