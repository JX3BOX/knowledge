<template>
    <div class="m-home-view">
        <Search />
        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-orange"></i>
                <span> 玩法指南</span>
            </template>
            <template slot="head-actions">
                <router-link class="u-more" to="/type/game"
                    >查看更多 &raquo;</router-link
                >
            </template>
            <template slot="body">
                <el-row class="m-guide-content">
                    <el-col :span="8">
                        <div class="u-guide-block u-guide-pve">
                            <!-- PVE -->
                            <template v-if="menu_groups['guide-pve']">
                                <h5 class="u-title">
                                    {{ menu_groups["guide-pve"].label }}
                                </h5>
                                <div class="u-list">
                                    <a
                                        v-for="(menu, key) in menu_groups[
                                            'guide-pve'
                                        ].menus"
                                        :key="key"
                                        :href="menu.link"
                                        target="_blank"
                                        v-html="menu.label"
                                    ></a>
                                </div>
                            </template>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="u-guide-block u-guide-pve">
                            <!-- PVX -->
                            <template v-if="menu_groups['guide-pvx']">
                                <h5 class="u-title">
                                    {{ menu_groups["guide-pvx"].label }}
                                </h5>
                                <div class="u-list">
                                    <a
                                        v-for="(menu, key) in menu_groups[
                                            'guide-pvx'
                                        ].menus"
                                        :key="key"
                                        :href="menu.link"
                                        target="_blank"
                                        v-html="menu.label"
                                    ></a>
                                </div>
                            </template>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="u-guide-block u-guide-pvp">
                            <!-- PVP -->
                            <template v-if="menu_groups['guide-pvp']">
                                <h5 class="u-title">
                                    {{ menu_groups["guide-pvp"].label }}
                                </h5>
                                <div class="u-list">
                                    <a
                                        v-for="(menu, key) in menu_groups[
                                            'guide-pvp'
                                        ].menus"
                                        :key="key"
                                        :href="menu.link"
                                        target="_blank"
                                        v-html="menu.label"
                                    ></a>
                                </div>
                            </template>
                        </div>
                    </el-col>
                </el-row>
            </template>
        </WikiPanel>

        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-collection"></i>
                <span> 热门剧情</span>
            </template>
            <template slot="body">
                <!-- TODO:热门剧情滚动slider -->
            </template>
        </WikiPanel>

        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-postcard"></i>
                <span> 术语大全</span>
            </template>
            <template slot="head-actions">
                <router-link class="u-more" to="/type/jargon"
                    >查看更多 &raquo;</router-link
                >
            </template>
            <template slot="body">
                <div class="m-index-jargon">
                    <el-row :gutter="20">
                        <el-col :span="3" v-for="(item, i) in jargons" :key="i"
                            ><div class="m-index-jargon-item">
                                <i class="el-icon-collection-tag"></i> <router-link class="u-item" :to="'/view/' + item.id">{{ item.name }}</router-link>
                            </div></el-col
                        >
                    </el-row>
                </div>
            </template>
        </WikiPanel>

        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-time"></i>
                <span> 最近更新</span>
            </template>
            <template slot="body">
                <!-- TODO:最新作品 -->
            </template>
        </WikiPanel>
    </div>
</template>

<script>
import { feedback } from "@jx3box/jx3box-common/js/jx3box.json";
import Search from "../components/Search";
import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
import { getMenuGroups } from "@/service/helper.js";
import { get_list } from "@/service/knowledge.js";
export default {
    name: "Home",
    props: [],
    data() {
        return {
            feedback,
            menu_groups: {},
            jargons: [],
        };
    },
    methods: {
        loadGames: function() {
            getMenuGroups({
                names: ["guide-pve", "guide-pvx", "guide-pvp"],
            }).then((res) => {
                let data = res.data;
                if (data.code === 200) {
                    let output = {};
                    for (let i in data.data.data) {
                        let group = data.data.data[i];
                        output[group.name] = group;
                    }
                    this.menu_groups = output;
                }
            });
        },
        loadJargon: function() {
            get_list({
                type: "jargon",
                limit: 48,
            }).then((res) => {
                this.jargons = res.data.data.data;
            });
        },
        loadData: function() {
            this.loadGames();
            this.loadJargon();
        },
    },
    mounted: function() {
        this.loadData();
    },
    components: {
        Search,
        WikiPanel,
    },
};
</script>

<style lang="less">
@import "../assets/css/views/home.less";
</style>
