// 1 导入axios
import axios from 'axios'

// 封装请求的方法，并将它暴露出去
export function login(data){
    return axios({
        url:process.env.VUE_APP_URL + '/login',
        method:'post',
        data,
        // 发出请求的同时携带cookie
        withCredentials:true
    })
}

