<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Construction } from "lucide-vue-next";

import AdminLayout from "@/layouts/AdminLayout.vue";

const route = useRoute();
const title = computed(() => (route.meta.title as string) || "Modul");
</script>

<template>
  <AdminLayout>
    <div class="mx-auto max-w-2xl py-12 text-center">
      <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Construction class="h-8 w-8 text-slate-500" />
      </div>
      <h1 class="mt-4 text-xl font-semibold text-slate-900">{{ title }}</h1>
      <p class="mt-2 text-sm text-slate-500">Halaman akan dilaksanakan kemudian.</p>
    </div>
  </AdminLayout>
</template>
