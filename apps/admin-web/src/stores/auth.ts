import { defineStore } from "pinia";

import type { User } from "@/types";

const mockUser: User = {
  id: 1,
  email: "admin@example.com",
  name: "Administrator",
  role: "admin",
};

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
      this.user = mockUser;
    },
    async signIn(_email: string, _password: string) {
      this.loading = true;
      try {
        this.user = mockUser;
      } finally {
        this.loading = false;
      }
    },
    async signOut() {
      this.user = null;
    },
    async updateProfile(data: { name?: string; email?: string }) {
      if (this.user) {
        this.user = { ...this.user, ...data };
      }
    },
    async changePassword(_data: { currentPassword: string; newPassword: string }) {},
    async uploadAvatar(_file: File) {},
    async removeAvatar() {},
  },
});
