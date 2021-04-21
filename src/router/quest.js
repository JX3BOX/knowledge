import Vue from "vue";
import VueRouter from "vue-router";

// 组件懒加载
const Home = () => import("../views/quest/Home.vue");
const Normal = () => import("../views/quest/Normal.vue");
const Detail = () => import("../views/quest/Detail.vue");
const Search = () => import("../views/quest/Search.vue");

Vue.use(VueRouter);

const routes = [
    // 主页
    { name: 'home', path: '/', component: Home },
    // 列表
    {name: 'normal', path: '/class/:class_id(\\d+)', component: Normal},
    // 单页
    {name: 'view', path: '/view/:source_id(\\d+)/:post_id(\\d+)?', component: Detail},
    // 搜索
    {name: 'search', path: '/search/:keyword(.*)', component: Search},

    // 默认页重定向
    {path: '*', redirect: 'home'}
];

const knowledge = new VueRouter({
    routes,
});

export default knowledge;
