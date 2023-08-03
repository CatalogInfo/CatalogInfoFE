import { Model } from 'pinia-orm'
import Category from './category'

export default class User extends Model {
  static entity = 'user'

  static fields() {
    return {
      id: this.attr(null),
      username: this.string(""),
      categories: this.hasMany(Category, 'categoryId')
    }
  }

  declare id: number
  declare username: String
  declare categories: Category[]
}
