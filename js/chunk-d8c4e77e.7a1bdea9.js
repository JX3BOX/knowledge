(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d8c4e77e"],{"07ac":function(t,e,a){var s=a("23e7"),n=a("6f53").values;s({target:"Object",stat:!0},{values:function(t){return n(t)}})},"498a":function(t,e,a){"use strict";var s=a("23e7"),n=a("58a8").trim,i=a("c8d2");s({target:"String",proto:!0,forced:i("trim")},{trim:function(){return n(this)}})},"4f1d":function(t,e,a){"use strict";var s=a("eb09"),n=a.n(s);n.a},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var s=a("1d80"),n=a("5899"),i="["+n+"]",r=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),l=function(t){return function(e){var a=String(s(e));return 1&t&&(a=a.replace(r,"")),2&t&&(a=a.replace(o,"")),a}};t.exports={start:l(1),end:l(2),trim:l(3)}},"685b":function(t,e,a){"use strict";a.d(e,"a",(function(){return c}));var s=a("c7b3"),n=a.n(s),i=a("4fb6");const r=a("4328"),{__helperUrl:o}=a("64c7"),l=n.a.create({withCredentials:!0,baseURL:o});Object(i["b"])(l);let c={newest(t,e,a=1){if(e)return l({method:"GET",url:"/api/wiki/post",headers:{Accept:"application/prs.helper.v2+json"},params:{type:t,source_id:e,supply:a}})},newests(t){return l({method:"GET",url:"/api/wiki/posts/newest",headers:{Accept:"application/prs.helper.v2+json"},params:{type:t}})},versions(t,e){if(e)return l({method:"GET",url:"/api/wiki/post/versions",headers:{Accept:"application/prs.helper.v2+json"},params:{type:t,source_id:e}})},view(t){return t?l({method:"GET",url:"/api/wiki/post/"+t,headers:{Accept:"application/prs.helper.v2+json"}}):null},save(t){return l({method:"POST",url:"/api/wiki/post",headers:{Accept:"application/prs.helper.v2+json"},data:r.stringify({post:t})})},myList(t){return l({method:"GET",url:"/api/my/wiki/posts",headers:{Accept:"application/prs.helper.v2+json"},params:t})},myRemove(t){return t?l({method:"PUT",url:`/api/my/wiki/post/${t}/remove`,headers:{Accept:"application/prs.helper.v2+json"}}):null}}},"6f53":function(t,e,a){var s=a("83ab"),n=a("df75"),i=a("fc6a"),r=a("d1e7").f,o=function(t){return function(e){var a,o=i(e),l=n(o),c=l.length,u=0,p=[];while(c>u)a=l[u++],s&&!r.call(o,a)||p.push(t?[a,o[a]]:o[a]);return p}};t.exports={entries:o(!0),values:o(!1)}},bb51:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-home-view"},[a("Search"),a("WikiPanel",{attrs:{"border-none":!0}},[a("template",{slot:"head-title"},[a("i",{staticClass:"el-icon-location-information"}),a("span",[t._v(" 便捷入口")])]),a("template",{slot:"head-actions"},[a("a",{staticClass:"other",attrs:{target:"_blank",href:t.feedback}},[t._v("反馈建议 »")])]),a("template",{slot:"body"},[a("ul",{staticClass:"u-qlinks"},[a("li",{staticClass:"u-qlink"},[a("a",{attrs:{href:"/cj",target:"_blank"}},[a("i",{staticClass:"el-icon-medal"}),a("span",[t._v(" 成就百科")])])]),a("li",{staticClass:"u-qlink"},[a("a",{attrs:{href:"/item",target:"_blank"}},[a("i",{staticClass:"el-icon-apple"}),a("span",[t._v(" 物品百科")])])])])])],2),a("WikiPanel",{attrs:{"border-none":!0}},[a("template",{slot:"head-title"},[a("i",{staticClass:"el-icon-orange"}),a("span",[t._v(" 玩法指南")])]),a("template",{slot:"head-actions"},[a("router-link",{staticClass:"u-more",attrs:{to:"/type/game"}},[t._v("查看更多 »")])],1),a("template",{slot:"body"},[a("el-row",{staticClass:"m-guide-content"},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"u-guide-block u-guide-pve"},[t.menu_groups["guide-pve"]?[a("h5",{staticClass:"u-title"},[t._v(" "+t._s(t.menu_groups["guide-pve"].label)+" ")]),a("div",{staticClass:"u-list"},t._l(t.menu_groups["guide-pve"].menus,(function(e,s){return a("a",{key:s,attrs:{href:e.link,target:"_blank"},domProps:{innerHTML:t._s(e.label)}})})),0)]:t._e()],2)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"u-guide-block u-guide-pve"},[t.menu_groups["guide-pvx"]?[a("h5",{staticClass:"u-title"},[t._v(" "+t._s(t.menu_groups["guide-pvx"].label)+" ")]),a("div",{staticClass:"u-list"},t._l(t.menu_groups["guide-pvx"].menus,(function(e,s){return a("a",{key:s,attrs:{href:e.link,target:"_blank"},domProps:{innerHTML:t._s(e.label)}})})),0)]:t._e()],2)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"u-guide-block u-guide-pvp"},[t.menu_groups["guide-pvp"]?[a("h5",{staticClass:"u-title"},[t._v(" "+t._s(t.menu_groups["guide-pvp"].label)+" ")]),a("div",{staticClass:"u-list"},t._l(t.menu_groups["guide-pvp"].menus,(function(e,s){return a("a",{key:s,attrs:{href:e.link,target:"_blank"},domProps:{innerHTML:t._s(e.label)}})})),0)]:t._e()],2)])],1)],1)],2),a("WikiPanel",{attrs:{"border-none":!0}},[a("template",{slot:"head-title"},[a("i",{staticClass:"el-icon-collection"}),a("span",[t._v(" 热门剧情")])]),a("template",{slot:"body"},[a("div",{staticClass:"m-hot-slots"},[t.hot_plots&&t.hot_plots.length?a("el-carousel",{attrs:{height:"66px",direction:"vertical","indicator-position":"none"}},t._l(t.hot_plots,(function(e,s){return a("el-carousel-item",{key:s,staticClass:"m-carousel"},[a("el-row",{attrs:{gutter:20}},[t._l(e,(function(e,s){return[e?a("el-col",{key:s,attrs:{md:8}},[a("router-link",{staticClass:"u-item",attrs:{to:{name:"view",params:{source_id:e.id}}}},[a("div",{staticClass:"u-icon"},[a("img",{attrs:{src:t.hot_plot_icon}})]),a("div",{staticClass:"m-carousel-content"},[a("div",{staticClass:"u-title",domProps:{textContent:t._s(e.name)}}),e.post?a("div",{staticClass:"u-desc"},[a("span",{attrs:{title:e.post.remark}},[t._v(t._s("By "+e.post.user_nickname))])]):t._e()])])],1):t._e()]}))],2)],1)})),1):a("div",{staticStyle:{"text-align":"center"}},[t._v("😂 暂无热门事件")])],1)])],2),a("WikiPanel",{attrs:{"border-none":!0}},[a("template",{slot:"head-title"},[a("i",{staticClass:"el-icon-postcard"}),a("span",[t._v(" 术语大全")])]),a("template",{slot:"head-actions"},[a("router-link",{staticClass:"u-more",attrs:{to:"/type/jargon"}},[t._v("查看更多 »")])],1),a("template",{slot:"body"},[a("div",{staticClass:"m-index-jargon"},[a("el-row",{attrs:{gutter:20}},t._l(t.jargons,(function(e,s){return a("el-col",{key:s,attrs:{span:3}},[a("div",{staticClass:"m-index-jargon-item"},[a("i",{staticClass:"el-icon-collection-tag"}),t._v(" "),a("router-link",{staticClass:"u-item",attrs:{to:"/view/"+e.id}},[t._v(t._s(e.name))])],1)])})),1)],1)])],2),a("WikiPanel",{attrs:{"border-none":!0}},[a("template",{slot:"head-title"},[a("i",{staticClass:"el-icon-time"}),a("span",[t._v(" 最近更新")])]),a("template",{slot:"body"},[a("div",{staticClass:"m-posts"},t._l(t.newest_posts,(function(e,s){return a("div",{key:s,staticClass:"m-post"},[a("div",{staticClass:"m-head"},[a("div",{staticClass:"m-user"},[a("div",{staticClass:"u-author"},[a("img",{staticClass:"u-icon",attrs:{src:e.user_avatar,alt:e.user_nickname}}),a("a",{staticClass:"u-name",attrs:{href:e.user_id?t.author_url(e.user_id):null},domProps:{textContent:t._s(e.user_nickname)}})]),a("div",{staticClass:"u-updated",domProps:{textContent:t._s(t.ts2str(e.updated))}})]),a("div",{staticClass:"m-source"},[a("div",{staticClass:"u-source"},[a("svg",{class:"u-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 412.72 412.72","svg-inline":"",role:"presentation",focusable:"false",tabindex:"-1"}},[a("path",{attrs:{d:"M404.72 82.944h-27.2v-9.28a8 8 0 00-5.76-8 225.345 225.345 0 00-57.68-7.36c-32 0-75.6 7.2-107.84 40-32-33.12-75.92-40-107.84-40a225.345 225.345 0 00-57.68 7.36 8 8 0 00-5.76 8v9.2H8a8 8 0 00-8 8v255.52a8 8 0 008 8 7.996 7.996 0 003.92-1.04c.8-.4 80.8-44.16 192.48-16h1.92a8.008 8.008 0 001.92 0c112-28.4 192 15.28 192.48 16a8 8 0 0012-6.88V90.944a8 8 0 00-8-8zM16 333.664V98.944h19.12v200.64a8 8 0 009.2 8 350.096 350.096 0 0150-4 207.516 207.516 0 0168.32 10.32A294.1 294.1 0 0016 333.664zm78.32-46a351.994 351.994 0 00-43.52 2.8V79.984a220.645 220.645 0 0147.44-5.28c29.92 0 71.2 6.88 99.84 39.2l.24 199.28c-16.64-10.88-49.12-25.52-104-25.52zm120-173.76c28.64-32 69.92-39.2 99.84-39.2a221.61 221.61 0 0147.44 5.28v210.48a351.895 351.895 0 00-43.28-2.88c-54.56 0-87.12 14.64-104 25.52v-199.2zm182.32 219.76a294.158 294.158 0 00-146.96-19.76 208.008 208.008 0 0168.64-10.32 349.994 349.994 0 0150.32 3.92 8 8 0 009.2-8V98.944h19.12l-.32 234.72z"}})]),a("router-link",{staticClass:"u-name",attrs:{to:{name:"view",params:{source_id:e.source_id}}},domProps:{textContent:t._s(e.title)}})],1),e.remark?a("div",{staticClass:"u-remark",domProps:{textContent:t._s("📑 "+e.remark)}}):t._e()])]),a("div",{staticClass:"m-body"},[a("div",{staticClass:"u-excerpt",attrs:{to:{name:"view",params:{source_id:e.source_id}}},domProps:{innerHTML:t._s(t.ellipsis(e.excerpt))}})])])})),0)])],2)],1)},n=[],i=(a("4160"),a("fb6a"),a("b0c0"),a("07ac"),a("ac1f"),a("1276"),a("2ca0"),a("498a"),a("159b"),a("64c7")),r=a("c106"),o=a("1c9a"),l=a("685b"),c=(a("99af"),a("bc3a")),u=a.n(c);function p(t){return u.a.get("".concat(i["__helperUrl"],"api/menu_groups"),{headers:{Accept:"application/prs.helper.v2+json"},params:t})}var d=a("434b"),v=a("9616"),m=a("85e4"),h=a("ee8f"),_=h.JX3BOX,f={name:"Home",props:[],data:function(){return{feedback:i["feedback"],menu_groups:{},hot_plots:null,hot_plot_views:null,hot_plot_icon:_.__iconPath+"icon/243.png",jargons:[],newest_posts:null}},methods:{icon_url:m["iconLink"],author_url:m["authorLink"],ts2str:m["ts2str"],chuck:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,a=[],s=0;s<t.length;s+=e)a.push(t.slice(s,s+e));return a},ellipsis:function(t){return t=t?t.trim():"",t.length>100?t.slice(0,100)+"...":t},loadGames:function(){var t=this;p({names:["guide-pve","guide-pvx","guide-pvp"]}).then((function(e){var a=e.data;if(200===a.code){var s={};for(var n in a.data.data){var i=a.data.data[n];s[i.name]=i}t.menu_groups=s}}))},loadJargon:function(){var t=this;Object(d["b"])({type:"jargon",limit:48}).then((function(e){t.jargons=e.data.data.data}))},loadHotPlots:function(){var t=this;Object(v["b"])("plot","views",18).then((function(e){e=e.data,t.hot_plot_views=[];var a=[];e.forEach((function(e){if(e.name.startsWith("plot")){var s=e.name.split("-").pop();a.push(s),t.hot_plot_views[s]=e.value}})),Object(d["b"])({ids:a}).then((function(e){e=e.data,200===e.code&&(t.hot_plots=t.chuck(Object.values(e.data.data)))}))}))},loadNewestPost:function(){var t=this;l["a"].newests("knowledge").then((function(e){e=e.data,200===e.code&&(t.newest_posts=e.data.newest)}))},loadData:function(){this.loadHotPlots(),this.loadGames(),this.loadJargon(),this.loadNewestPost()}},created:function(){this.loadData()},components:{Search:r["a"],WikiPanel:o["a"]}},k=f,g=(a("de16"),a("2877")),b=Object(g["a"])(k,s,n,!1,null,null,null);e["default"]=b.exports},c106:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-search-bar",class:"view"==t.$route.name?"can-return":""},[a("div",{staticClass:"m-return"},[a("el-button",{staticClass:"u-return-btn",on:{click:t.return_handle}},[t._v("返回 ")])],1),a("div",{staticClass:"m-search"},[a("el-input",{staticClass:"u-search-input",attrs:{placeholder:"输入通识名称「回车」进行搜索"},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search_handle(e)}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},[a("span",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("关键词")])]),a("el-button",{staticClass:"u-search-btn",attrs:{type:"primary",plain:""},on:{click:t.search_handle}},[t._v("搜索 ")])],1)])},n=[],i=a("85e4"),r={name:"Search",data:function(){return{keyword:""}},methods:{publish_url:i["publishLink"],return_handle:function(){history.back()},add_handle:function(){location.href=this.publish_url("knowledge")},search_handle:function(){this.$router.push({name:"search",params:{keyword:this.keyword}})}}},o=r,l=(a("4f1d"),a("2877")),c=Object(l["a"])(o,s,n,!1,null,null,null);e["a"]=c.exports},c8d2:function(t,e,a){var s=a("d039"),n=a("5899"),i="​᠎";t.exports=function(t){return s((function(){return!!n[t]()||i[t]()!=i||n[t].name!==t}))}},de16:function(t,e,a){"use strict";var s=a("ea6e"),n=a.n(s);n.a},ea6e:function(t,e,a){},eb09:function(t,e,a){},ee8f:function(t,e,a){const s=a("64c7"),n=a("fa0b");t.exports={JX3BOX:s,SEO:n}},fa0b:function(t){t.exports=JSON.parse('{"title":" &raquo; JX3BOX - 一站式剑网3资源工具站","keys":"jx3box,剑三魔盒,剑三宏,剑三插件,剑三辅助,副本攻略,副本解包,团队监控,捏脸数据,剑3数据库,成就百科,剑三成就,剑3,剑网3,剑三box,通识百科","desc":"JX3BOX - 剑三魔盒是一个以剑网3游戏为主的专业攻略资源站，这里干货满满，大神多多，为你的武侠江湖之路助力。剑三魔盒，玩家贴心的小助手。"}')}}]);
//# sourceMappingURL=chunk-d8c4e77e.7a1bdea9.js.map