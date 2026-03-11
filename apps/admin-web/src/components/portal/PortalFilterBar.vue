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
  <div class="flex flex-wrap items-center gap-2 sm:gap-3">
    <div class="relative">
      <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        :value="q ?? ''"
        :placeholder="searchPlaceholder ?? 'Cari...'"
        class="portal-input w-56 pl-9 sm:w-64"
        @input="onQInput"
      />
    </div>
    <select
      v-if="filterOptions?.length"
      :value="status ?? ''"
      class="portal-input w-44"
      @change="onStatusChange"
    >
      <option value="">{{ filterLabel ?? "Semua Status" }}</option>
      <option v-for="opt in filterOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <button class="portal-btn-primary" @click="emit('filter')">
      Tapis
    </button>
  </div>
</template>
