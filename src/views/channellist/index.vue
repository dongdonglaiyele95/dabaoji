<template>
  <div class="container">
    <el-table empty-text="正在加载，请稍后..." :data="list" width="100%">
      <el-table-column prop="channel_id" label="渠道编号"></el-table-column>
      <el-table-column prop="channel_codeName" label="渠道代号"></el-table-column>
      <el-table-column prop="channel_name" label="渠道名称"></el-table-column>
      <el-table-column prop="channel_loginVerfyUrl" label="登录验证地址"></el-table-column>
      <el-table-column label="详情" width="100">
        <template v-slot="scope">
          <el-button
            @click="$router.push('newchannel?id=' + scope.row.channel_id)"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page"
      :page-size="per_page"
      :total="total"
      @current-change="changePager"
      hide-on-single-page
      v-if="total!=0"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "channellist",
  data() {
    return {
      page: 1,
      per_page: 10,
      total: 0,
      list: []
    };
  },
  created() {
    this.page = Number(this.getChannelPage) || 1;
    this.channelList();
  },
  mounted() {
    // 刷新清除缓存会话数据
    window.addEventListener("beforeunload", e => {
      this.page = 1;
      this.setChannelPage(this.page);
    });
  },
  computed: {
    ...mapState(["getChannelPage"])
  },
  methods: {
    ...mapMutations(["setChannelPage"]),
    async channelList() {
      const {
        data: { data }
      } = await this.$http.get(`channel/getChannelList.php?page=${this.page}`);
      this.list = data.info;
      this.total = data.count;
    },
    changePager(newPage) {
      this.page = newPage;
      this.channelList();
      this.setChannelPage(this.page);
    }
  }
};
</script>
<style lang="less" scoped>
.el-pagination {
  text-align: center;
  margin-top: 25px;
}
</style>
