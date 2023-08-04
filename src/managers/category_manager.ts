import CategoryApi from '@/api/category_api'
import CategoryResponse from '@/dtos/responses/category_response'
import Category from '@/models/category'
import { useRepo } from 'pinia-orm'
import store from '../store/store'
import UserApi from '../api/user_api'
import BookManager from './book_manager'
import VideoManager from './video_manager'
import CategoryRequest from '@/dtos/requests/category_request'

export default class CategoryManager {
  protected static get repository() {
    return useRepo(Category, store)
  }

  static all(): Category[] {
    return this.repository.withAllRecursive().all()
  }

  static async loadAll() {
    const response = await UserApi.getCategories()
    const categories = await this.getFormatedCategories(response.data)

    this.repository.save(categories)
  }

  static getCategoryById(id: Number): Category | null {
    return this.repository.where('id', id).first()
  }

  static async createCategory(categoryRequest: CategoryRequest) {
    const response = await CategoryApi.createCategory(categoryRequest)
    const category = response.data

    this.repository.save({ id: category.id, name })
    await CategoryManager.loadAll();
  }

  private static async loadAllCategoryRelationships(categoryId: number) {
    await BookManager.loadAll(categoryId)
    await VideoManager.loadAll(categoryId)
  }

  private static async getFormatedCategories(categories: Array<CategoryResponse>) {
    const _this = this
    return Promise.all(
      categories.map(async (category) => {
        return await _this.getFormatedCategory(category)
      })
    )
  }

  private static async getFormatedCategory(category: CategoryResponse) {
    await this.loadAllCategoryRelationships(category.id)

    return {
      id: category.id,
      name: category.name,
      books: category.books.map((bookId) => {
        return { id: bookId, ...BookManager.getBookById(bookId) }
      }),
      videos: category.videos.map((videoId) => {
        return { id: videoId, ...VideoManager.getVideoById(videoId) }
      })
    }
  }
}
