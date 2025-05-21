<script setup>
import { ref } from 'vue';
import { getDefinition } from '@/apis/dictionary.js';
import OtpInput from '@/components/OtpInput.vue';

const code = ref('');

const isLoading = ref(true);
const hasResult = ref(false);

const defaultDefinition = JSON.stringify({
  word: '', // 查詢的單字
  // 各種詞性與定義
  meanings: [
    // 各種詞性與定義
    {
      partOfSpeech: '', // 詞性
      definitions: [
        {
          definition: '', // 定義
          example: '', // 例句
        },
      ],
    },
  ],
});
const resetDefinition = () => {
  definition.value = JSON.parse(defaultDefinition);
};
const definition = ref(JSON.parse(defaultDefinition));

const handleOtpSubmit = async (str) => {
  if (str === definition.value.word) return;
  isLoading.value = true;
  resetDefinition();
  try {
    definition.value = await getDefinition(str);
    hasResult.value = true;
  } catch (e) {
    if (e.status === 404) {
      definition.value.word = str;
      hasResult.value = false;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <OtpInput :length="5" v-model="code" @submit="handleOtpSubmit" />
  <h1 v-if="!isLoading && !hasResult" class="text-6xl text-zinc-100">
    This word does not exist.
  </h1>
  <div
    v-else
    class="max-h-full max-w-2xl flex flex-col gap-12 mt-10 mb-24 overflow-y-auto"
  >
    <h1 class="text-6xl text-zinc-100">{{ definition.word }}</h1>
    <div
      v-for="(m, m_idx) of definition.meanings"
      :key="'m_' + m_idx"
      class="flex flex-col gap-6"
    >
      <p class="font-bold text-3xl text-zinc-300">{{ m.partOfSpeech }}</p>

      <div
        v-for="(_, d_idx) in Math.min(m.definitions.length, 3)"
        :key="'d_' + d_idx"
        class="flex flex-col gap-0.5"
      >
        <p
          v-if="m.definitions[d_idx]?.definition"
          class="text-xl text-zinc-300"
        >
          {{ m.definitions[d_idx]?.definition }}
        </p>
        <p v-if="m.definitions[d_idx]?.example" class="text-xl text-zinc-300">
          {{ m.definitions[d_idx]?.example }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
