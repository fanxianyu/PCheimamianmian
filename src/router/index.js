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
import user from '../views/index/user/index.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'
import business from '../views/index/business/business.vue'
import subject from '../views/index/subject/subject.vue'

import { info } from '@/api/index.js'
import { removeToken } from '@/utilis/token.js'
import { Message } from 'element-ui'






// 5设置路由规则
const routes=[
    {path:'/login',component:login,meta:{title:'登录'}},
    // 路由重定向
    {path:'/',redirect:'/login'},
    {path:'/index',component:index,meta:{title:'首页'},children:[
        //这里是子路由
        {path:'chart',component:chart,meta:{title:'数据概览'}},
        {path:'user',component:user,meta:{title:'用户列表'}},
        {path:'question',component:question,meta:{title:'题库列表'}},
        {path:'business',component:business,meta:{title:'企业列表'}},
        {path:'subject',component:subject,meta:{title:'学科列表'}}
    ]}
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
                // 把数据放入vuex
                store.commit('changename',res.data.data.username)
                store.commit('changePic',process.env.VUE_APP_URL+'/'+res.data.data.avatar)
                // 放行
                next()
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