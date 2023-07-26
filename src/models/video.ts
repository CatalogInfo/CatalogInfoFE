import { Model } from 'pinia-orm'
import Category from './category'

export default class Video extends Model {
  static entity = 'book'

  static fields() {
    return {
      id: this.uid(10),
      category: this.belongsTo(Category, 'categoryId'),
      name: this.string(''),
      link: this.string('')
    }
  }

  declare id: number
  declare category: Category
  declare name: string
  declare link: string
}
