// 提取出路由

// 1下载路由

// 2导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 3注册路由
Vue.use(VueRouter)

// 4准备组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'

// 5设置路由规则
const routes=[
    {path:'/login',component:login},
    {path:'/index',component:index}
]

// 6创建路由对象
const router = new VueRouter({
    routes
})

export default router