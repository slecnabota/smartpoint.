<template>
  <div class="conference">
    <nav-back :link="getLink()"></nav-back>
    <div class="conference__top">
      <h2 class="conference__title">Конференц залы</h2>
      <button class="conference__del delete">Удалить</button>
    </div>
    <div class="conference__content">
      <cover-block :urlImage="product?.avatar"/>
      <div class="conference__form">
        <div class="conference__section">
          <form-input id="titleField" label="Название" :value="product?.title"/>
          <div v-if="driver === 'conference'" class="conference__check">
            <input type="checkbox" checked name="" id="">
            <span>Материнская категория</span>
          </div>
        </div>
        <div v-if="driver === 'conference'" class="conference__section conference__images">
          <service-list :services="additionalItems"  />
        </div>
      </div>
    </div>
    <button class="conference__save">Сохранить</button>
  </div>
</template>
<script>
import axios from "axios";
import {useMainStore} from '@/store/index.js';
import NavBack from '@/components/ui/nav-back/Index.vue';
import CoverBlock from "@/components/blocks/cover-block/CoverBlock.vue";
import formInput from "@/components/ui/form-input/formInput.vue";
import ServiceList from "@/pages/booking/service-add/ServiceList.vue";
import conferenceImage from '@/assets/img/conference.png';

export default {
  name: 'ConferencePage',
  components: {ServiceList, NavBack, CoverBlock, formInput},
  data() {
    return {
      login: "+71231231231",
      password: "123123",
      product: {},
      additionalItems: [],
      conferenceImage,
      conferenceTitle: "Конференц залы",
      photos: [],
      conferences: [],
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    driver() {
      return this.$route.params.driver
    },
  },
  created() {
    this.fetchConferences();
    this.loadProduct()

    if (this.driver === 'conference') {
      this.loadConferences()
    }


  },
  methods: {
    loadProduct() {
      $api.products.get(this.id).then((response) => {
        this.product = response.data.content
      })
    },
    loadConferences() {
      $api.conferences.get().then((response) => {
        this.additionalItems = response.data.content
      })
    },
    getLink() {
      const pagesStore = useMainStore();
      const currentPage = pagesStore.booking.find(page => page.name === this.$route.name);
      return currentPage ? currentPage.parent : null;
    },
    async fetchConferences() {
      try {
        const response = await $api.store.product();
        this.conferences = response.data.content;
        console.log(this.conferences)
      } catch (error) {
        console.error('Ошибка при получении данных о конференц-залах:', error);
      }
    },
  },
}
</script>
<style scoped lang="scss">
.conference {
  height: auto;

  &__del {
    font-size: 17px;
    line-height: 27px;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid $gray2;
  }

  &__section {
    display: block;
    border-top: 1px solid $gray2;
    padding: 25px 0;
    width: 60%;

    &:last-child {
      border-bottom: 1px solid $gray2;
      padding-bottom: 50px;
    }
  }

  &__save {
    margin-left: auto;
    background: $green;
    border-radius: 10px;
    padding: 15px 25px;
    @include SemiBold15;
    color: white;
    margin-top: 30px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
  }

  &__add {
    display: block;
    color: $blue2;
    @include SemiBold15;
    margin-top: 70px;
    text-align: left;
  }

  &__input, &__textarea {
    background: $gray2;
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: none;
    color: $blue;
    @include Body15;
  }

  &__textarea {
    resize: none;
    height: 100px;
  }

  &__check {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;

    span {
      @include Medium15;
    }
  }

  &__label {
    color: $blue;
    @include SemiBold17;
    display: block;
    margin-bottom: 15px;
  }

  &__content, &__form {
    margin-top: 20px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-add {
      color: $blue2;
      @include SemiBold15;
      margin-top: 20px;
    }
  }
}

</style>
