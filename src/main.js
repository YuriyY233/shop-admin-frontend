import Vue from 'vue'
import App from './App.vue';
import axios from "axios";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
const router = new VueRouter({

})
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
