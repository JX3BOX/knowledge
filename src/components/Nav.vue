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
    </ul>
  </nav>
</template>

<script>
  import {get_menus} from '../service/knowledge';
  import {__imgPath} from '@jx3box/jx3box-common/js/jx3box.json'

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
