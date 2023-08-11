import CategoryRequest from '@/dtos/requests/category_request'
import BufferManager from '@/managers/buffer_manager'
import CategoryManager from '@/managers/category_manager'

export default class CategoryUtils {
  static async createCategory(toggle: Function, categoryString: string, parent: number | null) {
    const categoryRequest: CategoryRequest = { name: BufferManager.get()?.value as string }
    await CategoryManager.createCategory(categoryRequest, parent)

    this.toggleAndCleanInput(toggle, categoryString)
  }
  private static toggleAndCleanInput(toggle: Function, categoryString: string) {
    if (BufferManager.get()?.value != '') {
      toggle()
      categoryString = ''
    }
  }
}
