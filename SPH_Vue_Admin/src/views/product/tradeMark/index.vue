<template>
 <div>
  <el-button type="primary" icon="el-icon-plus" style="margin:0 0 10px 0">添加</el-button>
  <!-- 表格 -->
  <el-table border style="width:100%">
    <el-table-column tupe="index" label="序号" width="80px"></el-table-column>
    <el-table-column prop="prop" label="品牌名称" width="width"></el-table-column>
    <el-table-column prop="prop" label="品牌LOGO" width="width"></el-table-column>
    <el-table-column prop="prop" label="操作" width="width"></el-table-column>
  </el-table>
 </div>
</template>

<script>
  export default {
    name: "tradeMark",
    data() {
      return {
        page:1,
        limit:3,
        total:0,
      }
    },

    mounted(){
      this.getPageList()
    },

    methods: {
      async getPageList(pager = 1){
        this.page = pager
        const{page,limit} = this
        result = await this.$API.trademark.reqTradeMarkList(page,limit)
        console.log(result);
      }
    },

  }
</script>

<style>
</style>