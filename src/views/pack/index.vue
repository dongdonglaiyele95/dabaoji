<template>
  <div class="container">
    <el-form :inline="true" ref="packForm" class="demo-ruleForm">
      <el-form-item label="游戏">
        <game-select @changeSelect="changeSelect" v-model="game_name"></game-select>
      </el-form-item>
      <el-form-item label="渠道">
        <channel-select @changeSelect="changeSelect" v-model="channel_codeName"></channel-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAllGameAppId()">确定</el-button>
      </el-form-item>
      <div class="list">
        <div class="head">请选择游戏包进行打包</div>
        <div class="gameAppList">
          <el-checkbox-group @change="changeApp" v-model="option">
            <el-checkbox
              border
              :key="item.app_id"
              @change="changeAppId"
              v-for="item in appIdOption"
              :label="item"
              :value="item"
            >{{item.package}}</el-checkbox>
          </el-checkbox-group>
          <div class="pack">
            <el-checkbox
              v-if="this.appIdOption.length>0"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="selAll"
              border
              size="large"
            >全选</el-checkbox>
            <el-button class="startPack" @click="pack()" type="primary">开始打包</el-button>
          </div>
        </div>
        <div class="packingList">
          <div class="head2">打包任务列表</div>
          <el-table fit :data="packingData||[]" style="width: 100%">
            <el-table-column prop="appName" label="游戏包"></el-table-column>
            <el-table-column label="状态">
              <template v-slot="scope">
                <el-tag type="info" v-if="scope.row.status == 0">准备打包</el-tag>
                <span v-else-if="scope.row.status == 1">
                  <el-tag>正在打包</el-tag>
                  {{x}}
                </span>
                <el-tag type="success" v-else-if="scope.row.status == 2">打包成功</el-tag>
                <el-tag type="danger" v-else>打包失败</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="查看日志">
              <template v-slot="scope">
                <el-button
                  v-if="scope.row.status == 3"
                  @click="dialogVisible = true"
                  size="mini"
                  plain
                  type="primary"
                >日志</el-button>
                <el-dialog title="打包日志" :visible.sync="dialogVisible">
                  <iframe :src="scope.row.logUrl" frameborder="1"></iframe>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "pack",
  data() {
    return {
      dialogVisible: false, //弹窗关闭与否
      appIdOption: [], //游戏包列表
      option: [], //选中的游戏包
      flag: false, //单个游戏包选中与否
      isIndeterminate: false, //对el-checkbox控制不完整的全选状态
      checkAll: false, //对el-checkbox控制全选状态
      app_id: "", //游戏包唯一标识
      channel_codeName: "", //筛选渠道
      game_name: "", //筛选游戏 必选项
      packingData: [], //正在打包的游戏包 前台
      x: "" //加载点
    };
  },
  created() {
    this.packingList();
    let timer = window.setInterval(async () => {
      this.packingList();
    }, 2000);
    window.setInterval(() => this.countSecond(), 800);
  },
  methods: {
    //加载圈
    countSecond() {
      this.x = this.x == "......" ? "." : this.x + ".";
    },
    // 获取所有游戏ID
    async getAllGameAppId() {
      if (this.flag) {
        return false;
      }
      const {
        data: { data }
      } = await this.$http.get(
        `game/getAllGameAppId.php?game_name=${this.game_name}&channel_codeName=${this.channel_codeName}`
      );
      if (this.game_name == "") {
        this.$message.warning("游戏是筛选必选项");
        return false;
      }
      this.appIdOption = data;
      if (data.length == 0) {
        this.$message.info("暂无游戏包");
      }
    },
    //全选
    selAll(val) {
      this.option = val ? this.appIdOption : [];
    },
    // 选择的具体游戏包
    changeApp(data) {
      let checkedCount = data.length;
      this.checkAll = checkedCount === this.appIdOption.length;
    },
    // 具体游戏包选中与否 ture/false
    changeAppId(data) {
      this.flag = data;
    },
    // 游戏或渠道筛选条件改变时
    changeSelect() {
      this.option = [];
      this.appIdOption = [];
      this.flag = false;
    },
    //请求打包列表
    async packingList() {
      const {
        data: { data }
      } = await this.$http.get("getPackingList.php");
      this.packingData = data;
    },
    // 进行打包
    async pack() {
      if (this.option.length > 0) {
        var packArr = this.option.map(v => {
          return v.app_id;
        });
        const { data } = await this.$http.get(`package.php?app_id=${packArr}`);
        if (data.result == 10000) {
          this.$message.success(data.description);
        } else {
          this.$message.warning(data.description);
        }
      } else {
        this.$message.info("请选择游戏包");
      }
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
.list {
  position: relative;
  .head {
    margin-bottom: 30px;
  }
  .gameAppList {
    position: absolute;
    height: 600px;
    width: 900px;
    border: 1px solid #ddd;
    padding: 10px;
    overflow: auto;
    .el-checkbox-group {
      height: 500px;
    }
    .pack {
      position: absolute;
      bottom: 10px;
      .startPack {
        position: absolute;
        width: 180px;
        height: 50px;
        left: 400px;
        bottom: 10px;
      }
    }
  }
  .packingList {
    position: absolute;
    left: 950px;
    width: 600px;
    height: 620px;
    margin-right: 100px;
    border: 1px solid #ddd;
    overflow: auto;
    text-align: center;
    .head2 {
      font-weight: 700;
      margin: 16px 0;
    }
  }
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
