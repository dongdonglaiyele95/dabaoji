<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择渠道">
    <el-option
      :key="item.channel_id"
      v-for="item in channelOptions"
      :label="item.channel_codeName"
      :value="item"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "channel-select",
  props: ["value"],
  data() {
    return {
      channelOptions: []
    };
  },
  created() {
    this.getchannelOptions(); //获取渠道选项
  },
  methods: {
    //获取渠道选项
    async getchannelOptions() {
      const {
        data: { data }
      } = await this.$http.get("channel/getAllChannelName.php");
      this.channelOptions = data;
    },
    // 改变渠道
    changeChannel(data) {
      this.$emit("input", data.channel_codeName || "");
      this.$emit("changeSelect", data); //打包界面 根据筛选条件改变清空选中的游戏包
    }
  }
};
</script>

<style lang="less" scoped></style>