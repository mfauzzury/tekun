<script setup lang="ts">
import { ref, computed } from "vue";
import { Eye, FileCheck, FileUp, Plus } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalFilterBar from "@/components/portal/PortalFilterBar.vue";
import PortalPageHeader from "@/components/portal/PortalPageHeader.vue";
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
        p.produk.toLowerCase().includes(lower),
    );
  }
  if (status.value) {
    list = list.filter((p) => p.statusKey === status.value);
  }
  return list;
});

function statusClass(statusKey: string) {
  const map: Record<string, string> = {
    dalam_semakan: "bg-amber-50 text-amber-700",
    dokumen_tambahan: "bg-orange-50 text-orange-700",
    lulus: "bg-emerald-50 text-emerald-700",
    tidak_lulus: "bg-slate-50 text-slate-600",
    diterima: "bg-sky-50 text-sky-700",
  };
  return map[statusKey] ?? "bg-slate-50 text-slate-600";
}

function statusDot(statusKey: string) {
  const map: Record<string, string> = {
    dalam_semakan: "bg-amber-500",
    dokumen_tambahan: "bg-orange-500",
    lulus: "bg-emerald-500",
    tidak_lulus: "bg-slate-400",
    diterima: "bg-sky-500",
  };
  return map[statusKey] ?? "bg-slate-400";
}

function iconColor(statusKey: string) {
  const map: Record<string, string> = {
    dalam_semakan: "#FF9500",
    dokumen_tambahan: "#FF3B30",
    lulus: "#34C759",
    tidak_lulus: "#9CA3AF",
    diterima: "#007AFF",
  };
  return map[statusKey] ?? "#0A84FF";
}

function onFilter() {
  // Reactive via v-model
}
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between portal-reveal">
        <PortalPageHeader
          title="Permohonan Saya"
          subtitle="Semak status dan urus semua permohonan pembiayaan anda"
        />
        <router-link to="/portal/permohonan/baru" class="portal-btn-primary">
          <Plus class="h-4 w-4" />
          Permohonan Baru
        </router-link>
      </div>

      <section class="portal-surface overflow-hidden portal-reveal">
        <div class="flex flex-wrap items-center justify-between gap-4 px-5 py-4" style="border-bottom: 1px solid #F0F0F0">
          <h2 class="text-sm font-semibold tracking-wide" style="color: #111827">Senarai Permohonan</h2>
          <PortalFilterBar
            v-model:q="q"
            v-model:status="status"
            search-placeholder="Cari no. permohonan atau produk..."
            :filter-options="filterOptions"
            @filter="onFilter"
          />
        </div>

        <div style="border-color: #F0F0F0" class="divide-y">
          <article
            v-for="item in filteredItems"
            :key="item.id"
            class="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50/50 md:flex-row md:items-center md:justify-between"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex shrink-0 items-center justify-center"
                :style="{ width: '44px', height: '44px', borderRadius: '14px', border: `1.5px solid ${iconColor(item.statusKey)}40`, color: iconColor(item.statusKey) }"
              >
                <FileCheck class="h-5 w-5" />
              </div>
              <div class="min-w-0">
                <p class="font-mono text-sm font-semibold text-slate-900">{{ item.id }}</p>
                <p class="mt-1 text-sm text-slate-600">{{ item.produk }} · {{ item.jumlah }}</p>
                <p class="mt-1 text-xs text-slate-400">Dihantar pada {{ item.tarikh }}</p>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="portal-status-pill" :class="statusClass(item.statusKey)">
                <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(item.statusKey)" />
                {{ item.status }}
              </span>
              <button class="portal-btn-secondary !px-3 !py-2">
                <Eye class="h-4 w-4" />
                Lihat
              </button>
              <button
                v-if="item.statusKey === 'dokumen_tambahan'"
                class="portal-btn-primary !px-3 !py-2"
              >
                <FileUp class="h-4 w-4" />
                Muat Naik
              </button>
            </div>
          </article>
        </div>

        <div v-if="filteredItems.length === 0" class="p-5">
          <div class="portal-empty">
            Tiada permohonan dijumpai. Mulakan permohonan baharu untuk meneruskan proses.
          </div>
        </div>
      </section>
    </div>
  </PortalLayout>
</template>
