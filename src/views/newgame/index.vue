<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <h3>游戏信息</h3>
    <el-form-item label="游戏名称">
      <el-input clearable v-model="ruleForm.gameName"></el-input>
    </el-form-item>
    <el-form-item label="包名">
      <el-input clearable v-model="ruleForm.packName"></el-input>
    </el-form-item>

    <!-- 动态添加游戏信息 -->
    <el-form-item>
      <el-button type="success" @click="addGame">添加其他配置</el-button>
    </el-form-item>

    <el-form-item :key="game.key" v-for="game in ruleForm.games">
      <el-input clearable v-model="game.key"></el-input>
      <el-input clearable v-model="game.value"></el-input>
      <el-button type="warning" @click.prevent="removeGame(game)">删除</el-button>
    </el-form-item>

    <h3>渠道配置</h3>
    <el-form-item label="选择渠道" prop="channel">
      <el-select clearable v-model="ruleForm.channelChoice" placeholder="请选择渠道">
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
    <el-form-item label="渠道appid">
      <el-input clearable v-model="ruleForm.appid"></el-input>
    </el-form-item>
    <el-form-item label="渠道appkey">
      <el-input clearable v-model="ruleForm.appkey"></el-input>
    </el-form-item>
    <el-form-item label="PLAT">
      <el-input clearable v-model="ruleForm.plat"></el-input>
    </el-form-item>

    <!-- 动态添加渠道信息 -->
    <el-form-item>
      <el-button type="success" @click="addChannel">添加其他信息</el-button>
    </el-form-item>
    <el-form-item :key="channel.key" v-for="channel in ruleForm.channels">
      <el-input clearable v-model="channel.key"></el-input>
      <el-input clearable v-model="channel.value"></el-input>
      <el-button type="warning" @click.prevent="removeChannel(channel)">删除</el-button>
    </el-form-item>

    <el-form-item>
      <el-button medium type="primary" @click="submitForm('ruleForm')">保存游戏信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        packName: "",
        gameName: "",
        channelChoice: "",
        appid: "",
        appkey: "",
        plat: "",
        games: [
          //游戏信息
          {
            key: Date.now(),
            value: ""
          }
        ],
        channels: [
          //渠道信息
          {
            key: Date.now() + 1,
            value: ""
          }
        ]
      }
    };
  },
  methods: {
    // 提交信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 删除游戏
    removeGame(item) {
      var index = this.ruleForm.games.indexOf(item);
      if (index !== -1) {
        this.ruleForm.games.splice(index, 1);
      }
    },
    // 添加游戏
    addGame() {
      this.ruleForm.games.push({
        key: "",
        value: ""
      });
    },
    // 删除游戏
    removeChannel(item) {
      var index = this.ruleForm.channels.indexOf(item);
      if (index !== -1) {
        this.ruleForm.channels.splice(index, 1);
      }
    },
    // 添加游戏
    addChannel() {
      this.ruleForm.channels.push({
        key: "",
        value: ""
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
  margin-right: 15px;
}
</style>
