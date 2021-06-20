import Vue from 'vue';
import router from 'vue-router'; /* 导入路由 */
import userlist from "../views/InfoManagement/userlist.vue";
import entlist from "../views/InfoManagement/entlist.vue";
import login from "../views/login.vue";
import main from "../views/main.vue";
import enttypelist from "../views/InfoManagement/enttypelist.vue"
import articlelist from "../views/forumManagement/articlelist.vue";
import commentlist from "../views/forumManagement/commentlist.vue";
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
            },
            {
                path: "/articlelist",
                component: articlelist
            },
            {
                path: "/commentlist",
                component: commentlist
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
