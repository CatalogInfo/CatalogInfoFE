import CategoryResponse from "@/dtos/category_response";
import BaseApiResponse from "@/response/base_api_response";
import ApiFactory from "./api_factory";

export default class CategoryApi {

    static baseUrl = 'http://localhost:8081'

    public static async createCategory(category: String): Promise<BaseApiResponse<CategoryResponse>> {
        const res = await ApiFactory.getInstance(this.baseUrl).post<CategoryResponse, unknown>("/category", category);
        // console.log(res.data);
        return res;
    }

    public static async getCategories() {
        const res = await ApiFactory.getInstance(this.baseUrl).get("/category");
        // console.log(res);
        return res;
    }
}