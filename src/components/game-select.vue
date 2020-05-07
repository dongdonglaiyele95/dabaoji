<template>
  <el-select @change="changeGame" clearable :value="value" placeholder="请选择游戏">
    <el-option
      :key="i"
      v-for="(item, i) in gameOptions"
      :label="item.gameName"
      :value="item.gameName"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "game-select",
  props: ["value"],
  data() {
    return {
      gameOptions: []
    };
  },
  created() {
    this.getgameOptions();
  },
  methods: {
    // 获取游戏选项
    async getgameOptions() {
      const {
        data: { data }
      } = await this.$http.get("game/getAllGame.php");
      this.gameOptions = data;
      // console.log(data);
    },
    changeGame(gameName) {
      this.$emit("input", gameName);
      this.$emit("changeSelect"); //打包界面 根据筛选条件改变清空选中的游戏包
    }
  }
};
</script>

<style lang="less" scoped></style>
