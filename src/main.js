import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index.js'
// 导入饿了么
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入全局过滤器
// 只需要保证里面的代码被执行 所以只需要导入就行
import './filters/filters.js'


// 导入全局样式 只要写路径
import './style/base.css'

// 导入vuex
import store from './store/index.js'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
