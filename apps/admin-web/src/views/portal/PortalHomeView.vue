<script setup lang="ts">
import { computed } from "vue";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock3,
  FileCheck,
  FilePlus,
  Files,
  HelpCircle,
  ListChecks,
  MessageCircle,
  TrendingUp,
  User,
} from "lucide-vue-next";

import PortalLayout from "@/layouts/PortalLayout.vue";
import { PERMOHONAN_DUMMY } from "@/data/portal-dummy";

const stats = [
  { label: "Jumlah Permohonan", value: 4, icon: Files, color: "#0A84FF", change: "+2 bulan ini" },
  { label: "Dalam Proses", value: 2, icon: Clock3, color: "#FF9500", change: "Sedang disemak" },
  { label: "Perlu Tindakan", value: 1, icon: AlertCircle, color: "#FF3B30", change: "Dokumen tambahan" },
  { label: "Diluluskan", value: 1, icon: CheckCircle2, color: "#34C759", change: "Sedia disbursement" },
];

const quickActions = [
  { label: "Permohonan Baru", desc: "Hantar permohonan pembiayaan", icon: FilePlus, to: "/portal/permohonan/baru", color: "#0A84FF" },
  { label: "Permohonan Saya", desc: "Semak status & tindakan", icon: ListChecks, to: "/portal/permohonan", color: "#34C759" },
  { label: "Temuduga", desc: "Jadual & keputusan", icon: Calendar, to: "/portal/temuduga", color: "#FF9500" },
  { label: "Bantuan", desc: "Soalan lazim & hubungi", icon: HelpCircle, to: "/portal/bantuan", color: "#6B7280" },
];

const recentPermohonan = computed(() => PERMOHONAN_DUMMY.slice(0, 4));

function statusStyle(statusKey: string) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    dalam_semakan: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    dokumen_tambahan: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
    lulus: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    tidak_lulus: { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" },
    diterima: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
  };
  return map[statusKey] ?? { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" };
}

const needsAction = computed(() =>
  PERMOHONAN_DUMMY.filter((p) => p.statusKey === "dokumen_tambahan"),
);

const progress = computed(() => {
  const total = PERMOHONAN_DUMMY.length;
  const done = PERMOHONAN_DUMMY.filter((p) => p.statusKey === "lulus").length;
  return total > 0 ? Math.round((done / total) * 100) : 0;
});
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <!-- Welcome Hero -->
      <section class="portal-hero portal-reveal">
        <div class="absolute -right-10 -top-10 h-44 w-44 rounded-full" style="background: rgba(255, 200, 0, 0.2); filter: blur(40px)" />
        <div class="absolute -bottom-6 -left-6 h-28 w-28 rounded-full" style="background: rgba(255, 165, 0, 0.15); filter: blur(30px)" />
        <div class="relative">
          <div class="flex items-center gap-2 text-sm font-semibold text-white/80">
            <User class="h-4 w-4" />
            Selamat datang, Ahmad
          </div>
          <h1 class="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            Dashboard Permohonan
          </h1>
          <p class="mt-2 max-w-lg text-sm text-white/80">
            Pantau status permohonan, lengkapkan dokumen, dan urus semua urusan pembiayaan anda di satu tempat.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <router-link
              to="/portal/permohonan/baru"
              class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#1A1A2E] transition hover:-translate-y-0.5"
            >
              <FilePlus class="h-4 w-4" />
              Permohonan Baru
            </router-link>
            <router-link
              to="/portal/permohonan"
              class="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/30 bg-white/15 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              <ListChecks class="h-4 w-4" />
              Semak Status
            </router-link>
          </div>
        </div>
      </section>

      <!-- Stats Cards -->
      <section class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 portal-stagger">
        <article
          v-for="(stat, i) in stats"
          :key="i"
          class="portal-stat-card group"
        >
          <div class="flex items-center justify-between">
            <div
              class="flex items-center justify-center"
              :style="{ width: '46px', height: '46px', borderRadius: '14px', border: `1.5px solid ${stat.color}40`, color: stat.color }"
            >
              <component :is="stat.icon" class="h-5 w-5" />
            </div>
            <TrendingUp class="h-4 w-4 text-slate-300 transition group-hover:text-slate-500" />
          </div>
          <p class="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl" style="color: #111827">{{ stat.value }}</p>
          <p class="mt-0.5 text-xs font-semibold" style="color: #6B7280">{{ stat.label }}</p>
          <p class="mt-1 text-[11px]" style="color: #9CA3AF">{{ stat.change }}</p>
        </article>
      </section>

      <!-- Alert Banner -->
      <div v-if="needsAction.length" class="portal-alert border-[#FF9500]/20 p-4 sm:p-5 portal-reveal" style="background: #FFF9F0">
        <div class="flex items-start gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center" style="border-radius: 14px; border: 1.5px solid rgba(255, 149, 0, 0.4); color: #FF9500">
            <AlertCircle class="h-5 w-5" />
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-bold" style="color: #111827">Tindakan Segera Diperlukan</h3>
            <p class="mt-1 text-sm" style="color: #6B7280">
              Permohonan <span class="font-mono font-semibold" style="color: #111827">{{ needsAction[0].id }}</span> memerlukan dokumen tambahan untuk diteruskan.
            </p>
            <router-link to="/portal/permohonan" class="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white transition" style="background: #1A1A2E">
              Muat Naik Dokumen
              <ArrowRight class="h-3.5 w-3.5" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <section class="portal-reveal">
        <h2 class="mb-4 text-[15px] font-bold" style="color: #111827">Akses Pantas</h2>
        <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <router-link
            v-for="action in quickActions"
            :key="action.label"
            :to="action.to"
            class="group relative overflow-hidden border bg-white p-5 transition hover:-translate-y-1"
            style="border-radius: 20px; border-color: #F0F0F0; box-shadow: 0 4px 12px 0 rgba(0,0,0,0.04)"
          >
            <div
              class="flex items-center justify-center"
              :style="{ width: '46px', height: '46px', borderRadius: '14px', border: `1.5px solid ${action.color}40`, color: action.color }"
            >
              <component :is="action.icon" class="h-5 w-5" />
            </div>
            <h3 class="mt-3 text-sm font-bold" style="color: #111827">{{ action.label }}</h3>
            <p class="mt-0.5 text-xs" style="color: #6B7280">{{ action.desc }}</p>
            <ArrowUpRight class="absolute right-3.5 top-3.5 h-4 w-4 transition" style="color: #D1D5DB" />
          </router-link>
        </div>
      </section>

      <!-- Two Column: Recent + Progress -->
      <div class="grid gap-4 lg:grid-cols-3">
        <!-- Recent Applications -->
        <section class="lg:col-span-2 portal-surface overflow-hidden portal-reveal">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom: 1px solid #F0F0F0">
            <div>
              <h3 class="text-sm font-bold" style="color: #111827">Permohonan Terkini</h3>
              <p class="text-xs" style="color: #9CA3AF">Senarai permohonan anda</p>
            </div>
            <router-link to="/portal/permohonan" class="inline-flex items-center gap-1 text-xs font-semibold" style="color: #0A84FF">
              Lihat semua
              <ArrowRight class="h-3.5 w-3.5" />
            </router-link>
          </div>
          <div>
            <router-link
              v-for="item in recentPermohonan"
              :key="item.id"
              to="/portal/permohonan"
              class="flex items-center justify-between px-5 py-3.5 transition hover:bg-[#FAFBFC]"
              style="border-bottom: 1px solid #F0F0F0"
            >
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center" style="width: 40px; height: 40px; border-radius: 12px; background: #0A84FF12; color: #0A84FF">
                  <FileCheck class="h-4 w-4" />
                </div>
                <div>
                  <p class="text-sm font-semibold" style="color: #111827">{{ item.id }}</p>
                  <p class="text-xs" style="color: #6B7280">{{ item.produk }} · {{ item.jumlah }}</p>
                </div>
              </div>
              <span
                class="portal-status-pill"
                :class="[statusStyle(item.statusKey).bg, statusStyle(item.statusKey).text]"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="statusStyle(item.statusKey).dot" />
                {{ item.status }}
              </span>
            </router-link>
          </div>
        </section>

        <!-- Progress Card -->
        <section class="portal-surface p-5 portal-reveal">
          <h3 class="text-sm font-bold" style="color: #111827">Kadar Kelulusan</h3>
          <p class="text-xs" style="color: #9CA3AF">Peratusan permohonan lulus</p>

          <div class="mt-6 flex items-center justify-center">
            <div class="relative flex h-32 w-32 items-center justify-center">
              <svg class="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#F0F0F0" stroke-width="8" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="url(#progress-gradient)"
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="`${progress * 3.267} 326.7`"
                  class="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#7B2FBE" />
                    <stop offset="100%" stop-color="#34C759" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="text-center">
                <p class="text-3xl font-extrabold" style="color: #111827">{{ progress }}%</p>
                <p class="text-[11px]" style="color: #9CA3AF">Lulus</p>
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-2.5">
            <div class="flex items-center justify-between text-xs">
              <span class="flex items-center gap-2" style="color: #6B7280">
                <span class="h-2 w-2 rounded-full" style="background: #34C759" /> Lulus
              </span>
              <span class="font-semibold" style="color: #111827">1</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="flex items-center gap-2" style="color: #6B7280">
                <span class="h-2 w-2 rounded-full" style="background: #FF9500" /> Dalam Proses
              </span>
              <span class="font-semibold" style="color: #111827">2</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="flex items-center gap-2" style="color: #6B7280">
                <span class="h-2 w-2 rounded-full" style="background: #9CA3AF" /> Tidak Lulus
              </span>
              <span class="font-semibold" style="color: #111827">1</span>
            </div>
          </div>

          <router-link
            to="/portal/profil"
            class="portal-btn-secondary mt-5 w-full justify-center text-xs"
          >
            <User class="h-3.5 w-3.5" />
            Lihat Profil
          </router-link>
        </section>
      </div>
    </div>
  </PortalLayout>
</template>
