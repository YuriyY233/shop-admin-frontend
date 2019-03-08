import Vue from 'vue'
import App from './App.vue';
import axios from "axios";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import routes from "./routes.config.js";
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  routes
})
Vue.config.productionTip = false;
axios.defaults.baseURL="http://127.0.0.1:8899";
Vue.prototype.$axios = axios;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')