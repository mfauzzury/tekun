<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import { RouterLink } from "vue-router";

defineProps<{
  title: string;
  breadcrumb?: { label: string; to?: string }[];
}>();
</script>

<template>
  <div class="space-y-2">
    <nav v-if="breadcrumb?.length" class="flex items-center gap-1 text-sm text-slate-500">
      <RouterLink to="/portal" class="hover:text-slate-700">Laman Utama</RouterLink>
      <template v-for="(item, i) in breadcrumb" :key="i">
        <ChevronRight class="h-4 w-4 shrink-0 text-slate-300" />
        <RouterLink v-if="item.to" :to="item.to" class="hover:text-slate-700">{{ item.label }}</RouterLink>
        <span v-else class="font-medium text-slate-700">{{ item.label }}</span>
      </template>
    </nav>
    <h1 class="text-xl font-bold text-slate-900">{{ title }}</h1>
  </div>
</template>
