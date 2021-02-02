<template>
  <div class="m-home-view">
    <Search />
    <WikiPanel :border-none="true">
      <template slot="head-title">
        <i class="el-icon-location-information"></i>
        <span>便捷入口</span>
      </template>
      <template slot="head-actions">
        <a class="u-more" target="_blank" :href="feedback">反馈建议 &raquo;</a>
      </template>
      <template slot="body">主页</template>
    </WikiPanel>
  </div>
</template>

<script>
  import Search from "../components/Search";
  import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";

  const {JX3BOX} = require("@jx3box/jx3box-common");
  export default {
    name: "Home",
    props: [],
    data() {
      return {
        feedback: JX3BOX.feedback,
      };
    },
    components: {
      Search,
      WikiPanel,
    }
  };
</script>

<style lang="less">
  @import "../assets/css/views/home.less";
</style>
