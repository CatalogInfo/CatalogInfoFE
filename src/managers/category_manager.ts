import CategoryApi from '@/api/category_api'
import BookResponse from '@/dtos/book_response'
import CategoryResponse from '@/dtos/category_response'
import Book from '@/models/book'
import Category from '@/models/category'
import BaseApiResponse from '@/response/base_api_response'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons'
import { useRepo } from 'pinia-orm'
import store from '../store/store'
import BookManager from './book_manager'

export default class CategoryManager {
  protected static get repository() {
    return useRepo(Category, store)
  }

  static all(): Category[] {
    return this.repository.withAllRecursive().all()
  }

  static saveBookToCategory(book: any, id: Number) {
    const category: Category = this.getCategoryById(Number(id)) as Category;
    const books = BookManager.getBooksByCategory(category.id);
    const name = category.name;

    this.repository.save({id: id, books: books, name: name});
  }

  static async loadAll() {
    const response: BaseApiResponse<CategoryResponse> = await CategoryApi.getCategories();
    const category = JSON.stringify(response.data);
    const categories: Array<CategoryResponse> = JSON.parse(category);

    this.repository.save(this.getFormatedCategories(categories))
  }

  static getFormatedCategories(categories: Array<CategoryResponse>) {
    return categories.map(this.getFormatedCategory);
  }

  static getFormatedCategory(category: CategoryResponse) {
    return {
      id: category.id,
      name: category.name,
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
