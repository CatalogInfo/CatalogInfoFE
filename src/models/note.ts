import { Model } from 'pinia-orm'

export default class Note extends Model {
  static entity = 'note'

  static fields() {
    return {
      id: this.string(""),
      note: this.string(""),
      topOffset: this.string(""),
    }
  }

  declare id: string
  declare note: string
  declare topOffset: string
}
