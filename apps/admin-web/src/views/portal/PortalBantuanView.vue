<script setup lang="ts">
import { ref } from "vue";
import { MessageCircle, Send, ChevronDown, ChevronUp } from "lucide-vue-next";
import PortalLayout from "@/layouts/PortalLayout.vue";
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
  // Simulate bot response
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
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Bantuan</h1>
        <p class="mt-1 text-slate-600">AI Chatbot dan Soalan Lazim</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Chat -->
        <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <MessageCircle class="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 class="font-semibold text-slate-900">Virtual Assistant</h2>
              <p class="text-xs text-slate-500">Bantuan 24/7 · BM & BI</p>
            </div>
          </div>
          <div class="h-64 overflow-y-auto p-4 space-y-4">
            <div
              v-for="(msg, i) in chatMessages"
              :key="i"
              class="flex"
              :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm"
                :class="
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                "
              >
                {{ msg.text }}
              </div>
            </div>
          </div>
          <div class="border-t border-slate-100 p-4">
            <div class="flex gap-2">
              <input
                v-model="message"
                type="text"
                placeholder="Taip mesej anda..."
                class="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                @keydown.enter.prevent="sendMessage"
              />
              <button
                class="rounded-lg bg-emerald-600 p-2.5 text-white hover:bg-emerald-700"
                @click="sendMessage"
              >
                <Send class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-4 py-3">
            <h2 class="font-semibold text-slate-900">Soalan Lazim</h2>
            <p class="text-sm text-slate-500">Jawapan pantas untuk soalan biasa</p>
          </div>
          <div class="divide-y divide-slate-100">
            <div
              v-for="(faq, i) in FAQ_DUMMY"
              :key="i"
              class="border-slate-100"
            >
              <button
                class="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                @click="toggleFaq(i)"
              >
                <span class="font-medium text-slate-900">{{ faq.q }}</span>
                <ChevronDown
                  v-if="expandedFaq !== i"
                  class="h-4 w-4 shrink-0 text-slate-400"
                />
                <ChevronUp
                  v-else
                  class="h-4 w-4 shrink-0 text-slate-400"
                />
              </button>
              <div
                v-show="expandedFaq === i"
                class="border-t border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {{ faq.a }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 class="font-semibold text-slate-900">Perlukan bantuan pegawai?</h3>
        <p class="mt-1 text-sm text-slate-600">
          Jika soalan anda tidak dapat dijawab oleh Virtual Assistant, anda boleh menghubungi pegawai TEKUN melalui live chat atau talian hotline.
        </p>
        <div class="mt-4 flex flex-wrap gap-4">
          <button
            class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Mulakan Live Chat
          </button>
          <a
            href="tel:1300-88-2600"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            📞 1-300-88-2600
          </a>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>
