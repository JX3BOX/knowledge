<template>
  <div class="m-pet-rank">
    <div class="m-hot-pets">
      <h3 class="c-sidebar-right-title">
        <img class="u-icon" svg-inline src="../assets/img/side/rank.svg" />
        <span>热门宠物</span>
      </h3>
      <div class="u-list" v-if="hot_pets && hot_pets.length">
        <a class="u-pet" v-for="(pet, key) in hot_pets" :key="key" :href="wiki_url(pet.item_id, pet.achievement_id)">
          <jx3-item-simple :item="pet.item" only-icon="true" icon-size="45px" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ItemSimple from '@jx3box/jx3box-editor/src/ItemSimple'
import { getStatRank } from '@jx3box/jx3box-common/js/stat'
import { get_list } from '@/service/pet'
import { getLink } from '@jx3box/jx3box-common/js/utils'

export default {
  name: 'PetRank',
  data() {
    return {
      hot_pets: null,
      hot_pet_views: null,
    }
  },
  created() {
    getStatRank('pet', 'views', 20).then((res) => {
      res = res.data
      this.hot_pet_views = []
      let source_ids = []
      res.forEach((item) => {
        if (item.name.startsWith('pet')) {
          let id = item.name.split('-').pop()
          source_ids.push(id)
          this.hot_pet_views[id] = item.value
        }
      })

      get_list({ ids: source_ids }).then((res) => {
        res = res.data
        // 按照长度分批
        if (res.code === 200) {
          let pets = res.data.pets
          for (let index in pets) {
            pets[index].item = { id: pets[index].item_id, IconID: pets[index].IconID, Quality: pets[index].Quality }
          }
          this.hot_pets = pets
        }
      })
    })
  },
  methods: {
    wiki_url(item_id, achievement_id) {
      if (achievement_id) return getLink('achievement', achievement_id)
      if (item_id) return getLink('item', item_id)
      return null
    },
  },
  components: {
    'jx3-item-simple': ItemSimple,
  },
}
</script>

<style lang="less">
@import '../assets/css/components/pet-rank.less';
</style>

<style scope lang="less">
@media screen and (max-width: @phone) {
  .m-pet-rank {
    padding-top: 10px;
    .m-hot-pets {
      .c-sidebar-right-title {
        display: flex;
        align-items: center;
        line-height: 40px;
        margin-bottom: 20px;
      }
      .u-list {
        .u-pet {
          margin: 0 10px 10px 0;
          &:nth-child(6n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
