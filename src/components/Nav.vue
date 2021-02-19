<template>
  <nav class="m-nav">
    <ul class="m-nav-list">
      <li v-for="(type, key) in types" :key="key">
        <router-link :to="{name: 'normal', params: {knowledge_type: type.name}}" :class="{ on: isActive(type.name) }">
          <img :src="type.name | knowledgeIconURL"/>
          <span v-text="type.label"></span>
          <span class="u-count" v-if="type.count" v-text="`(${type.count})`"></span>
        </router-link>
      </li>
      <li>
        <a :href="moduleUrl('cj')">
          <img svg-inline src="../assets/img/achievement.svg"/>
          <span>成就</span>
          <span class="u-count">»</span>
        </a>
      </li>
      <li>
        <a :href="moduleUrl('item')">
          <img svg-inline src="../assets/img/item.svg"/>
          <span>物品</span>
          <span class="u-count">»</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {get_menus} from '../service/knowledge';
  import {__imgPath, __Root} from '@jx3box/jx3box-common/js/jx3box.json'

  export default {
    name: "Nav",
    data: function () {
      return {
        types: null,
      };
    },
    computed: {
      subtype: function () {
        return this.$store.state.subtype;
      },
    },
    methods: {
      moduleUrl(type) {
        return __Root + type;
      },
      isActive: function (subtype) {
        return subtype == this.subtype;
      },
    },
    filters: {
      knowledgeIconURL: function (type) {
        return __imgPath + 'image/wiki/' + type + '.svg'
      }
    },
    mounted() {
      get_menus().then(
          (data) => {
            data = data.data;
            if (data.code === 200) this.types = data.data.menus;
          }
      );
    },
  };
</script>

<style lang="less">
  @import "../assets/css/nav.less";
</style>
