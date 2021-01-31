<template>
  <div class="m-wiki-wrapper">
    <Search />
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
      <a class="s-link" :href="publish_url(`knowledge/${id}`)">完善百科通识</a>
    </div>
  </div>
</template>

<script>
  import {postStat} from "../service/stat.js";
  import {get_newest_post, get_post} from "../service/wiki_post";
  import author_url from "../filters/AuthorUrl";
  import date_format from "../filters/DateFormat";
  import publish_url from "../filters/PublishUrl";
  import KnowledgeSingle from "../components/KnowledgeSingle";
  import Revisions from "../components/Revisions";
  import Search from "../components/Search";
  import Article from "@jx3box/jx3box-editor/src/Article.vue";
  import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

  export default {
    name: "Detail",
    props: [],
    data: function () {
      return {
        post: null,
        source: null,
      };
    },
    computed: {
      id: function () {
        return this.$route.params.source_id;
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
    },
    created: function () {
      if (this.id) postStat(this.id);
    },
    components: {
      KnowledgeSingle,
      Article,
      Revisions,
      Comment,
      Search,
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
            );
          }
        },
      },
      "$route.params.post_id": {
        immediate: true,
        handler() {
          if (this.$route.params.post_id) {
            // 获取指定攻略
            get_post(this.$route.params.post_id).then(
                (res) => {
                  res = res.data;
                  if (res.code === 200) {
                    this.post = res.data.post;
                    this.source = res.data.source;
                    if (this.source) this.source.post = this.post;
                  }
                }
            );
          }
        },
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/views/detail.less";
</style>
