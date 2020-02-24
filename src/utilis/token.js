// 这里面进行token的封装，如果以后哪里要操作token，那么直接调用这里面的函数就可以了

// 自定义一个常量
const TOKENKEY = 'mmtoken'

// 1首先要暴露出去，然后再return
// 1获取token
export function getToken(){
    return window.localStorage.getItem(TOKENKEY)
}

// 2设置token 也叫保存token
export function setToken(token){
     window.localStorage.setItem(TOKENKEY,token)
}

// 3删除token
export function removeItem(){
     window.localStorage.removeItem(TOKENKEY)
}