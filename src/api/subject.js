// 发送ajax请求，需要导入aixos
import axios from 'axios'

// 引入
import { getToken } from '../utilis/token.js'

// 克隆一份axios
// 创建一个新的请求对象
let subRequest = axios.create({
    // 这里写基地址
    baseURL: process.env.VUE_APP_URL,
    // 这里是允许携带token
    withCredentials: true
})

// 添加请求拦截器
subRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 给请求头里token赋值
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 这里是封装
// 封装一个获取学科列表的接口
export function subjectList(params) {
    return subRequest({
        url: '/subject/list',
        params
    })
}

// 这里封装一个获取状态的接口
export function subjectStatus(data){
    return subRequest({
        url:'/subject/status',
        method:'post',
        data
    })
}


// 添加学科
export function subjectAdd(data){
    return  subRequest({
        url:'/subject/add',
        method:'post',
        data
    })
}


// 学科编辑
export function subjectedit(data){
    return subRequest({
        url:'/subject/edit',
        method:'post',
        data
    })
}


// 删除学科
export function subjectdelete(data){
    return subRequest({
        url:'/subject/remove',
        method:'post',
        data
    })
}