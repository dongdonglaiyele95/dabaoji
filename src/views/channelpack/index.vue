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
    <!-- 删选结果 -->
    <el-card>
      <el-table empty-text="正在加载，请稍后..." :data="list||[]">
        <el-table-column prop="app_id" label="游戏ID" width="170"></el-table-column>
        <el-table-column prop="game_name" label="游戏"></el-table-column>
        <el-table-column prop="app_name" label="游戏名"></el-table-column>
        <el-table-column prop="channel_name" label="渠道"></el-table-column>
        <el-table-column prop="app_downloadUrl" label="下载链接" width="580">
          <template v-slot="scope">
            <el-button @click="loadDetail(scope.row)" type="text" size="medium">
              {{
              scope.row.app_downloadUrl
              }}
            </el-button>
            <el-button
              @click="copy(scope.row.app_downloadUrl)"
              type="primary"
              icon="el-icon-share"
              style="float:right;margin-right:80px"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="reqParams.page"
        :page-size="per_page"
        :total="total"
        @current-change="changePager"
        hide-on-single-page
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "channelpack",
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
    this.getPackageList();
  },
  methods: {
    // 筛选结果
    async search() {
      this.reqParams.page = 1;
      this.getPackageList();
    },
    //复制
    copy(data) {
      let _input = document.createElement("input"); // 直接构建input
      _input.value = data; // 设置内容
      document.body.appendChild(_input); // 添加临时实例
      _input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      this.$message.success("复制成功，可粘贴");
      document.body.removeChild(_input); // 删除临时实例
    },
    // 下载打包文件
    loadDetail(data) {
      this.$confirm("即将下载文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.open(data.app_downloadUrl, "_blank");
          this.$message.success("正在下载，请稍后");
        })
        .catch(() => {
          this.$message.info("已取消下载");
        });
    },
    // 列表渲染
    async getPackageList() {
      const {
        data: { data }
      } = await this.$http.post("getPackageList.php", this.reqParams);
      this.list = data.info;
      this.total = data.count;
    },
    // 分页
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getPackageList();
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
