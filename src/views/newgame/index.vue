<template>
  <div class="container">
    <el-tag type="info">{{ ruleForm.appId ? "修改" : "新建" }}游戏信息</el-tag>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <h3>游戏信息</h3>
      <el-form-item prop="game" label="游戏">
        <game-select v-model="ruleForm.game"></game-select>
      </el-form-item>
      <el-form-item prop="appName" label="游戏名称">
        <el-input clearable v-model="ruleForm.appName"></el-input>
      </el-form-item>
      <el-form-item prop="bundleId" label="包名">
        <el-input clearable v-model="ruleForm.bundleId"></el-input>
      </el-form-item>
      <el-form-item prop="game_version" label="游戏版本号">
        <el-input clearable v-model="ruleForm.game_version"></el-input>
      </el-form-item>
      <el-form-item prop="os" label="OS">
        <el-select @change="changeOs" v-model="ruleForm.os" placeholder="请选择操作系统">
          <el-option :key="item.id" v-for="item in osOption" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!--  { id: "1", name: "iOS" }, iOS固定配置 -->
      <div class="iOSsetting" v-if="ruleForm.os=='1'">
        <el-form-item prop="project_root" label="游戏根目录">
          <el-input clearable v-model="ruleForm.project_root"></el-input>
        </el-form-item>
        <el-form-item prop="codesign_p12" label="打包签名证书">
          <el-input clearable v-model="ruleForm.codesign_p12"></el-input>
        </el-form-item>
        <el-form-item prop="Provisioning_Profile" label="打包签名描述文件">
          <el-input clearable v-model="ruleForm.Provisioning_Profile"></el-input>
        </el-form-item>
      </div>
      <!--  { id: "2", name: "Android" }  Android固定配置-->
      <div v-if="ruleForm.os=='2'">Android 配置</div>
      <!-- 动态添加游戏信息 -->

      <!-- <el-form-item>
        <el-button type="info" @click="addGame">添加其他配置</el-button>
      </el-form-item>
      <el-form-item :key="i" v-for="(game, i) in ruleForm.game_info">
        <el-input clearable v-model="game.key"></el-input>
        <el-input clearable v-model="game.value"></el-input>
        <el-button type="warning" @click.prevent="removeGame(game)">删除</el-button>
      </el-form-item>-->

      <!-- 渠道 -->
      <h3>渠道配置</h3>
      <el-form-item prop="channel_name" label="选择渠道">
        <channel-select v-model="ruleForm.channel_name"></channel-select>
      </el-form-item>
      <el-form-item prop="channel_appid" label="渠道 appid">
        <el-input clearable v-model="ruleForm.channel_appid"></el-input>
      </el-form-item>
      <el-form-item prop="channel_appkey" label="渠道 appkey">
        <el-input class="channelSetting" clearable v-model="ruleForm.channel_appkey"></el-input>
      </el-form-item>
      <el-form-item prop="channel_others" label="备用参数">
        <el-input clearable v-model="ruleForm.channel_others"></el-input>
      </el-form-item>
      <el-form-item prop="payNotifyUrl" label="支付回调地址">
        <el-input class="channelSetting" clearable v-model="ruleForm.payNotifyUrl"></el-input>
      </el-form-item>
      <el-form-item prop="plat" label="PLAT">
        <el-input clearable v-model="ruleForm.plat"></el-input>
      </el-form-item>

      <!-- 动态添加渠道信息 -->
      <!-- 
      <el-form-item>
        <el-button type="info" @click="addChannel">添加其他信息</el-button>
      </el-form-item>
      <el-form-item :key="i + 'a'" v-for="(channel, i) in ruleForm.channel_info">
        <el-input clearable v-model="channel.key"></el-input>
        <el-input clearable v-model="channel.value"></el-input>
        <el-button type="warning" @click.prevent="removeChannel(channel)">删除</el-button>
      </el-form-item>-->

      <el-form-item v-if="!ruleForm.appId">
        <el-button class="cli" medium type="primary" @click="submitForm('ruleForm')">保存游戏信息</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button class="cli" medium type="success" @click="modifyGame('ruleForm')">修改游戏信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      osOption: [
        { id: "1", name: "iOS" },
        { id: "2", name: "Android" }
      ],
      ruleForm: {
        //游戏配置
        appId: "",
        bundleId: "",
        game: "",
        appName: "",
        game_version: "", //游戏版本号
        os: "", //操作系统
        //ios固定配置
        project_root: "", //游戏根目录
        codesign_p12: "", //打包签名证书
        Provisioning_Profile: "", //打包签名描述文件
        //渠道配置
        channel_name: "",
        channel_appid: "",
        plat: "",
        channel_appkey: "",
        channel_others: "",
        payNotifyUrl: "" //支付回调地址
        // game_info: [
        //   //游戏信息
        //   {
        //     key: "",
        //     value: ""
        //   }
        // ],
        // channel_info: [
        //   //渠道信息
        //   {
        //     key: "",
        //     value: ""
        //   }
        // ]
      },
      // 校验规则
      rules: {
        game: [
          {
            required: true,
            message: "请选择游戏",
            min: 1,
            trigger: "blur"
          }
        ],
        appName: [
          {
            required: true,
            message: "请输入游戏名称",
            min: 1,
            trigger: "blur"
          }
        ],
        os: [
          {
            required: true,
            message: "请选择操作系统",
            min: 1,
            trigger: "blur"
          }
        ],
        project_root: [
          {
            required: true,
            message: "请输入游戏根目录",
            min: 1,
            trigger: "blur"
          }
        ],
        codesign_p12: [
          {
            required: true,
            message: "请输入打包签名证书",
            min: 1,
            trigger: "blur"
          }
        ],
        Provisioning_Profile: [
          {
            required: true,
            message: "请输入打包签名描述文件",
            min: 1,
            trigger: "blur"
          }
        ],
        game_version: [
          {
            required: true,
            message: "请输入游戏版本号",
            min: 1,
            trigger: "blur"
          }
        ],
        plat: [
          {
            required: true,
            message: "请输入PLAT",
            min: 1,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.ruleForm.appId = this.$route.query.id;
    if (this.ruleForm.appId) {
      this.getGame();
    }
  },
  watch: {
    "$route.query.id": function(newVal, oldVal) {
      if (newVal) {
        this.ruleForm.appId = this.$route.query.id;
        if (this.ruleForm.appId) {
          this.getGame();
        }
        return false;
      }
      this.ruleForm = {
        bundleId: "",
        game: "",
        appName: "",
        os: "",
        //ios固定配置
        project_root: "",
        codesign_p12: "",
        Provisioning_Profile: "",
        game_version: "",
        osOption: [
          { id: "1", name: "iOS" },
          { id: "2", name: "Android" }
        ],
        // 渠道配置
        channel_name: "",
        channel_appid: "",
        plat: "",
        channel_appkey: "",
        channel_others: "",
        payNotifyUrl: ""
        // game_info: [
        //   //游戏信息
        //   {
        //     key: "",
        //     value: ""
        //   }
        // ],
        // channel_info: [
        //   //渠道信息
        //   {
        //     key: "",
        //     value: ""
        //   }
        // ]
      };
    }
  },
  methods: {
    //修改操作系统
    changeOs(os) {
      this.ruleForm.project_root = "";
      this.ruleForm.codesign_p12 = "";
      this.ruleForm.Provisioning_Profile = "";
    },
    //单个游戏信息getGameInfo.php
    async getGame() {
      const {
        data: { data }
      } = await this.$http.get(
        `game/getGameInfo.php?appId=${this.ruleForm.appId}`
      );
      this.ruleForm = data;
      // this.ruleForm.game_info = JSON.parse(data.game_info);
      // this.ruleForm.channel_info = JSON.parse(data.channel_info);
    },

    // 修改游戏信息
    modifyGame() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.ruleForm.game_info = JSON.stringify(this.ruleForm.game_info);
          // this.ruleForm.channel_info = JSON.stringify(
          //   this.ruleForm.channel_info
          // );
          this.$http.post("game/modifyGame.php", this.ruleForm).then(res => {
            this.$router.push("gamelist");
            this.$message.success("修改游戏信息成功");
          });
        } else {
          this.$message.error("信息错误");
        }
      });
    },

    // 提交信息
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.ruleForm.game_info = JSON.stringify(this.ruleForm.game_info);
          // this.ruleForm.channel_info = JSON.stringify(
          //   this.ruleForm.channel_info
          // );
          this.$http.post("game/newGame.php", this.ruleForm).then(res => {
            this.$router.push("/gamelist");
            // console.log(res);
            this.$message.success("保存游戏信息成功");
          });
        } else {
          this.$message.error("信息错误");
        }
      });
    },

    // 删除游戏
    removeGame(item) {
      var index = this.ruleForm.game_info.indexOf(item);
      if (index !== -1) {
        this.ruleForm.game_info.splice(index, 1);
      }
    },
    // 添加游戏
    addGame() {
      this.ruleForm.game_info.push({
        key: "",
        value: ""
      });
    },
    // 删除渠道
    removeChannel(item) {
      var index = this.ruleForm.channel_info.indexOf(item);
      if (index !== -1) {
        this.ruleForm.channel_info.splice(index, 1);
      }
    },
    // 添加渠道
    addChannel() {
      this.ruleForm.channel_info.push({
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
.iOSsetting {
  .el-input {
    width: 460px;
  }
}
.channelSetting {
  width: 450px;
}
.cli {
  margin-top: 30px;
  margin-left: 10px;
  width: 200px;
}
</style>
