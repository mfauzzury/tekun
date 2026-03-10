<script setup lang="ts">
import { Construction } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
</script>

<template>
  <PortalLayout>
    <div class="mx-auto max-w-md py-12 text-center">
      <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Construction class="h-8 w-8 text-slate-500" />
      </div>
      <h1 class="mt-4 text-xl font-semibold text-slate-900">Daftar Akaun</h1>
      <p class="mt-2 text-sm text-slate-500">Pendaftaran ID (Nama, MyKad, Email, No. Telefon) akan dilaksanakan di sini.</p>
    </div>
  </PortalLayout>
</template>
