<template>
<div class="container">
   <el-table
    :data="tableData"
    border
    >
    <el-table-column
      prop="gameid"
      label="游戏ID"
      width="160"
      >
    </el-table-column>
    <el-table-column
      prop="link"
      label="下载链接"
      >
    </el-table-column>
    <el-table-column
      prop="code"
      label="二维码安装"
      width="280">
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
          gameid: '10000',
          link: 'http://192.168.0.155/data/work/tmp/ipa/1000-tianjian.ipa',
          code:'',
        }, 
          {
          gameid: '10001',
          link: 'http://192.168.0.155/data/work/tmp/ipa/1000-tianjian.ipa',
          code:'',
        }, 
          {
          gameid: '10002',
          link: 'http://192.168.0.155/data/work/tmp/ipa/1000-tianjian.ipa',
          code:'',
        }, 
          {
          gameid: '10003',
          link: 'http://192.168.0.155/data/work/tmp/ipa/1000-tianjian.ipa',
          code:'',
        }, 
          {
          gameid: '10004',
          link: 'http://192.168.0.155/data/work/tmp/ipa/1000-tianjian.ipa',
          code:'',
        }, 
          {
          gameid: '10005',
          link: 'http://192.168.0.155/data/work/tmp/ipa/1000-tianjian.ipa',
          code:'',
        }, 
          {
          gameid: '10006',
          link: 'http://192.168.0.155/data/work/tmp/ipa/1000-tianjian.ipa',
          code:'',
        }, 
        ]
      }
    }
  }
</script>
<style lang="less" scoped>
.el-pagination {
  text-align: center;
  margin-top: 25px;
}
</style>