<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Bell, LogOut, User } from "lucide-vue-next";
import { PORTAL_MENU } from "@/config/portal-menu";

const route = useRoute();

function isActive(to: string): boolean {
  if (to === "/portal") return route.path === "/portal";
  return route.path.startsWith(to);
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <router-link to="/portal" class="flex items-center gap-2">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <span class="text-lg font-bold">T</span>
          </div>
          <div>
            <p class="font-semibold text-slate-900">Portal SPPT</p>
            <p class="text-xs text-slate-500">Pemohon Pembiayaan TEKUN</p>
          </div>
        </router-link>

        <nav class="hidden items-center gap-1 md:flex">
          <router-link
            v-for="item in PORTAL_MENU"
            :key="item.id"
            :to="item.to"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            :class="isActive(item.to)
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </router-link>
        </nav>

        <div class="flex items-center gap-2">
          <button
            class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            title="Notifikasi"
          >
            <Bell class="h-5 w-5" />
          </button>
          <router-link
            to="/portal/profil"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            <User class="h-4 w-4" />
            <span class="hidden sm:inline">Profil</span>
          </router-link>
          <router-link
            to="/admin"
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Staff
          </router-link>
          <router-link
            to="/portal/login"
            class="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            title="Log keluar"
          >
            <LogOut class="h-4 w-4" />
            <span class="hidden sm:inline">Log Keluar</span>
          </router-link>
        </div>
      </div>

      <!-- Mobile menu -->
      <div class="border-t border-slate-100 px-4 py-2 md:hidden">
        <div class="flex flex-wrap gap-1">
          <router-link
            v-for="item in PORTAL_MENU"
            :key="item.id"
            :to="item.to"
            class="rounded-lg px-3 py-2 text-sm font-medium"
            :class="isActive(item.to) ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600'"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </main>
  </div>
</template>
