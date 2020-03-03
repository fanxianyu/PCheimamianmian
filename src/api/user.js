// 导入axios
import axios from 'axios'

// 调用token方法
import { getToken } from '@/utilis/token.js'

// 克隆一个axios方法
let userRequest= axios.create({
    baseURL:process.env.VUE_APP_URL,
    // 允许携带token
    withCredentials:true
})

// 添加请求拦截器
userRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 在请求头里面添加token
    config.headers.token= getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


//   获取用户列表接口
export function getUser(params){
    return userRequest({
        url:'/user/list',
        params
    })
}

// 后台创建用户列表接口
export function addUser(data){
    return userRequest({
        url:'/user/add',
        method:'post',
        data
    })
}   

// 编辑用户接口
export function editUser(data){
    return userRequest({
        url:'/user/edit',
        method:'post',
        data
    })
}  

// 删除用户接口
export function removeUser(data){
    return userRequest({
        url:'/user/remove ',
        method:'post',
        data
    })
}  

// 设置用户状态
export function statusUser(data){
    return userRequest({
        url:'/user/status',
        method:'post',
        data
    })
} 