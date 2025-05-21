<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  length: { type: Number, default: 5 },
});
const emit = defineEmits(['update:modelValue', 'submit']);

const regex = /^[a-z]$/g;
const values = ref(Array(props.length).fill(''));
const inputs = ref([]);

// --- Utils ---
const isValidChar = (char) => regex.test(char);
const getFirstEmptyIndex = () => values.value.findIndex((char) => !char);
const getChar = (e) => (e.data || e.target.value || '').toLowerCase().slice(-1);

// --- Input Flow ---
const focusFirstEmpty = () => {
  const index = getFirstEmptyIndex();
  if (index !== -1) inputs.value[index]?.focus();
};

// --- Input Events ---
const handleInput = (e) => {
  const char = getChar(e);
  if (!isValidChar(char)) return e.preventDefault();

  const index = getFirstEmptyIndex();
  if (index !== -1) {
    values.value[index] = char;
    focusFirstEmpty();
  }
  e.preventDefault();
};

const onSubmit = () => {
  if (values.value.every(Boolean)) emit('submit', values.value.join(''));
};

const handleKeydown = (e, index) => {
  if (e.key === 'Enter') {
    onSubmit();
    e.preventDefault();
  }

  if (e.key === 'Backspace') {
    if (values.value[index]) {
      values.value[index] = '';
    } else if (index > 0) {
      inputs.value[index - 1]?.focus();
    }
    e.preventDefault();
  }
};

const handlePaste = (e) => {
  e.preventDefault();
  const pasted = e.clipboardData
    .getData('text')
    .toLowerCase()
    .replace(regex, '');
  const chars = pasted.slice(0, props.length).split('');

  chars.forEach((char, i) => {
    values.value[i] = char;
  });

  const nextIndex =
    chars.length < props.length ? chars.length : props.length - 1;
  inputs.value[nextIndex]?.focus();
};

// --- Sync Model ---
watch(
  () => props.modelValue,
  (newVal) => {
    const chars = newVal.split('');
    for (let i = 0; i < props.length; i++) {
      values.value[i] = chars[i] || '';
    }
  }
);

watch(
  values,
  (newVals) => {
    emit('update:modelValue', newVals.join(''));
  },
  { deep: true }
);

// --- Initial Focus ---
onMounted(() => {
  focusFirstEmpty();
});
</script>

<template>
  <form class="flex gap-4" @submit.prevent="onSubmit">
    <input
      v-for="(_, index) in values"
      :key="index"
      ref="inputs"
      v-model="values[index]"
      class="w-16 h-18 text-center text-4xl text-zinc-100 uppercase border border-zinc-500 rounded-lg focus:outline-none focus:ring-1 focus:zinc-100 transition duration-300"
      type="text"
      inputmode="text"
      pattern="[A-Za-z]"
      maxlength="1"
      autocomplete="off"
      lang="en"
      @beforeinput="handleInput"
      @keydown="handleKeydown($event, index)"
      @paste="handlePaste"
    />
    <button type="submit" class="hidden">submit</button>
  </form>
</template>
