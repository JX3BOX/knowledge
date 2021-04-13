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
                    src="../../assets/img/side/rank.svg"
                />
                热门榜
            </h3>
            <el-tabs v-model="tab">
                <el-tab-pane label="全部" name="knowledge"></el-tab-pane>
                <el-tab-pane label="事件" name="bigbang"></el-tab-pane>
                <el-tab-pane label="八卦" name="gossip"></el-tab-pane>
                <el-tab-pane label="组织" name="organization"></el-tab-pane>
                <el-tab-pane label="玩家" name="player"></el-tab-pane>
            </el-tabs>
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

        <!-- 热门宠物 -->
        <PetRank />
    </div>
</template>

<script>
import PetRank from "./PetRank";
import { getStatRank } from "@jx3box/jx3box-common/js/stat";
import { get_list } from "../../service/knowledge";

export default {
    name: "Extend",
    props: [],
    data: function() {
        return {
            tab: "knowledge",
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
        loadData: function() {
            let type = this.tab
            getStatRank(type).then((res) => {
                let result = res && res.data;
                if (result && result.length) {
                    let list = [];
                    let views = [];
                    result.forEach((item) => {
                        if (item.name.startsWith(type)) {
                            let id = item.name.split("-").pop();
                            list.push(id);
                            views.push(item.value["7days"]);
                        }
                    });
                    this.views = views;

                    let data = [];
                    get_list({
                        ids: list,
                    }).then((res) => {
                        res.data.data.data.forEach((item, i) => {
                            if (item) {
                                item.views = this.views[i];
                                data.push(item);
                            }
                        });
                        this.data = data;
                    });
                }else{
                    this.data = []
                }
            });
        },
    },
    watch:{
        tab : function (){
            this.loadData();
        }
    },
    mounted: function() {
        this.loadData();
    },
    components: {
      PetRank,
    },
};
</script>

<style lang="less">
@import "../../assets/css/components/extend.less";
@import "../../assets/css/side.less";
@import "../../assets/css/rank.less";
</style>

 