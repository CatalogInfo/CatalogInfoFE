import BaseApi from './base_api'
import AxiosApi from './axios_api'

/* global USE_MOCK_API */

class ApiFactory {
  getInstance(): BaseApi {
    return new AxiosApi()
  }
}

export default new ApiFactory()
