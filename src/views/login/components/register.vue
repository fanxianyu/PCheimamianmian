<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="regForm">

      <el-form-item label="头像" :label-width="formLabelWidth" prop='avatar'>
        <!-- 这里要修改成自己的上传图片的基地址 -->
        <!-- 表单效验的是整个表单元素，所以要绑定一个v-model的值 -->
        <!-- 再给这个值赋值 -->
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="imgurl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth" prop="imgCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="codeImg" :src="picCodeUrl" alt @click="getNewCode" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="useCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.useCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 这里可以用三元表达式判断，所以用模板引擎 -->
            <el-button @click="getPhoneCode" :disabled="sec!=0">{{ sec==0?'获取用户验证码':'还剩下'+sec+'秒'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doregister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { sendSms,reGister } from "@/api/axios.js";
export default {
  data() {
    return {
      // 这里是把饿了么默认的图片地址更改成自己接口的基地址
      imgurl:process.env.VUE_APP_URL+'/uploads',
        // 这是img标签的属性
       imageUrl: '',
      // 计时器倒计时的秒数
      sec: 0,
      // 验证码地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //是否显示对话框
      dialogFormVisible: false,
      //设置文字的宽度
      formLabelWidth: "65px",
      // 跟表单元素双向绑定的对象
      form: {
        avatar:'',
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        useCode: ""
      },
      rules: {
        avatar:[
          {required: true, message: "请选择头像", trigger: "change"}
        ],
        imgCode:[
          {required: true, message: "请输入图形验证码", trigger: "blur"},
          {len:4,message:'验证码为4位数',triggle:'blur'}
        ],
        useCode:[
          {required: true, message: "请输入手机验证码", trigger: "blur"},
          {len:4,message:'验证码为4位数',triggle:'blur'}
        ],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在6-15位数之间",
            triggle: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 检验表单
    doregister(){
        // 要检验表单就要先找到表单元素用validata方法
        this.$refs.regForm.validate(v=>{
            if(v){
             reGister({
               username:this.form.name,
               phone:this.form.phone,
               email:this.form.email,
               avatar:this.form.avatar,
               password:this.form.password,
               rcode:this.form.useCode,
             }).then(res=>{
               window.console.log(res)
              if(res.data.code==200){
                 this.$message.success('注册成功')
                  //并且重置对话框，只是重置表单元素，img元素是重置不了的
                  this.$refs.regForm.resetFields()
                  // 所以这里要手动清除图片的临时路径
                  this.imageUrl=''
                 //  注册成功就隐藏对话框
                 this.dialogFormVisible=false
              }else{
                this.$message.error(res.data.message)
              }
             })
            }
        })
    },

    // 获取手机验证码点击事件
    getPhoneCode() {
      // 这里可以给获取短信验证码调优  在发请求之前我们先自己判断一下，要不要进行发送请求
      // 判断手机格式是否正确   用正则表达式
      if (!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone))) {
        this.$message.error("请输入正确的手机号");
        return;
      }

      // 判断邮箱格式是否正确
      if (this.form.imgCode.length != 4) {
        return this.$message.error("请输入正确的邮箱");
      }
      this.sec = 60;
      // 设置一个定时器来倒计时
      let time = setInterval(() => {
        this.sec--;
        // 如果时间到了0秒，那么就要停止定时器
        if (this.sec == 0) {
          clearInterval(time);
        }},1000);

      // 发送axios请求获取手机验证码
      //实际工作中axios请求都会被封装到独立的js文件里面
      sendSms({
        code: this.form.imgCode,
        phone: this.form.phone
      }).then(res => {
        // 获取响应体
        if (res.data.code == 200) {
          this.$message.success("验证码为" + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
      // axios({
      //   url:process.env.VUE_APP_URL+'/sendsms',
      //   method:'post',
      //   data:{
      //     code:this.form.imgCode,
      //     phone:this.form.phone,
      //   },
      //   //axios发送请求有一个跨域问题，发送请求的时候不会携带cookie,
      //   //请求携带cookie
      //   withCredentials:true
      // }).then(res=>{
      //   window.console.log(res)
      //   if(res.data.code == 200){
      //   //   alert('验证码为'+res.data.data.captcha)
      //     this.$message.success('验证码为'+res.data.data.captcha)
      //   }else{
      //     // alert(res.data.message)
      //      this.$message.error(res.data.message);
      //   }
      // })
    },
     handleAvatarSuccess(res, file) {
        window.console.log(res)
        this.imageUrl = URL.createObjectURL(file.raw);
        // 上传成功后还要给avatar手动赋值，这样表单才能给它效验
        this.form.avatar=res.data.file_path
        //但是由于是手动赋值，没有出发规则的change事件，所以我们要对表单这个头像元素里的字段进行单独效验，
        this.$refs.regForm.validateField('avatar')
      },
       beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png' || 'image/jpeg' || 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 图片 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    getNewCode() {
      // 给图片路径从新赋值
      // 浏览器的缓存机制  所以我们要用时间戳来解决 或者随机数
      this.picCodeUrl = process.env.VUE_APP_URL + "/captcha?type=sendsms&sb=" + Date.now();
    },
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}
.el-dialog--center {
  .el-dialog__title {
    color: white;
    font-size: 17px;
  }
}
.codeImg {
  width: 100%;
  height: 41px;
  vertical-align: top;
}
  .avatar-uploader{
    text-align: center;

  }
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