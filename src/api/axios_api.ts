import BaseApi from './base_api'
import axios, { AxiosError, AxiosResponse } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import ApiUtils from '@/utils/api_utils'
import { HttpMethod } from '@/enums/http_method'
import BaseApiResponse from '@/response/base_api_response'
import AuthManager from '@/managers/auth_manager'
import ApiOptions, { defaultApiOptions } from "./api_options";

function convertAxiosResponse<T>(response: AxiosResponse<T>): BaseApiResponse<T> {
  return {
    data: response.data,
    status: response.status,
  };
}

export default class AxiosApi implements BaseApi {
  private axiosInstance;
  private apiOptions: ApiOptions;

  constructor(apiOptions: ApiOptions = defaultApiOptions) {
    this.apiOptions = apiOptions;

    this.axiosInstance = axios.create({
      baseURL: apiOptions.baseUrl,
    });

    applyCaseMiddleware(this.axiosInstance);
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

  private async genericRequest<T, D>(method: HttpMethod, url: string, data?: D): Promise<BaseApiResponse<T>> {
    try {
      await this.updateAccessToken();

      const response = await this.axiosInstance.request({
        method: ApiUtils.httpMethodToString(method),
        url: url,
        data: data,
      });

      return convertAxiosResponse(response);
    } catch (error) {
      await this.handleResponseError(error as AxiosError);

      throw error;
    }
  }

  private async updateAccessToken() {

    if (!this.apiOptions.useAuth) {
      return;
    }

    const accessToken = await this.apiOptions.getAccessToken();
    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    this.axiosInstance.defaults.headers["Content-Type"] = "application/json";

  }

  private async handleResponseError(error: AxiosError) {
    const response = error.response;

    if (this.apiOptions.useAuth && (response?.status === 401 || response?.status === 403)) {
      // ToastManager.showErrorToast("Your session has expired. Please log in again.");
      // RouterManager.navigateTo("/login");
      AuthManager.logout();
    }
  }
}
