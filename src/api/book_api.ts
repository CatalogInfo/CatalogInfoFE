import BookData from "@/data/book_data";
import BookResponse from "@/dtos/book_response";
import AuthManager from "@/managers/auth_manager";
import BaseApiResponse from "@/response/base_api_response";
import ApiFactory from "./api_factory";
import ApiOptions, {defaultApiOptions} from "./api_options";

export default class BookApi {

    static baseUrl = 'http://localhost:8081'

    static getOptions(): ApiOptions {
        return {
          ...defaultApiOptions,
          baseUrl: this.baseUrl,
          useAuth: false,
          getAccessToken: async () => AuthManager.getToken(),
        };
      }

    public static async createBook(book: BookData): Promise<BaseApiResponse<BookResponse>> {
        const res = await ApiFactory.getInstance(this.getOptions()).post<BookResponse, unknown>("/category/" + book.category.id + "/book", book);
        // console.log(res.data);
        return res;
    }

    public static async getBooks(categoryId: number) {
        const res = await ApiFactory.getInstance(this.getOptions()).get("/category/" + categoryId + "/book");
        // console.log(res);
        return res;
    }
}