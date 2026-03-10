<script setup lang="ts">
import { ref, computed } from "vue";
import { Calendar, Video, MapPin, ChevronRight } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalFilterBar from "@/components/portal/PortalFilterBar.vue";
import { TEMUDUGA_DUMMY } from "@/data/portal-dummy";

const q = ref("");
const status = ref("");

const filterOptions = [
  { value: "dijadualkan", label: "Dijadualkan" },
  { value: "menunggu", label: "Menunggu Pengesahan" },
  { value: "selesai", label: "Selesai" },
];

const filteredItems = computed(() => {
  let list = [...TEMUDUGA_DUMMY];
  if (q.value) {
    const lower = q.value.toLowerCase();
    list = list.filter(
      (t) =>
        t.permohonanId.toLowerCase().includes(lower) ||
        t.lokasi.toLowerCase().includes(lower)
    );
  }
  if (status.value) {
    list = list.filter((t) => {
      if (status.value === "dijadualkan") return t.status === "Dijadualkan";
      if (status.value === "menunggu") return t.status === "Menunggu Pengesahan";
      if (status.value === "selesai") return t.status === "Selesai";
      return true;
    });
  }
  return list;
});

function statusClass(s: string) {
  if (s === "Dijadualkan") return "bg-emerald-100 text-emerald-700";
  if (s === "Menunggu Pengesahan") return "bg-amber-100 text-amber-700";
  if (s === "Selesai") return "bg-slate-100 text-slate-600";
  return "bg-slate-100 text-slate-600";
}
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Temuduga</h1>
          <p class="mt-1 text-slate-600">Jadual dan urus temuduga permohonan anda</p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
        >
          <Calendar class="h-4 w-4" />
          Pilih Slot Temuduga
        </button>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-4 py-4">
          <h2 class="text-sm font-semibold text-slate-900">Senarai Temuduga</h2>
          <PortalFilterBar
            v-model:q="q"
            v-model:status="status"
            search-placeholder="Cari no. permohonan..."
            :filter-options="filterOptions"
            filter-label="Status"
            @filter="() => {}"
          />
        </div>

        <div class="divide-y divide-slate-100">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex flex-1 items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                :class="item.jenis === 'Maya' ? 'bg-blue-100' : 'bg-emerald-100'"
              >
                <Video v-if="item.jenis === 'Maya'" class="h-6 w-6 text-blue-600" />
                <MapPin v-else class="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p class="font-mono text-sm font-semibold text-slate-900">{{ item.permohonanId }}</p>
                <p class="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <Calendar class="h-4 w-4" />
                  {{ item.tarikh }} · {{ item.masa }}
                </p>
                <p class="mt-1 text-sm text-slate-500">{{ item.lokasi }}</p>
                <span class="mt-2 inline-block text-xs text-slate-400">{{ item.jenis }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="rounded-full px-2.5 py-1 text-xs font-medium"
                :class="statusClass(item.status)"
              >
                {{ item.status }}
              </span>
              <button
                v-if="item.status !== 'Selesai'"
                class="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Tukar Tarikh
                <ChevronRight class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            v-if="filteredItems.length === 0"
            class="px-4 py-12 text-center text-sm text-slate-500"
          >
            Tiada temuduga dijumpai.
          </div>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>
