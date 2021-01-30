<template>
  <div class="m-wiki-wrapper" v-loading="loading">
    <KnowledgeSingle v-if="source" :knowledge="source" :fav-enable="true" :deep="true"/>
    <div class="m-wiki" v-if="post">
      <div class="m-wiki-panel m-knowledge-panel">
        <div class="m-head">
          <a class="el-button el-button--primary u-publish" :href="publish_url(`knowledge/${id}`)">
            <i class="el-icon-edit"></i>
            <span>完善百科通识</span>
          </a>
          <h4 class="u-title">
            <img class="u-icon" svg-inline src="../assets/img/knowledge.svg"/>
            <span>通识正文</span>
          </h4>
        </div>
        <div class="m-body">
          <div class="content m-single-primary">
            <Article :content="post.content"/>
          </div>
          <div class="other">
            <div v-if="post.user_avatar" class="avatar">
              <img :src="post.user_avatar"/>
            </div>
            <div class="done">
              <a :href="post.user_id | author_url" v-text="post.user_nickname"></a>
            </div>
            <div class="updated"
                 v-text="`创建于 : ${ date_format(post.created) } | 更新于 : ${ date_format(post.updated) }`"></div>
            <a
                class="comment"
                href="javascript:void(0)"
                @click="go_to_comment"
                v-text="'前往评论'"
            ></a>
            <div class="remark">
              可通过评论通知原贡献者进行更改与署名补充
            </div>
          </div>
        </div>
      </div>

      <Revisions v-if="id" :source_id="id" style="margin-bottom:35px"/>

      <template v-if="id">
        <el-divider content-position="left">讨论</el-divider>
        <Comment :id="id" category="knowledge"/>
      </template>
    </div>

    <div v-else class="m-wiki-null">
      <i class="el-icon-s-opportunity"></i>
      <span> 暂无内容，我要</span>
      <a class="s-link" :href="publish_url(`knowledge/${source.id}`)">完善百科通识</a>
    </div>
  </div>
</template>

<script>
  // 数据服务
  import {
    getPost,
    adminPost,
    getUserPost,
    getAuthors,
    checkPost,
    getHistory,
  } from "../service/post.js";
  import {getStat, postStat} from "../service/stat.js";
  import {get_newest_post} from "../service/wiki_post";
  import author_url from "../filters/AuthorUrl";
  import date_format from "../filters/DateFormat";
  import publish_url from "../filters/PublishUrl";
  import KnowledgeSingle from "../components/KnowledgeSingle";
  import Revisions from "../components/Revisions";
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
    name: "Detail",
    props: [],
    data: function () {
      return {
        loading: false,
        data: "",
        stat: {},
        isAdmin: User.isAdmin(),
        authors: [],
        types,
        history: [],
        contributors: {},
        post: null,
        source: null,
      };
    },
    computed: {
      id: function () {
        return this.$route.params.source_id;
      },
      hid: function () {
        return this.$store.state.hid;
      },
    },
    methods: {
      author_url,
      date_format,
      publish_url,
      go_to_comment() {
        let target = document.querySelector(".c-comment");
        target.scrollIntoView(true);
      },
      showAvatar: showAvatar,
    },
    filters: {
      authorLink,
      versionLink: function (hid) {
        return "/knowledge/?hid=" + hid;
      },
    },
    created: function () {
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
                this.authors.forEach((author, i) => {
                  this.contributors[author.ID] = author.display_name;
                });
              });
            })
            .finally(() => {
              this.loading = false;
            });

        getHistory(this.id).then((res) => {
          this.history = res.data.data;
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
      KnowledgeSingle,
      Revisions,
    },
    watch: {
      'id': {
        immediate: true,
        handler() {
          // 获取最新攻略
          if (this.id) {
            get_newest_post('knowledge', this.id).then(
                (res) => {
                  res = res.data;
                  if (res.code === 200) {
                    this.post = res.data.post;
                    this.source = res.data.source;
                    if (this.source) this.source.post = this.post;
                  }
                }
            )
          }
        },
      },
      /*"$route.params.post_id": {
        immediate: true,
        handler() {
          // 获取物品攻略
          this.get_item_post();
        },
      },*/
    },
  };
</script>

<style lang="less">
  @import "../assets/css/views/detail.less";
</style>
