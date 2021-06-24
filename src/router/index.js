import Vue from 'vue';
import router from 'vue-router'; /* 导入路由 */
import userlist from "../views/InfoManagement/userlist.vue";
import entlist from "../views/InfoManagement/entlist.vue";
import login from "../views/login.vue";
import main from "../views/main.vue";
import enttypelist from "../views/InfoManagement/enttypelist.vue"
import articlelist from "../views/forumManagement/articlelist.vue";
import commentlist from "../views/forumManagement/commentlist.vue";
import replylist from "../views/forumManagement/replylist.vue";
import entTypeEchart from "../views/InfoManagement/Echart/entTypeEchart.vue"
import entListEchart from "../views/InfoManagement/Echart/entListEchart.vue"
import adminappeal from "@/views/admin/appeal/adminappeal";
import adminlevelUp from "../views/admin/level/adminlevelUp.vue"
import adminlist from "../views/admin/Management/adminlist.vue";
import byEentyToenTlist from "../views/InfoManagement/byEentyToenTlist.vue"
import adminLevelManagement from "@/views/admin/Management/adminLevelManagement";
import byEentyToenTlist from "../views/InfoManagement/byEentyToenTlist.vue"
import meMessage from "../views/admin/space/meMessage"


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
            }, {
                path: "/entTypeEchart",
                component: entTypeEchart
            }, {
                path: "/entListEchart",
                component: entListEchart
            },
            {
                path: "/articlelist",
                component: articlelist
            },
            {
                path: "/commentlist",
                component: commentlist
            },
            {
                path: "/replylist",
                name: "replylist",
                component: replylist
            },
            {
                path: "/byEentyToenTlist",
                name: "byEentyToenTlist",
                component: byEentyToenTlist
            }, {
                path: '/adminappeal',
                name: 'adminappeal',
                component: adminappeal
            }, {
                path: '/meMessage',
                name: 'meMessage',
                component: meMessage
            }, {
                path: '/adminlevelUp',
                name: 'adminlevelUp',
                component: adminlevelUp
            }, {
                path: '/adminlist',
                component: adminlist
            }, {
                path: '/adminLevelManagement',
                name: 'adminLevelManagement',
                component: adminLevelManagement
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
