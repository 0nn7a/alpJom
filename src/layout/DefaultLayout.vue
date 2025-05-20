<script setup>
import { routes } from '@/router/index.js';
import { computed } from 'vue';
import LogoRotation from '@/components/LogoRotation.vue';

const nav = computed(() => routes[0].children.map((r) => r.name));
</script>

<template>
  <div class="h-full w-full flex flex-col items-center gap-10 px-8 bg-zinc-950">
    <header class="w-full flex items-center">
      <LogoRotation />
      <nav
        class="flex items-center ms-auto gap-8 text-xl text-zinc-500 uppercase"
      >
        <RouterLink v-for="name of nav" :key="name" :to="{ name }">
          {{ name }}
        </RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
@reference "tailwindcss";

a:not(.router-link-active) {
  @apply hover:text-zinc-300 transition duration-500 ease-in-out;
}
.router-link-active {
  @apply font-semibold text-zinc-100;
}
</style>
