<template>
  <div class="m-info">
    <div class="u-stat">
      <span><em>收录通识数</em><b v-text="count.total"></b></span>
      <span><em>收录文章数</em><b v-text="count.posts_total"></b></span>
    </div>
  </div>
</template>

<script>
import {get_count} from '../../service/knowledge';
export default {
  name: "Info",
  data: function () {
    return {
      count: {},
    };
  },
  created() {
    // 获取通识统计信息
    get_count().then(
        (data) => {
          data = data.data;
          if (data.code === 200) this.count = data.data;
        }
    );
  }
};
</script>

<style lang="less">
@import '../../assets/css/components/info.less';
</style>
