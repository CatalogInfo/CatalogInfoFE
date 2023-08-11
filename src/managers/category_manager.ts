import CategoryApi from '@/api/category_api'
import CategoryResponse from '@/dtos/responses/category_response'
import Category from '@/models/category'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'
import UserApi from '../api/user_api'
import BookManager from './book_manager'
import VideoManager from './video_manager'
import CategoryRequest from '@/dtos/requests/category_request'
import ArticleManager from './article_manager'

export default class CategoryManager {
  protected static get repository() {
    return useRepo(Category, store)
  }

  static all(): Collection<Category> {
    return this.repository.withAllRecursive().all()
  }

  static async loadAll() {
    const response = await UserApi.getCategories()
    const categories = await this.getFormatedCategories(response.data)

    this.repository.flush()
    this.repository.save(categories)
  }

  static getCategoryById(id: Number): Category | null {
    let category = null
    for (let i = 0; i < this.all().length; i++) {
      category = this.findNodeById(this.repository.all()[i], id)
      if (category !== null) {
        break
      }
    }
    return category
  }

  private static findNodeById(tree: Category, id: Number) {
    let result = null
    if (tree.id === id) {
      return tree
    }

    if (Array.isArray(tree.children) && tree.children.length > 0) {
      tree.children.some((node: Category) => {
        result = this.findNodeById(node, id)
        return result
      })
    }
    return result
  }

  static async createCategory(categoryRequest: CategoryRequest, parentId: number | null) {
    if (parentId === null || parentId === -1) {
      await CategoryApi.createCategory(categoryRequest)
    } else {
      await CategoryApi.createChild(categoryRequest, parentId)
    }

    await CategoryManager.loadAll()
  }

  private static async loadAllCategoryRelationships(categoryId: number) {
    await BookManager.loadAll(categoryId)
    await VideoManager.loadAll(categoryId)
    await ArticleManager.loadAll(categoryId)
  }

  private static async getFormatedCategories(categories: Array<CategoryResponse> | null) {
    if (categories === null) {
      return
    }
    const _this = this
    return Promise.all(
      categories.map(async (category) => {
        return await _this.getFormatedCategory(category)
      })
    )
  }

  private static async getFormatedCategory(category: CategoryResponse) {
    await this.loadAllCategoryRelationships(category.id)

    if (category.parent === -1) {
      category.parent = null
    }

    return {
      id: category.id,
      name: category.name,
      books: category.books.map((bookId) => {
        return { id: bookId, ...BookManager.getBookById(bookId) }
      }),
      videos: category.videos.map((videoId) => {
        return { id: videoId, ...VideoManager.getVideoById(videoId) }
      }),
      articles: category.articles.map((articleId) => {
        return { id: articleId, ...ArticleManager.getArticleById(articleId) }
      }),
      parent: category.parent,
      hasChildren: category.hasChildren,
      children: await this.getFormatedCategories(category.children)
    }
  }

  public static async deleteCategory(categoryId: number) {
    await CategoryApi.deleteCategory(categoryId)
    await CategoryManager.loadAll()
  }
}
