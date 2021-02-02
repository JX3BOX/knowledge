<template>
  <nav class="m-nav">
    <ul class="m-nav-list">
      <!-- <li><a href="./?subtype=" :class="{ on: !subtype }">全部</a></li> -->
      <li v-for="(label, type) in types" :key="type">
        <router-link :to="{name: 'normal', params: {knowledge_type: type}}" :class="{ on: isActive(type) }">
          <img :src="type | knowledgeIconURL"/>
          <span>{{ label }}</span>
        </router-link>
      </li>
      <li>
        <a :href="moduleUrl('cj')">
          <img svg-inline src="../assets/img/achievement.svg"/>
          <span>成就</span>
        </a>
      </li>
      <li>
        <a :href="moduleUrl('item')">
          <img svg-inline src="../assets/img/item.svg"/>
          <span>物品</span>
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
