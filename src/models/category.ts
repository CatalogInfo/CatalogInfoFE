import { Model } from 'pinia-orm'
import Book from './book'
import Video from './video'

export default class Category extends Model {
  static entity = 'category'

  static fields() {
    return {
      id: this.uid(10),
      category: this.attr(0),
      books: this.hasMany(Book, 'categoryId'),
      videos: this.hasMany(Video, 'categoryId')
    }
  }

  declare id: string
  declare category: string
  declare books: Book[]
  declare videos: Video[]
}
