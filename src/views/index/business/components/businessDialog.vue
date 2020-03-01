<template>
  <el-dialog center :title= "isADD?'新增企业':'编辑企业'" :visible.sync="dialogFormVisible" width="600px">
    <el-form :model="addForm" :rules="rules" ref="addBusiness" >
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="DialogBusiness">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入需要用到的方法
import { businessAdd,businessEdit } from '@/api/business.js'
export default {
  data() {
    return {
        isADD:true,
      addForm: {
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
      DialogBusiness(){
        //   先进行效验
         this.$refs.addBusiness.validate((v) => {
          if (v) {
            //   判断isADD是否为true来决定调用方法  true是新增 false是编辑
            if(this.isADD==true){
                 //   那就调用新建列表的方法来发送请求
            businessAdd(this.addForm).then(res=>{
                if(res.data.code==200){
                    window.console.log(res)
                    this.$message.success('新增成功')
                    // 获取列表的方法
                    this.$parent.getbusinessList()
                    // 再重置表单
                    this.$refs.addBusiness.resetFields()
                    this.dialogFormVisible=false
                }else{
                    this.$message.error(res.data.message)
                }
            })
            }else{
                businessEdit(this.addForm).then(res=>{
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
          } 
        });
      }
  },
};
</script>

<style>
</style>