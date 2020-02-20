<template>
<div class="container">
  <el-button @click="$router.push('/newchannel')" type="primary" style="float:right;margin-bottom:20px">新建渠道</el-button>
   <el-table
    :data="tableData"
    border
    >
    <el-table-column
      prop="number"
      label="渠道编号"
      width="100"
      >
    </el-table-column>
    <el-table-column
      prop="codename"
      label="渠道代号"
      width="120"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="渠道名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="net"
      label="渠道官网">
    </el-table-column>
    <el-table-column
      prop="address"
      label="登录验证地址">
    </el-table-column>
    <el-table-column
      prop="detail"
      label="详情"
      width="150">
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
          number: '1',
          codename: 'WMSDK',
          name:'文脉',
          net:'http://www.wenmai.com',
          address: 'http://www.wenmai.com',
          detail:'详情'
        }, 
          {
          number: '2',
          codename: 'WMSDK',
          name:'文脉',
          net:'http://www.wenmai.com',
          address: 'http://www.wenmai.com',
          detail:'详情'
        }, 
          {
          number: '3',
          codename: 'WMSDK',
          name:'文脉',
          net:'http://www.wenmai.com',
          address: 'http://www.wenmai.com',
          detail:'详情'
        }, 
          {
          number: '4',
          codename: 'WMSDK',
          name:'文脉',
          net:'http://www.wenmai.com',
          address: 'http://www.wenmai.com',
          detail:'详情'
        }, 
          {
          number: '5',
          codename: 'WMSDK',
          name:'文脉',
          net:'http://www.wenmai.com',
          address: 'http://www.wenmai.com',
          detail:'详情'
        }, 
          {
          number: '6',
          codename: 'WMSDK',
          name:'文脉',
          net:'http://www.wenmai.com',
          address: 'http://www.wenmai.com',
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