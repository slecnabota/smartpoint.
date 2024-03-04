<template>
  <div class="tariff">
    <div class="tariff__top">
      <h4 class="tariff__heading">{{ 'Тариф ' + (index + 1) }}</h4>
      <button class="tariff__delete" @click="removeTariff">Удалить тариф</button>
    </div>
    <div class="tariff__content">
      <form-input label="Название" :model-value="tariff.name" @update:modelValue="updateTariff('name', $event)"
                  label-class="small"/>
      <form-textarea label="Описание" :model-value="tariff.description"
                     @update:modelValue="updateTariff('description', $event)" label-class="small"/>
      <div class="tariff__field">
        <label class="tariff__label small">Особенности</label>
        <div class="tariff__list">
          <form-input v-for="(feature, fIndex) in tariff.features" :key="fIndex" :model-value="feature"
                      @update:modelValue="updateFeature(fIndex, $event)"
                      placeholder="Добавьте особенность тарифа"></form-input>
        </div>
        <button class="tariff__list-add" @click="addFeature">+ добавить особенность</button>
      </div>
      <div class="tariff__inner">
        <div class="tariff__price">
          <label class="tariff__label">Стоимость, ₸</label>
          <form-input type="number" :model-value="tariff.price" @update:modelValue="updateTariff('price', $event)"/>
        </div>
        <div class="tariff__select">
          <custom-select
              :options="['В день', 'В Неделю', 'В Месяц', 'В Год']"
              :default="'В день'"
              class="select"
              @input="handleInput"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formInput from "@/components/ui/form-input/formInput.vue";
import formTextarea from "@/components/ui/form-textarea/formTextarea.vue";
import CustomSelect from "@/components/ui/custom-select/CustomSelect.vue";

export default {
  name: 'TariffBlock',
  props: ['tariff', 'index'],
  components: {
    CustomSelect,
    formInput,
    formTextarea
  },
  methods: {
    addFeature() {
      this.$emit('update-feature', {index: this.index, feature: ''});
    },
    updateFeature(fIndex, value) {
      this.$emit('update-feature-value', {index: this.index, fIndex: fIndex, value: value});
    },
    updateTariff(prop, value) {
      this.$emit('update-tariff', {index: this.index, prop: prop, value: value});
    },
    removeTariff() {
      this.$emit('remove-tariff', this.index);
    }
  }
}
</script>

<style scoped lang="scss">
.tariff {
  background: #F8F9FB;
  padding: 20px;
  border-radius: 20px;

  &__content {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 15px;
  }

  &__inner {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    align-items: flex-end;
  }

  &__label {
    display: block;
    @include SemiBold13;
    margin-bottom: 10px;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__delete {
    color: $gray3;
    @include SemiBold15;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-add {
      color: $blue2;
      @include SemiBold15;
      margin-top: 20px;
    }
  }
}
</style>
