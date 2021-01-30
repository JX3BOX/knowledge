<template>
  <div class="m-wiki-panel">
    <div class="m-head">
      <h4 class="u-title">📄 历史版本</h4>
    </div>
    <div class="m-body">
      <div class="m-revisions">
        <div style="padding:5px 0;text-align:center">
          <span v-if="versions === null">Loading...</span>
          <span v-if="versions === false">⚠️ 数据加载异常</span>
          <span v-if="versions && !versions.length">💧 暂无数据</span>
        </div>
        <table v-if="versions && versions.length" id="histories">
          <tr>
            <th>版本</th>
            <th>更新时间</th>
            <th>贡献者</th>
            <th>修订说明</th>
          </tr>
          <tr class="history" v-for="(ver, key) in versions" :key="key">
            <td>
              <router-link
                  :to="{name: 'view', params: { source_id: ver.source_id, post_id: ver.id }}"
                  v-text="'v' + (versions.length - key)"
              ></router-link>
            </td>
            <td>{{ ver.updated | date_format }}</td>
            <td>
              <a :href="ver.user_id | author_url" v-text="ver.user_nickname"></a>
            </td>
            <td v-text="ver.remark"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {get_versions} from "../service/wiki_post";

  export default {
    name: "Revision",
    props: ["source_id"],
    data: function () {
      return {
        versions: null,
      };
    },
    watch: {
      source_id: {
        immediate: true,
        handler() {
          //数据加载
          if (this.source_id) {
            get_versions('knowledge', this.source_id).then(
                (data) => {
                  data = data.data;
                  if (data.code === 200) this.versions = data.data.versions;
                },
                () => {
                    this.versions = false;
                }
            );
          }
        },
      },
    },
  };
</script>

<style lang="less">
  @import '../assets/css/components/revisions.less';
</style>

