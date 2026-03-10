<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowRight, AlertCircle, Eye, EyeOff, Mail, Lock, Check } from "lucide-vue-next";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const showPassword = ref(false);
const lang = ref<"BM" | "EN">("BM");

async function submit() {
  error.value = "";
  if (!email.value.trim() || !password.value.trim()) {
    error.value = "Sila masukkan email dan kata laluan.";
    return;
  }

  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/portal");
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Log masuk gagal.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/login-bg.png')"
    />

    <!-- Language switcher - top right -->
    <div class="absolute right-6 top-6 z-10">
      <div class="flex items-center rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 shadow-sm">
        <button
          type="button"
          class="px-2 text-sm font-medium transition-colors"
          :class="lang === 'BM' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'"
          @click="lang = 'BM'"
        >
          BM
        </button>
        <span class="h-4 w-px bg-slate-200" />
        <button
          type="button"
          class="px-2 text-sm font-medium transition-colors"
          :class="lang === 'EN' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'"
          @click="lang = 'EN'"
        >
          EN
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <!-- Logo & title - centered above card -->
      <div class="mb-6 flex flex-col items-center">
        <router-link to="/portal" class="flex items-center gap-3">
          <img src="/logo.png" alt="TEKUN SPPT" class="h-12 w-12 rounded-lg object-contain shadow-md" />
          <div class="text-left">
            <p class="text-xl font-bold text-slate-800">TEKUN SPPT</p>
            <p class="text-sm text-slate-600">Portal Pemohon Pembiayaan TEKUN</p>
          </div>
        </router-link>
      </div>

      <!-- Login card -->
      <div class="w-full max-w-[600px] rounded-2xl border border-slate-100 bg-white px-10 py-8 shadow-xl">
        <h1 class="text-center text-2xl font-bold text-slate-800">
          Log Masuk Akaun
        </h1>
        <p class="mt-2 text-center text-sm text-slate-600">
          Sila log masuk untuk membuat atau menyemak permohonan pembiayaan anda.
        </p>

        <form class="mt-8 space-y-5" @submit.prevent="submit">
          <div class="space-y-1.5">
            <label class="text-sm font-medium text-slate-700">Email</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="email"
                type="email"
                class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="Ahmad@example.com"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-medium text-slate-700">Kata Laluan</label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="••••••••••"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div v-if="error" class="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle class="h-4 w-4 shrink-0" />
            {{ error }}
          </div>

          <button
            type="submit"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-teal-700 disabled:opacity-60"
            :disabled="loading"
          >
            {{ loading ? "Memproses..." : "Log Masuk" }}
            <ArrowRight v-if="!loading" class="h-5 w-5" />
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-600">
          Belum mempunyai akaun?
          <router-link
            to="/portal/daftar"
            class="ml-1 font-medium text-teal-600 underline hover:text-teal-700"
          >
            Daftar Akaun &gt;
          </router-link>
        </p>

        <!-- Feature highlights -->
        <div class="mt-8 space-y-4">
          <div class="flex items-center gap-2">
            <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
              <Check class="h-3 w-3 text-teal-600" />
            </div>
            <span class="whitespace-nowrap text-sm text-slate-600">Maklumat anda dilindungi dengan keselamatan tahap bank</span>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <div class="flex items-center gap-2">
              <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                <Check class="h-3 w-3 text-teal-600" />
              </div>
              <span class="text-sm text-slate-600">Mudah Dipohon</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                <Check class="h-3 w-3 text-teal-600" />
              </div>
              <span class="text-sm text-slate-600">Dokumen Ringkas</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100">
                <Check class="h-3 w-3 text-teal-600" />
              </div>
              <span class="text-sm text-slate-600">Maklumat Selamat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
