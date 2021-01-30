import Vue from "vue";
import VueRouter from "vue-router";

// 组件懒加载
const Home = () => import("./views/Home.vue");
const Audit = () => import("./views/Audit.vue");
const Normal = () => import("./views/Normal.vue");
const Detail = () => import("./views/Detail.vue");

Vue.use(VueRouter);

const routes = [
    { name: "audit", path: "/audit", component: Audit },

    // 主页
    { name: 'home', path: '/home', component: Home },
    // 常规
    {name: 'normal', path: '/:knowledge_type([a-z_]+)', component: Normal},
    // 单页
    {name: 'view', path: '/view/:source_id([_\\d]+)/:post_id(\\d+)?', component: Detail},
    // 默认页重定向
    {path: '*', redirect: 'home'}
];

const router = new VueRouter({
    routes,
});

export default router;
