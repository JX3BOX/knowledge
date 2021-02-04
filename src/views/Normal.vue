<template>
    <div class="m-wiki-wrapper">
        <Search />
        <!-- 列表 -->
        <div class="m-wiki-list" v-if="sources && sources.length">
            <KnowledgeSingle
                v-for="(source, i) in sources"
                :key="i"
                :knowledge="source"
            />
        </div>
        <el-pagination
            background
            :total="sources_total"
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="page"
            :page-size="length"
            prev-html="&laquo;"
            next-html="&raquo;"
            @current-change="page_change_handle"
        ></el-pagination>
    </div>
</template>

<script>
import { get_menu_list } from "../service/knowledge";
import KnowledgeSingle from "../components/KnowledgeSingle";
import Search from "../components/Search";

export default {
    name: "list",
    props: [],
    data: function() {
        return {
            sources: null,
            sources_total: 0,
            page: 1,
            length: 20,
        };
    },
    methods: {
        page_change_handle(page) {
            this.$router.push({
                name: "normal",
                query: { page: page },
            });
        },
    },
    components: {
        Search,
        KnowledgeSingle,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.page = parseInt(this.$route.query.page);
                // 获取菜单下通识列表
                get_menu_list({
                    limit: this.length,
                    page: this.page,
                    knowledge_type: this.$store.state.sidebar.knowledge_type,
                }).then((res) => {
                    res = res.data;
                    if (res.code === 200) {
                        this.sources = res.data.data;
                        this.sources_total = res.data.total;
                    }
                });
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/views/normal.less";
</style>
