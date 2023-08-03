import CategoryResponse from "@/dtos/category_response";
import BaseApiResponse from "@/response/base_api_response";
import ApiFactory from "./api_factory";
import ApiOptions, {defaultApiOptions} from "./api_options";
import AuthManager from "@/managers/auth_manager";
import BookData from "@/data/book_data";
import BookResponse from "@/dtos/book_response";

export default class CategoryApi {

    static baseUrl = 'http://localhost:8081/category'

    static getOptions(): ApiOptions {
        return {
          ...defaultApiOptions,
          baseUrl: this.baseUrl,
          useAuth: true,
          getAccessToken: async () => AuthManager.getToken(),
        };
      }

    public static async createCategory(category: String): Promise<BaseApiResponse<CategoryResponse>> {
        const res = await ApiFactory.getInstance(this.getOptions()).post<CategoryResponse, unknown>("/", category);
        return res;
    }

    public static async getCategories() {
        const res = await ApiFactory.getInstance(this.getOptions()).get("/");
        return res;
    }

    public static async createBook(book: BookData): Promise<BaseApiResponse<BookResponse>> {
      const res = await ApiFactory.getInstance(this.getOptions()).post<BookResponse, unknown>("/" + book.category.id + "/book", book);
      return res;
  }
  
    public static async getBooks(categoryId: number) {
      const res = await ApiFactory.getInstance(this.getOptions()).get(`/${categoryId}/books`);
      return res;
  }
}