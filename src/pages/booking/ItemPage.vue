<template>
  <div class="item-page">
    <nav-back @click="goBack"></nav-back>
    <div class="item-page__top">
      <h2 class="item-page__title">{{ product?.title }}</h2>
      <button class="item-page__del">Удалить</button>
    </div>
    <div class="item-page__content">
      <cover-block :urlImage="product?.avatar" :id-product="product.id" :onImageSelected="updateImageUrl"
                   ref="coverBlockRef"/>
      <form class="item-page__form" @submit.prevent="saveProduct">
        <div class="item-page__section">
          <form-input id="titleField" label="Название" v-model="product.title"/>
          <div v-if="driver === 'conference'" class="item-page__check">
            <input type="checkbox" checked name="" id="">
            <span>Материнская категория</span>
          </div>
        </div>
        <div v-if="driver === 'coworking' || (driver === 'none' && product.description)" class="item-page__section">
          <form-textarea id="descField" label="Описание" v-model="product.description"/>
        </div>
        <div v-if="driver === 'coworking'" class="item-page__section">
          <div class="item-page__field">
            <label for="featureField" class="item-page__label">Особенности</label>
            <feature-editor :initialData="features" @update:features="handleFeaturesUpdate"/>
          </div>
        </div>
        <div v-if="driver === 'coworking' || driver === 'none'" class="item-page__section item-page__images">
          <photo-block :photos="additionalItems" heading="Фото" title="фото"/>
        </div>
        <div v-if="driver === 'conference'" class="item-page__section item-page__images">
          <service-list :services="additionalItems"/>
        </div>
        <button class="item-page__save">Сохранить</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import NavBack from '@/components/blocks/nav-back/Index.vue';
import CoverBlock from "@/components/blocks/cover-block/CoverBlock.vue";
import formInput from "@/components/ui/form-input/formInput.vue";
import ServiceList from "@/pages/booking/ServiceList.vue";
import formTextarea from "@/components/ui/form-textarea/formTextarea.vue";
import PhotoBlock from "@/components/blocks/photo-block/PhotoBlock.vue";
import FeatureEditor from "@/components/ui/feature-editor/FeatureEditor.vue";

export default {
  name: 'ConferencePage',
  components: {FeatureEditor, PhotoBlock, formTextarea, ServiceList, NavBack, CoverBlock, formInput},
  data() {
    return {
      product: {},
      additionalItems: [],
      photos: [],
      features: '',
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
    this.loadProduct()
    if (this.driver === 'conference') {
      this.loadConferences()
    }
  },
  methods: {
    loadProduct() {
      $api.products.get(this.id).then((response) => {
        this.product = response.data.content
        this.features = this.product.features || '';
      })
    },
    loadConferences() {
      $api.conferences.get().then((response) => {
        this.additionalItems = response.data.content
      })
    },
    handleFeaturesUpdate(newFeaturesHtml) {
      this.features = newFeaturesHtml;
    },
    goBack() {
      this.$router.push('/booking');
    },
    updateImageUrl(dataUrl) {
      this.product.avatar = dataUrl;
    },
    saveProduct() {
      console.log(this.product.id)
      try {
        $api.store.products.edit(this.product.id, this.product).then((response) => {
          console.log('Product saved successfully:', response);
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/styles/mixins.scss';

.item-page {
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

  &__save {
    margin-left: auto;
    background: var(--green);
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
    color: var(--blue-2);
    @include SemiBold15;
    margin-top: 70px;
    text-align: left;
  }

  &__input, &__textarea {
    background: var(--gray-2);
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: none;
    color: var(--blue);
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
    color: var(--blue);
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
      color: var(--blue-2);
      @include SemiBold15;
      margin-top: 20px;
    }
  }
}

</style>
