<template>
    <div class="m-wiki-wrapper">
        <Search />
        <!-- 列表 -->
        <div class="m-wiki-list" v-if="sources && sources.length">
            <router-link
                v-for="(knowledge, i) in sources"
                :key="i"
                class="m-knowledge-item"
                :to="{ name: 'view', params: { source_id: knowledge.id } }"
            >
                <div class="u-name">
                    <span class="u-type"
                        ><i class="u-icon" :class="icons[knowledge.type]"></i>
                        {{ knowledge.label }}</span
                    >
                    <span class="u-title">{{ knowledge.name }}</span>
                </div>
                <div class="u-tags" v-if="hasTag(knowledge)">
                    <i class="el-icon-collection-tag"></i>
                    {{ knowledge | showTag }}
                </div>
                <span class="u-remark">
                    <i class="el-icon-edit"></i>最后修订：{{
                        knowledge.post.remark
                    }}
                    @{{ knowledge.post.user_nickname }}
                </span>
                <div class="u-updated" v-if="knowledge.updated">
                    <i class="el-icon-refresh"></i>
                    <span> 最后更新于{{ date_format(knowledge.updated) }}</span>
                </div>
            </router-link>
        </div>
        <el-pagination
            class="m-wiki-pages"
            background
            :total="sources_total"
            hide-on-single-page
            layout="prev, pager, next"
            :current-page.sync="page"
            :page-size="length"
            prev-html="&laquo;"
            next-html="&raquo;"
        ></el-pagination>
    </div>
</template>

<script>
import { get_menu_list } from "../service/knowledge";
import Search from "../components/Search";
import icons from "@/assets/data/icons.json";
import { ts2str } from "@jx3box/jx3box-common/js/utils";
import _ from "lodash";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            sources: [],
            sources_total: 0,
            page: 1,
            length: 20,

            icons: icons,
            date_format: ts2str,
        };
    },
    computed: {
        params: function() {
            return {
                limit: this.length,
                page: this.page,
                knowledge_type: this.$store.state.sidebar.knowledge_type,
            };
        },
    },
    methods: {
        hasTag: function(knowledge) {
            let tags = _.get(knowledge, "post.tags");
            if (tags && tags.length) {
                let _tags = [];
                tags.forEach((item) => {
                    if (item) {
                        _tags.push(item);
                    }
                });
                return _tags.length;
            } else {
                return false;
            }
        },
        loadData: function() {
            get_menu_list(this.params).then((res) => {
                res = res.data;
                if (res.code === 200) {
                    this.sources = res.data.data;
                    this.sources_total = res.data.total;
                }
            });
        },
    },
    filters: {
        showTag: function(knowledge) {
            let tags = _.get(knowledge, "post.tags");
            return tags ? tags.join("、") : "";
        },
    },
    components: {
        Search,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.page = parseInt(this.$route.query.page) || 1;
                this.loadData()
            },
        },
        params : {
            deep : true,
            handler : function (){
                this.loadData()
            }
        }
    },
    mounted : function (){
    }
};
</script>

<style lang="less">
@import "../assets/css/views/normal.less";
</style>
