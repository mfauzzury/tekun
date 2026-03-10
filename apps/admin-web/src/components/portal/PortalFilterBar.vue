<script setup lang="ts">
import { Search } from "lucide-vue-next";

defineProps<{
  searchPlaceholder?: string;
  filterOptions?: { value: string; label: string }[];
  filterLabel?: string;
  q?: string;
  status?: string;
}>();

const emit = defineEmits<{
  "update:q": [value: string];
  "update:status": [value: string];
  filter: [];
}>();

function onQInput(e: Event) {
  emit("update:q", (e.target as HTMLInputElement).value);
}

function onStatusChange(e: Event) {
  emit("update:status", (e.target as HTMLSelectElement).value);
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <div class="relative">
      <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        :value="q ?? ''"
        :placeholder="searchPlaceholder ?? 'Cari...'"
        class="w-48 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 sm:w-56"
        @input="onQInput"
      />
    </div>
    <select
      v-if="filterOptions?.length"
      :value="status ?? ''"
      class="rounded-lg border border-slate-300 py-2 pl-3 pr-8 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
      @change="onStatusChange"
    >
      <option value="">{{ filterLabel ?? "Semua Status" }}</option>
      <option v-for="opt in filterOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <button
      class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
      @click="emit('filter')"
    >
      Tapis
    </button>
  </div>
</template>
