<script setup lang="ts">
import { ref, computed } from "vue";
import { Calendar, ChevronRight, MapPin, Video } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalFilterBar from "@/components/portal/PortalFilterBar.vue";
import PortalPageHeader from "@/components/portal/PortalPageHeader.vue";
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
        t.lokasi.toLowerCase().includes(lower),
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
  if (s === "Dijadualkan") return "bg-emerald-50 text-emerald-700";
  if (s === "Menunggu Pengesahan") return "bg-amber-50 text-amber-700";
  if (s === "Selesai") return "bg-slate-50 text-slate-600";
  return "bg-slate-50 text-slate-600";
}

function statusDot(s: string) {
  if (s === "Dijadualkan") return "bg-emerald-500";
  if (s === "Menunggu Pengesahan") return "bg-amber-500";
  return "bg-slate-400";
}
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between portal-reveal">
        <PortalPageHeader
          title="Temuduga"
          subtitle="Pilih slot, semak jadual, dan urus temuduga permohonan anda"
        />
        <button class="portal-btn-primary">
          <Calendar class="h-4 w-4" />
          Pilih Slot Temuduga
        </button>
      </div>

      <section class="portal-surface overflow-hidden portal-reveal">
        <div class="flex flex-wrap items-center justify-between gap-4 px-5 py-4" style="border-bottom: 1px solid #F0F0F0">
          <h2 class="text-sm font-semibold tracking-wide" style="color: #111827">Senarai Temuduga</h2>
          <PortalFilterBar
            v-model:q="q"
            v-model:status="status"
            search-placeholder="Cari no. permohonan atau lokasi..."
            :filter-options="filterOptions"
            filter-label="Semua Status"
            @filter="() => {}"
          />
        </div>

        <div class="divide-y" style="border-color: #F0F0F0">
          <article
            v-for="item in filteredItems"
            :key="item.id"
            class="flex flex-col gap-4 px-5 py-4 transition hover:bg-[#FAFBFC] md:flex-row md:items-center md:justify-between"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex shrink-0 items-center justify-center"
                :style="item.jenis === 'Maya' ? 'width:44px;height:44px;border-radius:14px;border:1.5px solid #007AFF40;color:#007AFF' : 'width:44px;height:44px;border-radius:14px;border:1.5px solid #0A84FF40;color:#0A84FF'"
              >
                <Video v-if="item.jenis === 'Maya'" class="h-5 w-5" />
                <MapPin v-else class="h-5 w-5" />
              </div>
              <div>
                <p class="font-mono text-sm font-semibold text-slate-900">{{ item.permohonanId }}</p>
                <p class="mt-1 text-sm text-slate-700">{{ item.tarikh }} · {{ item.masa }}</p>
                <p class="mt-1 text-sm text-slate-500">{{ item.lokasi }}</p>
                <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{{ item.jenis }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="portal-status-pill" :class="statusClass(item.status)">
                <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(item.status)" />
                {{ item.status }}
              </span>
              <button
                v-if="item.status !== 'Selesai'"
                class="portal-btn-secondary !px-3 !py-2"
              >
                Tukar Tarikh
                <ChevronRight class="h-4 w-4" />
              </button>
            </div>
          </article>

          <div v-if="filteredItems.length === 0" class="p-5">
            <div class="portal-empty">Tiada temuduga dijumpai.</div>
          </div>
        </div>
      </section>
    </div>
  </PortalLayout>
</template>
