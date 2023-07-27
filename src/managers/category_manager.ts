import Category from '@/models/category'
import { useRepo } from 'pinia-orm'
import store from '../store/store'

export default class CategoryManager {
  protected static get repository() {
    return useRepo(Category, store)
  }

  static all() {
    return this.repository.all()
  }

  static getCategoryById(id: string): Category | null {
    return this.repository.find(id)
  }

  static createCategory(category: string) {
    this.repository.save({ category })
  }
}
