<script>
import NavBack from "@/components/blocks/nav-back/Index.vue";
import CoverAdd from "@/components/blocks/cover-add/CoverAdd.vue";
import FormInput from "@/components/ui/form-input/formInput.vue";
import FormTextarea from "@/components/ui/form-textarea/formTextarea.vue";

export default {
  name: "AddUser",
  components: {FormTextarea, FormInput, CoverAdd, NavBack},
  data() {
    return {
      rounded: 'rounded'
    }
  }
}
</script>

<template>
  <div class="add-user">
    <nav-back link="users"/>
    <div class="add-user__top">
      <h2>Новый пользователь</h2>
      <button class="add-user__delete">
        <img src="@/assets/icons/photo_del.svg" alt="">
        Удалить пользователя
      </button>
    </div>
    <div class="add-user__content">
      <div class="add-user__cover">
        <cover-add :class="rounded">
          <template #photo>
            <img src="@/assets/icons/none_img.svg" alt="">
          </template>
        </cover-add>
      </div>
      <div class="add-user__form">
        <div class="add-user__row add-user__grid">
          <form-input label="ФИО" placeholder="Фамилия"/>
          <form-input placeholder="Имя"/>
          <form-input placeholder="Отчество"/>
          <form-input label="Номер телефона" placeholder="Напишите номер телефона"/>
          <form-input label="E-Mail " placeholder="Напишите почту"/>
          <form-input label="ИИН" placeholder="Напишите ИИН"/>
          <form-input label="Придумайте пароль" placeholder="Придумайте пароль"/>
          <form-input label="Повторите пароль" placeholder="Повторите пароль"/>
          <form-textarea class="add-user__textarea" label="О пользователе"
                         placeholder="Напишите информацию о пользователе, например, его увлечения или должность"/>
        </div>
        <button class="add-user__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.add-user {
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
    background: #D4D8E1;
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