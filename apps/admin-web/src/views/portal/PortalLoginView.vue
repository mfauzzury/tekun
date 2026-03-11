<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-vue-next";

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
  <div class="portal-app relative min-h-screen overflow-hidden">
    <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(10,132,255,0.06), transparent 50%), linear-gradient(to left, rgba(255,167,38,0.04), transparent 50%)" />

    <div class="absolute right-6 top-6 z-10">
      <div class="inline-flex items-center rounded-full border bg-white/90 p-1 text-sm" style="border-color: #F0F0F0; box-shadow: 0 4px 12px 0 rgba(0,0,0,0.04)">
        <button
          type="button"
          class="rounded-full px-3 py-1.5 font-semibold transition"
          :class="lang === 'BM' ? 'text-white' : 'hover:text-slate-700'"
          :style="lang === 'BM' ? 'background: #1A1A2E; color: white' : 'color: #9CA3AF'"
          @click="lang = 'BM'"
        >
          BM
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1.5 font-semibold transition"
          :class="lang === 'EN' ? 'text-white' : 'hover:text-slate-700'"
          :style="lang === 'EN' ? 'background: #1A1A2E; color: white' : 'color: #9CA3AF'"
          @click="lang = 'EN'"
        >
          EN
        </button>
      </div>
    </div>

    <div class="relative mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-4 py-10 lg:grid-cols-2">
      <section class="hidden lg:block portal-reveal">
        <p class="portal-kicker" style="color: #0A84FF">TEKUN SPPT</p>
        <h1 class="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
          Portal moden untuk perjalanan permohonan pembiayaan anda
        </h1>
        <p class="mt-3 max-w-lg text-base text-slate-600">
          Log masuk untuk mengurus permohonan, memuat naik dokumen, dan menerima kemas kini status secara berpusat.
        </p>
        <div class="mt-6 space-y-3 text-sm text-slate-700">
          <p class="flex items-center gap-2"><ShieldCheck class="h-4 w-4 text-[#0A84FF]" /> Data anda dilindungi dengan kawalan keselamatan berlapis</p>
          <p class="flex items-center gap-2"><ShieldCheck class="h-4 w-4 text-[#0A84FF]" /> Status permohonan dikemas kini dalam masa nyata</p>
          <p class="flex items-center gap-2"><ShieldCheck class="h-4 w-4 text-[#0A84FF]" /> Akses mudah pada desktop dan mudah alih</p>
        </div>
      </section>

      <section class="portal-surface mx-auto w-full max-w-xl p-7 sm:p-8 portal-reveal">
        <router-link to="/portal" class="mb-5 inline-flex items-center gap-3">
          <div class="portal-brand-mark !h-10 !w-10">T</div>
          <div>
            <p class="text-lg font-extrabold text-slate-900">TEKUN SPPT</p>
            <p class="text-xs text-slate-500">Portal Pemohon Pembiayaan</p>
          </div>
        </router-link>

        <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">Log Masuk Akaun</h2>
        <p class="mt-1 text-sm text-slate-600">Sila log masuk untuk meneruskan permohonan anda.</p>

        <form class="mt-6 space-y-4" @submit.prevent="submit">
          <div>
            <label class="portal-label">Email</label>
            <div class="relative">
              <Mail class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="email"
                type="email"
                class="portal-input pl-10"
                placeholder="ahmad@contoh.com"
              />
            </div>
          </div>

          <div>
            <label class="portal-label">Kata Laluan</label>
            <div class="relative">
              <Lock class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="portal-input pl-10 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div v-if="error" class="portal-alert border-rose-200 bg-rose-50 text-sm text-rose-700">
            <div class="flex items-center gap-2">
              <AlertCircle class="h-4 w-4" />
              {{ error }}
            </div>
          </div>

          <button type="submit" class="portal-btn-primary w-full" :disabled="loading">
            {{ loading ? "Memproses..." : "Log Masuk" }}
            <ArrowRight v-if="!loading" class="h-4 w-4" />
          </button>
        </form>

        <p class="mt-5 text-sm text-slate-600">
          Belum mempunyai akaun?
          <router-link to="/portal/daftar" class="font-semibold text-[#0A84FF] hover:text-[#0066DD]">
            Daftar Akaun
          </router-link>
        </p>
      </section>
    </div>
  </div>
</template>
