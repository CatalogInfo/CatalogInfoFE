import { Model } from 'pinia-orm'
import Category from './category'

export default class Book extends Model {
  static entity = 'book'

  static fields() {
    return {
      id: this.uid(10),
      category: this.belongsTo(Category, 'categoryId'),
      name: this.string(''),
      style: this.string(''),
      description: this.string(''),
      author: this.string('')
    }
  }

  declare id: number
  declare category: Category
  declare name: string
  declare style: string
  declare description: string
  declare author: string
}
