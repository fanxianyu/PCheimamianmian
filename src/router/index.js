// 提取出路由

// 1下载路由
//导入vue
import Vue from 'vue'
// 2导入路由
import VueRouter from 'vue-router'

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


// 5设置路由规则
const routes=[
    {path:'/login',component:login},
    {path:'/index',component:index,children:[
        //这里是子路由
        {path:'chart',component:chart},
        {path:'user',component:user},
        {path:'question',component:question},
        {path:'business',component:business},
        {path:'subject',component:subject}
    ]}
]

// 6创建路由对象
const router = new VueRouter({
    routes
})

// 全局前置守卫
// 即将跳转路由之前调用的
router.beforeEach((to,from,next) => {
    // 进度条开始
    // Nprogress.start()
    next()
})
// 后置钩子
// 已经跳转完路由之后调用的
router.afterEach(() => {
    // 进度条结束
    // Nprogress.done()
})

export default router