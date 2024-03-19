<template>
  <div class="user">
    <p class="user-mail">{{ data.email }}</p>
    <router-link to="/profile" class="user-item">Профиль</router-link>
    <button class="user-item user-exit" @click="logOut">Выход</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'User',
  data() {
    return {
      data: {},
    }
  },
  created() {
    this.userGet();
  },
  methods: {
    userGet() {
      $api.auth.info().then((response) => {
        console.log(response.data.content.user)
        this.data = response.data.content.user;
      })
    },
    logOut() {
      $app.auth.logout();
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.user {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &-item {
    @include SemiBold15;
    cursor: pointer;
  }

  &-exit {
    text-align: left;
    display: block;
    @include SemiBold15;
  }

  &-mail {
    @include SemiBold15;
    text-decoration-line: underline;
  }
}
</style>
