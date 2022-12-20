<template>
  <div class="pagination">
    <!-- <h1>连续页码 起始-结束：{{startNumAndEndNum}} 当前页码:{{pageNo}}</h1><br> -->
    <!-- 开始部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 结尾部分 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 当前页码，每页显示多少条，总共多少条数据，连续页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算总共的页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize); // 向上取整
    },

    //计算连续页码起始数字和结束数字
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      // 定义2个变量，存储起始数字和结束数字
      let start = 0;
      let end = 0;
      // 连续页码数至少需要5页
      // 如果总页码小于5
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 总页数大于5
        start = pageNo - parseInt(continues / 2); // parseInt取整
        end = pageNo + parseInt(continues / 2);
        // 把出现start等于0或者是负数的情况纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ea4a36;
      color: #fff;
    }
  }
}
</style>