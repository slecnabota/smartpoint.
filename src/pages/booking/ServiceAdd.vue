<template>
  <div class="service-add">
    <nav-back @click="goBack"/>
    <div class="service-add__top">
      <h2 class="service-add__title">Новая услуга</h2>
    </div>
    <cover-block/>
    <div class="service-add__section service-add__flex">
      <form-input v-model="data.title" label="Название" placeholder="Название"/>
      <form-input v-model="data.capacity" type="Number" label='Макс. количество человек'
                  placeholder="Макс. количество человек"/>
    </div>
    <div class="service-add__section">
      <form-textarea id="descField" label="Описание" v-model="data.description" placeholder="Описание"/>
    </div>
    <!--    <div class="service-add__section">-->
    <!--      <div class="service-add__field">-->
    <!--        <label for="featureField" class="service-add__label">Особенности</label>-->
    <!--        <div class="service-add__list">-->
    <!--          <form-input v-for="(feature, index) in additionalFeatures" placeholder="Добавьте особенности данной услуги"-->
    <!--                      :key="index" :value="feature"/>-->
    <!--        </div>-->
    <!--        <button class="service-add__list-add">+ добавить особенность</button>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="service-add__section service-add__price">
      <form-input type="number" label="Стоимость" placeholder="Стоимость" v-model="data.cost"/>
      <custom-select
          :options="options"
          class="select"/>
    </div>
    <div class="service-add__section service-add__images">
      <!--      <photo-block heading="Фото" title="фото"/>-->
    </div>
    <button class="service-add__btn" @click="createService">Сохранить</button>
  </div>
</template>

<script lang="ts">
import NavBack from "@/components/blocks/nav-back/Index.vue";
import CoverAdd from "@/components/blocks/cover-add/CoverAdd.vue";
import FormInput from "@/components/ui/form-input/formInput.vue";
import formTextarea from "@/components/ui/form-textarea/formTextarea.vue";
import PhotoBlock from "@/components/blocks/photo-block/PhotoBlock.vue";
import CustomSelect from "@/components/ui/custom-select/CustomSelect.vue";

export default {
  name: 'ServiceAdd',
  components: {NavBack, CoverAdd, FormInput, formTextarea, PhotoBlock, CustomSelect},
  data() {
    return {
      options: ['В день', 'В Неделю', 'В Месяц', 'В Год'],
      data: {
        title: '',
        capacity: null,
        description: '',
        cost: null,
        selectedPeriod: 'В день',
      }
    }
  },
  methods: {
    async createService() {
      console.log(this.data)
      try {
        $api.conferences.create(this.data).then((response) => {
          console.log(response.data)
        })
      } catch (error) {
        console.error('Ошибка при создании услуги:', error);
      }
    },
    goBack() {
      this.$router.push({name: 'item-page'});
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/mixins.scss';

.service-add {
  height: auto;

  &__top {
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
}
</style>
