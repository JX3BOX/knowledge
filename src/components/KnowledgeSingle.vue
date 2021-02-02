<template>
  <router-link class="m-knowledge-single" :class="{deep:deep}"
               :to="{ name: 'view', params: { source_id: knowledge.id } }">
    <div class="u-name">
      <span class="u-type" v-text="knowledge.label"></span>
      <span v-text="knowledge.name"></span>
      <div class="u-updated" v-if="updated">
        <i class="el-icon-refresh"></i>
        <span> 最后更新于 {{date_format(updated)}}</span>
      </div>
    </div>
    <div class="u-desc" v-if="tags" v-text="tags.join('、')"></div>
    <div class="u-meta">
      <div v-if="!favEnable" class="u-id" v-text="`ID: ${knowledge.id}`"></div>
      <Fav v-else post-type="knowledge" :post-id="knowledge.id"/>
    </div>
  </router-link>
</template>

<script>
  import _ from "lodash";
  import {ts2str} from "@jx3box/jx3box-common/js/utils";
  import Fav from "@jx3box/jx3box-common-ui/src/Fav";

  export default {
    name: "KnowledgeSingle",
    props: ["knowledge", "favEnable", 'deep'],
    methods: {
      date_format: ts2str,
    },
    computed: {
      tags() {
        let tags = _.get(this, 'knowledge.post.tags');
        return tags ? tags : null;
      },
      updated() {
        let updated = _.get(this, 'knowledge.post.updated');
        return updated ? updated : null;
      },
    },
    components: {
      Fav,
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/knowledge-single.less";
</style>
