<template>
  <div class="cover">
    <div class="cover__heading">Обложка</div>
    <input type="file" accept="image/*" @change="handleImageChange" ref="input"
           style="display: none"/>
    <div v-if="urlImage" class="cover__image" :style="`background-image: url('${localUrlImage}')`"></div>
    <!--    <div v-else>no photo</div>-->
    <div class="cover__functions">
      <button @click="triggerFileInput" class="cover__update">Обновить фото</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps({
  urlImage: String,
  idProduct: String,
});
let localUrlImage: any = ref(props.urlImage);
const input = ref<HTMLInputElement>();
const file = ref<FileList | null>();


watch(() => props.urlImage, (newVal) => {
  localUrlImage.value = newVal;
});

const triggerFileInput = () => {
  input.value?.click();
};

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files;
  if (file.value?.[0]) {
    localUrlImage.value = URL.createObjectURL(file.value[0])

    setTimeout(() => {
      URL.revokeObjectURL(localUrlImage.value)
    }, 1000)
    $api.files.create({file: file.value[0]}).then((response: any) => {
      $api.store.products.edit(props.idProduct, {avatarId: response.data.content.id}).then((response: any) => {
        console.log("success")
      })
    })
  }
};


</script>


<style scoped lang="scss">
@import '@/styles/mixins.scss';

.cover {
  margin-bottom: 10px;

  &__heading {
    @include SemiBold17;
  }

  &__functions {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    width: fit-content;
  }

  &__update {
    color: #235EE8;
    @include SemiBold15;
  }

  &__delete {
    color: #DA483D;
    @include SemiBold15;
  }

  &__image {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 15px;
    margin: 10px 0;
    width: 320px;
    height: 200px;
  }
}
</style>