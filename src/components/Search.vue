<template>
  <div
      class="m-search-bar"
      :class="$route.name == 'view' ? 'can-return' : ''"
  >
    <div class="m-return">
      <el-button class="u-return-btn" @click="return_handle"
      >返回
      </el-button
      >
    </div>
    <div class="m-search">
      <el-input
          class="u-search-input"
          v-model="keyword"
          @keydown.enter.native="search_handle"
          placeholder="输入通识名称「回车」进行搜索"
      >
        <span slot="prepend">关键词</span>
      </el-input>
      <el-button
          class="u-search-btn"
          type="primary"
          plain
          @click="search_handle"
      >搜索
      </el-button>
    </div>
    <div class="m-add">
      <el-button class="u-add-btn" @click="add_handle" type="primary" icon="el-icon-plus">创建百科通识</el-button>
    </div>
  </div>
</template>

<script>
  import publish_url from "../filters/PublishUrl";
  export default {
    name: "Search",
    data() {
      return {
        keyword: "",
      };
    },
    methods: {
      publish_url,
      return_handle() {
        history.back();
      },
      add_handle() {
        location.href = publish_url('knowledge');
      },
      search_handle() {
        this.$router.push({
          name: "search",
          params: {keyword: this.keyword},
        });
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/search.less";
</style>
