<script>
import TableBlock from "@/components/blocks/table-block/TableBlock.vue";

export default {
  name: "UsersPage",
  components: {TableBlock},
  data() {
    return {
      item: 'item',
      columnNames: {
        select: '',
        num: '№',
        fulln: 'ФИО',
        iin: 'ИИН',
        phone: 'Номер телефона',
        email: 'E-mail',
        last: 'Последний сеанс',
      },
      infos: [
        {
          num: 1,
          fulln: 'Иванов И.А.',
          iin: 121098500760,
          phone: '+7 (777) 777-77-77',
          email: 'example@mail.com',
          last: '06.10.2023'
        },
      ],
    }
  }
}
</script>

<template>
  <div class="users">
    <div class="users__top">
      <h2 class="users__title">Пользователи</h2>
      <router-link :to="{name: 'add-user'}" class="users__add">
        Добавить пользователя
      </router-link>
    </div>
    <table-block :columnNames="columnNames" :item="item" :infos="infos">
      <template #select>
        <input type="checkbox" name="check" id="check">
      </template>
    </table-block>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.users {
  background: #EAEAEA;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__add {
    color: white;
    @include SemiBold15;
    padding: 10px 15px;
    border-radius: 10px;
    background: var(--green);
    cursor: pointer;
  }
}
</style>