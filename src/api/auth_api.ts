import LoginResponse from '@/dtos/responses/login_response'
import BaseApiResponse from '@/response/base_api_response'
import ApiFactory from './api_factory'
import ApiOptions, { defaultApiOptions } from './api_options'

class AuthApi {
  baseUrl = 'http://localhost:8081/auth'

  getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: false
    }
  }

  async login(body: any): Promise<BaseApiResponse<LoginResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post('/login', body)
  }

  async register(body: any): Promise<BaseApiResponse<String>> {
    return await ApiFactory.getInstance(this.getOptions()).post('/register', body)
  }

  async validateToken(token: any) {
    return await ApiFactory.getInstance(this.getOptions()).post('/validateToken', { token })
  }
}

export default new AuthApi()
