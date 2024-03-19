<template>
  <div class="login">
    <div class="login__content">
      <h3 class="login__heading">Вход</h3>
      <form class="login__form" @submit.prevent='login'>
        <form-input label-class="small" v-model="loginNum" id="loginNumber" name="loginNumber"
                    placeholder="Введите номер телефона"
                    label="Ваш номер телефона:"/>
        <form-input label-class="small" v-model="loginPassword" id="loginPassword" name="loginPassword"
                    placeholder="Введите ваш пароль"
                    label="Ваш пароль"/>
        <button class="login__btn">Войти</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import FormInput from "@/components/ui/form-input/formInput.vue";
import DefaultButton from "@/components/ui/default-button/Index.vue";

export default {
  name: 'LoginPage',
  data() {
    return {
      loginNum: '71231231231',
      loginPassword: '123123',
    }
  },
  components: {DefaultButton, FormInput,},
  methods: {
    login() {
      $api.auth.login(this.loginNum, this.loginPassword).then(response => {
        $app.auth.login(response.data.content.user, response.data.content.token)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.login {
  background-color: #FFF;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__btn {
    margin-top: 20px;
    padding: 10px 30px;
    border-radius: 10px;
    background: var(--gray-3);
    @include SemiBold15;
  }

  &__heading {
    margin-bottom: 30px;
  }

  &__form {
    width: 350px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
  }
}
</style>