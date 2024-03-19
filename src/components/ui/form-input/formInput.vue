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
@import '@/styles/mixins.scss';

.input-field {
  & .label {
    color: var(--blue);
    @include SemiBold17;
    display: block;
    margin-bottom: 15px;

    &.small {
      font-size: 13px;
      line-height: 20px;
    }
  }

  .input {
    background: var(--gray-2);
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: none;
    color: var(--blue);
    @include Body15;
  }
}
</style>
