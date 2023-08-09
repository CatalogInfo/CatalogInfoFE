import { Collection, Model } from 'pinia-orm'
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
      children: this.attr(null),
      parent: this.attr(null),
      hasChildren: this.attr(false)
    }
  }

  declare id: number
  declare books: Collection<Book>
  declare name: string
  declare children: Collection<Category> | undefined
  declare parent: number | null
  declare hasChildren: boolean
  declare videos: Video[]
  declare articles: Article[]
}
