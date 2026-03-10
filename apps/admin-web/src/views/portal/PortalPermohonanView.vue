<script setup lang="ts">
import { ref, computed } from "vue";
import { Eye, FileUp, Plus } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalFilterBar from "@/components/portal/PortalFilterBar.vue";
import { PERMOHONAN_DUMMY, STATUS_OPTIONS } from "@/data/portal-dummy";

const q = ref("");
const status = ref("");

const filterOptions = STATUS_OPTIONS.filter((o) => o.value !== "semua");

const filteredItems = computed(() => {
  let list = [...PERMOHONAN_DUMMY];
  if (q.value) {
    const lower = q.value.toLowerCase();
    list = list.filter(
      (p) =>
        p.id.toLowerCase().includes(lower) ||
        p.produk.toLowerCase().includes(lower)
    );
  }
  if (status.value) {
    list = list.filter((p) => p.statusKey === status.value);
  }
  return list;
});

function statusClass(statusKey: string) {
  const map: Record<string, string> = {
    dalam_semakan: "bg-amber-100 text-amber-700",
    dokumen_tambahan: "bg-orange-100 text-orange-700",
    lulus: "bg-emerald-100 text-emerald-700",
    tidak_lulus: "bg-slate-100 text-slate-600",
    diterima: "bg-blue-100 text-blue-700",
  };
  return map[statusKey] ?? "bg-slate-100 text-slate-600";
}

function onFilter() {
  // Filter is reactive via v-model
}
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Permohonan Saya</h1>
          <p class="mt-1 text-slate-600">Semak status dan urus permohonan pembiayaan anda</p>
        </div>
        <router-link
          to="/portal/permohonan/baru"
          class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          <Plus class="h-4 w-4" />
          Permohonan Baru
        </router-link>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-4 py-4">
          <h2 class="text-sm font-semibold text-slate-900">Senarai Permohonan</h2>
          <PortalFilterBar
            v-model:q="q"
            v-model:status="status"
            search-placeholder="Cari no. permohonan atau produk..."
            :filter-options="filterOptions"
            @filter="onFilter"
          />
        </div>

        <div class="overflow-x-auto">
          <div class="min-w-[600px]">
            <div
              v-for="item in filteredItems"
              :key="item.id"
              class="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0"
            >
              <div class="flex-1 min-w-0">
                <p class="font-mono text-sm font-semibold text-slate-900">{{ item.id }}</p>
                <p class="mt-0.5 text-sm text-slate-500">{{ item.produk }} · {{ item.jumlah }}</p>
                <p class="mt-1 text-xs text-slate-400">{{ item.tarikh }}</p>
              </div>
              <span
                class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                :class="statusClass(item.statusKey)"
              >
                {{ item.status }}
              </span>
              <div class="flex shrink-0 items-center gap-2">
                <button
                  class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  <Eye class="h-4 w-4" />
                  Lihat
                </button>
                <button
                  v-if="item.statusKey === 'dokumen_tambahan'"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  <FileUp class="h-4 w-4" />
                  Muat Naik
                </button>
              </div>
            </div>

            <div
              v-if="filteredItems.length === 0"
              class="px-4 py-12 text-center text-sm text-slate-500"
            >
              Tiada permohonan dijumpai. Mulakan permohonan baharu.
            </div>
          </div>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>
