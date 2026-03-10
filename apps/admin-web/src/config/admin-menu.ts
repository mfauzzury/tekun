import type { Component } from "vue";
import {
  Activity,
  BarChart3,
  Banknote,
  ClipboardList,
  CreditCard,
  FileCheck,
  Gauge,
  Gavel,
  LayoutGrid,
  Menu,
  Plug,
  Receipt,
  Settings,
  Shield,
  Users,
  Wallet,
} from "lucide-vue-next";

export type MenuChild = {
  label: string;
  to: string;
};

export type MenuItemDef = {
  id: string;
  label: string;
  to: string;
  icon: Component;
  children?: MenuChild[];
};

export type MenuGroupDef = {
  id: string;
  label: string;
  items: MenuItemDef[];
};

export type AdminMenuPrefs = {
  groupOrder: string[];
  itemOrder: Record<string, string[]>;
  hidden: string[];
  hiddenGroups: string[];
};

export const DEFAULT_MENU: MenuGroupDef[] = [
  {
    id: "pengurusan-pembiayaan",
    label: "PENGURUSAN PEMBIAYAAN",
    items: [
      { id: "laman-utama", label: "Laman Utama", to: "/admin", icon: Gauge },
      {
        id: "permohonan",
        label: "Permohonan",
        to: "/admin/permohonan",
        icon: ClipboardList,
        children: [
          { label: "Pendaftaran Permohonan", to: "/admin/permohonan" },
          { label: "Rekod Usahawan", to: "/admin/permohonan/usahawan" },
        ],
      },
      {
        id: "pembiayaan",
        label: "Pembiayaan",
        to: "/admin/pembiayaan/penilaian",
        icon: Wallet,
        children: [
          { label: "Penilaian & Kelulusan", to: "/admin/pembiayaan/penilaian" },
          { label: "Pengeluaran Dana", to: "/admin/pembiayaan/pengeluaran" },
          { label: "Pengurusan Akaun", to: "/admin/pembiayaan/akaun" },
        ],
      },
      {
        id: "pembayaran",
        label: "Pembayaran",
        to: "/admin/pembayaran",
        icon: CreditCard,
        children: [
          { label: "Bayaran Pembiayaan", to: "/admin/pembayaran" },
          { label: "Terima Bayaran", to: "/admin/pembayaran/terima" },
          { label: "Pemadanan Resit", to: "/admin/pembayaran/pemadanan" },
          { label: "Rekonsiliasi Bank", to: "/admin/pembayaran/rekon" },
          { label: "Lebihan & Kekurangan", to: "/admin/pembayaran/lebihan-kekurangan" },
          { label: "Penyata Bayaran", to: "/admin/pembayaran/penyata" },
          { label: "Early Settlement", to: "/admin/pembayaran/early-settlement" },
          { label: "Akaun Selesai Bayar", to: "/admin/pembayaran/selesai-bayar" },
          { label: "AI Bayaran", to: "/admin/pembayaran/ai" },
          { label: "Pemantauan Tunggakan", to: "/admin/pembayaran/tunggakan" },
        ],
      },
      {
        id: "pemantauan",
        label: "Pemantauan",
        to: "/admin/pemantauan/usahawan",
        icon: Activity,
        children: [
          { label: "Pemantauan Usahawan", to: "/admin/pemantauan/usahawan" },
          { label: "Kutipan", to: "/admin/pemantauan/kutipan" },
        ],
      },
      {
        id: "undang-undang",
        label: "Undang-Undang",
        to: "/admin/undang-undang/litigasi",
        icon: Gavel,
        children: [
          { label: "Litigasi", to: "/admin/undang-undang/litigasi" },
          { label: "Panel Peguam", to: "/admin/undang-undang/panel-peguam" },
          { label: "Akaun NPF", to: "/admin/undang-undang/akaun-npf" },
          { label: "NOD", to: "/admin/undang-undang/nod" },
          { label: "Saman", to: "/admin/undang-undang/saman" },
          { label: "Penghakiman", to: "/admin/undang-undang/penghakiman" },
          { label: "Execution", to: "/admin/undang-undang/execution" },
          { label: "WSS", to: "/admin/undang-undang/wss" },
          { label: "Garnishee", to: "/admin/undang-undang/garnishee" },
          { label: "JDS", to: "/admin/undang-undang/jds" },
          { label: "Kebankrapan", to: "/admin/undang-undang/kebankrapan" },
          { label: "Winding-Up", to: "/admin/undang-undang/winding-up" },
          { label: "Audit", to: "/admin/undang-undang/audit" },
          { label: "Laporan", to: "/admin/undang-undang/laporan" },
          { label: "Integrasi Insolvensi", to: "/admin/undang-undang/insolvensi" },
        ],
      },
      {
        id: "jaminan",
        label: "Jaminan",
        to: "/admin/jaminan",
        icon: Shield,
        children: [{ label: "Pengurusan Jaminan", to: "/admin/jaminan" }],
      },
      {
        id: "laporan",
        label: "Laporan",
        to: "/admin/laporan",
        icon: BarChart3,
        children: [
          { label: "Laporan & Analitik", to: "/admin/laporan" },
          { label: "Audit & Kawalan", to: "/admin/laporan/audit" },
        ],
      },
      { id: "integrasi", label: "Integrasi", to: "/admin/settings/integrasi", icon: Plug },
    ],
  },
  {
    id: "pentadbiran",
    label: "PENTADBIRAN",
    items: [
      { id: "menus", label: "Menus", to: "/admin/menus", icon: Menu },
      {
        id: "settings",
        label: "Settings",
        to: "/admin/settings",
        icon: Settings,
        children: [
          { label: "General", to: "/admin/settings" },
          { label: "Users", to: "/admin/settings/users" },
          { label: "Roles", to: "/admin/settings/roles" },
          { label: "System", to: "/admin/settings/system" },
        ],
      },
    ],
  },
  {
    id: "development",
    label: "Development",
    items: [{ id: "kitchen-sink", label: "Kitchen Sink", to: "/admin/kitchen-sink", icon: LayoutGrid }],
  },
];
