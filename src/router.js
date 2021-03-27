import Vue from "vue";
import VueRouter from "vue-router";

// 组件懒加载
const Home = () => import("./views/Home.vue");
const Normal = () => import("./views/Normal.vue");
const Detail = () => import("./views/Detail.vue");
const Search = () => import("./views/Search.vue");

const PetHome = () => import("./views/pet/Home.vue");

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

const router = new VueRouter({
    routes,
});

export default router;
