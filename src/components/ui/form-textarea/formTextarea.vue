<template>
  <div class="textarea-field">
    <label v-if="label" :for="id" class="label" :class="labelClass">{{ label }}</label>
    <textarea :id="id" class="textarea" :value="modelValue || value" :placeholder="placeholder"
              @input="onInput"></textarea>
  </div>
</template>

<script>
export default {
  name: 'formTextarea',
  props: {
    id: String,
    label: String,
    value: [String, Number],
    modelValue: [String, Number],
    labelClass: String,
    placeholder: String,
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

.textarea-field {
  & .label {
    color: var(--blue);
    @include SemiBold17;
    display: block;
    margin-bottom: 15px;

    &.small {
      @include SemiBold13;
      margin-bottom: 10px;
    }
  }

  .textarea {
    background: var(--gray-2);
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: none;
    color: var(--blue);
    @include Body15;
    resize: none;
    height: 100px;
  }
}
</style>
