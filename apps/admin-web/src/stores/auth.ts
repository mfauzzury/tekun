import { defineStore } from "pinia";

import * as authApi from "@/api/auth";
import type { User } from "@/types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loading: false,
    initialized: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
  },
  actions: {
    async initialize() {
      if (this.initialized) return;
      this.initialized = true;
      try {
        const res = await authApi.getMe();
        this.user = res.data.user;
      } catch {
        this.user = null;
      }
    },
    async signIn(email: string, password: string) {
      this.loading = true;
      try {
        await authApi.login(email, password);
        const res = await authApi.getMe();
        this.user = res.data.user;
      } catch (e) {
        this.user = null;
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async signOut() {
      try {
        await authApi.logout();
      } catch {
        /* ignore */
      }
      this.user = null;
    },
    async updateProfile(data: { name?: string; email?: string }) {
      const res = await authApi.updateProfile(data);
      this.user = res.data.user;
    },
    async changePassword(data: { currentPassword: string; newPassword: string }) {
      await authApi.changePassword(data);
    },
    async uploadAvatar(file: File) {
      const res = await authApi.uploadAvatar(file);
      this.user = res.data.user;
    },
    async removeAvatar() {
      const res = await authApi.removeAvatar();
      this.user = res.data.user;
    },
  },
});
