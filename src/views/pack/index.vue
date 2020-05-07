<template>
  <div class="container" v-loading="loading">
    <el-form :inline="true" ref="packForm" class="demo-ruleForm">
      <el-form-item label="游戏">
        <game-select @changeSelect="changeSelect" v-model="game"></game-select>
      </el-form-item>
      <el-form-item label="渠道">
        <channel-select @changeSelect="changeSelect" v-model="channel_name"></channel-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAllGameAppId()">确定</el-button>
      </el-form-item>
      <div class="pack">
        <el-button @click="pack()" type="primary">开始打包</el-button>
        <el-button @click="dialogVisible = true" type="success">查看最近打包日志</el-button>
      </div>
      <div>请选择要打包的游戏包</div>
      <div class="gameAppList">
        <el-checkbox-group @change="changeApp" v-model="option" :max="1">
          <el-checkbox
            border
            :key="item.appId"
            @change="changeAppId"
            v-for="item in appIdOption"
            :label="item"
            :value="item"
          >{{item.package}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-dialog title="最近打包日志" :visible.sync="dialogVisible">
        <iframe src="http://192.168.2.238:8080/v1/api/log/log.log" frameborder="1"></iframe>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false, //弹窗关闭与否
      appIdOption: [], //游戏包列表
      option: [], //选中的单个游戏包
      flag: false, //单个游戏包选中与否
      appId: "", //游戏包唯一标识
      channel_name: "", //筛选渠道
      game: "" //筛选游戏 必选项
    };
  },
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    // load的映射
    ...mapMutations(["setLoad"]),
    // 获取所有游戏ID
    async getAllGameAppId() {
      const {
        data: { data }
      } = await this.$http.get(
        `game/getAllGameAppId.php?game=${this.game}&channel_name=${this.channel_name}`
      );
      if (this.game == "") {
        this.$message.warning("游戏是筛选必选项");
        return false;
      }
      this.appIdOption = data;
      if (data.length == 0) {
        this.$message.info("暂无游戏包");
      }
      // console.log(data);
    },
    // 选择的具体游戏包
    changeApp(data) {
      if (data.length > 0) {
        this.appId = Number(data[0].appId);
      }
    },
    // 具体游戏包选中与否
    changeAppId(data) {
      this.flag = data;
    },
    // 游戏或渠道筛选条件改变时
    changeSelect() {
      this.option = [];
      this.appIdOption = [];
      this.flag = false;
    },
    // 打包
    pack() {
      if (Number(this.appId) == 0 || !this.flag) {
        this.$message.info("请选择游戏包");
        return false;
      }
      this.setLoad(true);
      this.$message.success("开始打包，请稍后...");
      // 定时器
      let timer = window.setInterval(async () => {
        const {
          data: { result }
        } = await this.$http.get(`package.php?appid=${Number(this.appId)}`);
        if (result != 10006) {
          resultValue(result);
        }
      }, 20000);
      let _this = this;
      function resultValue(result) {
        window.clearInterval(timer);
        _this.setLoad(false);
        if (result == 10000) {
          _this.$message.success("打包成功，打开日志即可查看打包结果");
        } else {
          _this.$message.info("打包失败");
        }
      }
      //
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  .el-form-item {
    margin-right: 50px;
  }
}
/deep/ .el-dialog {
  margin: 20px auto !important;
  height: 90%;
  width: 70%;
  .el-dialog__body {
    text-align: center;
    height: 90%;
    width: 90%;
    iframe {
      height: 90%;
      width: 90%;
    }
  }
}
.pack {
  display: flex;
  justify-content: space-around;
  margin: 20px 0 20px 250px;
}
.gameAppList {
  height: 260px;
  width: 1000px;
  border: 1px solid #eee;
  padding: 10px;
  overflow: auto;
  margin-top: 20px;
}
.el-checkbox-group {
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  .el-checkbox {
    flex: 20%;
    margin-top: 10px;
  }
  .el-checkbox.is-bordered {
    margin-left: 0 !important;
  }
  .el-checkbox:last-of-type {
    margin-right: 30px !important;
  }
}
</style>
