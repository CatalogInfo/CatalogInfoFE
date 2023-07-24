import { Model } from 'pinia-orm'
import Book from './book'

export default class Category extends Model {
  static entity = 'category'

  static fields() {
    return {
      id: this.uid(10),
      category: this.attr(0),
      books: this.hasMany(Book, 'categoryId')
    }
  }

  declare id: string
  declare category: string
  declare books: Book[];
}
