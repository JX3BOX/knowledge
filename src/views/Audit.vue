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
                <!-- v-if="isAdmin" -->
                <el-select
                    v-model="status"
                    placeholder="请选择"
                    size="medium"
                    @change="loadPosts(1)"
                >
                    <el-option
                        v-for="(label, status) in statusmap"
                        :key="label"
                        :label="label"
                        :value="status"
                    >
                    </el-option>
                </el-select>
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
import { getList } from "../service/post";
import dateFormat from "../utils/dateFormat";
import types from "@/assets/data/types.json";
import User from "@jx3box/jx3box-common/js/user";
const statusmap = {
    "0": "待审核",
    // "1": "已通过",
    "2": "驳回",
};
export default {
    name: "Audit",
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

            statusmap,
            status: "0",
        };
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            getList({
                status: this.status,
                page: i,
                size: this.per,
            })
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
            if (o["val"] == "podate") {
                this.order = "created_at";
            } else if (o["val"] == "update") {
                this.order = "updated_at";
            } else {
                this.order = "";
            }
            this.loadPosts();
        },
    },
    filters: {
        postLink: function(id) {
            return "./?hid=" + id;
        },
        tagFormat: function(tag) {
            return tag.join("、");
        },
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
