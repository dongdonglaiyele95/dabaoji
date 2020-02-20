<template>
<div class="container">
  <el-button @click="$router.push('/newgame')" type="primary" style="float:right;margin-bottom:20px">新建游戏</el-button>
   <el-table
    :data="tableData"
    border
    >
    <el-table-column
      prop="appid"
      label="APPID"
      width="160"
      >
    </el-table-column>
    <el-table-column
      prop="appkey"
      label="APPKEY"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="包名"
      width="280">
    </el-table-column>
    <el-table-column
      prop="channel"
      label="渠道"
      width="140">
    </el-table-column>
    <el-table-column
      prop="detail"
      label="详情"
      width="180">
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
          appid: '10000',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
        }, 
          {
          appid: '10001',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
        }, 
          {
          appid: '10002',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
        }, 
          {
          appid: '10003',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
        }, 
          {
          appid: '10004',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
        }, 
          {
          appid: '10005',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
        }, 
          {
          appid: '10006',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
        }, 
          {
          appid: '10007',
          appkey: '50b2516424224c569b5f5398db25d257',
          name:'com.wmsdk.demo',
          channel:'麟游',
          detail:'详情'
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