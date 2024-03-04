<script>
export default {
  name: "CoverBlock",
  data() {
    return {};
  },
  props: ['urlImage',]
}
</script>

<template>
  <div class="cover">
    <div class="cover__heading">Обложка</div>
    <img :src="urlImage" alt="" class="cover__image">
    <div class="cover__functions">
      <button class="cover__update">Обновить фото</button>
      <button class="cover__delete">Удалить фото</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    margin: 10px 0;
    width: 320px;
    height: 200px;
  }
}
</style>