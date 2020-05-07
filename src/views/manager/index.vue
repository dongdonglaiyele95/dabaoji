<template>
  <div class="container">
    <el-tabs stretch type="border-card">
      <el-tab-pane label="待办事项">
        <el-table :data="applicantList||[]">
          <el-table-column width="80" prop="id" label="序号"></el-table-column>
          <el-table-column prop="applicant" label="申请人"></el-table-column>
          <el-table-column prop="userName" label="申请账号"></el-table-column>
          <el-table-column prop="role" label="申请角色"></el-table-column>
          <el-table-column prop="ownGame" label="申请游戏"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button @click="handle(1, scope.row.id)" type="success">同意</el-button>
              <el-button @click="handle(0, scope.row.id)" type="danger">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="账号管理">
        <el-table :data="userList||[]">
          <el-table-column width="80" prop="id" label="用户ID"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="userName" label="账户"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column label="游戏权限">
            <template v-slot="scope">
              <el-input
                style="width:120px"
                v-if="scope.row.role == 'admin'"
                :value="(scope.row.ownGame = 'all')"
                disabled
              ></el-input>
              <game-select
                style="width:120px"
                v-else-if="scope.row.role == '运营'"
                v-model="scope.row.ownGame"
              ></game-select>
              <el-select v-else style="width:120px" v-model="scope.row.ownGame">
                <el-option
                  :key="i"
                  v-for="(item, i) in gameOptions"
                  :label="item.gameName"
                  :value="item.gameName"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="修改游戏权限">
            <template v-slot="scope">
              <el-button v-if="scope.row.role == 'admin'" disabled>权限</el-button>
              <el-button
                v-else
                @click="modifyUser(scope.row.id,scope.row.ownGame)"
                type="primary"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicantList: [], //申请者列表
      userList: [], //用户列表
      gameOptions: [] //游戏选项
    };
  },
  created() {
    this.getRegisterList();
    this.getUserList();
    this.getgameOptions();
  },
  methods: {
    // 获取游戏选项
    async getgameOptions() {
      const {
        data: { data }
      } = await this.$http.get("game/getAllGame.php");
      data.unshift({ gameName: "all" });
      this.gameOptions = data;
      // console.log(data);
    },
    // 修改用户游戏权限
    async modifyUser(id, ownGame) {
      if (ownGame == "") {
        this.$message.warning("权限不可为空");
        return;
      }
      const {
        data: { result }
      } = await this.$http.get(
        `user/modifyUser.php?id=${id}&ownGame=${ownGame}`
      );
      // console.log(result);
      if (result == "10000") {
        this.$message.success("修改成功");
      }
    },
    // 获取申请者列表
    async getRegisterList() {
      const {
        data: { data }
      } = await this.$http.get("user/getRegisterList.php");
      this.applicantList = data;
      // console.log(data);
    },
    // 获取用户列表
    async getUserList() {
      const {
        data: { data }
      } = await this.$http.get("user/getUserList.php");
      this.userList = data;
      // console.log(data);
    },
    // 处理申请账号
    async handle(result, id) {
      this.$confirm("此操作成功后将删除该代办事项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const data = await this.$http.get(
            `user/application.php?result=${result}&id=${id}`
          );
          // console.log(data);
          this.getRegisterList();
          if (result == 1) {
            this.getUserList();
          }
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
