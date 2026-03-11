<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { CheckCircle2, Eye, EyeOff, ShieldCheck } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalPageHeader from "@/components/portal/PortalPageHeader.vue";

type FormState = {
  nama: string;
  myKad: string;
  email: string;
  telefon: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
};

const form = reactive<FormState>({
  nama: "",
  myKad: "",
  email: "",
  telefon: "",
  password: "",
  confirmPassword: "",
  consent: false,
});

const touched = reactive<Record<keyof FormState, boolean>>({
  nama: false,
  myKad: false,
  email: false,
  telefon: false,
  password: false,
  confirmPassword: false,
  consent: false,
});

const submitAttempted = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const submitted = ref(false);

const errors = computed(() => {
  const e: Record<keyof FormState, string> = {
    nama: "",
    myKad: "",
    email: "",
    telefon: "",
    password: "",
    confirmPassword: "",
    consent: "",
  };

  if (!form.nama.trim()) e.nama = "Nama penuh diperlukan.";
  if (!/^\d{6}-\d{2}-\d{4}$/.test(form.myKad.trim())) e.myKad = "Format MyKad mestilah YYMMDD-##-####.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Email tidak sah.";
  if (!/^0\d{1,2}-?\d{7,8}$/.test(form.telefon.trim())) e.telefon = "No. telefon tidak sah.";
  if (form.password.length < 8) e.password = "Kata laluan minimum 8 aksara.";
  if (form.confirmPassword !== form.password || !form.confirmPassword) e.confirmPassword = "Pengesahan kata laluan tidak sepadan.";
  if (!form.consent) e.consent = "Anda perlu bersetuju dengan terma dan syarat.";

  return e;
});

const isValid = computed(() => Object.values(errors.value).every((x) => !x));

function shouldShowError(field: keyof FormState) {
  return !!errors.value[field] && (touched[field] || submitAttempted.value);
}

function fieldClass(field: keyof FormState) {
  if (shouldShowError(field)) return "portal-input border-rose-300 bg-rose-50/30 focus:!ring-rose-100 focus:!border-rose-400";
  if (touched[field] && !errors.value[field]) return "portal-input border-emerald-300 bg-emerald-50/30 focus:!ring-emerald-100 focus:!border-emerald-400";
  return "portal-input";
}

function markTouched(field: keyof FormState) {
  touched[field] = true;
}

function submit() {
  submitAttempted.value = true;
  submitted.value = false;
  (Object.keys(touched) as Array<keyof FormState>).forEach((k) => {
    touched[k] = true;
  });

  if (isValid.value) {
    submitted.value = true;
  }
}
</script>

<template>
  <PortalLayout>
    <div class="mx-auto max-w-3xl space-y-6">
      <PortalPageHeader
        title="Daftar Akaun"
        subtitle="Buka akaun portal untuk memohon pembiayaan dan menjejak status permohonan"
      />

      <section class="portal-surface p-6 sm:p-7 portal-reveal">
        <div class="mb-5 border p-4" style="border-radius: 14px; border-color: #0A84FF30; background: #EBF5FF">
          <p class="text-sm font-semibold" style="color: #0A84FF">Pendaftaran Frontend (Demo UI)</p>
          <p class="mt-1 text-sm" style="color: #6B7280">
            Borang ini ialah UI shell untuk pendaftaran. Penghantaran ke backend belum diaktifkan.
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label class="portal-label">Nama Penuh</label>
              <input
                v-model="form.nama"
                type="text"
                :class="fieldClass('nama')"
                placeholder="Contoh: Ahmad bin Ali"
                @blur="markTouched('nama')"
              />
              <p v-if="shouldShowError('nama')" class="mt-1 text-xs font-medium text-rose-600">{{ errors.nama }}</p>
            </div>

            <div>
              <label class="portal-label">No. MyKad</label>
              <input
                v-model="form.myKad"
                type="text"
                :class="fieldClass('myKad')"
                placeholder="900101-10-1234"
                @blur="markTouched('myKad')"
              />
              <p v-if="shouldShowError('myKad')" class="mt-1 text-xs font-medium text-rose-600">{{ errors.myKad }}</p>
            </div>

            <div>
              <label class="portal-label">No. Telefon</label>
              <input
                v-model="form.telefon"
                type="text"
                :class="fieldClass('telefon')"
                placeholder="012-3456789"
                @blur="markTouched('telefon')"
              />
              <p v-if="shouldShowError('telefon')" class="mt-1 text-xs font-medium text-rose-600">{{ errors.telefon }}</p>
            </div>

            <div class="sm:col-span-2">
              <label class="portal-label">Email</label>
              <input
                v-model="form.email"
                type="email"
                :class="fieldClass('email')"
                placeholder="ahmad@email.com"
                @blur="markTouched('email')"
              />
              <p v-if="shouldShowError('email')" class="mt-1 text-xs font-medium text-rose-600">{{ errors.email }}</p>
            </div>

            <div>
              <label class="portal-label">Kata Laluan</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="fieldClass('password') + ' pr-10'"
                  placeholder="Minimum 8 aksara"
                  @blur="markTouched('password')"
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
              <p v-if="shouldShowError('password')" class="mt-1 text-xs font-medium text-rose-600">{{ errors.password }}</p>
            </div>

            <div>
              <label class="portal-label">Sahkan Kata Laluan</label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :class="fieldClass('confirmPassword') + ' pr-10'"
                  placeholder="Taip semula kata laluan"
                  @blur="markTouched('confirmPassword')"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
              <p v-if="shouldShowError('confirmPassword')" class="mt-1 text-xs font-medium text-rose-600">{{ errors.confirmPassword }}</p>
            </div>
          </div>

          <label class="mt-1 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <input
              v-model="form.consent"
              type="checkbox"
              class="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"
              @change="markTouched('consent')"
            />
            <span class="text-sm text-slate-700">
              Saya bersetuju dengan terma penggunaan portal dan kebenaran pemprosesan data.
            </span>
          </label>
          <p v-if="shouldShowError('consent')" class="mt-1 text-xs font-medium text-rose-600">{{ errors.consent }}</p>

          <div v-if="submitted" class="portal-alert border-emerald-200 bg-emerald-50 text-emerald-700">
            <p class="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 class="h-4 w-4" />
              Borang pendaftaran lengkap (demo UI). Integrasi backend belum diaktifkan.
            </p>
          </div>

          <button type="submit" class="portal-btn-primary w-full sm:w-auto">Daftar Akaun</button>
        </form>
      </section>

      <section class="portal-surface-muted p-5 text-sm text-slate-700">
        <p class="flex items-center gap-2 font-semibold text-slate-900">
          <ShieldCheck class="h-4 w-4 text-blue-600" />
          Kenapa perlu maklumat ini?
        </p>
        <p class="mt-2">
          Data pendaftaran digunakan untuk pengesahan identiti pemohon dan pemadanan profil permohonan pembiayaan.
        </p>
      </section>
    </div>
  </PortalLayout>
</template>
