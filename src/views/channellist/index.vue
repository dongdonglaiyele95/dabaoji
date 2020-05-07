<template>
  <div class="container">
    <el-table :data="list" width="100%">
      <el-table-column prop="channel_id" label="渠道编号" width="120"></el-table-column>
      <el-table-column prop="channel_name" label="渠道代号"></el-table-column>
      <el-table-column prop="channel" label="渠道名称"></el-table-column>
      <el-table-column prop="channel_web" label="渠道官网"></el-table-column>
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
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      page: 1,
      per_page: 10,
      total: 0,
      list: []
    };
  },
  computed: {
    // ...mapState(["username"])
  },
  created() {
    this.channelList();
  },
  methods: {
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
