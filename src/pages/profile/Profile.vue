<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import NavBack from "@/components/blocks/nav-back/Index.vue";
import CoverAdd from "@/components/blocks/cover-add/CoverAdd.vue";
import formInput from "@/components/ui/form-input/formInput.vue";
import CoverBlock from "@/components/blocks/cover-block/CoverBlock.vue";

const userData = ref({});
const getData = () => {
  $api.auth.info().then((response: any) => {
    userData.value = response.data.content.user;
  })
};
const editProfile = () => {
  console.log(userData.value)
  $api.auth.editProfile(userData.value);
};
onMounted(() => {
  getData();
});
</script>

<template>
  <div class="profile">
    <nav-back link="users"/>
    <div class="profile__top">
      <h2>Профиль</h2>
    </div>
    <div class="profile__content">
      <div class="profile__cover">
        <cover-block/>
      </div>
      <form class="profile__form" @submit.prevent="editProfile">
        <div class="profile__row profile__grid">
          <form-input label="ФИО" v-model="userData.name" placeholder="Фамилия"/>
          <form-input v-model="userData.name" placeholder="Имя"/>
          <form-input v-model="userData.patronymic" placeholder="Отчество"/>
          <form-input v-model="userData.phone" label="Номер телефона" placeholder="Напишите номер телефона"/>
          <form-input v-model="userData.email" label="E-Mail " placeholder="Напишите почту"/>
          <form-input v-model="userData.iin" label="ИИН" placeholder="Напишите ИИН"/>
          <!--                    <form-input v-model="" label="Настоящий пароль" placeholder="Настоящий пароль"/>-->
          <!--                    <form-input label="Новый пароль" placeholder="Новый пароль"/>-->
        </div>
        <button class="profile__save">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.profile {
  height: auto;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    padding-bottom: 15px;
    border-bottom: 1px solid var(--gray-2);
  }

  &__delete {
    display: flex;
    align-items: center;
    column-gap: 10px;
    @include SemiBold15;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    height: 100%;
  }

  &__form {
    width: 100%;
  }

  &__textarea {
    grid-column: 1/3;
  }

  &__save {
    background: var(--gray-3);
    padding: 15px 25px;
    border-radius: 10px;
    color: var(--gray-4);
    @include SemiBold15;
    margin-top: 30px;
    margin-left: auto;
  }

  &__row {
    padding-bottom: 85px;
    border-bottom: 1px solid var(--gray-2);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: flex-end;
    column-gap: 15px;
    row-gap: 40px;
  }
}
</style>