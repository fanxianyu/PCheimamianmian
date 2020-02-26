import axios from 'axios'

// 导入操作token的文件
import { getToken } from '@/utilis/token.js'


// 克隆一个axios对象出来
let indexRequest = axios.create({
    baseURL:process.env.VUE_APP_URL,
    // headers:{
    //     token:getToken() 
    // },
})

// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {

    // 在发送请求之前做些什么
    // 在请求头里添加token
    config.headers.token = getToken() //这句话意思每次首页发送请求都会带一个token
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });



// 这是获取用户信息的请求  没有参数，但是要求请求头里带token
export function info(){
    // return axios({
    //     url:process.env.VUE_APP_URL+'/info',
    //     method:'get',
    //     headers:{
    //         token:getToken() //从本地存储中读取token
    //     },
    // })

    return indexRequest({
        url:'/info',
        method:'get'
    })
}



// 退出请求
export function logout(){
    // return axios({
    //     url:process.env.VUE_APP_URL+'/logout',
    //     method:'get',
    //     headers:{
    //         token:getToken() 
    //     }
    // })

    return indexRequest({
        url:'/logout',
        method:'get'
    })
}