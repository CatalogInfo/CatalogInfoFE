import { Model } from 'pinia-orm'
import Book from './book'
import Video from './video'

export default class Category extends Model {
  static entity = 'category'

  static fields() {
    return {
      id: this.number(null),
      books: this.hasMany(Book, 'categoryId'),
      name: this.string(''),
      videos: this.hasMany(Video, 'categoryId')
    }
  }

  declare id: number
  declare books: Book[]
  declare name: string
  declare videos: Video[]
}
