<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Bell, Home, LogOut, Menu, User, X } from "lucide-vue-next";
import { PORTAL_MENU } from "@/config/portal-menu";

const route = useRoute();
const mobileOpen = ref(false);

function isActive(to: string): boolean {
  if (to === "/portal") return route.path === "/portal";
  // Exact match for leaf routes to avoid /portal/permohonan matching /portal/permohonan/baru
  if (to === "/portal/permohonan") return route.path === "/portal/permohonan";
  return route.path.startsWith(to);
}
</script>

<template>
  <div class="portal-app min-h-screen">
    <!-- Bold gradient header -->
    <header class="portal-header-bold">
      <div class="portal-container flex items-center justify-between gap-4 py-4">
        <!-- Brand -->
        <router-link to="/portal" class="flex items-center gap-3">
          <div class="portal-brand-mark-bold">T</div>
          <div>
            <p class="text-base font-extrabold tracking-tight text-white">Portal SPPT</p>
            <p class="text-[11px] font-medium text-white/70">Pemohon Pembiayaan TEKUN</p>
          </div>
        </router-link>

        <!-- Desktop actions -->
        <div class="hidden items-center gap-2.5 md:flex">
          <button
            class="flex items-center justify-center rounded-full bg-white/15 p-2.5 text-white/90 transition hover:bg-white/25"
            title="Notifikasi"
          >
            <Bell class="h-[18px] w-[18px]" />
          </button>
          <router-link
            to="/portal/profil"
            class="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/25"
          >
            <User class="h-4 w-4" />
            Profil
          </router-link>
          <router-link
            to="/portal/login"
            class="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold transition hover:bg-white/90"
            style="color: #1A1A2E"
            title="Log keluar"
          >
            <LogOut class="h-4 w-4" />
            Keluar
          </router-link>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="flex items-center justify-center rounded-xl bg-white/15 p-2.5 text-white md:hidden"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>

      <!-- Nav strip -->
      <div class="portal-container border-t border-white/15 pb-3 pt-2.5">
        <nav class="portal-nav-strip-bold">
          <router-link
            to="/portal"
            class="portal-nav-pill"
            :class="route.path === '/portal' ? 'portal-nav-pill-active' : 'portal-nav-pill-idle'"
          >
            <Home class="h-4 w-4" />
            Utama
          </router-link>
          <router-link
            v-for="item in PORTAL_MENU"
            :key="item.id"
            :to="item.to"
            class="portal-nav-pill"
            :class="isActive(item.to) ? 'portal-nav-pill-active' : 'portal-nav-pill-idle'"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Mobile slide menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="fixed inset-0 z-50 md:hidden" @click.self="mobileOpen = false">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="mobileOpen = false" />
        <nav class="relative ml-auto flex h-full w-72 flex-col bg-white shadow-2xl">
          <div class="flex items-center justify-between border-b px-5 py-4">
            <p class="text-base font-extrabold text-slate-900">Menu</p>
            <button class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" @click="mobileOpen = false">
              <X class="h-5 w-5" />
            </button>
          </div>
          <div class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            <router-link
              to="/portal"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition"
              :class="route.path === '/portal' ? 'bg-[#FAFBFC] text-[#1A1A2E]' : 'text-slate-700 hover:bg-slate-50'"
              @click="mobileOpen = false"
            >
              <Home class="h-5 w-5" />
              Utama
            </router-link>
            <router-link
              v-for="item in PORTAL_MENU"
              :key="item.id"
              :to="item.to"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition"
              :class="isActive(item.to) ? 'bg-[#FAFBFC] text-[#1A1A2E]' : 'text-slate-700 hover:bg-slate-50'"
              @click="mobileOpen = false"
            >
              <component :is="item.icon" class="h-5 w-5" />
              {{ item.label }}
            </router-link>
          </div>
          <div class="border-t px-3 py-4 space-y-2">
            <router-link
              to="/portal/profil"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="mobileOpen = false"
            >
              <User class="h-5 w-5" />
              Profil
            </router-link>
            <router-link
              to="/portal/login"
              class="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
              @click="mobileOpen = false"
            >
              <LogOut class="h-5 w-5" />
              Log Keluar
            </router-link>
          </div>
        </nav>
      </div>
    </Transition>

    <main class="portal-container py-6 sm:py-8">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-active > nav,
.slide-leave-active > nav {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-from > nav,
.slide-leave-to > nav {
  transform: translateX(100%);
}
</style>
