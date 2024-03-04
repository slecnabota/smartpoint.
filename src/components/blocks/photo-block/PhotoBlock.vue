<template>
  <div class="photo">
    <h4 class="photo__heading">{{ heading }}</h4>
    <div class="photo__container">
      <div v-for="(photo, index) in photos" :key="index" class="photo__parent">
        <div class="photo__image" :style="{ backgroundImage: 'url(' + photo.url + ')' }"></div>
        <button @click="removePhoto(index)" class="photo__del"><img src="@/assets/icons/photo_del.svg" alt=""></button>
      </div>
      <div>
        <button @click="triggerFileInput" v-if="photos.length < 10" class="photo__update">
          <img src="@/assets/icons/none_img.svg" alt="">
          <span>+ добавить {{ title }}</span>
        </button>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" multiple>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoBlock',
  data() {
    return {
      photos: [],
    };
  },
  props: ['heading', 'title'],
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.value = '';
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (files.length === 0) return;

      const filesToAdd = Math.min(files.length, 10 - this.photos.length);
      for (let i = 0; i < filesToAdd; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.photos.push({url: e.target.result});
        };
        reader.readAsDataURL(file);
      }
    },
    removePhoto(index) {
      this.photos.splice(index, 1);
    },
  }
}
</script>

<style scoped lang="scss">
.photo {
  &__container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 20px;
    row-gap: 25px;
  }

  &__parent {
    position: relative;
  }

  &__update {
    background: $gray2;
    width: 130px;
    height: 130px;
    border-radius: 15px;

    & img {
      margin: 0 auto;
    }

    & span {
      color: $gray4;
      @include SemiBold13;
      margin-top: 5px;
    }
  }

  &__del {
    position: absolute;
    right: 0;
    top: -10px;
  }

  &__heading {
    @include SemiBold17;
    margin-bottom: 15px;
  }

  &__image {
    width: 130px;
    height: 130px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 15px;
  }
}
</style>
