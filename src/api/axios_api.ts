import BaseApi from './base_api'
import axios, { AxiosError, AxiosResponse } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import ApiUtils from '@/utils/api_utils'
import { HttpMethod } from '@/enums/http_method'
import BaseApiResponse from '@/response/base_api_response'

export default class AxiosApi implements BaseApi {
  private axiosInstance

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    })

    applyCaseMiddleware(this.axiosInstance)
  }

  async get<T>(url: string): Promise<BaseApiResponse<T>> {
    return this.genericRequest(HttpMethod.GET, url)
  }

  async post<T, D>(url: string, data: D): Promise<BaseApiResponse<T>> {
    return this.genericRequest(HttpMethod.POST, url, data)
  }

  async put<T, D>(url: string, data: D): Promise<BaseApiResponse<T>> {
    return this.genericRequest(HttpMethod.PUT, url, data)
  }

  async delete<T>(url: string): Promise<BaseApiResponse<T>> {
    return this.genericRequest(HttpMethod.DELETE, url)
  }

  private async genericRequest<T, D>(
    method: HttpMethod,
    url: string,
    data?: D
  ): Promise<BaseApiResponse<T>> {
    return await this.axiosInstance.request({
      headers: { 
        'Content-Type' : 'application/json',
      },
      method: ApiUtils.httpMethodToString(method),
      url: url,
      data: data
    })
  }
}
