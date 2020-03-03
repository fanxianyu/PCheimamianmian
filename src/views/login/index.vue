<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="title-box">
        <img class="logo" src="./img/2.png" alt />
        <span class="left-title">黑马面面</span>
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="43px"
        class="demo-ruleForm"
      >
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 这里要用到栅格布局 -->
         <el-form-item prop="code">
        <el-row>
          <el-col :span="18">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="6">
            <img class="code" :src="indexUrl" @click="getIndexUrl" alt />
          </el-col>
        </el-row>
         </el-form-item>

        <el-form-item prop="agree">
         <div class="check-box" >
            <el-checkbox v-model="ruleForm.agree" class="cek"></el-checkbox>
          <span>
              我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </span>
         </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="bnt-box" @click="submitForm">登录</el-button>
          <el-button type="primary" class="bnt-box" @click="findReg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./img/1.png" alt />
    <reg ref="reg"></reg>
  </div>
</template>

<script>
// 导入组件
import reg from './components/register.vue'
import { login } from '@/api/login.js'
import { setToken } from  '@/utilis/token.js'
export default {
  // 注册组件
  components:{
    reg
  },
  data() {
    return {
      indexUrl:process.env.VUE_APP_URL+'/captcha?type=login',
        // 跟表单双向绑定的对象
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        agree:false,
      },
    //   规则对象
      rules: {
        //   真正的规则
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { pattern:/0?(13|14|15|18|17)[0-9]{9}/, message:'请输入正确的手机号', trigger:'blur'},
            { len:11, message:'手机号码长度为11位数',triggle:'blur'}
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
        ],
        code:[
            { required:true, message:'验证码不能为空',trigger:"blur"}
        ],
        // 多选框没有失去焦点，只有值改变
        // 他的值只有true和false，不可能为空，除非强行为空
        agree:[
            // {  required:true, message:'请勾选',trigger:"change"}
             {  pattern:/true/, message:'请勾选',trigger:"change"}
        ]
      }
    };
  },
   methods: {
    //  获取登录验证码
     getIndexUrl(){
       this.indexUrl=process.env.VUE_APP_URL+'/captcha?type=login'+ Date.now()
     },
      // 注册点击事件
     findReg(){
       this.$refs.reg.dialogFormVisible=true
     },
      // 登录点击事件
     submitForm(){
      //  再发送登录请求之前，我们先自己判断手机号码是否正确
      // if(!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.ruleForm.phone))){
      //  return this.$message.error('请输入正确的手机号')
      // }
        // 先效验表单信息
        // 先获取表单元素
        this.$refs.ruleForm.validate(v=>{
          // 如果效验成功就发送登录请求
          if(v){
            login({
              phone:this.ruleForm.phone,
              password:this.ruleForm.password,
              code:this.ruleForm.code
            }).then(res=>{
              window.console.log(res)
              if(res.data.code==200){
                // 将token保存到本地
                // window.localStorage.setItem('token',res.data.data.token)
                  setToken(res.data.data.token)
                // this.$message.success('登陆成功')
                // 然后利用路由进行跳转
                // 注意点，在这里执行了这个跳转的代码后会到全局前置钩子那里进行处理
                this.$router.push('/index')
              }else{
                this.$message.error(res.data.message)
              }
            })
          }
        })
      }
    },
};
</script>

<style lang="less">
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;
      margin-bottom: 29px;
      .logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
        margin-top: 5px;
      }
      .left-title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right-title {
        font-size: 22px;
      }
    }
    .code {
      width: 100%;
      height: 42px;
      vertical-align: top;
    }
    .el-checkbox {
      display: flex;
      .el-checkbox__input {
        margin-top: 2px;
      }
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    .check-box{
        display: flex;
        align-items: center;
        
        .cek{
            margin-right:2px;
        }
    }
    .bnt-box {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>