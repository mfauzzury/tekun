<script setup lang="ts">
import { ChevronRight, Construction } from "lucide-vue-next";
import { RouterLink } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";

defineProps<{
  title: string;
  breadcrumb?: { label: string; to?: string }[];
  description: string;
}>();
</script>

<template>
  <AdminLayout>
    <div class="mx-auto max-w-3xl">
      <!-- Breadcrumb -->
      <nav v-if="breadcrumb?.length" class="mb-4 flex items-center gap-1 text-sm text-slate-500">
        <RouterLink to="/admin" class="hover:text-slate-700">Laman Utama</RouterLink>
        <template v-for="(item, i) in breadcrumb" :key="i">
          <ChevronRight class="h-4 w-4 shrink-0 text-slate-300" />
          <RouterLink v-if="item.to" :to="item.to" class="hover:text-slate-700">{{ item.label }}</RouterLink>
          <span v-else class="text-slate-700">{{ item.label }}</span>
        </template>
      </nav>

      <!-- Card -->
      <div class="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
        <div class="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
          <Construction class="h-7 w-7 text-slate-500" />
        </div>
        <h1 class="mt-5 text-xl font-semibold text-slate-900">{{ title }}</h1>
        <p class="mt-2 text-slate-600">{{ description }}</p>
        <p class="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
          <Construction class="h-4 w-4" />
          Halaman akan dilaksanakan kemudian.
        </p>
      </div>
    </div>
  </AdminLayout>
</template>
