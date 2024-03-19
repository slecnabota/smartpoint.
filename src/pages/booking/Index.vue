<template>
  <div class="booking">
    <h2 class="booking__title">Бронирование</h2>
    <div class="booking__wrapper">
      <router-link v-for="(card, index) in data"
                   :to="{name: 'item-page', params:{id: card.id, driver: card.driver || 'none'}}" :key="index"
                   class="booking__card">
        <card-block :img="card.avatar" :heading="card.title"></card-block>
      </router-link>
    </div>
  </div>
</template>
<script>
import {useMainStore} from '@/store/index.js';
import CardBlock from "@/components/blocks/card/Index.vue";

export default {
  setup() {
    const pagesStore = useMainStore();
    return {pages: pagesStore};
  },
  name: 'BookingPage',
  components: {CardBlock},
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.data = []
      $api.products.get().then((response) => {
        this.data = response.data.content
      })
    },
  }
}
</script>
<style scoped lang="scss">
.booking {
  background: var(--gray-1);
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;

  &__title {
    padding-bottom: 15px;
    border-bottom: 1px solid var(--gray-2);
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
