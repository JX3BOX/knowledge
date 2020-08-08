<template>
    <div class="m-extend">
        <!-- 群号 -->
        <RightSideMsg>
            <em>休闲党交流群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw"
                    >658035079</a
                ></strong
            >
        </RightSideMsg>

        <!-- 排行榜 -->
        <div class="m-side-rank">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/side/rank.svg"
                />
                热门词条
                <!-- <router-link class="u-more" to="/rank">完整榜单 &raquo;</router-link> -->
            </h3>
        </div>
    </div>
</template>

<script>
import { getRank } from "@/service/stat.js";
export default {
    name: "Extend",
    props: [],
    data: function() {
        return {
            data : ''
        };
    },
    computed: {},
    methods: {},
    mounted: function() {
        getRank().then((res) => {
            console.log(res.data)
        })
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/side.less";
</style>
