<template>
  <div class="m-wiki-wrapper" v-loading="loading">
    <listbox
        :data="knowledges"
        :total="total"
        :pages="pages"
        :per="per"
        :page="page"
        @appendPage="appendPage"
        @changePage="changePage"
    >
      <template slot="filter">
        <a
            :href="publish_link"
            class="u-publish el-button el-button--primary el-button--small"
        >
          + 创建百科通识
        </a>

        <!-- 排序过滤 -->
        <orderBy @filter="filter"></orderBy>
      </template>
      <!-- 搜索 -->
      <div class="m-archive-search" slot="search-before">
        <el-input
            placeholder="请输入搜索内容"
            v-model="search"
            class="input-with-select"
            @change="searchPosts"
        >
          <template slot="prepend">关键词</template>
          <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchPosts"
          ></el-button>
        </el-input>
      </div>

      <!-- 列表 -->
      <div class="m-wiki-list" v-if="knowledges.length">
        <div class="u-list">
          <KnowledgeSingle v-for="(source, i) in knowledges" :key="i" :knowledge="source"/>
        </div>
      </div>
    </listbox>
  </div>
</template>

<script>
  import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
  import {get_menu_list} from "../service/knowledge";
  import types from "@/assets/data/types.json";
  import {publishLink} from "@jx3box/jx3box-common/js/utils";
  import KnowledgeSingle from "../components/KnowledgeSingle";

  export default {
    name: "list",
    props: [],
    data: function () {
      return {
        loading: false, //加载状态

        page: 1, //当前页数
        per: 10, //每页条目
        pages: 1,
        knowledges: [], //数据列表
        total: 1, //总条目数

        order: "", //排序模式
        search: "",
        types,
        pnt: false
      };
    },
    computed: {
      params: function () {
        let params = {
          limit: this.per,
          page: this.page,
          knowledge_type: this.$store.state.sidebar.knowledge_type,
          knowledge: this.search,
        };
        if (this.order) params.order = this.order;
        return params;
      },
      publish_link: function (val) {
        return publishLink("knowledge");
      },
    },
    methods: {
      loadPosts: function (i = 1, append = false) {
        get_menu_list(this.params)
            .then((res) => {
              res = res.data;
              if (res.code === 200) {
                if (append) {
                  this.knowledges = this.knowledges.concat(res.data.data);
                } else {
                  this.knowledges = res.data.data;
                }
                this.total = res.data.total;
                this.pages = res.data.last_page;
              }
            })
            .finally(() => {
              this.loading = false;
            });
      },
      searchPosts: function () {
        if (!this.search) return;
        this.loadPosts(1);
      },
      changePage: function (i) {
        this.page = i;
        this.loadPosts(i);
        window.scrollTo(0, 0);
      },
      appendPage: function (i) {
        this.page = i;
        this.loadPosts(i, true);
      },
      filter(o) {
        if (o['val'] == 'podate') {
          this.order = 'created'
        } else if (o['val'] == 'update') {
          this.order = 'updated'
        } else {
          this.order = ''
        }
        this.loadPosts();
      },
      audit: function () {
        this.$router.push('audit')
      },
    },
    created: function () {
      this.loadPosts(1);
    },
    components: {
      listbox,
      KnowledgeSingle,
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          this.loadPosts(1);
        }
      }
    }
  };
</script>

<style lang="less">
  @import "../assets/css/views/normal.less";
</style>
