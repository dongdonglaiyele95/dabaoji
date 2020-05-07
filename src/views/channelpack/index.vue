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
    <!-- 删选结果 -->
    <el-card>
      <el-table :data="list">
        <el-table-column prop="appId" label="游戏ID" width="100"></el-table-column>
        <el-table-column prop="game" label="游戏"></el-table-column>
        <el-table-column prop="appName" label="游戏名"></el-table-column>
        <el-table-column prop="channel_name" label="渠道"></el-table-column>
        <el-table-column prop="url" label="下载链接" width="330px">
          <template v-slot="scope">
            <el-button @click="loadDetail(scope.row)" type="text" size="medium">
              {{
              scope.row.url
              }}
            </el-button>
            <el-button
              @click="copy(scope.row.url)"
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
          window.open(data.url, "_blank");
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
      // console.log(data);
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
