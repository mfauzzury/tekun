<script setup lang="ts">
import { ref } from "vue";
import { Check, Clock, FileUp } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import { PROFIL_USAHAWAN_DUMMY, DOKUMEN_CHECKLIST_DUMMY } from "@/data/portal-dummy";

const showEdit = ref(false);

function docStatusIcon(status: string) {
  if (status === "lengkap") return Check;
  if (status === "menunggu_semakan") return Clock;
  return FileUp;
}

function docStatusClass(status: string) {
  if (status === "lengkap") return "bg-emerald-100 text-emerald-700";
  if (status === "menunggu_semakan") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-600";
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
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Profil Usahawan</h1>
          <p class="mt-1 text-slate-600">Maklumat anda dan status permohonan</p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          @click="showEdit = !showEdit"
        >
          {{ showEdit ? "Batal" : "Kemaskini Profil" }}
        </button>
      </div>

      <!-- Maklumat Peribadi -->
      <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-4 py-3">
          <h2 class="font-semibold text-slate-900">Maklumat Peribadi</h2>
        </div>
        <div class="grid gap-4 p-4 sm:grid-cols-2">
          <div>
            <p class="text-xs font-medium text-slate-500">Nama Penuh</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.nama }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">No. Kad Pengenalan</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.noKp }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Email</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.email }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">No. Telefon</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.telefon }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-xs font-medium text-slate-500">Alamat</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.alamat }}</p>
          </div>
        </div>
      </div>

      <!-- Maklumat Perniagaan -->
      <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-4 py-3">
          <h2 class="font-semibold text-slate-900">Maklumat Perniagaan</h2>
        </div>
        <div class="grid gap-4 p-4 sm:grid-cols-2">
          <div>
            <p class="text-xs font-medium text-slate-500">Nama Perniagaan</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.perniagaan }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">No. SSM</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.noSsm }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Sektor</p>
            <p class="mt-1 font-medium text-slate-900">{{ PROFIL_USAHAWAN_DUMMY.sektor }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-slate-500">Status Syariah</p>
            <span class="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              {{ PROFIL_USAHAWAN_DUMMY.statusSyariah }}
            </span>
          </div>
        </div>
      </div>

      <!-- Checklist Dokumen -->
      <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-4 py-3">
          <h2 class="font-semibold text-slate-900">Checklist Dokumen</h2>
          <p class="text-sm text-slate-500">Status dokumen untuk permohonan terkini</p>
        </div>
        <div class="divide-y divide-slate-100">
          <div
            v-for="doc in DOKUMEN_CHECKLIST_DUMMY"
            :key="doc.id"
            class="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg"
                :class="docStatusClass(doc.status)"
              >
                <component :is="docStatusIcon(doc.status)" class="h-4 w-4" />
              </div>
              <div>
                <p class="font-medium text-slate-900">{{ doc.nama }}</p>
                <p v-if="doc.tarikh" class="text-xs text-slate-500">Muat naik: {{ doc.tarikh }}</p>
              </div>
            </div>
            <span
              class="rounded-full px-2.5 py-1 text-xs font-medium"
              :class="docStatusClass(doc.status)"
            >
              {{ docStatusLabel(doc.status) }}
            </span>
            <button
              v-if="doc.status === 'diperlukan'"
              class="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
            >
              Muat Naik
            </button>
            <button
              v-else-if="doc.status === 'lengkap'"
              class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Ganti
            </button>
          </div>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>
