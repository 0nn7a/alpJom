<script setup>
import { ref } from 'vue';
import OtpInput from '@/components/OtpInput.vue';

const code = ref('');
const temp = ref('');
const handleOtpSubmit = (str) => {
  temp.value = str;
};
</script>

<template>
  <OtpInput :length="5" v-model="code" @submit="handleOtpSubmit" />
  <p class="text-5xl text-zinc-100">{{ temp }}</p>
</template>

<style scoped></style>
