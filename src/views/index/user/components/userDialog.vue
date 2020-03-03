<template>
  <el-dialog width="477px" center :title="isADD?'新增用户':'编辑用户'" :visible.sync="dialogFormVisible" >
    <el-form :model="addForm" :rules="rules" ref="addUSER">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="addForm.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
      <el-select v-model="addForm.role" placeholder="请选择角色" @click="addForm.role_id=addForm.role">
        <el-option label="管理员" value="2"></el-option>
        <el-option label="老师" value="3"></el-option>
        <el-option label="学生" value="4"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
      <el-select v-model="addForm.status" placeholder="请选择状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item> 

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="DialoguserInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入需要用到的方法
import { addUser, editUser } from "@/api/user.js";
export default {
  data() {
    return {
      isADD: true,
      addForm: {
        username: "",
        email: "",
        phone: "",
        remark:'',
        role:'',
        status:'',
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email:[
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "请输入正确邮箱",
            triggle: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "请输入正确的手机号",
            triggle: "blur"
          },
          { len: 11, message: "请输入正确的手机号", triggle: "change" }
        ],
        role:[
             { required: true, message: "请选择状态", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "80px"
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (!val && !this.isADD) {
        this.$parent.oldItem = this.addForm;
      }
    }
  },
  methods: {
    DialoguserInfo() {
      //   先进行效验
      this.$refs.addUSER.validate(v => {
        if (v) {
          //   判断isADD是否为true来决定调用方法  true是新增 false是编辑
          if (this.isADD == true) {
            //   那就调用新建列表的方法来发送请求
            addUser(this.addForm).then(res => {
              if (res.data.code == 200) {
                window.console.log(res);
                this.$message.success("新增成功");
                // 获取列表的方法
                this.$parent.getUserInfo();
                // 再重置表单
                this.$refs.addUSER.resetFields();
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            editUser(this.addForm).then(res => {
              if (res.data.code == 200) {
                this.$message.success("编辑成功");
                //   隐藏对话框
                this.dialogFormVisible = false;
                // 再重新获取页面
                this.$parent.getUserInfo();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>