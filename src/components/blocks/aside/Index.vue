<template>
  <div class="aside">
    <links-block></links-block>
  </div>
</template>
<script lang="ts">
import LinksBlock from "./Links.vue";

export default {
  name: 'AsideBlock',
  components: {LinksBlock},
}
</script>
<style scoped lang="scss">
.aside {
  position: fixed;
  top: 65px;
  left: 0;
  height: 100vh;
  width: 240px;
  background: var(--default-white);
  border-right: 1px solid var(--gray-2);
  @media(max-width: 1110px) {
    width: 220px;
  }
}
</style>