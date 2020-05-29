<template>
  <div class="login_box">
    <el-card>
      <img src="../../assets/images/logo.png" alt />
      <h3>文脉渠道管理系统</h3>
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="登录" name="first">
          <el-form :model="loginform">
            <el-form-item prop="user_accountName" label="用户名">
              <el-input clearable v-model.trim="loginform.user_accountName"></el-input>
            </el-form-item>
            <el-form-item prop="user_accountPassword" label="密码">
              <el-input clearable type="password" v-model.trim="loginform.user_accountPassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:280px" type="primary" @click="login()">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册" name="second">
          <el-form :model="registerform" ref="registerform" :rules="registerRule">
            <el-form-item prop="user_accountName" label="账号">
              <el-input clearable placeholder="请输入邮箱" v-model.trim="registerform.user_accountName"></el-input>
            </el-form-item>
            <el-form-item prop="user_accountPassword" label="密码">
              <el-input clearable v-model.trim="registerform.user_accountPassword"></el-input>
            </el-form-item>
            <el-form-item prop="applicant_name" label="姓名">
              <el-input clearable v-model.trim="registerform.applicant_name"></el-input>
            </el-form-item>
            <el-form-item prop="user_roleType" label="角色">
              <el-select
                style="width:280px"
                @change="changeRole"
                placeholder="请选择您的角色"
                v-model="registerform.user_roleType"
              >
                <el-option
                  v-for="role in roleOption"
                  :key="role.id"
                  :label="role.name"
                  :value="role.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="user_ownGame"
              v-if="registerform.user_roleType == '运营'"
              label="游戏权限"
            >
              <game-select style="width:280px" v-model="registerform.user_ownGame"></game-select>
            </el-form-item>
            <el-form-item prop="user_ownGame" v-else style="display:none" label="游戏权限">
              <el-input :value="(registerform.user_ownGame = 'all')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:280px" type="primary" @click="register()">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    //账户
    const checkUser_accountName = (rule, value, callback) => {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        return callback(new Error("邮箱账户不符合"));
      }
      callback();
    };
    //姓名
    const checkApplicant_name = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5]{0,}$/.test(value)) {
        return callback(new Error("姓名必须是中文"));
      }
      callback();
    };
    return {
      loginform: {
        user_accountName: "", //用户名
        user_accountPassword: "" //密码
      },
      registerform: {
        applicant_name: "", //姓名
        user_accountPassword: "", //密码
        user_accountName: "", //账户
        user_roleType: "", //角色
        user_ownGame: "" //游戏权限
      },
      registerRule: {
        user_accountName: [
          {
            required: true,
            message: "邮箱账户不符合",
            min: 1,
            trigger: "blur",
            validator: checkUser_accountName
          }
        ],
        user_accountPassword: [
          {
            required: true,
            message: "密码至少6位",
            min: 6,
            trigger: "blur"
          }
        ],
        applicant_name: [
          {
            required: true,
            message: "请输入姓名",
            min: 1,
            trigger: "blur"
          },
          {
            message: "姓名不正确",
            trigger: "change",
            validator: checkApplicant_name
          }
        ],
        role: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ],
        user_ownGame: [
          {
            required: true,
            message: "请选择游戏权限",
            trigger: "change"
          }
        ]
      },
      activeName: "first",
      roleOption: [
        { id: "1", name: "admin" },
        { id: "2", name: "开发者" },
        { id: "3", name: "运营" }
      ]
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    // 登录
    async login() {
      const {
        data: { data }
      } = await this.$http.post("user/login.php", this.loginform);
      if (data.user_roleType) {
        this.setUser(data);
        this.$router.push("/");
      } else {
        this.$message.warning("用户信息错误");
      }
    },
    // 选中角色
    changeRole(name) {
      if (name == "运营" && this.registerform.user_ownGame == "all") {
        this.registerform.user_ownGame = "";
      }
    },
    // 注册
    register() {
      this.$refs.registerform.validate(async valid => {
        if (valid) {
          const data = await this.$http.get("user/register.php", {
            params: this.registerform
          });
          // console.log(data);
          if (data.data.result == "10000") {
            this.$message.success("申请提交成功，注册结果会发送到您的邮箱");
          } else if (data.data.result == "10001") {
            this.$message.warning("该用户名正在申请中");
          } else {
            this.$message.warning("注册信息填写错误");
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_box {
  background: url(../../assets/images/background.png) no-repeat center / cover;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-card {
    position: absolute;
    text-align: center;
    width: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: skyblue;
    border-radius: 15px;
    .el-form {
      text-align: right;
      .el-input {
        width: 280px;
      }
    }
  }
}
</style>
