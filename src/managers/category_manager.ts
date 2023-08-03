import CategoryApi from '@/api/category_api'
import CategoryResponse from '@/dtos/category_response'
import Category from '@/models/category'
import BaseApiResponse from '@/response/base_api_response'
import { useRepo } from 'pinia-orm'
import store from '../store/store'
import UserApi from "../api/user_api";
import BookManager from './book_manager'
import VideoManager from './video_manager'

export default class CategoryManager {
  protected static get repository() {
    return useRepo(Category, store)
  }

  static all(): Category[] {
    return this.repository.withAllRecursive().all()
  }

  static async loadAll() {
    const response: BaseApiResponse<CategoryResponse> = await UserApi.getCategories();
    const category = JSON.stringify(response.data);
    const categories: Array<CategoryResponse> = JSON.parse(category);
    console.log(categories);

    const res =  await this.getFormatedCategories(categories);
    console.log(res);
    this.repository.save(res);
  }

  static async getFormatedCategories(categories: Array<CategoryResponse>) {
    const _this = this;
    return  Promise.all(categories.map(async (category) => {
       return await _this.getFormatedCategory(category);
    }));
  }

  static async getFormatedCategory(category: CategoryResponse) {
    await BookManager.loadAll(category.id);
    await VideoManager.loadAll(category.id);

    console.log(BookManager.getBookById(category.books[0]));
    return {
      id: category.id,
      name: category.name,
      books: category.books.map(bookId => { return{ id: bookId, ...BookManager.getBookById(bookId) } }),
      videos: category.videos.map(videoId => { return {id: videoId, ...VideoManager.getVideoById(videoId) } })
    };
  }

  static getCategoryById(id: Number): Category | null {
    return this.repository.where('id', id).first();
  }

  static async createCategory(name: string) {
    const response = await CategoryApi.createCategory(name);
    const category: CategoryResponse = JSON.parse(JSON.stringify(response.data));

    this.repository.save({id: category.id, name })
  }
}
