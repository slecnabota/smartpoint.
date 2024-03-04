<template>
  <div class="card">
    <img :src="img" alt="">
    <p>{{ heading }}</p>
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
.card {
  img {
    width: 100%;
  }

  p {
    margin-top: 15px;
    font-family: 'SFProDisplay SemiBold';
    font-size: 17px;
    line-height: 27px;
    color: #0E1F4D;
  }
}
</style>