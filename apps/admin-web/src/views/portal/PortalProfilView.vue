<script setup lang="ts">
import { ref } from "vue";
import { Check, Clock, FileUp, ShieldCheck } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalPageHeader from "@/components/portal/PortalPageHeader.vue";
import { PROFIL_USAHAWAN_DUMMY, DOKUMEN_CHECKLIST_DUMMY } from "@/data/portal-dummy";

const showEdit = ref(false);

function docStatusIcon(status: string) {
  if (status === "lengkap") return Check;
  if (status === "menunggu_semakan") return Clock;
  return FileUp;
}

function docStatusColor(status: string) {
  if (status === "lengkap") return "#34C759";
  if (status === "menunggu_semakan") return "#FF9500";
  return "#6B7280";
}

function docStatusClass(status: string) {
  if (status === "lengkap") return "bg-emerald-50 text-emerald-600";
  if (status === "menunggu_semakan") return "bg-amber-50 text-amber-600";
  return "bg-slate-50 text-slate-500";
}

function docStatusLabel(status: string) {
  if (status === "lengkap") return "Lengkap";
  if (status === "menunggu_semakan") return "Menunggu Semakan";
  return "Diperlukan";
}
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between portal-reveal">
        <PortalPageHeader
          title="Profil Usahawan"
          subtitle="Maklumat peribadi, perniagaan dan status dokumen anda"
        />
        <button class="portal-btn-secondary" @click="showEdit = !showEdit">
          {{ showEdit ? "Batal" : "Kemaskini Profil" }}
        </button>
      </div>

      <section class="grid gap-5 lg:grid-cols-3 portal-stagger">
        <article class="portal-surface-muted p-5 lg:col-span-1">
          <p class="text-xs font-semibold uppercase tracking-wide" style="color: #0A84FF">Ringkasan Profil</p>
          <h3 class="mt-2 text-lg font-bold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.nama }}</h3>
          <p class="text-sm text-slate-600">{{ PROFIL_USAHAWAN_DUMMY.perniagaan }}</p>
          <div class="mt-4 space-y-2 text-sm text-slate-700">
            <p><span class="font-semibold">No. KP:</span> {{ PROFIL_USAHAWAN_DUMMY.noKp }}</p>
            <p><span class="font-semibold">No. SSM:</span> {{ PROFIL_USAHAWAN_DUMMY.noSsm }}</p>
            <p><span class="font-semibold">Sektor:</span> {{ PROFIL_USAHAWAN_DUMMY.sektor }}</p>
          </div>
          <div class="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck class="h-3.5 w-3.5" />
            {{ PROFIL_USAHAWAN_DUMMY.statusSyariah }}
          </div>
        </article>

        <article class="portal-surface p-5 lg:col-span-2">
          <h2 class="text-base font-bold text-slate-900">Maklumat Peribadi</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p class="portal-label">Nama Penuh</p>
              <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.nama }}</p>
            </div>
            <div>
              <p class="portal-label">No. Kad Pengenalan</p>
              <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.noKp }}</p>
            </div>
            <div>
              <p class="portal-label">Email</p>
              <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.email }}</p>
            </div>
            <div>
              <p class="portal-label">No. Telefon</p>
              <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.telefon }}</p>
            </div>
            <div class="sm:col-span-2">
              <p class="portal-label">Alamat</p>
              <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.alamat }}</p>
            </div>
          </div>
        </article>
      </section>

      <section class="portal-surface p-5 portal-reveal">
        <h2 class="text-base font-bold text-slate-900">Maklumat Perniagaan</h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p class="portal-label">Nama Perniagaan</p>
            <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.perniagaan }}</p>
          </div>
          <div>
            <p class="portal-label">No. SSM</p>
            <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.noSsm }}</p>
          </div>
          <div>
            <p class="portal-label">Sektor</p>
            <p class="font-semibold text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.sektor }}</p>
          </div>
          <div>
            <p class="portal-label">Status Syariah</p>
            <span class="portal-status-pill bg-emerald-100 text-emerald-700">{{ PROFIL_USAHAWAN_DUMMY.statusSyariah }}</span>
          </div>
        </div>
      </section>

      <section class="portal-surface overflow-hidden portal-reveal">
        <div class="px-5 py-4" style="border-bottom: 1px solid #F0F0F0">
          <h2 class="text-base font-bold" style="color: #111827">Checklist Dokumen</h2>
          <p class="text-sm" style="color: #9CA3AF">Status dokumen untuk permohonan terkini</p>
        </div>
        <div class="divide-y" style="border-color: #F0F0F0">
          <div
            v-for="doc in DOKUMEN_CHECKLIST_DUMMY"
            :key="doc.id"
            class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-slate-50/50"
          >
            <div class="flex min-w-0 items-center gap-3">
              <div
                class="flex items-center justify-center"
                :style="{ width: '44px', height: '44px', borderRadius: '14px', border: `1.5px solid ${docStatusColor(doc.status)}40`, color: docStatusColor(doc.status) }"
              >
                <component :is="docStatusIcon(doc.status)" class="h-4 w-4" />
              </div>
              <div>
                <p class="font-semibold text-slate-900">{{ doc.nama }}</p>
                <p v-if="doc.tarikh" class="text-xs text-slate-500">Muat naik: {{ doc.tarikh }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="portal-status-pill" :class="docStatusClass(doc.status)">
                {{ docStatusLabel(doc.status) }}
              </span>
              <button
                v-if="doc.status === 'diperlukan'"
                class="portal-btn-primary !px-3 !py-2"
              >
                Muat Naik
              </button>
              <button
                v-else-if="doc.status === 'lengkap'"
                class="portal-btn-secondary !px-3 !py-2"
              >
                Ganti
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PortalLayout>
</template>
