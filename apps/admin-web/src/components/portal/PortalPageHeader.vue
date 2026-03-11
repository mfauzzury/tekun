<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import { RouterLink } from "vue-router";

defineProps<{
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
}>();
</script>

<template>
  <div class="space-y-2 portal-reveal">
    <nav v-if="breadcrumb?.length" class="flex flex-wrap items-center gap-1 text-sm text-slate-500">
      <RouterLink to="/portal" class="font-medium hover:text-slate-700">Laman Utama</RouterLink>
      <template v-for="(item, i) in breadcrumb" :key="i">
        <ChevronRight class="h-4 w-4 shrink-0 text-slate-300" />
        <RouterLink v-if="item.to" :to="item.to" class="hover:text-slate-700">{{ item.label }}</RouterLink>
        <span v-else class="font-semibold text-slate-700">{{ item.label }}</span>
      </template>
    </nav>
    <h1 class="portal-page-title">{{ title }}</h1>
    <p v-if="subtitle" class="portal-page-subtitle">{{ subtitle }}</p>
  </div>
</template>
