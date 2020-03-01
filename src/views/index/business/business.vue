<template>
  <div>
    <!-- 上面卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid" class="short"></el-input>
        </el-form-item>

        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name" class="normal"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username" class="short"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" class="normal">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearBusiness">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el-icon-plus" @click="showAdd">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="remark" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{ scope.create_time | changeTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button size="text" @click="BusiEdit(scope.row)">编辑</el-button>
            <el-button size="text" @click="statusChance(scope.row)">
              {{ scope.row.status?'禁用':'启用'}}
            </el-button>
            <el-button type="text" @click="businessDlt(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[1,5, 10, 15, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 这是对话框 -->
    <!-- <busiAdd ref="busiAdd"></busiAdd>
    <busiEdit ref="busiEdit"></busiEdit> -->
    <busiDialog ref='Dialog'></busiDialog>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
// 导入组件
// import busiAdd from "./components/businessAdd.vue";
// import busiEdit from "./components/businessEdit.vue";
import busiDialog from "./components/businessDialog.vue";

import { businessList,businessStatus,businessDelete } from "@/api/business.js";
export default {
  name:'business',
  data() {
    return {
      oldItem:null,
      page: 1,
      size: 5,
      total: 3,
      form: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: []
    };
  },
  // 注册
  components: {
    // busiAdd,
    // busiEdit
    busiDialog
  },
  methods: {
    // 删除点击事件
    // 要先判断是不是最后一行，如果是最后一行的话，要把页面改成上一页，再刷新页面，显示删除成功
    businessDlt(data){
      businessDelete({
        id:data
      }).then(res=>{
        if(res.data.code==200){
          this.$message.success('删除成功')
          if(this.tableData.length==1){
            this.page--
            // 加入上面是第一页第一条的话，那么还要重新page赋值
            if(this.page==0){
              this.page=1
            }
          }
          this.getbusinessList()
        }else{
          this.$message.error('res.data.message')
        }
      })
    },
    // 点击状态事件
    statusChance(data){
      businessStatus({
        id:data.id
      }).then(res=>{
        window.console.log(res)
        if(res.data.code==200){
          this.$message.success('状态修改成功')
          this.getbusinessList()
        }else{
          this.$message.error('res.data.message')
        }
      })
    },
    // 编辑点击事件
    BusiEdit(data){
      this.$refs.Dialog.dialogFormVisible=true
      this.$refs.Dialog.isADD=false
      // 再解决点出后重置的问题
      // 判断是不是在同一行
      if(data!==this.oldItem){
        this.$refs.Dialog.addForm={ ...data }
        this.oldItem=data
      }
    },
    // 新增点击事件
    showAdd(){
      // // 对话框显示
      // this.$refs.busiAdd.dialogFormVisible=true
      this.$refs.Dialog.dialogFormVisible=true
      this.$refs.Dialog.isADD=true
      // 最后将数据清空
      this.$refs.Dialog.addForm={}
    },
    // 点击清除事件
    clearBusiness() {
      // 先利用表单的重置功能将表单内的数据清空
      this.$refs.form.resetFields();
      // 再转到第一页
      this.page = 1;
      // 再重新获取数据
      this.getbusinessList();
    },
    // 点击搜索事件
    // 就是调用获取数据的办法，然后传入表单绑定的数据
    search() {
      // 把page改为1
      this.page=1
      this.getbusinessList();
    },
    // 每页多少条事件
    handleSizeChange(size) {
      // 获取点击时每页的条数
      this.size = size;
      // 默认回到第一页
      this.page = 1;
      // 请求列表数据
      this.getbusinessList();
    },
    handleCurrentChange(page) {
      // 当前的页数
      this.page = page;
      this.getbusinessList();
    },
    // 封装一个企业的接口
    getbusinessList() {
      businessList({
        page: this.page,
        limit: this.size,
        ...this.form
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },
  created() {
    // 获取企业列表数据
    this.getbusinessList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 100px;
}
.normal {
  width: 149px;
}
</style>