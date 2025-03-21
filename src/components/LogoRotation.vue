<script setup></script>

<template>
  <div class="relative flex items-center self-start">
    <span
      class="absolute z-10 top-9 right-1 py-2.5 px-2 text-md leading-1 text-zinc-100 bg-zinc-300/20 backdrop-blur-sm rotate-6 rounded"
    >
      0.0.1
    </span>

    <svg
      width="30"
      height="27"
      class="-mr-8"
      viewBox="0 0 125 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_1112_784)">
        <circle cx="54.0259" cy="55.9741" r="44.0259" fill="#EB5103" />
      </g>
      <g filter="url(#filter1_f_1112_784)">
        <circle cx="72.6284" cy="55.9741" r="44.0259" fill="#EFCA44" />
      </g>
      <g filter="url(#filter2_f_1112_784)">
        <circle cx="64.5923" cy="54.0259" r="44.0259" fill="#FAF6EA" />
      </g>
      <defs>
        <filter
          id="filter0_f_1112_784"
          x="0.699001"
          y="2.64724"
          width="106.654"
          height="106.654"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.6505"
            result="effect1_foregroundBlur_1112_784"
          />
        </filter>
        <filter
          id="filter1_f_1112_784"
          x="19.3015"
          y="2.64724"
          width="106.654"
          height="106.654"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.6505"
            result="effect1_foregroundBlur_1112_784"
          />
        </filter>
        <filter
          id="filter2_f_1112_784"
          x="11.2654"
          y="0.699001"
          width="106.654"
          height="106.654"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.6505"
            result="effect1_foregroundBlur_1112_784"
          />
        </filter>
      </defs>
    </svg>

    <div
      class="flex p-10 transition duration-500 hover:rotate-180 ease-[cubic-bezier(.24,-0.06,.51,1)] hover:translate-y-1"
    >
      <h3 class="logo-normal">a</h3>
      <h3 class="logo-special">l</h3>
      <h3 class="logo-normal">p</h3>
      <h3 class="logo-special">J</h3>
      <h3 class="logo-normal">o</h3>
      <h3 class="logo-normal">m</h3>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.logo-normal {
  @apply bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent font-bold text-4xl cursor-default;
}
.logo-special {
  @apply bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent font-bold text-4xl cursor-default translate-y-1;
}
</style>
