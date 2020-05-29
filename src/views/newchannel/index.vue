<template>
  <div class="container">
    <el-tag type="warning">{{ ruleForm.channel_id ? "修改" : "新建" }}渠道信息</el-tag>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      :rules="rules"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item prop="channel_codeName" label="渠道代号">
        <el-input clearable v-model="ruleForm.channel_codeName"></el-input>
      </el-form-item>
      <el-form-item prop="channel_name" label="渠道名称">
        <el-input clearable v-model="ruleForm.channel_name"></el-input>
      </el-form-item>
      <el-form-item prop="channel_loginVerfyUrl" label="登录验证地址">
        <el-input clearable v-model="ruleForm.channel_loginVerfyUrl"></el-input>
      </el-form-item>
      <el-form-item prop="channel_publicKey" label="公钥">
        <el-input clearable v-model="ruleForm.channel_publicKey"></el-input>
      </el-form-item>
      <el-form-item class="list" :key="i" v-for="(item, i) in ruleForm.channel_paramter">
        <el-input disabled v-model="item.key"></el-input>
        <el-button type="warning" @click.prevent="removeChannel(item)">删除</el-button>
      </el-form-item>
      <el-form-item class="otherData" label="其他参数">
        <el-input clearable v-model.trim="dataing"></el-input>
        <el-button type="primary" @click="addData()">添加</el-button>
      </el-form-item>
      <el-form-item v-if="!ruleForm.channel_id">
        <el-button type="primary" @click="submitForm()">保存渠道信息</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="success" @click="modifyChannel()">修改渠道信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "newchannel",
  data() {
    return {
      dataing: "",
      ruleForm: {
        channel_paramter: [
          //添加信息
          {
            key: "",
            value: ""
          }
        ],
        channel_codeName: "", //渠道代号
        channel_name: "", //渠道名称
        channel_loginVerfyUrl: "", //登录验证地址
        channel_publicKey: "", //公钥
        channel_id: null
      },
      rules: {
        channel_codeName: [
          {
            required: true,
            message: "请输入渠道代号",
            min: 1,
            trigger: "blur"
          }
        ],
        channel_name: [
          {
            required: true,
            message: "请输入渠道名称",
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
    this.ruleForm.channel_paramter.splice(0, 1);
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
        channel_paramter: [],
        channel_codeName: "",
        channel_name: "",
        channel_loginVerfyUrl: "",
        channel_publicKey: "",
        channel_id: null
      };
    }
  },
  methods: {
    //添加动态数据
    addData() {
      if (this.ruleForm.channel_paramter == "" || null) {
        this.ruleForm.channel_paramter = [];
      }
      if (this.dataing) {
        this.ruleForm.channel_paramter.push({ key: this.dataing, value: "" });
        this.dataing = "";
      }
    },
    //删除动态数据
    removeChannel(item) {
      var index = this.ruleForm.channel_paramter.indexOf(item);
      if (index !== -1) {
        this.ruleForm.channel_paramter.splice(index, 1);
      }
    },
    //提交信息
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.channel_paramter = JSON.stringify(
            this.ruleForm.channel_paramter
          );
          this.$http.post("channel/newChannel.php", this.ruleForm).then(res => {
            this.$router.push("/channellist");
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
      if (this.ruleForm.channel_paramter == null) {
        this.ruleForm.channel_paramter = [];
      }
      if (data.channel_paramter) {
        this.ruleForm.channel_paramter = JSON.parse(data.channel_paramter);
      }
    },
    modifyChannel() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.channel_paramter = JSON.stringify(
            this.ruleForm.channel_paramter
          );
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
  .otherData {
    width: 100%;
    position: absolute;
    left: 550px;
    top: 250px;
    .el-input {
      width: 260px;
      margin-right: 20px;
    }
  }
  .list {
    .el-input {
      width: 260px;
      margin-right: 20px;
    }
  }
}
.el-input {
  width: 400px;
}
</style>
