import CategoryResponse from "@/dtos/category_response";
import BaseApiResponse from "@/response/base_api_response";
import ApiFactory from "./api_factory";
import ApiOptions, {defaultApiOptions} from "./api_options";
import AuthManager from "@/managers/auth_manager";
import BookData from "@/data/book_data";
import BookResponse from "@/dtos/book_response";
import VideoResponse from "@/dtos/video_response";
import VideoRequest from "@/dtos/video_request";

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

    public static async getCategories() {
        return await ApiFactory.getInstance(this.getOptions()).get("/");
    }

    public static async createCategory(category: String): Promise<BaseApiResponse<CategoryResponse>> {
        return await ApiFactory.getInstance(this.getOptions()).post<CategoryResponse, unknown>("/", category);
    }

    public static async createBook(book: BookData): Promise<BaseApiResponse<BookResponse>> {
      return await ApiFactory.getInstance(this.getOptions()).post<BookResponse, unknown>("/" + book.category.id + "/book", book);
    }

    public static async createVideo(categoryId: number, video: VideoRequest): Promise<BaseApiResponse<VideoResponse>> {
      return await ApiFactory.getInstance(this.getOptions()).post<VideoResponse, unknown>("/" + categoryId + "/video", video);
    }
  
    public static async getBooks(categoryId: number): Promise<BaseApiResponse<Array<BookResponse>>>{
      return await ApiFactory.getInstance(this.getOptions()).get<Array<BookResponse>>(`/${categoryId}/books`);
    }

    public static async getVideos(categoryId: number) {
      return await ApiFactory.getInstance(this.getOptions()).get(`/${categoryId}/videos`);
    }
}