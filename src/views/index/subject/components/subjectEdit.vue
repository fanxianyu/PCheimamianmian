<template>
  <el-dialog center title="编辑学科" :visible.sync="dialogFormVisible">
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
      <el-button type="primary" @click="doEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectedit } from '@/api/subject.js'

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
  methods:{
    doEdit(){
      subjectedit(
        this.form
      ).then(res=>{
        if(res.data.code==200){
          this.$message.success('编辑成功')
          // 隐藏对话框
          this.dialogFormVisible=false
          // 并重新加载列表
          this.$parent.getsubjectList()
        }else{
          this.$message.error(res.data.message)
        }
      })
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