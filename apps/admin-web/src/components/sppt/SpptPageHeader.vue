<script setup lang="ts">
import { ChevronRight, Plus } from "lucide-vue-next";
import { RouterLink } from "vue-router";

defineProps<{
  title: string;
  breadcrumb?: { label: string; to?: string }[];
  actionLabel?: string;
  actionTo?: string;
}>();
</script>

<template>
  <div class="space-y-2">
    <nav v-if="breadcrumb?.length" class="flex items-center gap-1 text-sm text-slate-500">
      <RouterLink to="/admin" class="hover:text-slate-700">Laman Utama</RouterLink>
      <template v-for="(item, i) in breadcrumb" :key="i">
        <ChevronRight class="h-4 w-4 shrink-0 text-slate-300" />
        <RouterLink v-if="item.to" :to="item.to" class="hover:text-slate-700">{{ item.label }}</RouterLink>
        <span v-else class="font-medium text-slate-700">{{ item.label }}</span>
      </template>
    </nav>
    <div class="flex items-center justify-between">
      <h1 class="page-title">{{ title }}</h1>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
      <RouterLink
        v-else-if="actionLabel && actionTo"
        :to="actionTo"
        class="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
      >
        <Plus class="h-4 w-4" />
        {{ actionLabel }}
      </RouterLink>
    </div>
  </div>
</template>
