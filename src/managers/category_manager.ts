import CategoryApi from '@/api/category_api'
import CategoryResponse from '@/dtos/category_response'
import Category from '@/models/category'
import BaseApiResponse from '@/response/base_api_response'
import { useRepo } from 'pinia-orm'
import store from '../store/store'
import UserApi from "../api/user_api";

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

    this.repository.save(this.getFormatedCategories(categories))
  }

  static getFormatedCategories(categories: Array<CategoryResponse>) {
    return categories.map(this.getFormatedCategory);
  }

  static getFormatedCategory(category: CategoryResponse) {
    return {
      id: category.id,
      name: category.name,
      books: category.books.map(bookId => { return{ id: bookId } }),
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
