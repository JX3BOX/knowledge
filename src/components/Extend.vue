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
            <ul class="m-rank-list" v-if="data.length">
                <li v-for="(item, i) in data" :key="i">
                    <a class="u-link" :href="item.id | postLink">
                        <span class="u-order" :class="highlight(i)">{{
                            i + 1
                        }}</span>
                        <span class="u-name"
                            >{{ item.title }}</span
                        >
                        <span class="u-per">
                            <em class="u-count">+ {{ views[i] }}</em>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getRank } from "@/service/stat.js";
import { getRankPost } from "@/service/post.js";
import { postLink} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "Extend",
    props: [],
    data: function() {
        return {
            data: "",
            views: [],
        };
    },
    computed: {},
    methods: {
        highlight : function (i){
            if(i == 0){
                return 't1'
            }else if(i == 1){
                return 't2'
            }else if(i == 2) {
                return 't3'
            }
        },
    },
    filters : {
        postLink : function (id){
            return postLink('wiki',id)
        }
    },
    mounted: function() {
        getRank().then((res) => {
            let result = res.data;
            let list = [];
            result.forEach((item) => {
                if (item.name.startsWith("wiki")) {
                    let id = item.name.split("-").pop();
                    list.push(id);
                    this.views.push(item.value["7days"]);
                }
            });
            getRankPost(list.join(",")).then((res) => {
                this.data = res.data.data.data;
                console.log(this.data);
            });
        });
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/side.less";
@import "../assets/css/rank.less";
</style>
