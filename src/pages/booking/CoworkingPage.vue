<template>
  <div class="coworking">
    <nav-back :link="getLink()"></nav-back>
    <div class="coworking__top">
      <h2 class="coworking__title">Рабочее место в коворкинге</h2>
      <button class="coworking__del delete">Удалить</button>
    </div>
    <div class="coworking__content">
      <cover-block :urlImage="coworkingImage"/>
      <div class="coworking__form">
        <div class="coworking__section">
          <form-input id="titleField" label="Название" :value="coworkingTitle"/>
        </div>
        <div class="coworking__section">
          <form-textarea id="descField" label="Описание" :value="coworkingDescription"/>
        </div>
        <div class="coworking__section">
          <div class="coworking__field">
            <label for="featureField" class="coworking__label">Особенности</label>
            <div class="coworking__list">
              <form-input v-for="(feature, index) in additionalFeatures" :key="index" :value="feature"/>
            </div>
            <button class="coworking__list-add">+ добавить особенность</button>
          </div>
        </div>
        <div class="coworking__section coworking__grid">
          <div v-for="(tariff, index) in tariffs" :key="index">
            <tariff-block :tariff="tariff" :index="index"
                          @update-feature="handleAddFeature"
                          @update-feature-value="handleUpdateFeature"
                          @update-tariff="handleUpdateTariff"
                          @remove-tariff="handleRemoveTariff"/>
          </div>
          <button class="coworking__add" @click="addTariff">+ добавить еще тариф</button>
        </div>
        <div class="coworking__section coworking__images">
          <photo-block heading="Фото" title="фото"/>
        </div>
      </div>
    </div>
    <button class="coworking__save">Сохранить</button>
  </div>
</template>
<script>
import {useMainStore} from '@/store/index.js';
import NavBack from '@/components/ui/nav-back/Index.vue';
import CoverBlock from "@/components/blocks/cover-block/CoverBlock.vue";
import formInput from "@/components/ui/form-input/formInput.vue";
import formTextarea from "@/components/ui/form-textarea/formTextarea.vue";
import TariffBlock from "@/components/blocks/tariff-block/TariffBlock.vue";
import PhotoBlock from "@/components/blocks/photo-block/PhotoBlock.vue";
import coworkingImage from '@/assets/img/coworking.png';

export default {
  name: 'CoworkingPage',
  data() {
    return {
      coworkingImage,
      coworkingTitle: "Рабочее место в коворкинге",
      coworkingDescription: "Приобретая пакет, вы получаете доступ к зоне коворкинга, где можете занять любое свободное место",
      additionalFeatures: [
        'Доступ и услуги ресепшн 24/7', 'Безлимитный высокоскоростной интернет', 'Доступ в тренажерный зал и душевые 24/7', 'Доступ в кухни, лаундж-зоны, игровые зоны, библиотеку, телефонные будки'
      ],
      tariffs: [
        {
          name: 'Day Pass',
          description: 'Очень классный и выгодный тариф. Тут будет описание тарифа, зачем он и для кого он, чтобы лучше было понятно. Либо сюда ничего не писать',
          features: [''],
          price: 6000
        }
      ],
      photos: [],
    }
  },
  components: {PhotoBlock, TariffBlock, NavBack, CoverBlock, formInput, formTextarea},
  methods: {
    getLink() {
      const pagesStore = useMainStore();
      const currentPage = pagesStore.booking.find(page => page.name === this.$route.name);
      return currentPage ? currentPage.parent : null;
    },
    addFeature() {
      this.additionalFeatures.push('');
    },
    addTariff() {
      this.tariffs.push({
        name: '',
        description: '',
        features: [],
        price: 0
      });
    },
    handleAddFeature(payload) {
      this.tariffs[payload.index].features.push(payload.feature);
    },
    handleUpdateFeature(payload) {
      this.tariffs[payload.index].features.splice(payload.fIndex, 1, payload.value);
    },
    handleUpdateTariff(payload) {
      this.tariffs[payload.index][payload.prop] = payload.value;
    },
    handleRemoveTariff(index) {
      this.tariffs.splice(index, 1);
    }
  }
}
</script>
<style scoped lang="scss">
.coworking {
  height: auto;

  &__del {
    @include SemiBold15;
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
    color: #0E1F4D;
    @include Body15;
  }

  &__textarea {
    resize: none;
    height: 100px;
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
