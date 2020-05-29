<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "app",
  created() {
    this.cookieToken();
  },
  methods: {
    ...mapMutations(["delUser"]),
    //  cookieToken登录 判断token过期否
    async cookieToken() {
      const {
        data: { result }
      } = await this.$http.post("user/cookieTokenLogin.php");
      if (result != 10000) {
        this.delUser();
        this.$router.replace("/login");
      }
    }
  }
};
</script>

<style lang="less">
</style>
