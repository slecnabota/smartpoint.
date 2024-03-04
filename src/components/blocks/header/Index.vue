<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link to="/booking" class="header__logo">
        <img :src="logo" alt="logo">
      </router-link>
      <div class="header__content">
        <div class="header__loop">
          <img :src="loop" alt="loop">
          <input type="text" placeholder="Поиск">
        </div>
        <div class="header__block">
          <div class="header__notification">
            <img :src="notification" alt="notification">
          </div>
          <!--          <div class="header__user">-->
          <!--            <img :src="user" alt="">-->
          <!--            <arrow-down/>-->
          <!--          </div>-->
          <pop-up :class="customClass">
            <template #button="{ click }">
              <div class="header__user" @click="click">
                <img :src="user" alt="user">
                <arrow-down/>
              </div>
            </template>
            <template #pop-up>
              <user-block/>
            </template>
          </pop-up>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import logo from '@/assets/icons/logo.svg';
import loop from '@/assets/icons/loop.svg';
import notification from '@/assets/icons/with_notification.svg';
import arrow_down from '@/assets/icons/arrow_down.svg';
import user from '@/assets/img/user.png';
import ArrowDown from "@/components/ui/ArrowDown.vue";
import PopUp from "@/components/blocks/pop-up/PopUp.vue";
import UserBlock from "@/components/blocks/user-block/UserBlock.vue";

export default {
  name: 'HeaderBlock',
  data() {
    return {
      logo, loop, notification, arrow_down, user,
      customClass: 'pop-up__right',
    }
  },
  components: {
    UserBlock,
    PopUp,
    ArrowDown
  }
}
</script>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 10px;
  background: $white;
  z-index: 5;
  border-bottom: 1px solid $gray2;

  &__wrapper {
    display: grid;
    grid-template-columns: 230px calc(100% - 260px);
    column-gap: 30px;
  }

  &__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__loop {
    display: flex;
    align-items: center;
    background: $gray2;
    padding: 10px 15px;
    column-gap: 10px;
    border-radius: 10px;

    input {
      @include Body15;
      background: transparent;
      border: none;
      width: 350px;
      font-family: $fontRegular;
      outline: none;
    }
  }

  &__block {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  &__user {
    display: flex;
    align-items: center;
    column-gap: 5px;
    cursor: pointer;
  }

  &__logo {
    width: 100%;
  }
}
</style>