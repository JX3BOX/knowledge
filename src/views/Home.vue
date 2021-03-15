<template>
    <div class="m-home-view">
        <Search />

        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-location-information"></i>
                <span> 便捷入口</span>
            </template>
            <template slot="head-actions">
                <a class="other" target="_blank" :href="feedback"
                    >反馈建议 &raquo;</a
                >
            </template>
            <template slot="body">
                <ul class="u-qlinks">
                    <li class="u-qlink">
                        <a href="/cj" target="_blank">
                            <i class="el-icon-medal"></i>
                            <span> 成就百科</span>
                        </a>
                    </li>
                    <li class="u-qlink">
                        <a href="/item" target="_blank">
                            <i class="el-icon-apple"></i>
                            <span> 物品百科</span>
                        </a>
                    </li>
                </ul>
            </template>
        </WikiPanel>

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
              <div class="m-hot-slots">
                <el-carousel
                    height="66px"
                    direction="vertical"
                    indicator-position="none"
                    v-if="hot_plots && hot_plots.length"
                >
                  <el-carousel-item v-for="(items, key) in hot_plots" :key="key" class="m-carousel">
                    <el-row :gutter="20">
                      <template v-for="(item, k) in items">
                        <el-col :md="8" v-if="item" :key="k">
                          <router-link
                              class="u-item"
                              :to="{name:'view',params:{source_id:item.id}}"
                          >
                            <div class="u-icon">
                                <img :src="hot_plot_icon" />
                            </div>
                            <div class="m-carousel-content">
                              <div class="u-title" v-text="item.name"></div>
                              <div class="u-desc" v-if="item.post">
                                <span :title="item.post.remark">{{'By ' + item.post.user_nickname}}</span>
                              </div>
                            </div>
                          </router-link>
                        </el-col>
                      </template>
                    </el-row>
                  </el-carousel-item>
                </el-carousel>
                <div v-else style="text-align:center">😂 暂无热门事件</div>
              </div>
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
              <div class="m-posts">
                <div class="m-post" v-for="(post, key) in newest_posts" :key="key">
                  <div class="m-head">
                    <div class="m-user">
                      <div class="u-author">
                        <img class="u-icon" :src="post.user_avatar" :alt="post.user_nickname"/>
                        <a :href="post.user_id ? author_url(post.user_id) : null" class="u-name"
                           v-text="post.user_nickname"></a>
                      </div>
                      <div class="u-updated" v-text="ts2str(post.updated)"></div>
                    </div>
                    <div class="m-source">
                      <div class="u-source">
                        <img class="u-icon" svg-inline src="../assets/img/knowledge.svg" />
                        <router-link class="u-name" :to="{name: 'view', params: { source_id: post.source_id }}"
                                     v-text="post.title"></router-link>
                      </div>
                      <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
                    </div>
                  </div>
                  <div class="m-body">
                    <div class="u-excerpt" :to="{ name: 'view', params: { source_id: post.source_id } }"
                         v-html="ellipsis(post.excerpt)"></div>
                  </div>
                </div>
              </div>
            </template>
        </WikiPanel>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import Search from "../components/Search";
import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
import {WikiPost} from "@jx3box/jx3box-common/js/helper";
import { getMenuGroups } from "@/service/helper.js";
import { get_list } from "@/service/knowledge.js";
import {getStatRank} from "@jx3box/jx3box-common/js/stat";
import {authorLink, ts2str, iconLink} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Home",
    props: [],
    data() {
        return {
            feedback,
            menu_groups: {},
            hot_plots: null,
            hot_plot_views: null,
            hot_plot_icon: JX3BOX.__iconPath + "icon/243.png",
            jargons: [],
            newest_posts: null,
        };
    },
    methods: {
        icon_url: iconLink,
        author_url: authorLink,
        ts2str,
        chuck(arr, number = 3) {
          let output = [];
          for (let i = 0; i < arr.length; i += number) {
            output.push(arr.slice(i, i + number));
          }
          return output;
        },
        ellipsis(value) {
          value = value ? value.trim() : "";
          if (value.length > 100) {
            return value.slice(0, 100) + "...";
          }
          return value;
        },
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
        loadHotPlots: function() {
          getStatRank('plot','views',18).then((res) => {
            res = res.data;
            this.hot_plot_views = [];
            let source_ids = [];
            res.forEach((item) => {
              if (item.name.startsWith("plot")) {
                let id = item.name.split("-").pop();
                source_ids.push(id);
                this.hot_plot_views[id] = item.value;
              }
            });

            get_list({ids: source_ids}).then((res) => {
              res = res.data;
              // 按照长度分批
              if (res.code === 200) this.hot_plots = this.chuck(Object.values(res.data.data));
            });
          });
        },
        loadNewestPost() {
          // 获取最新帖子列表
          WikiPost.newests('knowledge').then(
              (res) => {
                res = res.data;
                if (res.code === 200) this.newest_posts = res.data.newest;
              }
          );
        },
        loadData: function() {
          this.loadHotPlots();
          this.loadGames();
          this.loadJargon();
          this.loadNewestPost();
        },
    },
    created() {
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
