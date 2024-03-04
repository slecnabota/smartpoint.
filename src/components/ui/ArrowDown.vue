<script>
export default {
  name: "ArrowDown",
  props:{
    pathFill:{
      type: String,
      default: '#75809E'
    },
    clipFill:{
      type: String,
      default: 'white'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'active-arrow': isActive }">
    <path d="M12.0007 13.6716L16.9504 8.7218L18.3646 10.136L12.0007 16.5L5.63672 10.136L7.05093 8.7218L12.0007 13.6716Z" :fill="pathFill"/>
  </svg>
</template>

<style scoped lang="scss">
svg{
  transition: all .5s;
  cursor: pointer;
}
.active-arrow {
  transform: rotate(-180deg);
  transition: all .5s;
}
</style>