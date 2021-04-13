<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="通识百科"
            slug="knowledge"
            root="/knowledge"
            :publishEnable="true"
            :adminEnable="false"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="../assets/img/knowledge.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <!-- 路由页面内容 -->
            <router-view />
            <!-- 右侧咨询 -->
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/knowledge/Info.vue";
import Nav from "@/components/knowledge/Nav.vue";
import Extend from "@/components/knowledge/Extend.vue";
import {getRewrite} from '@jx3box/jx3box-common/js/utils'

export default {
    name: "App",
    beforeCreate: function() {
        let params = new URLSearchParams(location.search);
        this.$store.state.pid = params.get("pid") || getRewrite("pid");
        this.$store.state.hid = params.get("hid") || getRewrite("hid");
        this.$store.state.mode = (this.$store.state.pid || this.$store.state.hid) ? "single" : "list";

        // 根据情况选择subtype取值
        this.$store.state.subtype = getRewrite("subtype");
    },
    components: {
        Info,
        Nav,
        Extend,
        // tabs,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                if (
                    typeof this.$route.params.knowledge_type === 'undefined'
                ) {
                    this.$store.state.sidebar.knowledge_type = null;
                }else {
                    this.$store.state.sidebar.knowledge_type = this.$route.params.knowledge_type ? this.$route.params.knowledge_type : '';
                }
            }
        },
    }
};
</script>

<style lang="less">
@import "../assets/css/app.less";
</style>
