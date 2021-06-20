import Vue from 'vue';
import router from 'vue-router'; /* 导入路由 */
import userlist from "../views/InfoManagement/userlist.vue";
import entlist from "../views/InfoManagement/entlist.vue";
import login from "../views/login.vue";
import main from "../views/main.vue";
import enttypelist from "../views/InfoManagement/enttypelist.vue"
import entTypeEchart from "../views/InfoManagement/Echart/entTypeEchart.vue"
import entListEchart from "../views/InfoManagement/Echart/entListEchart.vue"

// import App from "../App.vue";

Vue.use(router)
var rout = new router({
    routes: [{
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/main',
        name: 'main',
        component: main,
        children: [{
            path: "/userlist",
            component: userlist
        },
            {
                path: "/entlist",
                component: entlist
            },
            {
                path: "/enttypelist",
                component: enttypelist
            },{
                path: "/entTypeEchart",
                component: entTypeEchart
            },{
                path: "/entListEchart",
                component: entListEchart
            }
        ]
    }, {
        path: "/",
        redirect: '/main'
    }]
})

export default rout;

rout.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        return next();
    } else {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            return next("/login");
        } else {
            next();
        }
    }
})
