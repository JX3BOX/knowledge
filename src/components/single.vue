<template>
    <div class="m-wiki-wrapper" v-loading="loading">
        <div class="m-wiki" v-if="data">
            <h1 class="u-title">{{ data.title }}</h1>
            <div class="u-info" v-if="id">
                <span class="u-info-item"
                    ><em class="u-label">类型</em
                    ><span class="u-value">{{ types[data.type] }}</span></span
                >
                <span class="u-info-item u-views"
                    ><em class="u-label">热度</em
                    ><span class="u-value">{{
                        stat ? stat.views : "-"
                    }}</span></span
                >
                <span class="u-info-item u-authors"
                    ><em class="u-label">参与贡献</em>
                    <span class="u-value"
                        ><a
                            class="u-author"
                            v-for="(author, i) in authors"
                            :key="i"
                            :href="author.ID | authorLink"
                            target="_blank"
                        >
                            <el-tooltip
                                effect="dark"
                                :content="author.display_name"
                                placement="top"
                            >
                                <img :src="showAvatar(author.user_avatar)" />
                            </el-tooltip> </a
                    ></span>
                </span>
            </div>
            <Article :content="data.content" />
            <div class="u-meta">
                <time class="u-time"
                    >创建于 : {{ data.created_at }} | 更新于 :
                    {{ data.updated_at }}</time
                >
            </div>
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" category="wiki" />
        </div>
        <el-alert v-else title="未找到该词条" type="info" show-icon> </el-alert>
        <div class="m-admin" v-if="id">
            <el-button
                class="u-btn"
                type="primary"
                @click="edit"
                size="mini"
                icon="el-icon-edit-outline"
                >编辑该词条</el-button
            >
            <el-button
                v-if="isAdmin && data.status"
                class="u-btn"
                type="danger"
                @click="admin('private')"
                size="mini"
                icon="el-icon-delete"
                >删除</el-button
            >
            <el-button
                v-if="isAdmin && !data.status"
                class="u-btn"
                type="success"
                @click="admin('public')"
                size="mini"
                icon="el-icon-refresh-left"
                >恢复</el-button
            >
        </div>
    </div>
</template>

<script>
// 助手函数
import _ from "lodash";
// 数据服务
import {
    getPost,
    adminPost,
    getUserPost,
    getAuthors,
} from "../service/post.js";
import { getStat, postStat } from "../service/stat.js";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import User from "@jx3box/jx3box-common/js/user";
import types from "@/assets/data/types.json";
import {
    publishLink,
    authorLink,
    showAvatar,
} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            data: "",
            stat: {},
            isAdmin: User.getInfo().group >= 64,
            authors: [],
            types,
        };
    },
    computed: {
        id: function() {
            return this.$store.state.pid;
        },
        hid: function() {
            return this.$store.state.hid;
        },
    },
    methods: {
        admin: function(status) {
            adminPost(this.id, status).then((res) => {
                this.$alert("确认操作吗", "消息", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        if (action == "confirm") {
                            this.$message({
                                type: "success",
                                message: `操作成功`,
                            });
                        }
                    },
                });
            });
        },
        edit: function() {
            location.href = publishLink("wiki") + "/" + this.id;
        },
        showAvatar: showAvatar,
    },
    filters: {
        authorLink: function(uid) {
            return authorLink(uid);
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id)
                .then((res) => {
                    this.data = res.data.data;
                    this.$store.state.status = true;

                    let uids = new Set(this.data.edited_user_ids);
                    uids = Array.from(uids).join(",");
                    getAuthors(uids).then((res) => {
                        this.authors = res.data.data.list;
                    });
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(this.id).then((data) => {
                if (data) this.stat = this.$store.state.stat = data;
            });
            postStat(this.id);
        }

        if (this.hid) {
            this.loading = true;
            getUserPost(this.hid)
                .then((res) => {
                    this.data = res.data.data;
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    components: {
        Article,
        Comment,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
