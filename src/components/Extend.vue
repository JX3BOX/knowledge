<template>
    <div class="m-extend-panel">
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
                热门通识
            </h3>
            <ul class="m-rank-list" v-if="data && data.length">
                <li v-for="(item, i) in data" :key="i">
                    <router-link
                        class="u-link"
                        :to="{ name: 'view', params: { source_id: item.id } }"
                    >
                        <span
                            class="u-order"
                            :class="highlight(i)"
                            v-text="i + 1"
                        ></span>
                        <span class="u-name" v-text="item.name"></span>
                        <span class="u-per">
                            <em class="u-count" v-text="'+ ' + views[i]"></em>
                        </span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getStatRank } from "@jx3box/jx3box-common/js/stat";
import { get_list } from "../service/knowledge";

export default {
    name: "Extend",
    props: [],
    data: function() {
        return {
            data: [],
            views: [],
        };
    },
    computed: {},
    methods: {
        highlight: function(i) {
            if (i == 0) {
                return "t1";
            } else if (i == 1) {
                return "t2";
            } else if (i == 2) {
                return "t3";
            }
        },
    },
    mounted: function() {
        getStatRank("knowledge").then((res) => {
            let result = res.data;
            let list = [];
            result.forEach((item) => {
                if (item.name.startsWith("knowledge")) {
                    let id = item.name.split("-").pop();
                    list.push(id);
                    this.views.push(item.value["7days"]);
                }
            });
            get_list({
                ids: list,
            }).then((res) => {
                res.data.data.data.forEach((item, i) => {
                    if (item) {
                        item.views = this.views[i];
                        this.data.push(item);
                    }
                });
            });
        });
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/components/extend.less";
@import "../assets/css/side.less";
@import "../assets/css/rank.less";
</style>
