export interface Profile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "USER";
  status: string;
}

export interface LoginResult {
  data: {
    accessToken: string;
    refreshToken: string;
  } & Profile;
}

export interface BadRequestError {
  errors: {
    [key: string]: string;
  };
}

export interface CredentialError {
  message: string;
  status: "success" | "error";
}
