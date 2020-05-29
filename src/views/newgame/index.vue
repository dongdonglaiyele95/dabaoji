<template>
  <div class="container">
    <el-tag type="info">{{ ruleForm.app_id ? "修改" : "新建" }}游戏信息</el-tag>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <!-- 上传素材插件-->
      <div class="uploadImage">
        <upload-image v-model="ruleForm.icon_url">icon</upload-image>
        <upload-image v-model="ruleForm.icon_url">icon</upload-image>
        <upload-image v-model="ruleForm.icon_url">icon</upload-image>
        <upload-image v-model="ruleForm.icon_url">icon</upload-image>
        <upload-image v-model="ruleForm.icon_url">icon</upload-image>
      </div>

      <h3>游戏信息</h3>
      <el-form-item prop="game_name" label="游戏">
        <game-select v-model="ruleForm.game_name"></game-select>
      </el-form-item>
      <el-form-item prop="app_displayName" label="app_displayName">
        <el-input clearable v-model="ruleForm.app_displayName"></el-input>
      </el-form-item>
      <el-form-item prop="app_name" label="游戏名称">
        <el-input clearable v-model="ruleForm.app_name"></el-input>
      </el-form-item>
      <el-form-item prop="app_bundleId" label="包名">
        <el-input clearable v-model="ruleForm.app_bundleId"></el-input>
      </el-form-item>
      <el-form-item prop="app_version" label="游戏版本号">
        <el-input clearable v-model="ruleForm.app_version"></el-input>
      </el-form-item>
      <el-form-item prop="app_os" label="OS">
        <el-select v-model="ruleForm.app_os" placeholder="请选择操作系统">
          <el-option :key="item.id" v-for="item in osOption" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 动态添加游戏信息 -->
      <el-form-item>
        <el-button type="info" @click="addGame">添加其他配置</el-button>
      </el-form-item>
      <el-form-item :key="i" v-for="(game, i) in ruleForm.game_info">
        <el-input clearable v-model.trim="game.key"></el-input>
        <el-input class="channelSetting" clearable v-model.trim="game.value"></el-input>
        <el-button type="warning" @click.prevent="removeGame(game)">删除</el-button>
      </el-form-item>

      <!-- 渠道 -->
      <h3>渠道配置</h3>
      <el-form-item prop="channel_plat" label="PLAT">
        <el-input clearable v-model="ruleForm.channel_plat"></el-input>
      </el-form-item>
      <el-form-item prop="channel_codeName" label="选择渠道">
        <channel-select @changeSelect="changeSelect" v-model="ruleForm.channel_codeName"></channel-select>
      </el-form-item>
      <!-- channel_paramter -->
      <el-form-item :key="i + 'x'" v-for="(item, i) in ruleForm.channel_paramter">
        <el-input disabled v-model="item.key"></el-input>
        <el-input class="channelSetting" clearable v-model="item.value"></el-input>
      </el-form-item>

      <!-- 动态添加渠道信息 -->
      <el-form-item>
        <el-button type="info" @click="addChannel">添加其他信息</el-button>
      </el-form-item>
      <el-form-item :key="i + 'a'" v-for="(channel, i) in ruleForm.channel_info">
        <el-input clearable v-model.trim="channel.key"></el-input>
        <el-input class="channelSetting" clearable v-model.trim="channel.value"></el-input>
        <el-button type="warning" @click.prevent="removeChannel(channel)">删除</el-button>
      </el-form-item>

      <el-form-item v-if="!ruleForm.app_id">
        <el-button class="cli" medium type="primary" @click="submitForm('ruleForm')">保存游戏信息</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button class="cli" medium type="success" @click="modifyGame('ruleForm')">修改游戏信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import defaultPng from "@/assets/images/default.png";
export default {
  name: "newgame",
  data() {
    return {
      defaultPng,
      osOption: [
        { id: "1", name: "iOS" },
        { id: "2", name: "Android" }
      ],
      ruleForm: {
        icon_url: "",
        //游戏配置
        app_id: "",
        app_bundleId: "",
        game_name: "", //选择游戏 项目
        app_displayName: "", //游戏 桌面名称
        app_name: "", //游戏在运营层⾯面的昵称
        app_version: "", //游戏版本号
        app_os: "", //操作系统
        //渠道配置
        channel_codeName: "",
        channel_plat: "",
        channel_paramter: [],
        game_info: [
          //游戏信息
          {
            key: "",
            value: ""
          }
        ],
        channel_info: [
          //渠道信息
          {
            key: "",
            value: ""
          }
        ]
      },
      // 校验规则
      rules: {
        game_name: [
          {
            required: true,
            message: "请选择游戏",
            min: 1,
            trigger: "blur"
          }
        ],
        app_displayName: [
          {
            required: true,
            message: "请输入app_displayName名称",
            min: 1,
            trigger: "blur"
          }
        ],
        app_name: [
          {
            required: true,
            message: "请输入游戏名称",
            min: 1,
            trigger: "blur"
          }
        ],
        app_os: [
          {
            required: true,
            message: "请选择操作系统",
            min: 1,
            trigger: "blur"
          }
        ],
        app_version: [
          {
            required: true,
            message: "请输入游戏版本号",
            min: 1,
            trigger: "blur"
          }
        ],
        channel_plat: [
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
    this.ruleForm.game_info.splice(0, 1);
    this.ruleForm.channel_info.splice(0, 1);
    this.ruleForm.app_id = this.$route.query.id;
    if (this.ruleForm.app_id) {
      this.getGame();
    }
  },
  watch: {
    "$route.query.id": function(newVal, oldVal) {
      if (newVal) {
        this.ruleForm.app_id = this.$route.query.id;
        if (this.ruleForm.app_id) {
          this.getGame();
        }
        return false;
      }
      this.ruleForm = {
        icon_url: this.defaultPng,
        app_bundleId: "",
        game_name: "",
        app_displayName: "",
        app_name: "",
        app_os: "",
        app_version: "",
        osOption: [
          { id: "1", name: "iOS" },
          { id: "2", name: "Android" }
        ],
        // 渠道配置
        channel_codeName: "",
        channel_plat: "",
        channel_paramter: [],
        game_info: [
          //游戏信息
          {
            key: "",
            value: ""
          }
        ],
        channel_info: [
          //渠道信息
          {
            key: "",
            value: ""
          }
        ]
      };
      this.ruleForm.game_info.splice(0, 1);
      this.ruleForm.channel_info.splice(0, 1);
    }
  },
  methods: {
    // 改变渠道
    changeSelect(val) {
      if (val) {
        this.ruleForm.channel_paramter = JSON.parse(val.channel_paramter);
      } else {
        this.ruleForm.channel_paramter = [];
      }
    },
    // 单个游戏信息getGameInfo.php
    async getGame() {
      const {
        data: { data }
      } = await this.$http.get(
        `game/getGameInfo.php?app_id=${this.ruleForm.app_id}`
      );
      this.ruleForm = data;
      if (data.game_info) {
        this.ruleForm.game_info = JSON.parse(data.game_info);
      }
      if (data.channel_info) {
        this.ruleForm.channel_info = JSON.parse(data.channel_info);
      }
      if (data.channel_paramter) {
        this.ruleForm.channel_paramter = JSON.parse(data.channel_paramter);
      }
    },
    // 提交信息改变格式
    formatter() {
      this.ruleForm.game_info = JSON.stringify(this.ruleForm.game_info);
      this.ruleForm.channel_info = JSON.stringify(this.ruleForm.channel_info);
      this.ruleForm.channel_paramter = JSON.stringify(
        this.ruleForm.channel_paramter
      );
    },
    // 提交后转化回来格式
    toFofmatter() {
      this.ruleForm.game_info = JSON.parse(this.ruleForm.game_info);
      this.ruleForm.channel_info = JSON.parse(this.ruleForm.channel_info);
      this.ruleForm.channel_paramter = JSON.parse(
        this.ruleForm.channel_paramter
      );
    },
    // 修改游戏信息
    modifyGame() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.formatter();
          this.$http.post("game/modifyGame.php", this.ruleForm).then(res => {
            if (res.data.result == 10000) {
              this.toFofmatter();
              this.$router.push("gamelist");
              this.$message.success("修改游戏信息成功");
            } else {
              this.$message.error("修改游戏信息失败");
            }
          });
        } else {
          this.$message.error("信息错误");
        }
      });
    },
    // 提交游戏信息
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.formatter();
          this.$http.post("game/newGame.php", this.ruleForm).then(res => {
            this.toFofmatter();
            this.$router.push("/gamelist");
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
      if (this.ruleForm.game_info == "") {
        this.ruleForm.game_info = [];
      }
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
      if (this.ruleForm.channel_info == "") {
        this.ruleForm.channel_info = [];
      }
      this.ruleForm.channel_info.push({
        key: "",
        value: ""
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  position: relative;
  .uploadImage {
    position: absolute;
    display: flex;
    left: 500px;
    margin-top: 60px;
  }
}
.el-input {
  width: 220px;
  margin-right: 15px;
}
.channelSetting {
  width: 420px;
}
.cli {
  margin-top: 30px;
  margin-left: 10px;
  width: 200px;
}
</style>