import Vue from 'vue'
import moment from 'moment'

Vue.filter('changeTime',function(value){
   return  moment(value).format('YYYY-MM-DD')
})
// 因为是全局过滤器，所以要在mainjs里面导入他