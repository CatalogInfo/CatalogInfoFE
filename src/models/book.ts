import { Model } from 'pinia-orm'
import Category from './category'

export default class Book extends Model {
  static entity = 'book'

  static fields() {
    return {
      id: this.attr(null),
      category: this.belongsTo(Category, 'categoryId'),
      name: this.string(''),
      categoryId: this.attr(null),
      style: this.string(''),
      text: this.string(''),
      author: this.string('')
    }
  }

  declare id: number
  declare category: Category
  declare name: string
  declare style: string
  declare text: string
  declare categoryId: number
  declare author: string
}
