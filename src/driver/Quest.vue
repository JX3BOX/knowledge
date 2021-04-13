<template>
  <div id="app">
    <Header></Header>
    <Breadcrumb
        name="任务百科"
        slug="quest"
        root="/quest"
        :publishEnable="true"
        :adminEnable="false"
        :feedbackEnable="true"
    >
      <img slot="logo" svg-inline src="../assets/img/quest.svg"/>
      <BreadcrumbInfo />
    </Breadcrumb>
    <LeftSidebar>
      <Nav/>
    </LeftSidebar>
    <Main :withoutRight="false">
      <!-- 路由页面内容 -->
      <router-view/>
      <!-- 右侧咨询 -->
      <RightSidebar>
      </RightSidebar>
      <Footer></Footer>
    </Main>
  </div>
</template>

<script>
  import Nav from "@/components/quest/Nav.vue";
  import BreadcrumbInfo from "@/components/quest/BreadcrumbInfo.vue";

  export default {
    name: "App",
    components: {
        Nav,
        BreadcrumbInfo,
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
        }
      },
    }
  };
</script>

<style lang="less">
  @import "../assets/css/app.less";
</style>
