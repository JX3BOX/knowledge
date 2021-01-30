<template>
    <div class="m-home-view">
        <div class="m-wiki-panel no-border">
            <div class="m-head">
                <h4 class="u-title">
                    <i class="el-icon-location-information"></i>
                    <span> 便捷入口</span>
                </h4>
                <div class="u-other">
                    <a class="u-more" target="_blank" :href="feedback"
                        >反馈建议 &raquo;</a
                    >
                </div>
            </div>
            <div class="m-body">
                主页
            </div>
        </div>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Home",
    props: [],
    data: function() {
        return {
            feedback: JX3BOX.feedback,
        };
    },
    methods: {
    },
    mounted() {

    },
};
</script>

<style lang="less">
@import "../assets/css/views/home.less";
</style>
