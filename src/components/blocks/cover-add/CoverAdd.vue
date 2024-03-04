<template>
  <div class="cover" :class="custom">
    <div class="cover__heading">Обложка</div>
    <button v-if="showAddButton" class="cover__add" @click="triggerFileInput">
      <slot name="photo"/>
      + добавить
    </button>
    <input type="file" @change="onFileChange" ref="fileInput" style="display: none;">
    <div v-if="urlImage" class="cover__image" :style="{ backgroundImage: 'url(' + urlImage + ')' }"></div>
  </div>
</template>

<script>
export default {
  name: "CoverAdd",
  data() {
    return {
      urlImage: '',
      showAddButton: true,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.urlImage = e.target.result;
        this.showAddButton = false;
        this.$emit('image-uploaded', this.urlImage);
      };
      reader.readAsDataURL(file);
    },
  },
  props: ['custom']
}
</script>


<style scoped lang="scss">
.cover {
  padding: 20px 0 75px;
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

  &__update, &__delete {
    color: $blue2;
    font-size: 15px;
    @include SemiBold15;
  }

  &__delete {
    color: $red;
  }

  &__image {
    width: 350px;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin: 10px 0;
    border-radius: 15px;
  }

  &__add {
    background: $gray2;
    border-radius: 15px;
    width: 320px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: $gray4;
    @include SemiBold13;
  }

  &.rounded {
    & .cover__add, & .cover__image {
      border-radius: 100%;
      width: 150px;
      height: 150px;
    }

    & .cover__heading {
      display: none;
    }
  }

}
</style>
