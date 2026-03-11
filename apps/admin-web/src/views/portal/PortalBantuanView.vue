<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown, ChevronUp, MessageCircle, Phone, Send } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
import PortalPageHeader from "@/components/portal/PortalPageHeader.vue";
import { FAQ_DUMMY } from "@/data/portal-dummy";

const message = ref("");
const chatMessages = ref<{ role: "user" | "bot"; text: string }[]>([
  {
    role: "bot",
    text: "Selamat datang! Saya Virtual Assistant Portal SPPT. Bagaimana saya boleh membantu anda hari ini?",
  },
]);

const expandedFaq = ref<number | null>(null);

function sendMessage() {
  if (!message.value.trim()) return;
  chatMessages.value.push({ role: "user", text: message.value });
  chatMessages.value.push({
    role: "bot",
    text: "Terima kasih atas pertanyaan anda. Pegawai TEKUN akan menghubungi anda tidak lama lagi. Anda juga boleh semak FAQ di bawah untuk jawapan pantas.",
  });
  message.value = "";
}

function toggleFaq(i: number) {
  expandedFaq.value = expandedFaq.value === i ? null : i;
}
</script>

<template>
  <PortalLayout>
    <div class="space-y-6">
      <PortalPageHeader
        title="Bantuan"
        subtitle="Virtual Assistant dan soalan lazim untuk panduan pantas"
      />

      <div class="grid gap-6 lg:grid-cols-2 portal-stagger">
        <section class="portal-surface overflow-hidden">
          <div class="flex items-center gap-3 px-5 py-4" style="border-bottom: 1px solid #F0F0F0">
            <div class="flex items-center justify-center" style="width: 44px; height: 44px; border-radius: 14px; border: 1.5px solid #0A84FF40; color: #0A84FF">
              <MessageCircle class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-base font-bold text-slate-900">Virtual Assistant</h2>
              <p class="text-xs text-slate-500">Bantuan 24/7 · BM & BI</p>
            </div>
          </div>
          <div class="h-72 space-y-4 overflow-y-auto p-4" style="background: #FAFBFC">
            <div
              v-for="(msg, i) in chatMessages"
              :key="i"
              class="flex"
              :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[85%] px-3.5 py-2.5 text-sm"
                :class="msg.role === 'user' ? 'text-white' : 'bg-white border'"
                :style="msg.role === 'user'
                  ? 'background: #0A84FF; border-radius: 18px 18px 4px 18px'
                  : 'border-radius: 18px 18px 18px 4px; border-color: #F0F0F0; color: #111827; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.04)'"
              >
                {{ msg.text }}
              </div>
            </div>
          </div>
          <div class="p-4" style="border-top: 1px solid #F0F0F0">
            <div class="flex gap-2">
              <input
                v-model="message"
                type="text"
                placeholder="Taip mesej anda..."
                class="portal-input"
                @keydown.enter.prevent="sendMessage"
              />
              <button class="portal-btn-primary !px-3" @click="sendMessage">
                <Send class="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section class="portal-surface overflow-hidden">
          <div class="px-5 py-4" style="border-bottom: 1px solid #F0F0F0">
            <h2 class="text-base font-bold" style="color: #111827">Soalan Lazim</h2>
            <p class="text-sm" style="color: #9CA3AF">Jawapan pantas untuk soalan biasa</p>
          </div>
          <div class="divide-y" style="border-color: #F0F0F0">
            <div v-for="(faq, i) in FAQ_DUMMY" :key="i">
              <button
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#FAFBFC]"
                @click="toggleFaq(i)"
              >
                <span class="font-semibold" style="color: #111827">{{ faq.q }}</span>
                <ChevronDown v-if="expandedFaq !== i" class="h-4 w-4 shrink-0 text-slate-400" />
                <ChevronUp v-else class="h-4 w-4 shrink-0 text-slate-400" />
              </button>
              <div
                v-show="expandedFaq === i"
                class="px-5 py-4 text-sm"
                style="border-top: 1px solid #F0F0F0; background: #FAFBFC; color: #6B7280"
              >
                {{ faq.a }}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="portal-surface-muted p-6 portal-reveal">
        <h3 class="text-base font-bold text-slate-900">Perlukan bantuan pegawai?</h3>
        <p class="mt-1 text-sm text-slate-700">
          Jika soalan anda tidak dapat dijawab oleh Virtual Assistant, hubungi pegawai TEKUN melalui live chat atau talian hotline.
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <button class="portal-btn-primary">Mulakan Live Chat</button>
          <a href="tel:1300-88-2600" class="portal-btn-secondary">
            <Phone class="h-4 w-4" />
            1-300-88-2600
          </a>
        </div>
      </section>
    </div>
  </PortalLayout>
</template>
