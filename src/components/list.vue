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
            <template slot="filter">
                <a
                    :href="publish_link"
                    class="u-publish el-button el-button--primary el-button--small"
                >
                    + 创建百科词条
                </a>
                <!-- v-if="isAdmin" -->
                <a @click.prevent="audit" class="u-publish u-audit el-button el-button--warning el-button--small"><i class="el-icon-warning-outline"></i> 待审核词条<i class="u-pop" v-if="pnt"></i></a>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
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
                    <a
                        class="u-item"
                        v-for="(item, i) in data"
                        :key="i"
                        :href="item.id | postLink"
                        target="_blank"
                    >
                        <span class="u-title"
                            ><span class="u-type">{{ types[item.type] }}</span>
                            {{ item.title }}</span
                        >
                        <span class="u-desc" v-if="item.tag.length">
                            {{ item.tag | tagFormat }}
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
import { getPosts,getPendingCount } from "../service/post";
import dateFormat from "../utils/dateFormat";
import types from "@/assets/data/types.json";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import User from '@jx3box/jx3box-common/js/user'
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

            order: "", //排序模式
            search: "",
            types,
            isAdmin : User.isAdmin(),
            pnt : false
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
            if(this.order){
                params.order = this.order
            }
            return params;
        },
        publish_link: function(val) {
            return publishLink("wiki");
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            getPosts(this.params)
                .then((res) => {
                    this.setData(res.data.data, append);
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
            this.page = i;
            this.loadPosts(i);
            window.scrollTo(0, 0);
        },
        appendPage: function(i) {
            this.page = i;
            this.loadPosts(i, true);
        },
        setData: function(data, append = false) {
            if (append) {
                this.data = this.data.concat(data.data);
            } else {
                this.data = data.data;
            }
            this.total = data.total;
            this.pages = data.last_page;
        },
        filter: function(o) {
            if(o['val'] == 'podate'){
                this.order = 'created_at'
            }else if(o['val'] == 'update'){
                this.order = 'updated_at'
            }else{
                this.order = ''
            }
            this.loadPosts();
        },
        audit : function (){
            this.$router.push('audit')
        },
        getPendingCount : function (){
            getPendingCount().then((res) => {
                this.pnt = !!~~res.data.data
            })
        }
    },
    filters: {
        postLink: function(id) {
            return "./?pid=" + id;
        },
        tagFormat: function(tag) {
            return tag.join("、");
        },
    },
    created: function() {
        this.loadPosts(1);
        if(this.isAdmin) this.getPendingCount()
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
