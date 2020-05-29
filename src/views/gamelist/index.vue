<template>
  <div class="container">
    <!-- 筛选卡 -->
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item prop="game_name" label="游戏">
          <game-select v-model="reqParams.game_name"></game-select>
        </el-form-item>
        <el-form-item prop="channel_codeName" label="渠道">
          <channel-select v-model="reqParams.channel_codeName"></channel-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <el-table empty-text="正在加载，请稍后..." :data="list" fit>
        <el-table-column prop="app_id" label="APPID"></el-table-column>
        <el-table-column prop="game_name" label="游戏"></el-table-column>
        <el-table-column label="系统">
          <template v-slot="scope">{{scope.row.app_os == 1?'iOS':'Android'}}</template>
        </el-table-column>
        <el-table-column prop="app_name" label="appName"></el-table-column>
        <el-table-column prop="app_bundleId" label="包名"></el-table-column>
        <el-table-column prop="channel_name" label="渠道"></el-table-column>
        <el-table-column label="详情" width="160">
          <template v-slot="scope">
            <el-button
              @click="$router.push('newgame?id=' + scope.row.app_id)"
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "gamelist",
  data() {
    return {
      reqParams: {
        page: 1,
        game_name: "",
        channel_codeName: ""
      },
      per_page: 10,
      total: 0,
      list: []
    };
  },
  created() {
    this.gameList();
    this.reqParams = this.getGameList;
  },
  mounted() {
    //监听浏览器后退按钮 保持之前的筛选状态
    if (window.history && window.history.pushState) {
      window.addEventListener("popstate", this.gameList(), false);
    }
    // 刷新清除缓存会话数据
    window.addEventListener("beforeunload", e => {
      this.reqParams = {
        page: 1,
        game_name: "",
        channel_codeName: ""
      };
      this.setGameList(this.reqParams);
    });
  },
  computed: {
    ...mapState(["getGameList"])
  },
  methods: {
    ...mapMutations(["setGameList"]),
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
      this.setGameList(this.reqParams);
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
