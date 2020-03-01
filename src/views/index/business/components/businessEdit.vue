<template>
  <el-dialog center title="编辑企业" :visible.sync="dialogFormVisible" width="600px">
    <el-form :model="Form" :rules="rules" ref="editBusiness" >
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="Form.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="Form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="Form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="Form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="Form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editBusiness">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入方法
import { businessEdit } from '@/api/business.js'
export default {
      data() {
    return {
      Form: {
        eid:'',
        name:'',
        short_name:'',
        intro:'',
        remark:'',
      },
      rules:{
          eid:[
              {required: true, message: '请输入企业编号', trigger: 'blur'}
          ],
          name:[
              {required: true, message: '请输入企业名称', trigger: 'blur'}
          ],
          short_name:[
              {required: true, message: '请输入企业简称', trigger: 'blur'}
          ],
          intro:[
              {required: true, message: '请输入企业简介', trigger: 'blur'}
          ],
      },
      dialogFormVisible: false,
      formLabelWidth: "80px"
    };
  },
  methods: {
      editBusiness(){
          this.$refs.editBusiness.validate((v)=>{
              if(v){
                  businessEdit(this.Form).then(res=>{
                      if(res.data.code==200){
                          this.$message.success('编辑成功')
                        //   隐藏对话框
                        this.dialogFormVisible=false
                        // 再重新获取页面
                        this.$parent.getbusinessList()
                      }else{
                          this.$message.error(res.data.message)
                      }
                  })
              }
          })
      }
  },
}
</script>

<style>

</style>