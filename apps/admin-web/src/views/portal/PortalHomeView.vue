<script setup lang="ts">
import { computed } from "vue";
import { FilePlus, ListChecks, AlertCircle, CheckCircle } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalSummaryCards from "@/components/portal/PortalSummaryCards.vue";
import { PERMOHONAN_DUMMY } from "@/data/portal-dummy";

const summary = [
  { label: "Jumlah Permohonan", value: 4 },
  { label: "Dalam Proses", value: 2 },
  { label: "Menunggu Tindakan", value: 1 },
  { label: "Lulus", value: 1 },
];

const recentPermohonan = computed(() => PERMOHONAN_DUMMY.slice(0, 3));

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

const needsAction = computed(() =>
  PERMOHONAN_DUMMY.filter((p) => p.statusKey === "dokumen_tambahan")
);
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Selamat datang ke Portal SPPT</h1>
        <p class="mt-1 text-slate-600">Portal pemohon untuk pembiayaan TEKUN Nasional</p>
      </div>

      <PortalSummaryCards :items="summary" />

      <div v-if="needsAction.length" class="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div class="flex items-start gap-3">
          <AlertCircle class="h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h3 class="font-semibold text-amber-900">Tindakan Diperlukan</h3>
            <p class="mt-1 text-sm text-amber-800">
              Permohonan {{ needsAction[0].id }} memerlukan dokumen tambahan. Sila muat naik dokumen yang diminta.
            </p>
            <router-link
              to="/portal/permohonan"
              class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
            >
              Lihat Permohonan
              <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <router-link
          to="/portal/permohonan/baru"
          class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
            <FilePlus class="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h2 class="font-semibold text-slate-900">Permohonan Baru</h2>
            <p class="text-sm text-slate-500">Hantar permohonan pembiayaan baharu</p>
          </div>
        </router-link>

        <router-link
          to="/portal/permohonan"
          class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <ListChecks class="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 class="font-semibold text-slate-900">Permohonan Saya</h2>
            <p class="text-sm text-slate-500">Semak status permohonan anda</p>
          </div>
        </router-link>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-4 py-3">
          <h3 class="font-semibold text-slate-900">Permohonan Terkini</h3>
          <p class="text-sm text-slate-500">Senarai permohonan anda yang paling baru</p>
        </div>
        <div class="divide-y divide-slate-100">
          <router-link
            v-for="item in recentPermohonan"
            :key="item.id"
            to="/portal/permohonan"
            class="flex items-center justify-between px-4 py-3 transition-colors hover:bg-slate-50"
          >
            <div class="flex items-center gap-3">
              <CheckCircle v-if="item.statusKey === 'lulus'" class="h-5 w-5 text-emerald-500" />
              <div v-else class="h-5 w-5" />
              <div>
                <p class="font-mono text-sm font-medium text-slate-900">{{ item.id }}</p>
                <p class="text-xs text-slate-500">{{ item.produk }} · {{ item.jumlah }}</p>
              </div>
            </div>
            <span
              class="rounded-full px-2.5 py-0.5 text-xs font-medium"
              :class="statusClass(item.statusKey)"
            >
              {{ item.status }}
            </span>
          </router-link>
        </div>
        <div class="border-t border-slate-100 px-4 py-3">
          <router-link
            to="/portal/permohonan"
            class="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Lihat semua permohonan →
          </router-link>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>
