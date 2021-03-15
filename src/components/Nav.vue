<template>
    <nav class="m-nav">
        <ul class="m-nav-list" v-if="types">
            <li>
                <a href="/cj" target="_blank">
                    <i class="u-icon el-icon-medal"></i>
                    <span class="u-name">成就</span>
                    <span
                        class="u-count"
                        v-if="wiki_count && wiki_count.achievements_total"
                        v-text="`(${wiki_count.achievements_total})`"
                    ></span>
                </a>
            </li>
            <li>
                <a href="/item" target="_blank">
                    <i class="u-icon el-icon-apple"></i>
                    <span class="u-name">物品</span>
                    <span
                        class="u-count"
                        v-if="wiki_count && wiki_count.items_total"
                        v-text="`(${wiki_count.items_total})`"
                    ></span>
                </a>
            </li>
            <!-- <li>
                <a href="/quest" target="_blank">
                    <i class="u-icon el-icon-collection-tag"></i>
                    <span class="u-name">任务</span>
                </a>
            </li> -->
            <li>
                <a href="/bbs#namespace" target="_blank">
                    <i class="u-icon el-icon-postcard"></i>
                    <span class="u-name">铭牌</span>
                    <span
                        class="u-count"
                        v-if="wiki_count && wiki_count.namespaces_total"
                        v-text="`(${wiki_count.namespaces_total})`"
                    ></span>
                </a>
            </li>
            <!-- <li>
                <a href="/bbs#joke" target="_blank">
                    <i class="u-icon el-icon-chat-line-square"></i>
                    <span class="u-name">骚话</span>
                </a>
            </li>
            <li>
                <a href="/bbs#emotion" target="_blank">
                    <i class="u-icon el-icon-picture-outline-round"></i>
                    <span class="u-name">表情</span>
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
import { get_count as get_wiki_count } from "../service/wiki";
import { __imgPath, __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import icons from "@/assets/data/icons.json";
export default {
    name: "Nav",
    data: function() {
        return {
            types: [],
            icons: icons,
            wiki_count: null,
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
    created() {
        get_menus().then((data) => {
            data = data.data;
            if (data.code === 200) this.types = data.data.menus;
        });

        get_wiki_count().then((data) => {
            data = data.data;
            if (data.code === 200) {
                this.achievement_count =
                    data.data.count.general + data.data.count.armor;
            }
        });

        get_wiki_count().then((data) => {
            data = data.data;
            if (data.code === 200) this.wiki_count = data.data;
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/nav.less";
</style>
