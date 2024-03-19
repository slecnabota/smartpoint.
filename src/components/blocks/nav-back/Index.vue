<template>
  <router-link class="nav" :to="{ name: link }">
    <arrow-left/>
    <p>Назад</p>
  </router-link>
</template>

<script>
import {useMainStore} from '@/store/index.js';
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
@import '@/styles/mixins';

.nav {
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-bottom: 20px;

  p {
    @include SemiBold17;
    color: var(--blue);
  }
}
</style>
