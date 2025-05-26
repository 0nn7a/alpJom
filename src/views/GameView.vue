<script setup>
import { useTemplateRef, ref, onMounted, computed, nextTick, watch } from 'vue';
// import { getDefinition } from '@/apis/dictionary.js';
import OtpInput from '@/components/OtpInput.vue';
import OnceRow from '@/models/OnceRow.js';
import WordleGame from '@/utils/spellChecker.js';

const modeOptions = ['Daily', 'Random'];
const mode = ref('Random');
const toggleMode = (m) => {
  mode.value = m;
  restart();
};

const game = new WordleGame('normal');
const question = ref({});
const updateQuestion = () => {
  question.value =
    mode.value === 'Daily' ? game.getDailyWord() : game.getRandomWord();
};
updateQuestion();

const size = computed(() => question.value.length); // 單字長度
const times = 6; // 最大猜測次數
const answer = computed(() => question.value.word);
watch(
  answer,
  (value) => {
    console.log(value);
  },
  { immediate: true }
);

const otpRefs = useTemplateRef('otpRefs');
const focusRow = async (idx) => {
  await nextTick();
  otpRefs.value[idx].focusFirst();
};

const record = ref([]);
const initRecord = () => {
  record.value = Array.from({ length: times }, (_, idx) => {
    const row = new OnceRow(answer, size.value);
    if (!idx) row.setDisabled(false);
    return row;
  });
};
initRecord();
const setAllDisabled = () => {
  record.value.forEach((row) => row.setDisabled(true));
};

const handleOtpSubmit = async (idx) => {
  const thisRow = record.value[idx];
  const nextRow = record.value[idx + 1];

  if (!game.isValidWord(thisRow.gs)) return alert('您輸入的單詞不存在！');

  thisRow.setDisabled(true);
  const bingo = thisRow.compare();

  if (bingo) {
    thisRow.check();
    setAllDisabled();
    alert(`🎉🎉🎉\n答案是：${answer.value}`);
    return;
  }

  if (nextRow) {
    nextRow.cp = thisRow.check();
    nextRow.setDisabled(false);
    await focusRow(idx + 1);
  } else {
    alert(`🥹🥹🥹\n答案是：${answer.value}`);
  }
};

const isCompleted = computed(() =>
  record.value.map((row) => row.d).every(Boolean)
);
const restart = () => {
  updateQuestion();
  initRecord();
  focusRow(0);
};

// 查詢單詞釋義
// const isLoading = ref(true);
// const hasResult = ref(false);
// const defaultDefinition = JSON.stringify({
//   word: '', // 查詢的單字
//   // 各種詞性與定義
//   meanings: [
//     // 各種詞性與定義
//     {
//       partOfSpeech: '', // 詞性
//       definitions: [
//         {
//           definition: '', // 定義
//           example: '', // 例句
//         },
//       ],
//     },
//   ],
// });
// const resetDefinition = () => {
//   definition.value = JSON.parse(defaultDefinition);
// };
// const definition = ref(JSON.parse(defaultDefinition));
// const getDefinition = async (str) => {
//   // CALL 辭典 api
//   if (str === definition.value.word) return;
//   isLoading.value = true;
//   resetDefinition();
//   try {
//     definition.value = await getDefinition(str);
//     hasResult.value = true;
//   } catch (e) {
//     if (e.status === 404) {
//       definition.value.word = str;
//       hasResult.value = false;
//     }
//   } finally {
//     isLoading.value = false;
//   }
// }

onMounted(() => {
  focusRow(0);
});
</script>

<template>
  <section
    class="mb-36 h-full w-full flex flex-col justify-center items-center gap-6"
  >
    <div class="flex items-center gap-4">
      <button
        v-for="m of modeOptions"
        :key="m"
        type="button"
        class="py-2 px-4 text-lg bg-zinc-800 rounded cursor-pointer transition duration-300 hover:bg-zinc-700"
        @click="toggleMode(m)"
      >
        {{ m }}
      </button>
    </div>
    <div class="flex flex-col items-center">
      <h1 class="text-4xl">Classic Mode</h1>
      <p class="text-xl text-zinc-500">{{ mode }} Words</p>
    </div>
    <div class="flex flex-col gap-4">
      <OtpInput
        v-for="(no, idx) in 6"
        :key="no + 'time'"
        ref="otpRefs"
        :length="size"
        :placeholders="record[idx].cp"
        :correctIdx="record[idx].ci"
        :unsureIdx="record[idx].ui"
        :disabled="record[idx].d"
        v-model="record[idx].ga"
        @submit="handleOtpSubmit(idx)"
      />
    </div>
    <button
      v-if="isCompleted"
      type="button"
      class="py-3 px-6 text-2xl bg-zinc-800 border border-zinc-900 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:border-zinc-500"
      @click="restart"
    >
      RESTART
    </button>

    <!-- 顯示辭典 api 結果 -->
    <!--  <h1 v-if="!isLoading && !hasResult" class="text-6xl text-zinc-100">-->
    <!--    This word does not exist.-->
    <!--  </h1>-->
    <!--  <div-->
    <!--    v-else-->
    <!--    class="max-h-full max-w-2xl flex flex-col gap-12 mt-10 mb-24 overflow-y-auto"-->
    <!--  >-->
    <!--    <h1 class="text-6xl text-zinc-100">{{ definition.word }}</h1>-->
    <!--    <div-->
    <!--      v-for="(m, m_idx) of definition.meanings"-->
    <!--      :key="'m_' + m_idx"-->
    <!--      class="flex flex-col gap-6"-->
    <!--    >-->
    <!--      <p class="font-bold text-3xl text-zinc-300">{{ m.partOfSpeech }}</p>-->

    <!--      <div-->
    <!--        v-for="(_, d_idx) in Math.min(m.definitions.length, 3)"-->
    <!--        :key="'d_' + d_idx"-->
    <!--        class="flex flex-col gap-0.5"-->
    <!--      >-->
    <!--        <p-->
    <!--          v-if="m.definitions[d_idx]?.definition"-->
    <!--          class="text-xl text-zinc-300"-->
    <!--        >-->
    <!--          {{ m.definitions[d_idx]?.definition }}-->
    <!--        </p>-->
    <!--        <p v-if="m.definitions[d_idx]?.example" class="text-xl text-zinc-300">-->
    <!--          {{ m.definitions[d_idx]?.example }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->
  </section>
</template>

<style scoped></style>
