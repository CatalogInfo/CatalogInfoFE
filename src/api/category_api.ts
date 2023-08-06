import CategoryResponse from '@/dtos/responses/category_response'
import BaseApiResponse from '@/response/base_api_response'
import ApiFactory from './api_factory'
import ApiOptions, { defaultApiOptions } from './api_options'
import AuthManager from '@/managers/auth_manager'
import BookRequest from '@/dtos/requests/book_request'
import BookResponse from '@/dtos/responses/book_response'
import VideoResponse from '@/dtos/responses/video_response'
import ArticleResponse from '@/dtos/responses/article_response'
import VideoRequest from '@/dtos/requests/video_request'
import CategoryRequest from '@/dtos/requests/category_request'
import ArticleRequest from '@/dtos/requests/article_request'

export default class CategoryApi {
  static baseUrl = 'http://localhost:8081/category'

  static getOptions(): ApiOptions {
    return {
      ...defaultApiOptions,
      baseUrl: this.baseUrl,
      useAuth: true,
      getAccessToken: async () => AuthManager.getToken()
    }
  }

  public static async getCategories() {
    return await ApiFactory.getInstance(this.getOptions()).get('/')
  }

  public static async createCategory(
    categoryRequest: CategoryRequest
  ): Promise<BaseApiResponse<CategoryResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post<CategoryResponse, unknown>(
      '/',
      categoryRequest
    )
  }

  public static async createBook(
    book: BookRequest,
    categoryId: number
  ): Promise<BaseApiResponse<BookResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post<BookResponse, unknown>(
      '/' + categoryId + '/book',
      book
    )
  }

  public static async createVideo(
    categoryId: number,
    video: VideoRequest
  ): Promise<BaseApiResponse<VideoResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post<VideoResponse, unknown>(
      '/' + categoryId + '/video',
      video
    )
  }

  public static async createArticle(
    article: ArticleRequest,
    categoryId: number
  ): Promise<BaseApiResponse<ArticleResponse>> {
    return await ApiFactory.getInstance(this.getOptions()).post<ArticleResponse, unknown>(
      '/' + categoryId + '/article',
      article
    )
  }

  public static async deleteBook(
    categoryId: number,
    bookId: number
  ): Promise<BaseApiResponse<String>> {
    return await ApiFactory.getInstance(this.getOptions()).delete<String>(
      '/' + categoryId + '/book/' +bookId
    )
  }

  public static async deleteArticle(
    categoryId: number,
    articleId: number
  ): Promise<BaseApiResponse<String>> {
    return await ApiFactory.getInstance(this.getOptions()).delete<String>(
      '/' + categoryId + '/article/' + articleId
    )
  }

  public static async deleteVideo(
    categoryId: number,
    videoId: string
  ): Promise<BaseApiResponse<String>> {
    return await ApiFactory.getInstance(this.getOptions()).delete<String>(
      '/' + categoryId + '/video/' + videoId
    )
  }

  public static async getBooks(categoryId: number): Promise<BaseApiResponse<Array<BookResponse>>> {
    return await ApiFactory.getInstance(this.getOptions()).get<Array<BookResponse>>(
      `/${categoryId}/books`
    )
  }

  public static async getVideos(categoryId: number): Promise<BaseApiResponse<Array<VideoResponse>>> {
    return await ApiFactory.getInstance(this.getOptions()).get<Array<VideoResponse>>(`/${categoryId}/videos`)
  }

  public static async getArticles(categoryId: number): Promise<BaseApiResponse<Array<ArticleResponse>>> {
    return await ApiFactory.getInstance(this.getOptions()).get<Array<ArticleResponse>>(`/${categoryId}/articles`)
  }

  public static async deleteCategory(categoryId: number): Promise<BaseApiResponse<String>> {
    return await ApiFactory.getInstance(this.getOptions()).delete<String>(`/${categoryId}`);
  }
}
