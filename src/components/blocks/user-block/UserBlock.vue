<template>
  <!--  <p class="user-mail">{{ user }}</p>-->
  <p class="user-item">Подписка</p>
  <p class="user-item">Смена пароля</p>
  <form>
    <button class="user-item exit" @click="logOut">Выход</button>
  </form>
</template>

<script lang="ts">
import axios from "axios";
import {defineComponent} from 'vue';
// import { mapState } from 'vuex';
// import Auth from '../../../../libs/nast-auth/index';
export default defineComponent({
  name: 'User',
  methods: {
    async logOut() {
      $app.auth.logout();
    }
  }
  // computed: {
  //   ...mapState({
  //     user: (state: any) => state.user.email
  //   })
  // },
  // data() {
  //   return {
  //     auth: new Auth()
  //   }
  // }
})
</script>

<style scoped lang="scss">
.user {
  &-item {
    border-radius: 10px;
    @include SemiBold15;
    padding: 15px 10px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
      background: rgba(193, 193, 193, 0.329);
    }

    &.exit {
      display: block;
      width: 100%;
      text-align: left;
      border-radius: 10px;
      @include SemiBold15;
    }
  }

  &-mail {
    padding: 20px 10px;
    border-radius: 10px;
    @include SemiBold15;
    text-decoration-line: underline;
  }
}
</style>
