<template>
  <div class="input-field">
    <label v-if="label" :for="id" class="label" :class="labelClass">{{ label }}</label>
    <input
        :type="type"
        :id="id"
        class="input"
        :placeholder="placeholder"
        :value="modelValue || value"
        @input="onInput"
    >
  </div>
</template>

<script>
export default {
  name: 'formInput',
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default: "text"
    },
    value: [String, Number],
    modelValue: [String, Number],
    placeholder: String,
    labelClass: String,
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.input-field {
  & .label {
    color: #0E1F4D;
    font-size: 17px;
    line-height: 27px;
    font-family: 'SFProDisplay SemiBold';
    display: block;
    margin-bottom: 15px;

    &.small {
      font-size: 13px;
      line-height: 20px;
    }
  }

  .input {
    background: #EFF0F4;
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: none;
    color: #0E1F4D;
    font-family: 'SFProDisplay Regular';
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
  }
}
</style>
