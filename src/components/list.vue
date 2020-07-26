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
                    <el-button slot="append" icon="el-icon-search" @click="searchPosts"></el-button>
                </el-input>
            </div>

            <!-- 列表 -->
            <div class="m-archive-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                    </li>
                </ul>
            </div>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import _ from "lodash";
import { searchPost } from "../service/post";
import dateFormat from "../utils/dateFormat";
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
            pages:1,

            search: "",
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
            };
            return params;
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
        },
        searchPosts : function (){
            if(!this.search) return
            searchPost(this.search).then((res) => {
                this.setData(res.data)
            }).finally(() => {
                this.loading = false
            })
        },
        changePage: function(i) {
            this.loadPosts(i);
        },
        appendPage: function(i) {
            this.loadPosts(i, true);
        },
        setData : function (data){
            this.data = data.data
            this.total = data.total
            this.pages = data.last_page
        }
    },
    filters: {
    },
    created: function() {
        this.loadPosts(1);
    },
    components: {
        listbox
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
