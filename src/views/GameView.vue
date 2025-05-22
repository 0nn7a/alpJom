<script setup>
import { computed, ref } from 'vue';
import { getDefinition } from '@/apis/dictionary.js';
import OtpInput from '@/components/OtpInput.vue';

const otpDom = ref(null);

const wordSize = 5;
const guessesArr = ref(Array(wordSize).fill(''));
const guesses = computed(() => guessesArr.value.join(''));

const handleOtpSubmit = async (str) => {
  console.log('guesses: ', guesses.value, guessesArr.value);
  console.log('answers: ', answer.value, answerArr.value);
  console.log('correctPart: ', correctPart.value);

  const bingo = compare();
  if (bingo) {
    alert('BINGO🎉🎉🎉將顯示單詞釋義！');

    // CALL 辭典 api
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
  } else {
    checkCorrectPart();
    otpDom.value.clearModel();
  }
};

// 比對解答
const answer = ref('apple');
const answerArr = computed(() =>
  answer.value ? answer.value.split('') : Array(wordSize).fill('')
);
const correctPart = ref(Array(wordSize).fill(''));
const checkCorrectPart = () => {
  for (let i = 0; i < wordSize; i++) {
    if (guessesArr.value[i] === answerArr.value[i])
      correctPart.value[i] = answer.value[i];
  }
};
const clearCorrectPart = () => {
  correctPart.value = Array(wordSize).fill('');
};
const compare = () => {
  return guesses.value === answer.value;
};

// 查詢單詞釋義
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
</script>

<template>
  <OtpInput
    ref="otpDom"
    :length="5"
    :placeholders="correctPart"
    v-model="guessesArr"
    @submit="handleOtpSubmit"
  />

  <!-- 顯示辭典 api 結果 -->
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
