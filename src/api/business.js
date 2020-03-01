// 这里是axios请求，所以要先导入axios
import axios from 'axios'

// 引入
import { getToken } from '../utilis/token.js'

// 克隆一份axios
let busiruquest = axios.create({
    baseURL:process.env.VUE_APP_URL,
    // 这里写允许携带token
    withCredentials: true
})


// 添加请求拦截器
busiruquest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 给请求头里token赋值
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 这里写接口
// 获取企业列表
export function businessList(params){
        return busiruquest({
            url:'/enterprise/list',
            params
        })
}

// 新建企业接口
export function businessAdd(data){
    return busiruquest({
        url:'/enterprise/add',
        method:'post',
        data
    })
}

// 企业状态设置接口
export function businessStatus(data){
    return busiruquest({
        url:'/enterprise/status',
        method:'post',
        data
    })
}

// 删除企业接口
export function businessDelete(data){
    return busiruquest({
        url:'/enterprise/remove',
        method:'post',
        data
    })
}

// 编辑企业接口
export function businessEdit(data){
    return busiruquest({
        url:'/enterprise/edit',
        method:'post',
        data
    })
}