import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        // 模式
        mode : '',

        // 列表
        subtype : '',
        sidebar : {
            knowledge_type: null,
        },
        client : location.href.includes('origin') ? 'origin' : 'std',

        // 单页
        hid:0,
        pid : 0,
        post : {},
        meta : {},
        setting : {},
        author : {},
        status : false,
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
