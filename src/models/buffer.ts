import { Model } from 'pinia-orm'

export default class Buffer extends Model {
  static entity = 'buffer'

  static fields() {
    return {
      id: this.number(1),
      value: this.string('')
    }
  }

  declare id: number
  declare value: string
}
