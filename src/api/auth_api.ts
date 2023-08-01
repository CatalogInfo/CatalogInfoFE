import ApiFactory from "./api_factory";

class AuthApi {

  baseUrl = 'http://localhost:8081'

  getConfig() {
    return {
      withCredentials: false,
      headers: {},
    };
  }

  async login(body: any) {
    return await ApiFactory.getInstance(this.baseUrl).post("/login", body);
  }

  async register(body: any) {
    return await ApiFactory.getInstance(this.baseUrl).post("/register", body);
  }

  async validateToken(token: any) {
    return await ApiFactory.getInstance(this.baseUrl).post("/validateToken", { token });
  }
}

export default new AuthApi();
