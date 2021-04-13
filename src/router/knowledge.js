import Vue from "vue";
import VueRouter from "vue-router";

// 组件懒加载
const Home = () => import("../views/knowledge/Home.vue");
const Normal = () => import("../views/knowledge/Normal.vue");
const Detail = () => import("../views/knowledge/Detail.vue");
const Search = () => import("../views/knowledge/Search.vue");

const PetHome = () => import("../views/knowledge/pet/Home.vue");

Vue.use(VueRouter);

const routes = [
    // 主页
    { name: 'home', path: '/', component: Home },
    // 列表
    {name: 'normal', path: '/type/:knowledge_type([a-z_]+)', component: Normal},
    // 单页
    {name: 'view', path: '/view/:source_id(\\d+)/:post_id(\\d+)?', component: Detail},
    // 搜索
    {name: 'search', path: '/search/:keyword(.*)', component: Search},

    // 宠物密鉴
    {name: 'pet.home', path: '/pet', component: PetHome},

    // 默认页重定向
    {path: '*', redirect: 'search/'}
];

const knowledge = new VueRouter({
    routes,
});

export default knowledge;
