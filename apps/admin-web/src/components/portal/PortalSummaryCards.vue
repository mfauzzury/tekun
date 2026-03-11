<script setup lang="ts">
import type { Component } from "vue";
import { TrendingUp } from "lucide-vue-next";

type Tone = "blue" | "sky" | "amber" | "emerald" | "slate";

const props = defineProps<{
  items: { label: string; value: string | number; helper?: string; icon?: Component; tone?: Tone }[];
}>();

function toneColor(tone: Tone = "blue") {
  const map: Record<Tone, string> = {
    blue: "#0A84FF",
    sky: "#007AFF",
    amber: "#FF9500",
    emerald: "#34C759",
    slate: "#6B7280",
  };
  return map[tone];
}
</script>

<template>
  <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 portal-stagger">
    <article
      v-for="(item, i) in props.items"
      :key="i"
      class="portal-stat-card group"
    >
      <div class="flex items-center justify-between">
        <div
          v-if="item.icon"
          class="flex items-center justify-center"
          :style="{ width: '46px', height: '46px', borderRadius: '14px', border: `1.5px solid ${toneColor(item.tone)}40`, color: toneColor(item.tone) }"
        >
          <component :is="item.icon" class="h-5 w-5" />
        </div>
        <TrendingUp class="h-4 w-4 transition group-hover:text-slate-500" style="color: #D1D5DB" />
      </div>
      <p class="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl" style="color: #111827">{{ item.value }}</p>
      <p class="mt-0.5 text-xs font-semibold" style="color: #6B7280">{{ item.label }}</p>
      <p v-if="item.helper" class="mt-1 text-[11px]" style="color: #9CA3AF">{{ item.helper }}</p>
    </article>
  </div>
</template>
