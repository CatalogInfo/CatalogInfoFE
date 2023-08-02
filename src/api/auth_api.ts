import ApiFactory from "./api_factory";
import ApiOptions, {defaultApiOptions} from "./api_options";

class AuthApi {

  baseUrl = 'http://localhost:8081/auth'

  getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: false,
      // getAccessToken: MailboxItemManager.getAccessToken,
    };
  }

  async login(body: any) {
    console.log(body);
    const res = await ApiFactory.getInstance(this.getOptions()).post("/login", body);
    console.log(res);
    return await ApiFactory.getInstance(this.getOptions()).post("/login", body);
  }

  async register(body: any) {
    return await ApiFactory.getInstance(this.getOptions()).post("/register", body);
  }

  async validateToken(token: any) {
    return await ApiFactory.getInstance(this.getOptions()).post("/validateToken", { token });
  }
}

export default new AuthApi();
