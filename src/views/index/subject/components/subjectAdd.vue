<template>
  <el-dialog center title="新增学科" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="addsub">
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="short_name" label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="intro" label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="remark" label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="subadd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入需要用到的方法
import { subjectAdd } from "@/api/subject.js";
export default {
  data() {
    return {
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "80px",
      rules: {
        rid: [{ required: true, message: "请输入科学编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入科学名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    subadd() {
      this.$refs.addsub.validate(v => {
        if (v) {
          //   在发请求之前我们要先把axios接口抽取到1一个js文件里面，再调用它
        //   subjectAdd({
            // 这里面要传一个对象，里面要有form的所有的属性，所以我么可以把form对象传进去  this.form
        //     // rid: this.form.rid,
        //     // name: this.form.name,
        //     // short_name: this.form.short_name,
        //     // intro: this.form.intro,
        //     // remark: this.form.remark

        //     ...this.form
        //   })
          subjectAdd(this.form).then(res => {
            // window.console.log(res)
            // 根据不同的响应报文来进行不同的操作
            if (res.data.code == 200) {
              this.$message.success("新增成功！");
              this.dialogFormVisible = false;
              //刷新表格数据 this.$parent可以得到父组件
              this.$parent.getsubjectList();
            //   重置表单
            this.$refs.addsub.resetFields();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.el-dialog__header {
  text-align: center;
}
.el-dialog.el-dialog__title {
  color: white;
}
</style>