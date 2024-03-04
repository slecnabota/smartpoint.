<template>
  <div class="layout-main">
    <header-block/>
    <main class="main">
      <aside-block/>
      <router-view class="content"></router-view>
    </main>
  </div>
</template>

<script>
import HeaderBlock from '@/components/blocks/header/Index.vue';
import AsideBlock from "@/components/blocks/aside/Index.vue";

export default {
  name: 'MainLayout',
  components: {
    AsideBlock,
    HeaderBlock,
  }
}
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  padding: 85px 30px 100px 30px;
  height: 100%;
  @media(max-width: 1110px) {
    padding: 85px 10px 100px 10px;
  }
}

.layout-main {
  height: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  //height: 100vh;
  height: 100%;
  padding-left: 240px;
  @media(max-width: 1110px) {
    padding-left: 220px;
  }
}
</style>
