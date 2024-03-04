<script>
export default {
  name: "TableBlock",
  data(){
    return{
      number: 1,
    }
  },
  props: {
    columnNames: Object,
    infos: Array,
    row: String,
    item: String,
    tableHeight: String,
  }
}
</script>

<template>
<div class="table" :class="tableHeight">
  <div class="table__btn">
    <button class="table__select">Выбрать все</button>
    <button class="table__export">
      <img src="@/assets/icons/export.svg" alt="">
      Экспорт
      <span>({{number}})</span>
    </button>
  </div>
  <table class="table__inner">
    <thead>
    <tr class="table__heading grid">
      <td v-for="(head, name) in columnNames" :key="head" :class="[name]">{{ head }}</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(info, index) in infos" :key="index" class="item-row">
      <td v-for="(title, name) in columnNames" :key="name" class="item item-part" :class="[name, row]">
        <slot :name="name" :info="info">{{ info[name] }}</slot>
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped lang="scss">
.table{
  border-radius: 15px;
  background: white;
  padding: 15px 20px;

  width: 100%;
  max-height: 400px;
  overflow: auto;
  position: relative;

  &.table-height {
    max-height: 700px;
  }
  &__btn{
    display: flex;
    align-items: center;
    gap: 10px;
    button{
      padding: 5px 10px;
      border-radius: 10px;
      background: #EFF0F4;

      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      line-height: 20px;
      font-family: 'SFProDisplay SemiBold';
      span{
        color: #75809E;
      }
    }
  }
  &__heading{
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #EFF0F4;
      border-radius: 10px;
      z-index: 0;
    }
    td{
      color: #75809E;
      padding: 10px 20px;
      position: relative;
      z-index: 1;
    }
  }
  &__inner {
    width: 100%;
    height: 100%;
    padding-right: 10px;

    border-collapse: separate;
    border-spacing: 0 20px;
    border: none;
  }
  tr,
  td {
    border: none;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #b0c5c0;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #6b7a78;
    border-radius: 6px;
  }
  .row{
    padding: 25px 0;
  }
  & .item {
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: #013832;
    padding: 10px 20px;

    &-part {
      font-size: 13px;
      line-height: 20px;
      font-family: 'SFProDisplay Regular';
      color: #0E1F4D;
      //padding: 10px 20px;
      position: relative;
      z-index: 1;
    }

  }
}
</style>