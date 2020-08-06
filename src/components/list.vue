<template>
    <div class="m-archive" v-loading="loading">
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-before">
                <el-input
                    placeholder="请输入关键词"
                    v-model="search"
                    class="input-with-select"
                    @change="searchPosts"
                >
                    <template slot="prepend">关键词</template>
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searchPosts"
                    ></el-button>
                </el-input>
            </div>

            <!-- 列表 -->
            <div class="m-wiki-list" v-if="data.length">
                <ul class="u-list">
                    <a class="u-item" v-for="(item, i) in data" :key="i" :href="item.id | postLink">
                        <span class="u-title"><span class="u-type">{{ types[item.type] }}</span> {{ item.title }}</span>
                        <span class="u-desc" v-if="item.tag.length">
                            {{item.tag | tagFormat}}
                        </span>
                    </a>
                </ul>
            </div>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import _ from "lodash";
import { getPosts } from "../service/post";
import dateFormat from "../utils/dateFormat";
import { types } from "@jx3box/jx3box-data/data/common/wiki.json";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            per: 10, //每页条目
            pages: 1,

            search: "",
            types,
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        params: function() {
            let params = {
                size: this.per,
                page: this.page,
                type: this.subtype,
                keyword: this.search,
            };
            return params;
        },
    },
    methods: {
        loadPosts: function(i = 1) {
            getPosts(this.params)
                .then((res) => {
                    this.setData(res.data.data);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        searchPosts: function() {
            if (!this.search) return;
            this.loadPosts(1);
        },
        changePage: function(i) {
            this.loadPosts(i);
            window.scrollTo(0, 0);
        },
        appendPage: function(i) {
            this.loadPosts(i);
        },
        setData: function(data) {
            this.data = data.data;
            this.total = data.total;
            this.pages = data.last_page;
        },
    },
    filters: {
        postLink : function (id){
            return './?pid=' + id
        },
        tagFormat : function (tag){
            return tag.join('、')
        }
    },
    created: function() {
        this.loadPosts(1);
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
