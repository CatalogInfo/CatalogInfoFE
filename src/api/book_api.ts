import AuthManager from "@/managers/auth_manager";
import ApiOptions, {defaultApiOptions} from "./api_options";

export default class BookApi {

    static baseUrl = 'http://localhost:8081'

    static getOptions(): ApiOptions {
        return {
          ...defaultApiOptions,
          baseUrl: this.baseUrl,
          useAuth: true,
          getAccessToken: async () => AuthManager.getToken(),
        };
      }
}