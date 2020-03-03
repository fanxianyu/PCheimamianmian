// 这里是vuex仓库

// 1下载

// 2导包
import Vuex from 'vuex'
import Vue from 'vue'

// 注册
Vue.use(Vuex)

// 实例化
const store = new Vuex.Store({
    state:{
        userName:'',
        userPic:'',
        userStatus:'',
    },
    mutations:{
        changename(state,val){
            state.userName=val
        },
        changePic(state,val){
            state.userPic=val
        },
        changestatus(state,val){
            state.userStatus=val
        }
    }
})

// 暴露出去
export default store