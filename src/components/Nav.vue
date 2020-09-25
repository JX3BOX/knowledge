<template>
    <nav class="m-nav">
        <ul class="m-nav-list">
            <!-- <li><a href="./?subtype=" :class="{ on: !subtype }">全部</a></li> -->
            <li v-for="(label, type) in types" :key="type">
                <a :href="type | listLink" :class="{ on: isActive(type) }">
                    <img :src="type | wikiIconURL" />
                    <span>{{ label }}</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import types from "@/assets/data/types.json";
import {__imgPath } from '@jx3box/jx3box-common/js/jx3box.json'
export default {
    name: "Nav",
    data: function() {
        return {
            types,
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
    },
    methods: {
        isActive: function(subtype) {
            return subtype == this.subtype;
        },
    },
    filters: {
        listLink: function(type) {
            return "./?subtype=" + type;
        },
        wikiIconURL : function (type){
            return __imgPath + 'image/wiki/' + type + '.svg'
        }
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/nav.less";
</style>
