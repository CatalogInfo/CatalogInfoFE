import AuthManager from "@/managers/auth_manager";

export default interface ApiOptions {
  getAccessToken: () => Promise<string | null>;
  baseUrl: string | undefined;
  useAuth: boolean;
  withCredentials: boolean;
}

export const defaultApiOptions: ApiOptions = {
    withCredentials: true,
    baseUrl: 'http://localhost:8081',
    useAuth: true,
    getAccessToken: async () =>  AuthManager.getToken()
};

