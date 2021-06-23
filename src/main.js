import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'


// // 引入echarts
// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(router);
axios.defaults.baseURL = "http://localhost:9999/web/";
// axios.defaults.baseURL = "http://192.168.31.225:9999/web/";


axios.interceptors.request.use(config => {
    config.headers.token = window.sessionStorage.getItem('token');
    return config;
})

axios.interceptors.response.use((res) => {
    if (res.data.code == 401) {
        router.replace("/login");
    }
    return res;
});
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
