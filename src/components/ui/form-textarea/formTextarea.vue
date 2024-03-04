<template>
  <div class="textarea-field">
    <label v-if="label" :for="id" class="label" :class="labelClass">{{ label }}</label>
    <textarea :id="id" class="textarea" :value="modelValue || value" :placeholder="placeholder" @input="onInput"></textarea>
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
.textarea-field {
  & .label {
    color: #0E1F4D;
    font-size: 17px;
    line-height: 27px;
    font-family: 'SFProDisplay SemiBold';
    display: block;
    margin-bottom: 15px;
    &.small{
      font-size: 13px;
      line-height: 20px;
      margin-bottom: 10px;
    }
  }

  .textarea {
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
    resize: none;
    height: 100px;
  }
}
</style>
