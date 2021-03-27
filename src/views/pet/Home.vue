<template>
  <div class="m-pet-home-view">
    <WikiPanel class="m-pet-list" :border-none="true">
      <template slot="head-title">
        <i class="el-icon-location-information"></i>
        <span> 宠物密鉴</span>
      </template>
      <template slot="head-actions">
        <a class="other" target="_blank" :href="feedback">反馈建议 &raquo;</a>
      </template>
      <template slot="body">
        <div class="m-filter">
          <el-input class="u-keyword" v-model="keyword" placeholder="输入关键字"></el-input>
          <el-select class="u-type" v-model="type">
            <el-option label="所有种类" value=""></el-option>
            <template v-for="item in types">
              <el-option :key="item.ID" v-if="item.Type==1" :label="item.TypeName" :value="item.ID"></el-option>
            </template>
          </el-select>
          <el-select class="u-source" v-model="source">
            <el-option label="所有途径" value=""></el-option>
            <template v-for="item in types">
              <el-option :key="item.ID" v-if="item.Type==2" :label="item.TypeName" :value="item.ID"></el-option>
            </template>
          </el-select>
        </div>
        <ul class="m-pets" v-if="search_pets && search_pets.length">
          <li class="m-pet" v-for="(pet,key) in search_pets" :key="key">
            <a target="_blank" :href="wiki_url(pet.item_id, pet.achievement_id)">
              <jx3-item-simple :item="pet.item" only-icon="true" icon-size="48px"/>
            </a>
          </li>
        </ul>
      </template>
    </WikiPanel>
  </div>
</template>

<script>
  import {feedback} from "@jx3box/jx3box-common/data/jx3box.json";
  import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
  import ItemSimple from "@jx3box/jx3box-editor/src/ItemSimple";
  import {get_list, get_type_list} from "@/service/pet.js";
  import {getLink, iconLink} from "@jx3box/jx3box-common/js/utils";

  export default {
    name: "Home",
    data() {
      return {
        feedback,
        pets: null,
        types: null,
        keyword: '',
        type: '',
        source: '',
      };
    },
    computed: {
      search_pets() {
        let pets = [];
        for (let index in this.pets) {
          let pet = this.pets[index];
          if (
              this.keyword && pet.Name.indexOf(this.keyword) === -1 ||
              this.type && pet.TypeID.indexOf(`,${this.type},`) === -1 ||
              this.source && pet.TypeID.indexOf(this.source) === -1
          ) continue;
          pets.push(pet);
        }
        return pets;
      },
    },
    methods: {
      icon_url: iconLink,
      wiki_url(item_id, achievement_id) {
        if (achievement_id) return getLink('achievement', achievement_id);
        if (item_id) return getLink('item', item_id);
        return null;
      }
    },
    created() {
      get_list().then((res) => {
        res = res.data;
        if (res.code === 200) {
          let pets = res.data.pets;
          for (let index in pets) {
            pets[index].item = {id: pets[index].item_id, IconID: pets[index].IconID, Quality: pets[index].Quality};
          }
          this.pets = pets;
        }
      });
      get_type_list().then((res) => {
        res = res.data;
        if (res.code === 200) this.types = res.data.types;
      });
    },
    components: {
      WikiPanel,
      'jx3-item-simple': ItemSimple,
    },
  };
</script>

<style lang="less">
  @import "../../assets/css/views/pet/home.less";
</style>
