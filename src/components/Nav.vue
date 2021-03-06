<template>
    <nav class="m-nav">
        <ul class="m-nav-list" v-if="types">
            <li>
                <a href="/cj" target="_blank">
                    <i class="u-icon el-icon-medal"></i>
                    <span class="u-name">成就</span>
                </a>
            </li>
            <li>
                <a href="/item" target="_blank">
                    <i class="u-icon el-icon-apple"></i>
                    <span class="u-name">物品</span>
                </a>
            </li>
            <!-- <li>
                <a href="/quest" target="_blank">
                    <i class="u-icon el-icon-collection-tag"></i>
                    <span class="u-name">任务</span>
                </a>
            </li> -->
            <li v-for="(type, key) in types" :key="key">
                <router-link
                    :to="{
                        name: 'normal',
                        params: { knowledge_type: type.name },
                    }"
                    :class="{ on: isActive(type.name) }"
                >
                    <!-- <img :src="type.name | knowledgeIconURL" /> -->
                    <i class="u-icon" :class="icons[type.name]"></i>
                    <span class="u-name" v-text="type.label"></span>
                    <span
                        class="u-count"
                        v-if="type.count"
                        v-text="`(${type.count})`"
                    ></span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { get_menus } from "../service/knowledge";
import { __imgPath, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import icons from "@/assets/data/icons.json";
export default {
    name: "Nav",
    data: function() {
        return {
            types: [],
            icons: icons,
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
    },
    methods: {
        moduleUrl(type) {
            return __Root + type;
        },
        isActive: function(subtype) {
            return subtype == this.subtype;
        },
    },
    filters: {
        knowledgeIconURL: function(type) {
            return __imgPath + "image/wiki/" + type + ".svg";
        },
    },
    mounted() {
        get_menus().then((data) => {
            data = data.data;
            if (data.code === 200) this.types = data.data.menus;
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/nav.less";
</style>
