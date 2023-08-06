import { Model } from 'pinia-orm'
import Category from './category'

export default class Article extends Model {
  static entity = 'article'

  static fields() {
    return {
      id: this.number(null),
      category: this.belongsTo(Category, 'categoryId'),
      categoryId: this.attr(null),
      link: this.string('')
    }
  }

  declare id: number
  declare category: Category
  declare link: string
  declare categoryId: number
}
