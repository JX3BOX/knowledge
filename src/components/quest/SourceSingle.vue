<template>
  <router-link class="m-quest-single" :to="{name: 'view', params: { source_id: source.id }}">
    <div class="u-meta">
      <div v-if="!favEnable" class="u-id" v-text="`ID: ${source.id}`"></div>
      <Fav v-else post-type="quest" :post-id="source.id"/>
    </div>
    <div class="u-name" v-text="source.Name"></div>
    <div class="u-objective" v-html="source.Objective"></div>
    <div class="u-description">
        <div>任务描述：</div>
        <div v-html="source.Description"></div>
    </div>
    <div class="m-start-end">
      <div class="u-start">
        <b>开始：</b>
        <span v-if="source.StartMapName" v-text="`地图（${source.StartMapName}）`"></span>
        <span v-if="source.StartNpcTemplateName" v-text="`NPC（${source.StartNpcTemplateName}）`"></span>
        <span v-if="source.StartItemName" v-text="`物品（${source.StartItemName}）`"></span>
      </div>
      <div class="u-end">
        <b>结束：</b>
        <span v-if="source.EndMapName" v-text="`地图（${source.EndMapName}）`"></span>
        <span v-if="source.EndNpcTemplateName" v-text="`NPC（${source.EndNpcTemplateName}）`"></span>
      </div>
    </div>
  </router-link>
</template>

<script>
  import _ from "lodash";
  import {ts2str} from "@jx3box/jx3box-common/js/utils";
  import Fav from "@jx3box/jx3box-common-ui/src/interact/Fav";

  export default {
    name: "SourceSingle",
    props: ["source", "favEnable"],
    methods: {
      date_format: ts2str,
    },
    computed: {
      tags() {
        let tags = _.get(this, "source.post.tags");
        return tags ? tags : null;
      },
      updated() {
        let updated = _.get(this, "source.post.updated");
        return updated ? updated : null;
      },
    },
    components: {
      Fav,
    },
  };
</script>

<style lang="less">
  @import "../../assets/css/components/quest/source-single.less";
</style>
