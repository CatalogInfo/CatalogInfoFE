import BaseApi from './base_api'
import AxiosApi from './axios_api'

class ApiFactory {
  getInstance(baseUrl: string): BaseApi {
    return new AxiosApi(baseUrl)
  }
}

export default new ApiFactory()
