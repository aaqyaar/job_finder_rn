import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { LoginResult, Profile } from "../services/api.types";
import api from "../services/api";

export interface IAuthStore {
  profile: Profile;
  token: string;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<LoginResult>;
  logout(): void;
}

export const useAuthStore = create(
  persist<IAuthStore>(
    (set) => ({
      profile: {} as Profile,
      isAuthenticated: false,
      token: "",
      async login(email, password) {
        try {
          const resp = await api.login(email, password);

          const { refreshToken, accessToken, ...rest } = resp?.data;
          set({ profile: rest, token: accessToken, isAuthenticated: true });
          return resp;
        } catch (error) {
          set({ isAuthenticated: false });
          throw error;
        }
      },

      logout() {
        set({ isAuthenticated: false, profile: {} as Profile, token: "" });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
