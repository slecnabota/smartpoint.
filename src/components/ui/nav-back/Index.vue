<template>
  <router-link class="nav" :to="{ name: link }">
    <arrow-left />
    <p>Назад</p>
  </router-link>
</template>

<script>
import { useMainStore } from '@/store/index.js';
import ArrowLeft from '@/components/ui/ArrowLeft.vue';

export default {
  name: 'NavBack',
  props: ['link'],
  components: {
    ArrowLeft,
  },
};
</script>

<style scoped lang="scss">
.nav{
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-bottom: 20px;
  p{
    font-family: 'SFProDisplay SemiBold';
    font-size: 17px;
    line-height: 27px;
    color: #0E1F4D;
  }
}
</style>
