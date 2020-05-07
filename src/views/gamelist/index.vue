<template>
  <div class="container">
    <!-- 筛选卡 -->
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item prop="game" label="游戏">
          <game-select v-model="reqParams.game"></game-select>
        </el-form-item>
        <el-form-item prop="channel_name" label="渠道">
          <channel-select v-model="reqParams.channel_name"></channel-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <el-table :data="list" fit>
        <el-table-column prop="appId" label="APPID"></el-table-column>
        <el-table-column prop="appName" label="appName"></el-table-column>
        <el-table-column prop="bundleId" label="包名"></el-table-column>
        <el-table-column prop="channel_name" label="渠道"></el-table-column>
        <el-table-column label="详情" width="160">
          <template v-slot="scope">
            <el-button
              @click="$router.push('newgame?id=' + scope.row.appId)"
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
        :current-page="reqParams.page"
        :page-size="per_page"
        @current-change="changePager"
        :total="total"
        hide-on-single-page
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reqParams: {
        page: 1,
        game: "",
        channel_name: ""
      },
      per_page: 10,
      total: 0,
      list: []
    };
  },
  created() {
    this.gameList();
  },
  methods: {
    // 筛选结果
    async search() {
      this.reqParams.page = 1;
      this.gameList();
    },
    // 游戏列表
    async gameList() {
      const {
        data: { data }
      } = await this.$http.post("game/getGameList.php", this.reqParams);
      // console.log(data);
      this.list = data.info;
      this.total = data.count;
    },
    // 分页
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.gameList();
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
  .el-form-item {
    margin-right: 60px;
  }
}
.el-pagination {
  text-align: center;
  margin-top: 25px;
}
</style>
