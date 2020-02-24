// 1导入axios
import axios from 'axios'

// 2准备封装请求的方法，并把它暴露出去
//获取手机验证码
export function sendSms(data){
  return  axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data,
        // 发请求并且携带cookie
        withCredentials:true
    })
}

// 发送用户注册账号接口的请求
export function reGister(data){
   return  axios({
      url:process.env.VUE_APP_URL+'/register',
      method:'post',
      data,
      withCredentials:true
    })
}

