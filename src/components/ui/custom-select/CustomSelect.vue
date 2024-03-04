<script setup>
/* eslint-disable */
import { ref, watchEffect } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  default: {
    type: String,
    required: false,
    default: null,
  },
  tabindex: {
    type: Number,
    required: false,
    default: 0,
  },
});

const emit = defineEmits(['update:modelValue']);

const selected = ref(props.default || (props.options.length > 0 ? props.options[0] : null));
const open = ref(false);

watchEffect(() => {
  emit('update:modelValue', selected.value);
});

function toggleOpen() {
  open.value = !open.value;
}

function selectOption(option) {
  selected.value = option;
  open.value = false;
  emit('update:modelValue', option);
}
</script>

<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="toggleOpen">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
}

.custom-select .selected {
  background-color: #EFF0F4;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  user-select: none;
  height: 52px;
}

.custom-select .selected.open {
  border-bottom: 1px solid #D4D8E1;
  border-radius:10px 10px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #75809E transparent transparent transparent;
}

.custom-select .items {
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  position: absolute;
  background-color: #EFF0F4;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  padding: 15px;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #cbc9c9;
}

.selectHide {
  display: none;
}
</style>
