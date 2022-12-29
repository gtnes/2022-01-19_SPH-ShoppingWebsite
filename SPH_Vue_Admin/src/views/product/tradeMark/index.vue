<template>
 <div>
  <el-button type="primary" icon="el-icon-plus" style="margin:0 0 10px 0" @click="showDialog">添加品牌</el-button>
  <!-- 表格 -->
  <el-table border style="width:100%" :data="list">
    <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
    <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
    <!-- 品牌列 品牌logo需要展示图片，使用作用域插槽（子组件的数据来源于父组件，） -->
    <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
      <template slot-scope="{row, $index}">
        <img :src="row.logoUrl" alt="" style="height:60px">
      </template>
    </el-table-column>
    <!-- 操作列 使用作用域插槽 -->
    <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row, $index}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="updataTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-edit" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>

  <!--
    分页器 
    current-change 点击页码触发，会给调用的函数传入当前点击的页码pager
    size-change pageSize每页展示数据条数发生变化时触发，回传给调用函数每页展示的数据数
  -->
  <el-pagination
    style="margin-top:20px; textAlign:center"
    :current-page="page"
    :page-size="limit"
    :total="total"
    :page-count="7"
    :page-sizes="[3,5,10]"
    @current-change='getPageList'
    @size-change='handleSizeChange'
    layout="prev, pager, next,jumper, ->, sizes, total"
    >
  </el-pagination>

  <!-- 
    品牌添加和修改对话框
    :visible.sync 控制对话框显示与隐藏true和false
    Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
  -->
  <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
    <!-- :model="form" 收集表单数据，表单验证也需要这个属性 -->
    <el-form style="width:90%" :model="tmForm" :rules="rules" ref="ruleForm">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <!-- 
          :on-success 上传成功回调,可以检测到图片上传成功，上传成功执行一次
          :before-upload 上传之前回调，上传图片之前执行一次
          收集el-upload数据不能用v-model，因为不是表单元素
          action属性：设置图片上传的地址
          :with-credentials="true"需要后端在响应头加入 Access-Control-Allow-Credentials: true ，否则就会被拦截
            此处没有这个参数所有设置为false，否则请求响应结果会变为201
        -->
        <el-upload
          class="avatar-uploader"
          action="/dev-api/admin/product/fileUpload"
          :with-credentials="false"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addorUpdataTradeMark">确 定</el-button>
    </div>
  </el-dialog>

 </div>
</template>

<script>
import { logout } from '@/api/user'
  export default {
    name: "tradeMark",
    data() {
      return {
        // 分页器第几页
        page:1,
        // 当前页数展示数据条数
        limit:5,
        // 总共的数据条数
        total:0,
        // 列表展示的数据
        list:[],

        // 对话框显示与隐藏
        dialogFormVisible:false,
        // 收集的品牌信息表单数据
        tmForm:{
          logoUrl: "",
          tmName: "",
        },

        // 表单验证规则
        rules:{
          // 品牌名称验证规则
          tmName: [
            // required 必须要校验的字段 ，trigger 用户行为设置（blur失去焦点，change修改）
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          // 品牌logo验证规则
          logoUrl: [
            { required: true, message: '请选择品牌logo图片'}
          ],
        }

      }
    },

    mounted(){
      this.getPageList()
    },

    methods: {

      // 获取品牌列表数据
      async getPageList(pager=1){
        this.page = pager
        const{page,limit} = this
        // 获取品牌列表接口
        let result = await this.$API.trademark.reqTradeMarkList(page,limit)
        if(result.code==200){
          this.total = result.data.total
          this.list = result.data.records
        }
      },

      // 分页器每页展示数据条数变化时调用
      handleSizeChange(limit){
        this.limit = limit
        this.getPageList()
      },

      // 点击添加品牌按钮事件
      showDialog(){
        // 清理品牌表单数据
        this.tmForm = {logoUrl: "", tmName: ""}
        // 显示品牌对话框
        this.dialogFormVisible = true
      },

      // 修改品牌按钮事件
      updataTradeMark(row){
        // row 当前用户选中的品牌的信息
        this.dialogFormVisible = true
        // 将已有的信息赋值给tmForm进行展示，row里面多了id这个参数
        //  ...浅拷贝，如果不加...会直接修改已有数据，正确的应该是点击确定然后再修改
        this.tmForm = {...row}
      },

      // 品牌图片上传成功回调
      handleAvatarSuccess(res, file) {
        // res 上传成功之后返回给前端的数据
        // file 上传成功之后返回给前端的数据
        this.tmForm.logoUrl = res.data
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      // 品牌图片上传之前回调
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      // 品牌对话框 确定按钮事件（添加品牌或者修改品牌）
      addorUpdataTradeMark(){
        // 当全部表单验证字段通过然后执行
        this.$refs.ruleForm.validate(async(success)=>{
          if(success){
            // 隐藏对话框
            this.dialogFormVisible = false
            // 发送请求 添加品牌或者修改品牌
            let result = await this.$API.trademark.reqAddorUpdateTradeMark(this.tmForm)
            if(result.code==200){
              // 显示添加或者修改成功消息框
              this.$message({
                message: this.tmForm.id ? '修改品牌成功':'添加品牌成功',
                type: 'success'
              })
              // 添加或者修改品牌成功之后，再次发送请求获取新的数据
              // 如果是添加品牌重新请求停留在第1页，如果是修改品牌则停留在当前页面
              this.getPageList(this.tmForm.id ? this.page : 1)
            }
          }else{
            console.log('品牌表单验证未通过！！')
            return false
          }
        })
      },

      // 删除一个品牌
      deleteTradeMark(row){
        // 删除品牌确认框
        this.$confirm(`确定删除 ${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 当用户点击确认按钮的时候触发
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code=200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新发起请求
            this.getPageList(this.list.length>1 ? this.page : this.page-1)
          }
        }).catch(() => {
          // 用户点击取消按钮的时候触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

    },

  }
</script>

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>