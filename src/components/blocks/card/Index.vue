<template>
  <div class="card">
    <div class="card__image">
      <div class="card__image" :style="`background-image: url('${img}')`"></div>
    </div>
    <p class="card__heading">{{ heading }}</p>
  </div>
</template>
<script>
export default {
  name: 'CardBlock',
  props: {
    heading: {type: String,},
    img: {type: String,}
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/mixins.scss';

.card {
  &__image {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: 252px;
    height: 210px;
    border-radius: 15px;
  }

  &__heading {
    margin-top: 15px;
    @include SemiBold17;
    color: var(--blue);
  }
}
</style>