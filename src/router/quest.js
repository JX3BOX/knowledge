import Vue from "vue";
import VueRouter from "vue-router";

// 组件懒加载
const Home = () => import("../views/quest/Home.vue");

Vue.use(VueRouter);

const routes = [
    // 主页
    { name: 'home', path: '/', component: Home },

    // 默认页重定向
    {path: '*', redirect: 'home'}
];

const knowledge = new VueRouter({
    routes,
});

export default knowledge;
