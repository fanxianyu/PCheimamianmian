<template>
  <div>
    <!-- 上面的盒子 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="userForm">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username" class="short"></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email" id="email" class="normal"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.role_id" placeholder="请选择状态" class="normal">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="doSearh">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="cleanSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el-icon-plus" @click="addUSer">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的盒子 -->
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <!-- 底下这两个标签要用自定义 -->
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="Edituser(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="statusChange(scope.row)"
            >{{ scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="removeUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1,5,10,100, 200, 300, 400]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
// 调用抽取的方法
import { getUser, statusUser, removeUser } from "@/api/user.js";

// 导入组件
import userDialog from "./components/userDialog.vue";
export default {
  components: {
    userDialog
  },
  name: "user",
  data() {
    return {
      oldItem: null,
      page: 1,
      size: 5,
      total: 0,
      tableData: [],
      formInline: {
        username: "",
        email: "",
        role_id: ""
      }
    };
  },
  methods: {
    //  编辑点击事件
    Edituser(data) {
      console.log(this.oldItem);
      (this.$refs.userDialog.dialogFormVisible = true),
        (this.$refs.userDialog.isADD = false);
      // 点击事件有一个注意点，就是不小心划出去进来应该还是编辑内容的页面，还有不同的行点击要获取不同的内容,
      // 就是判断是不是在同一行
      // 可以设置一个空的对象为null
      // 思路  先在组件里面设置一个监听器，如果是编辑时不小心划出去，就把编辑对话框里的内容保存到oldItem里面 
      //      判断是不是第一次点击编辑，或者判断是不是点击的是同一行  然后把点击那一行的数据赋值给编辑对话框
      
      //      
      
      if (!this.oldItem || data.id !== this.oldItem.id) {
        // 第一次点击编辑走下面的代码
        // 就把点击这行的内容复制给对话框的表单里面
        this.$refs.userDialog.addForm = { ...data };
        // 在把点击这行的数据复制给olditem
        // 相当于第一次点击编辑或者低了初始化
        this.oldItem =  {...data} ;
      } else {
        // 第二次点击的时候走下面的代码
        this.$refs.userDialog.addForm = this.oldItem;
      }
    },
    //  新增点击事件
    addUSer() {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isADD = true;
      // 在清空表单的内容
      this.$refs.userDialog.addForm = {};
    },
    //  删除点击事件
    removeUser(data) {
      removeUser({
        id: data.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          // 判断是否是这一页的最后一行
          if (this.tableData.length == 1) {
            this.page--;
            // 再判断这一页是不是第一页
            if (this.page == 0) {
              // 把页数设置为1
              this.page == 1;
            }
          }
          this.getUserInfo();
        }
      });
    },
    //  状态改变事件
    statusChange(data) {
      statusUser({
        id: data.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("状态修改成功");
          // 再刷新页面
          this.getUserInfo();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //  点击清除事件
    cleanSearch() {
      // 调用表单重置的方法把表单内容清空，在获取列表
      this.$refs.userForm.resetFields();
      // 再获取列表
      this.getUserInfo();
    },
    //  点击搜索事件
    doSearh() {
      // 就是调用获取列表的方法
      this.page = 1;
      this.getUserInfo();
    },
    //  封装一个获取用户信息的方法
    getUserInfo() {
      getUser({
        limit: this.size,
        page: this.page,
        ...this.formInline
      }).then(res => {
        // 获取响应报文后赋值
        window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 实现翻页功能
    // 这里是每页1多少条事件
    handleSizeChange(size) {
      this.size = size;
      this.page = 1;
      this.getUserInfo();
    },
    // 这里是当前页事件
    handleCurrentChange(page) {
      this.page = page;
      this.getUserInfo();
    }
  },

  created() {
    // 一进页面就发送获取用户信息的请求
    this.getUserInfo();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 90px;
}
#email {
  width: 155px;
}
.normal {
  width: 149px;
}
</style>