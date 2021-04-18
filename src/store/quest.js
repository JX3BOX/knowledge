import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let knowledge = {
    state: {
        sidebar : {
            class_id: null,
        },
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {}
};

export default new Vuex.Store(knowledge);
