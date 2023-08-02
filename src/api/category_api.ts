import CategoryResponse from "@/dtos/category_response";
import BaseApiResponse from "@/response/base_api_response";
import ApiFactory from "./api_factory";
import ApiOptions, {defaultApiOptions} from "./api_options";
import AuthManager from "@/managers/auth_manager";

export default class CategoryApi {

    static baseUrl = 'http://localhost:8081'

    static getOptions(): ApiOptions {
        return {
          ...defaultApiOptions,
          baseUrl: this.baseUrl,
          useAuth: true,
          getAccessToken: async () => AuthManager.getToken(),
        };
      }

    public static async createCategory(category: String): Promise<BaseApiResponse<CategoryResponse>> {
        const res = await ApiFactory.getInstance(this.getOptions()).post<CategoryResponse, unknown>("/category", category);
        // console.log(res.data);
        return res;
    }

    public static async getCategories() {
        const res = await ApiFactory.getInstance(this.getOptions()).get("/category");
        // console.log(res);
        return res;
    }
}