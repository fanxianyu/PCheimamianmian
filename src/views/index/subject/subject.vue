<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid	" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" class="normal"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" class="normal">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="doSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearSearch">清除</el-button>
        </el-form-item>
        <!-- 行内不用加this -->
        <el-form-item>
          <el-button
            type="primary"
            class="el-icon-plus"
            @click="$refs.add.dialogFormVisible=true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
      </el-card>

      <!-- 底部表格 -->
      <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
              {{ scope.row.create_time | changeTime }}
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
            <!-- 通过scope.row来获取这一行的数据 -->
            <el-button type="text" @click="subjecteDit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changestatus(scope.row)"
            >{{ scope.row.status!==1?'启用':'禁用'}}</el-button>
            <el-button type="text" @click="subjectDlt(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[1,5,10, 20, 30, 40]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 这是对话框 -->
    <subjectAdd ref="add"></subjectAdd>
    <subjectEdit ref="edit"></subjectEdit>
  </div>
</template>

<script>
// 导入需要用到的方法
import { subjectList, subjectStatus,subjectdelete } from "@/api/subject.js";
// 导入组件
import subjectAdd from "./components/subjectAdd.vue";
import subjectEdit from './components/subjectEdit.vue';
export default {
  // 注册组件
  components: {
    subjectAdd,
    subjectEdit
  },
  created() {
    this.getsubjectList();
  },
  data() {
    return {
      oldData:null,
      total: 0,
      size: 5,
      page: 1,
      tableData: [], //表格的数据源
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      }
    };
  },
  methods: {
    // 点击删除事件
    subjectDlt(data){
      subjectdelete({
        id:data
      }).then(res=>{
        if(res.data.code==200){
          this.$message.success('删除成功')
          // 判断是不是当前页的最后一个数据
          if(this.tableData.length==1){
            this.page--
            // 再判断如果是第一页第一条，那么还要重新个page赋值1
            if(this.page==0){
              this.page=1
            }
          }
            // 再刷新页面
          this.getsubjectList()
          
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 点击编辑事件
    subjecteDit(data){
      // 点击时将scope.row获取的这一行的数据赋值给编辑页面的表单form
      // this.$refs.edit.form=data
      // 但是上面那句代码有bug，因为对象之间的赋值其实是传递地址，一个对象的值变了，另一个对象的值也会变化
      // 解决方法：拷贝一个对象，把拷贝的对象赋值给它
      // 只要有大括号就代表生成一个新的对象
      // this.$refs.edit.form = { ...data }
      // 点击时显示编辑对话框
      this.$refs.edit.dialogFormVisible=true
      // 有个问题不要重复覆盖内容
      // 加入点击的是第二行，判断表单内容是否一样，如果一样就不要覆盖
      // 如果不是上次点击的那一行，就覆盖表单内容
      if(data!=this.oldData){
        this.$refs.edit.form = { ...data }
        this.oldData=data
      }else{
        // 若果是上次那一行就什么都不做
      }
    } ,   // 搜索点击事件
    doSearch() {
      // 调用接口函数
      // 首先把page改为1
      this.page=1
      this.getsubjectList();
    },
    // 清除点击事件
    clearSearch() {
      this.$refs.formInline.resetFields();
      // 再把page换到第一页
      this.page = 1;
      // 再重新获取页面列表
      this.getsubjectList();
    },
    // 状态点击事件
    changestatus(item) {
      // window.console.log(item)
      subjectStatus({
        id: item.id
      }).then(() => {
        // 获取响应报文
        // window.console.log(res)
        // 再刷新页面  简单点来说就是刷新表格，就是重新获取表格数据
        this.getsubjectList();
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    // 此处封装一个获取数据列表的方法
    getsubjectList() {
      subjectList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // 获取到了响应报文
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 每页多少条点击事件
    handleSizeChange(size) {
      window.console.log(size);
      // 重新获取列表数据
      // 获取点击时候每页的条数，赋值
      this.size = size;
      // 默认从第一页开始
      this.page = 1;
      // 重新获取列表信息
      this.getsubjectList();
    },
    // 当前页点击事件
    handleCurrentChange(page) {
      window.console.log(page);
      this.page = page;
      this.getsubjectList();
    }
  }
};

</script>

<style>
.box-card {
  margin-bottom: 19px;
}

.el-form-item__content .short {
  width: 100px;
}
.el-form-item__content .normal {
  width: 149px;
}
</style>