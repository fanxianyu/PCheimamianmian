// 提取出路由

// 1下载路由
//导入vue
import Vue from 'vue'
// 2导入路由
import VueRouter from 'vue-router'

// 导入vuex
import store from '../store/index.js'


// 导入nprogress包  进度条
// import Nprogress from 'nprogress'
// import 'nprogress/nprogress.css'



// 3注册路由
Vue.use(VueRouter)

// 4准备组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'


import { info } from '@/api/index.js'
import { removeToken } from '@/utilis/token.js'
import { Message } from 'element-ui'



// 导入被抽取的子路由文件
import children from '@/router/routerChildren.js'


// 5设置路由规则
const routes=[
    {path:'/login',component:login,meta:{title:'登录',roles:['超级管理员','管理员','老师','学生']}},
    // 路由重定向
    {path:'/',redirect:'/login'},
    {path:'/index',component:index,meta:{title:'首页',roles:['超级管理员','管理员','老师','学生']},
    children}
]

// 6创建路由对象
const router = new VueRouter({
    routes,
})

// 全局前置守卫
// 即将跳转路由之前调用的
router.beforeEach((to,from,next) => {
    // 进度条开始
    // Nprogress.start()

    // token真假判断
    // 这里要判断是否放行
    if(to.path=='/login'){
        next()
    }else{
        // 这里进行token真假判断
        // 先axios发送请求
        info().then(res=>{
            if(res.data.code==200){

                // 在这里判断用户信息的状态
                if(res.data.data.status==1){
                    // 把登录时发送请求得到的数据放入vuex
                store.commit('changename',res.data.data.username)
                store.commit('changePic',process.env.VUE_APP_URL+'/'+res.data.data.avatar)
                // 把获取用户信息中的role存储到vuex里面去，
                store.commit('changestatus',res.data.data.role)
                    if(from.path=='/login'){
                        Message.success('登陆成功')
                    }
                    // 这里判断用户状态
                if(to.meta.roles.includes(res.data.data.role)){
                     // 放行
                next()
                }else{
                    Message.warning('账号无权访问')
                    next(from.path)
                }
                }else{
                    Message.warning('账户登录异常，请于管理员联系')
                }
            }else if(res.data.code==206){
                // 提示错误消息
                Message.error('登录状态异常，请重新登录')
                // 删除本地token
                removeToken()
                // 打回登录页面
                next('/login')
            }
        })
        
    }
    
})
// 后置钩子
// 已经跳转完路由之后调用的
router.afterEach((to) => {
    // 跳转之后要更改网页的标题
    document.title=to.meta.title
    // 进度条结束
    // Nprogress.done()
})

export default router