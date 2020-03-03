

import user from '../views/index/user/user.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'
import business from '../views/index/business/business.vue'
import subject from '../views/index/subject/subject.vue'

// 在这里面把路由的子路由抽取过来
// 再把它暴露出去
export default [
    
        //这里是子路由
        {path:'chart',component:chart,meta:{title:'数据概览',roles:['超级管理员','管理员']}},
        {path:'user',component:user,meta:{title:'用户列表',roles:['超级管理员','管理员']}},
        {path:'question',component:question,meta:{title:'题库列表',roles:['超级管理员','管理员','老师','学生']}},
        {path:'business',component:business,meta:{title:'企业列表',roles:['超级管理员','管理员','老师']}},
        {path:'subject',component:subject,meta:{title:'学科列表',roles:['超级管理员','管理员','老师','学生']}}
    
]