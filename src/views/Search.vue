<template>
  <div class="m-wiki-wrapper">
    <search-bar />
    <!-- 列表 -->
    <div class="m-wiki-list" v-if="sources && sources.length">
      <KnowledgeSingle v-for="(source, i) in sources" :key="i" :knowledge="source"/>
    </div>
    <el-pagination
        background
        :total="total"
        hide-on-single-page
        layout="prev, pager, next"
        :current-page="page"
        :page-size="length"
        prev-html="&laquo;"
        next-html="&raquo;"
        @current-change="page_change_handle"
    ></el-pagination>
  </div>
</template>

<script>
  import {get_list} from '../service/knowledge';
  import KnowledgeSingle from "../components/KnowledgeSingle";
  import Search from '../components/Search.vue';

  export default {
    name: "Search",
    props: [],
    data: function () {
      return {
        sources: [],
        total: 0,
        page: 1,
        length: 15,
      };
    },
    methods: {
      page_change_handle(page) {
        this.$router.push({
          name: "search",
          params: {keyword: this.$route.params.keyword},
          query: {page: page},
        });
      },
    },
    components: {
      KnowledgeSingle,
      'search-bar': Search,
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          this.page = parseInt(this.$route.query.page);

          get_list({
            ids: this.$route.query.ids ? this.$route.query.ids.split(',') : [],
            keyword: this.$route.params.keyword,
            page: this.page,
            limit: this.length
          }).then(
            (data) => {
              data = data.data;
              if (data.code === 200) {
                this.sources = data.data.data;
                this.total = data.data.total;
              } else {
                this.sources = null;
                this.total = 0;
              }
            }
          );
        },
      },
    },
  };
</script>
