<template>
  <div class="container">
    <el-tag type="warning"
      >{{ ruleForm.channel_id ? "修改" : "新建" }}渠道信息</el-tag
    >
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      :rules="rules"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item prop="channel_name" label="渠道代号">
        <el-input clearable v-model="ruleForm.channel_name"></el-input>
      </el-form-item>
      <el-form-item prop="channel" label="渠道名称">
        <el-input clearable v-model="ruleForm.channel"></el-input>
      </el-form-item>
      <el-form-item prop="channel_web" label="渠道官网">
        <el-input clearable v-model="ruleForm.channel_web"></el-input>
      </el-form-item>
      <el-form-item prop="channel_loginVerfyUrl" label="登录验证地址">
        <el-input clearable v-model="ruleForm.channel_loginVerfyUrl"></el-input>
      </el-form-item>
      <el-form-item prop="channel_publicKey" label="公钥">
        <el-input clearable v-model="ruleForm.channel_publicKey"></el-input>
      </el-form-item>
      <el-form-item v-if="!ruleForm.channel_id">
        <el-button type="primary" @click="submitForm()">保存渠道信息</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="success" @click="modifyChannel()"
          >修改渠道信息</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        channel_name: "", //渠道代号
        channel: "", //渠道名称
        channel_web: "", //渠道官网
        channel_loginVerfyUrl: "", //登录验证地址
        channel_publicKey: "", //公钥
        channel_id: null
      },
      rules: {
        channel_name: [
          {
            required: true,
            message: "请输入渠道代号",
            min: 1,
            trigger: "blur"
          }
        ],
        channel: [
          {
            required: true,
            message: "请输入渠道名称",
            min: 1,
            trigger: "blur"
          }
        ],
        channel_web: [
          {
            required: true,
            message: "请输入渠道官网",
            min: 1,
            trigger: "blur"
          }
        ],
        channel_loginVerfyUrl: [
          {
            required: true,
            message: "请输入登录验证地址",
            min: 1,
            trigger: "blur"
          }
        ],
        channel_publicKey: [
          {
            required: true,
            message: "请输入公钥",
            min: 1,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.ruleForm.channel_id = this.$route.query.id;
    if (this.ruleForm.channel_id) {
      this.getChannel();
    }
  },
  watch: {
    "$route.query.id": function(newVal, oldVal) {
      if (newVal) {
        this.ruleForm.channel_id = this.$route.query.id;
        if (this.ruleForm.channel_id) {
          this.getChannel();
        }
        return false;
      }
      this.ruleForm = {
        channel_name: "",
        channel: "",
        channel_web: "",
        channel_loginVerfyUrl: "",
        channel_publicKey: "",
        channel_id: null
      };
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http.post("channel/newChannel.php", this.ruleForm).then(res => {
            this.$router.push("/channellist");
            // console.log(res);
            this.$message.success("保存渠道信息成功");
          });
        } else {
          this.$message.error("信息输入错误");
        }
      });
    },
    async getChannel() {
      const {
        data: { data }
      } = await this.$http.get(
        `channel/getChannelInfo.php?channel_id=${this.ruleForm.channel_id}`
      );
      this.ruleForm = data;
    },
    modifyChannel() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http
            .post("channel/modifyChannel.php", this.ruleForm)
            .then(res => {
              this.$router.push("channellist");
              this.$message.success("修改渠道信息成功");
            });
        } else {
          this.$message.error("信息错误");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  position: absolute;
  top: 20%;
  left: 28%;
}
.el-input {
  width: 400px;
}
</style>
