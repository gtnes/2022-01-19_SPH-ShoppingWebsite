<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级联动菜单面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
              <!-- 搜索模块面包屑 -->
            </li>

            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
              <!-- 品牌面包屑 -->
            </li>

            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
              <!-- 商品属性面包屑 -->
            </li>

            <li
              class="with-x"
              v-for="(arrtValue, index) in searchParams.props"
              :key="arrtValue.attrId"
            >
              {{ arrtValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--商品筛选子组件-->
        <!-- 绑定自定义事件 tradmarkInfo  attrInfo-->
        <SearchSelector @tradmarkInfo="tradmarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 商品排序bar -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 综合和价格谁有样式谁有箭头 1: 综合,2: 价格 asc: 升序,desc: 降序   -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#"
                    >综合
                    <span v-show="isOne">
                      <span v-show="isAsc">⬆</span>
                      <span v-show="isDesc">⬇</span>
                    </span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格
                    <span v-show="isTwo">
                      <span v-show="isAsc">⬆</span>
                      <span v-show="isDesc">⬇</span>
                    </span>
                  </a>
                </li>
                <!-- <li>
                  <a>价格⬆⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 单个商品 -->
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 点击商品图片跳转到详情页 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="searchParams.pageSize"
            @getPageNo='getPageNo'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 商品搜索页子组件 商品筛选
import SearchSelector from "./SearchSelector/SearchSelector";
// 从仓库获取数据
import { mapGetters, mapState } from "vuex";

export default {
  name: "Search",

  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        //一级分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序  1: 综合,2: 价格 asc: 升序,desc: 降序
        order: "1:desc",
        // 分页器
        pageNo: 1,
        // 每页商品数
        pageSize: 5,
        // 商品属性
        props: [],
        // 品牌分类
        trademark: "",
      },
    };
  },

  components: {
    // 注册子组件
    SearchSelector,
  },

  // 组件挂载完毕之前执行一次(先于mounted之前)
  beforeMount() {
    // 复杂写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    // this.searchParams.keyword = this.$route.params.keyword

    // 简单写法：es6合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },

  mounted() {
    // 初始化的时候调用一次
    this.getData();
  },

  computed: {
    // 获取search仓库中getters方法中的数据，传递的是数组
    // 用mapGetters获取数据不用区分仓库
    ...mapGetters(["goodList", "trademarkList", "attrsList"]),
    // 获取search模块一共有多少个产品
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),

    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },

    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },

    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },

    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },

  methods: {
    // 写成函数：声明一次，可以多次调用
    // 向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    getData() {
      // 向仓库发送请求获取数据
      this.$store.dispatch("getSearchList", this.searchParams); // (vuex中的方法, 传递的参数)
    },

    removeCategoryName() {
      // 给字段指定''空字符串和undefined的区别是：空字符会带给服务器，undefined不会带给服务器
      // 删除分类的名字
      this.searchParams.categoryName = undefined;
      // 清空1 2 3级id数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 直接发起请求
      this.getData();
      // 如果地址栏有params参数，需要把params参数传递过去
      if (this.$route.params) {
        // 携带params参数发起请求
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },

    removeKeyword() {
      // 删除关键字
      this.searchParams.keyword = undefined;
      // 发起请求
      this.getData();
      // 删除搜索框内容：通知兄弟组件Header清除关键字
      // search组件和header是兄弟组件，所以涉及到兄弟组件内通信，用$bus（全局事件总线）
      this.$bus.$emit("clear");
      // 进行路由的跳转 如果还有query参数需要保留
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },

    // 自定义事件 tradmarkInfo
    tradmarkInfo(trademark) {
      // 整理品牌字段的参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 发起请求
      this.getData();
    },

    // 移除品牌事件
    removeTrademark() {
      this.searchParams.trademark = undefined;
      // 发起请求
      this.getData();
    },

    // 自定义事件 商品属性值事件
    attrInfo(attr, attrValue) {
      // 商品属性的数组: ["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 当前数据在props中没有再添加
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      // 发起请求
      this.getData();
    },

    // 删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      // 发起请求
      this.getData();
    },

    changeOrder(flag) {
      // flag是一个标记，代表用户点击的是综合还是是价格
      let originOrder = this.searchParams.order;
      // 获取起始状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      // 新的order属性值
      let newOrder = "";
      if (flag == originFlag) {
        // 点击的是激活的标签
        newOrder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 点击的是非激活标签
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      // 发起请求
      this.getData();
    },

    // 获取当前第几页
    getPageNo(getPageNo){
      // 整理数据
      this.searchParams.pageNo = getPageNo
      // 发起请求
      this.getData();
    }
  },

  watch: {
    // 监听路由数据，如果有变化就重新发起请求
    $route(newValue, oldValeu) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params); // 整理新的数据
      this.getData(); // 发起请求
      // 每次请求完毕清空1 2 3级id数据
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>