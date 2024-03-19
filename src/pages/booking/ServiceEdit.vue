<script lang="ts">
import axios from "axios";
import {defineComponent} from 'vue'
import NavBack from "@/components/blocks/nav-back/Index.vue";
import CoverBlock from "@/components/blocks/cover-block/CoverBlock.vue";
import FormInput from "@/components/ui/form-input/formInput.vue";
import FormTextarea from "@/components/ui/form-textarea/formTextarea.vue";
import CustomSelect from "@/components/ui/custom-select/CustomSelect.vue";
import PhotoBlock from "@/components/blocks/photo-block/PhotoBlock.vue";

export default defineComponent({
  name: "ServiceEdit",
  data() {
    return {
      additionalItems: [],
      images: [],
    }
  },
  components: {PhotoBlock, CustomSelect, FormTextarea, FormInput, CoverBlock, NavBack},
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  created() {
    this.loadConferences();
  },
  methods: {
    goBack() {
      this.$router.push({name: 'item-page'});
    },
    loadConferences() {
      $api.conferences.get(this.id).with('images').then((response) => {
        this.additionalItems = response.data.content
      })
    },
  }
})
</script>

<template>
  <div class="service-edit">
    <nav-back :link="goBack()"/>
    <div class="service-edit__top">
      <h2 class="service-edit__title">{{ additionalItems.title }}</h2>
    </div>
    <cover-block :url-image="additionalItems.avatar"/>
    <div class="service-edit__section service-edit__flex">
      <form-input v-model="additionalItems.title" label="Название" placeholder="Название"/>
      <form-input type="Number" label="Макс. количество человек" :value="additionalItems.capacity"
                  placeholder="Макс. количество человек"/>
    </div>
    <div v-if="additionalItems.description" class="service-edit__section">
      <form-textarea id="descField" label="Описание" placeholder="Описание" :value="additionalItems.description"/>
    </div>
    <div class="service-edit__section">
      <div class="service-edit__field">
        <label for="featureField" class="service-edit__label">Особенности</label>
        <div class="service-edit__list">
          <form-input v-for="(feature, index) in additionalItems.features"
                      placeholder="Добавьте особенности данной услуги"
                      :key="index" :value="feature"/>
        </div>
        <button class="service-edit__list-add">+ добавить особенность</button>
      </div>
    </div>
    <div class="service-edit__section service-edit__price">
      <form-input label="Стоимость" :value="additionalItems.cost" placeholder="Стоимость"/>
      <custom-select
          :options="['В день', 'В Неделю', 'В Месяц', 'В Год']"
          :default="'В день'"
          class="select"
          @input="handleInput"/>
    </div>
    <div class="service-edit__section service-edit__images">
      <photo-block heading="Фото" title="фото" :images="additionalItems.images"/>
    </div>
    <button class="service-edit__btn">Сохранить</button>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.service-edit {
  height: auto;

  &__del {
    color: var(--red);
    @include SemiBold17;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--gray-2);
  }

  &__section {
    display: block;
    border-top: 1px solid var(--gray-2);
    padding: 25px 0;
    width: 60%;

    &:last-child {
      border-bottom: 1px solid var(--gray-2);
      padding-bottom: 50px;
    }
  }

  &__label {
    color: var(--blue);
    @include SemiBold17;
    display: block;
    margin-bottom: 15px;
  }

  &__flex {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  &__price {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    align-items: flex-end;
  }

  &__btn {
    color: var(--gray-4);
    @include SemiBold15;
    padding: 15px 25px;
    border-radius: 10px;
    background: var(--gray-3);
    margin-top: 250px;
    margin-left: auto;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-add {
      color: var(--blue-2);
      @include SemiBold15;
      margin-top: 20px;
    }
  }
}
</style>