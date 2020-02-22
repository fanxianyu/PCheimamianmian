import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index.js'
// 导入饿了么
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入全局样式 只要写路径
import './style/base.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
