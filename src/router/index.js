import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../views/Index.vue");
const Audit = () => import("../views/Audit.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "audit", path: "/audit", component: Audit },
    // { name: "single", path: "/view/:id", component: Single },
];

const router = new VueRouter({
    routes,
});

export default router;
