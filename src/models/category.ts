import { Model } from 'pinia-orm'
import Article from './article'
import Book from './book'
import Video from './video'

export default class Category extends Model {
  static entity = 'category'

  static fields() {
    return {
      id: this.number(null),
      books: this.hasMany(Book, 'categoryId'),
      name: this.string(''),
      videos: this.hasMany(Video, 'categoryId'),
      articles: this.hasMany(Article, 'categoryId'),
      children: this.hasMany(Category, 'categoryId'),
      parent: this.belongsTo(Category, 'categoryId'),
      hasChildren: this.attr(false)
    }
  }

  declare id: number
  declare books: Book[]
  declare name: string
  declare children: Category[]
  declare parent: number
  declare hasChildren: boolean
  declare videos: Video[]
  declare articles: Article[]
}
