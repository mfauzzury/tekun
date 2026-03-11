import type { Component } from "vue";
import {
  Calendar,
  FilePlus,
  ListChecks,
  MessageCircle,
  User,
} from "lucide-vue-next";

export type PortalMenuItemDef = {
  id: string;
  label: string;
  to: string;
  icon: Component;
};

/**
 * Menu untuk Portal Pemohon SPPT
 * URL: /portal
 * Pengguna: Pemohon / Usahawan (bukan staff TEKUN)
 * Fungsi: Hantar permohonan & semak status
 *
 * Rujukan: docs/Spec Modul Pendaftaran dan Permohonan.csv
 */
export const PORTAL_MENU: PortalMenuItemDef[] = [
  { id: "permohonan-baru", label: "Permohonan Baru", to: "/portal/permohonan/baru", icon: FilePlus },
  { id: "permohonan-saya", label: "Permohonan Saya", to: "/portal/permohonan", icon: ListChecks },
  { id: "profil-usahawan", label: "Profil Usahawan", to: "/portal/profil", icon: User },
  { id: "temuduga", label: "Temuduga", to: "/portal/temuduga", icon: Calendar },
  { id: "bantuan", label: "Bantuan", to: "/portal/bantuan", icon: MessageCircle },
];
