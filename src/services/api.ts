import AsyncStorage from "@react-native-async-storage/async-storage";

import { create, ApisauceInstance } from "apisauce";
import {
  BadRequestError,
  BaseResponse,
  CredentialError,
  LoginResult,
} from "./api.types";
import { JobListing } from "../types/jobs";
import { IAuthStore } from "../models/auth.store";

class ApiService {
  private api: ApisauceInstance;

  constructor() {
    this.api = create({
      baseURL: "https://oarfish-great-warthog.ngrok-free.app/api",
      // baseURL: "",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async login(email: string, password: string): Promise<LoginResult> {
    try {
      const response = await this.api.post("/auth/login", {
        username: email,
        password,
      });

      if (!response.ok) {
        throw response.data as BadRequestError & CredentialError;
      }
      return response.data as LoginResult;
    } catch (error) {
      throw error;
    }
  }

  public async getJobs(): Promise<BaseResponse<JobListing>> {
    const token = await this.getToken();

    try {
      const response = await this.api.get(
        "/jobs",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw response.data as BadRequestError & CredentialError;
      }
      return response.data as BaseResponse<JobListing>;
    } catch (error) {
      throw error;
    }
  }

  async getToken(): Promise<string> {
    try {
      const store = await AsyncStorage.getItem("authStore");
      const parsedJson = JSON.parse(store as any) as {
        state: Omit<IAuthStore, "login" | "logout">;
      };

      return parsedJson?.state?.token || "";
    } catch (error) {
      throw error;
    }
  }
}

// Single ton instance
const api = new ApiService();

export default api;
