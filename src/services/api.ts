import { create, ApisauceInstance } from "apisauce";
import { BadRequestError, CredentialError, LoginResult } from "./api.types";

class ApiService {
  private api: ApisauceInstance;

  constructor() {
    this.api = create({
      // baseURL: "https://oarfish-great-warthog.ngrok-free.app/api",
      baseURL: "",
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
}

// Single ton instance
const api = new ApiService();

export default api;
