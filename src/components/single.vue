<template>
    <div class="m-wiki-wrapper">
        <div class="m-wiki" v-if="data">
            {{data.title}}
        </div>
        <el-alert v-else title="未找到该词条" type="info" show-icon> </el-alert>
    </div>
</template>

<script>
// 助手函数
import _ from "lodash";
// 数据服务
import { getPost } from "../service/post.js";
import { getStat, postStat } from "../service/stat.js";

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            data: "",
            stat: {},
        };
    },
    computed: {
        id: function() {
            return this.$store.state.pid;
        },
    },
    methods: {},
    filters: {},
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id)
                .then((res) => {
                    this.data = res.data.data;
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(this.id).then((data) => {
                if (data) this.stat = this.$store.state.stat = data;
            });
            postStat(this.id);
        }
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
