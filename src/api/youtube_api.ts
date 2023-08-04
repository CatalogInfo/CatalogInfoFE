import BaseApiResponse from '@/response/base_api_response'
import ApiFactory from './api_factory'
import ApiOptions, { defaultApiOptions } from './api_options'

export default class BookApi {
  static baseUrl = 'https://www.googleapis.com/youtube/v3'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: false
    }
  }

  public static async getVideoById(id: string, api_key: string): Promise<BaseApiResponse<string>> {
    const url = '/videos?part=id%2C+snippet&id=' + id + '&key=' + api_key
    return await ApiFactory.getInstance(this.getOptions()).get<string>(url)
  }
}
