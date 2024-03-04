<template>
  <div class="booking">
    <h2 class="booking__title">Бронирование</h2>
    <div class="booking__wrapper">
      <router-link v-for="(card, index) in pages.booking" :to="{name : card.to}" :key="index" class="booking__card">
        <card-block :img="card.image" :heading="card.heading"></card-block>
      </router-link>
    </div>
  </div>
</template>
<script>
import {useMainStore} from '@/store/index.js';
import CardBlock from "@/components/ui/card/Index.vue";

export default {
  setup() {
    const pagesStore = useMainStore();
    return {pages: pagesStore};
  },
  name: 'BookingPage',
  components: {CardBlock},
  data() {
    return {}
  }
}
</script>
<style scoped lang="scss">
.booking {
  background: #F8F9FB;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;

  &__title {
    padding-bottom: 15px;
    border-bottom: 1px solid $gray2;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 30px;
    row-gap: 30px;
    margin-top: 25px;
    @media(min-width: 1750px) {
      max-width: 80%;
    }
    @media(min-width: 2100px) {
      max-width: 60%;
    }
    @media(max-width: 1110px) {
      gap: 15px;
    }
  }
}
</style>