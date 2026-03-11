<script setup lang="ts">
import { Check, AlertCircle } from "lucide-vue-next";

defineProps<{
  steps: { id: string; label: string }[];
  currentStep: number;
  stepsWithErrors?: number[];
}>();

defineEmits<{
  (e: "step-click", index: number): void;
}>();
</script>

<template>
  <nav class="w-full" aria-label="Progress">
    <!-- Scrollable container for many steps -->
    <div class="flex items-start gap-0 overflow-x-auto pb-2" style="-webkit-overflow-scrolling: touch; scrollbar-width: none;">
      <template v-for="(step, index) in steps" :key="step.id">
        <!-- Step item -->
        <button
          type="button"
          class="group flex flex-col items-center gap-2 px-1 py-1 transition-all focus:outline-none cursor-pointer"
          style="min-width: 72px;"
          @click="$emit('step-click', index)"
        >
          <!-- Circle -->
          <div class="relative">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm"
              :class="[
                stepsWithErrors?.includes(index) && 'bg-rose-100 text-rose-600 ring-2 ring-rose-400',
                !stepsWithErrors?.includes(index) && index < currentStep && 'bg-blue-600 text-white shadow-blue-200',
                !stepsWithErrors?.includes(index) && index === currentStep && 'bg-white text-blue-700 ring-2 ring-blue-600 shadow-blue-100',
                !stepsWithErrors?.includes(index) && index > currentStep && 'bg-slate-100 text-slate-400',
              ]"
            >
              <AlertCircle v-if="stepsWithErrors?.includes(index)" class="h-4 w-4" />
              <Check v-else-if="index < currentStep" class="h-4 w-4 stroke-[3]" />
              <span v-else>{{ index + 1 }}</span>
            </span>
          </div>

          <!-- Label -->
          <span
            class="text-center text-[11px] font-semibold leading-tight max-w-[5rem] transition-colors"
            :class="[
              stepsWithErrors?.includes(index) && 'text-rose-600',
              !stepsWithErrors?.includes(index) && index < currentStep && 'text-blue-600',
              !stepsWithErrors?.includes(index) && index === currentStep && 'text-slate-900',
              !stepsWithErrors?.includes(index) && index > currentStep && 'text-slate-400',
            ]"
          >
            {{ step.label }}
          </span>
        </button>

        <!-- Connector line -->
        <div
          v-if="index < steps.length - 1"
          class="mt-[18px] h-[2px] flex-1 min-w-[12px] rounded-full transition-colors"
          :class="index < currentStep ? 'bg-blue-500' : 'bg-slate-200'"
          aria-hidden="true"
        />
      </template>
    </div>

    <!-- Progress bar -->
    <div class="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        class="h-full rounded-full transition-all duration-300 ease-out"
        :style="{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }"
        style="background: linear-gradient(90deg, #0A84FF, #3399FF);"
      />
    </div>
  </nav>
</template>

<style scoped>
nav div::-webkit-scrollbar {
  display: none;
}
</style>
