<template>
  <el-container class="my-container">
    <el-aside width="200px">
      <img src="../../assets/images/logo.png" alt />
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="green"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item v-if="user.user_roleType != '运营'" index="/channellist">
          <i class="el-icon-s-order"></i>
          <span slot="title">渠道列表</span>
        </el-menu-item>
        <el-menu-item v-if="user.user_roleType != '运营'" index="/newchannel">
          <i class="el-icon-s-flag"></i>
          <span slot="title">新建渠道</span>
        </el-menu-item>
        <el-menu-item v-if="user.user_roleType != '运营'" index="/gamelist">
          <i class="el-icon-s-grid"></i>
          <span slot="title">游戏列表</span>
        </el-menu-item>
        <el-menu-item v-if="user.user_roleType != '运营'" index="/newgame">
          <i class="el-icon-first-aid-kit"></i>
          <span slot="title">新建游戏</span>
        </el-menu-item>
        <el-menu-item index="/channelpack">
          <i class="el-icon-copy-document"></i>
          <span slot="title">渠道包</span>
        </el-menu-item>
        <el-menu-item index="/pack">
          <i class="el-icon-full-screen"></i>
          <span slot="title">打包</span>
        </el-menu-item>
        <el-menu-item v-if="user.user_roleType == 'admin'" index="/manager">
          <i class="el-icon-message-solid"></i>
          <span slot="title">权限管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="icon el-icon-office-building"></span>
        <span class="text">&nbsp;&nbsp;北京文脉互动科技有限公司</span>
        <div class="right">
          <span class="icon el-icon-s-custom"></span>
          <span class="name">{{ user.user_accountName }}</span>
          <el-button @click="logout()" size="mini" round>退出登录</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations(["delUser"]),
    logout() {
      this.delUser();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: green;
    img {
      margin-top: 24px;
      margin-left: 8px;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 20px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-right: 10px;
      font-weight: 700;
      font-size: 16px;
    }
    .right {
      float: right;
      .name {
        margin: 0 6px;
        font-size: 15px;
        vertical-align: middle;
      }
    }
  }
}
</style>
