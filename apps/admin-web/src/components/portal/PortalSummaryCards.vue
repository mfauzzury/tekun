<script setup lang="ts">
defineProps<{
  items: { label: string; value: string | number; icon?: string }[];
}>();
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <article
      v-for="(item, i) in items"
      :key="i"
      class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <p class="text-sm font-medium text-slate-500">{{ item.label }}</p>
      <p class="mt-2 text-2xl font-bold text-slate-900">{{ item.value }}</p>
    </article>
  </div>
</template>
