import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { LoginResult, Profile } from "../services/api.types";
import api from "../services/api";

interface IAuthStore {
  profile: Profile;
  token: string;
  login(email: string, password: string): Promise<LoginResult>;
}

export const useAuthStore = create(
  persist<IAuthStore>(
    (set) => ({
      profile: {} as Profile,
      token: "",
      async login(email, password) {
        try {
          const resp = await api.login(email, password);

          const { refreshToken, accessToken, ...rest } = resp?.data;
          set({ profile: rest, token: accessToken });
          return resp;
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
