<script setup>
import { ref } from 'vue';

const props = defineProps({
  length: { type: Number, default: 5 },
  placeholders: { type: Array, default: () => [] },
  correctIdx: { type: Array, default: [] },
  unsureIdx: { type: Array, default: [] },
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue', 'submit']);

const regex = /^[a-z]$/;
const model = defineModel({ required: true });

const inputs = ref([]);
const setInputRef = (el, idx) => {
  if (el) inputs.value[idx] = el;
};
const focusFirst = () => {
  inputs.value[0].focus();
};

const handleInput = (e, idx) => {
  const char = e.target.value.toLowerCase().slice(-1);
  if (regex.test(char)) {
    model.value[idx] = char;
    if (inputs.value[idx + 1]) {
      inputs.value[idx + 1].focus();
    }
  } else {
    model.value[idx] = '';
    e.target.value = '';
  }
};

const handlePaste = (e) => {
  e.preventDefault();
  e.target.value = '';
  const pasted = e.clipboardData
    .getData('text')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
  const chars = pasted.slice(0, props.length).split('');
  for (let i = 0; i < props.length; i++) {
    model.value[i] = chars[i] || '';
  }
  const nextIdx = model.value.findIndex((v) => !v);
  if (nextIdx !== -1) {
    inputs.value[nextIdx]?.focus();
  } else {
    inputs.value[props.length - 1]?.focus();
  }
};

const handleKeydown = (e, idx) => {
  if (e.key === 'Backspace') {
    if (!model.value[idx] && idx > 0) {
      inputs.value[idx - 1]?.focus();
    }
  } else if (e.key === 'Enter' || e.code === 'Enter') {
    e.preventDefault();
    onSubmit();
  }
};

const onSubmit = () => {
  if (model.value.every(Boolean)) emit('submit');
};

const clearModel = () => {
  model.value = Array(props.length).fill('');
};

defineExpose({
  focusFirst,
  clearModel,
});
</script>

<template>
  <form class="flex gap-4" @submit="onSubmit">
    <input
      v-for="(_, idx) in model"
      :key="idx"
      :ref="(el) => setInputRef(el, idx)"
      :value="model[idx]"
      :placeholder="props.placeholders[idx]"
      :disabled="props.disabled"
      :class="{
        'text-green-300': props.correctIdx.includes(idx),
        'text-orange-300': props.unsureIdx.includes(idx),
        'text-zinc-100':
          !props.correctIdx.includes(idx) && !props.unsureIdx.includes(idx),
        'opacity-50': props.disabled,
      }"
      class="w-16 h-18 text-center text-4xl uppercase border border-zinc-500 rounded-lg focus:outline-none focus:ring-1 focus:zinc-100 transition duration-300"
      type="text"
      inputmode="latin"
      lang="en"
      pattern="[A-Za-z]"
      maxlength="1"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      @input="handleInput($event, idx)"
      @paste="handlePaste($event)"
      @keydown="handleKeydown($event, idx)"
    />
    <button type="submit" class="hidden">submit</button>
  </form>
</template>
