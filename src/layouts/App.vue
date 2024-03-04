<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #FFF;
  color: #0E1F4D;
  font-family: $fontRegular;
}

html, body {
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

img {
  display: block;
}

a {
  display: block;
  text-decoration: none;
  color: #0E1F4D;
  font-family: $fontSemiBold;
}

button {
  display: block;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
}

.delete {
  color: $red;
  font-family: $fontSemiBold;
}
</style>
