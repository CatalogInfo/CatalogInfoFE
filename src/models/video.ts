import { Model } from 'pinia-orm'
import Category from './category'

export default class Video extends Model {
  static entity = 'video'

  static fields() {
    return {
      id: this.string(""),
      category: this.belongsTo(Category, 'categoryId'),
      link: this.string(''),
      title: this.string(''),
      channelTitle: this.string('')
    }
  }

  declare id: number
  declare category: Category
  declare link: string
  declare title: string
  declare channelTitle: string
}
