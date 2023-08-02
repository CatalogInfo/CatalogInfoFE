import Buffer from '@/models/buffer'
import { useRepo } from 'pinia-orm'
import store from '../store/store'

export default class BufferManager {
  protected static get repository() {
    return useRepo(Buffer, store)
  }

  static get(): Buffer | null {
    return this.repository.find(1)
  }

  static updateBuffer(value: string) {
    this.repository.save({ id: 1, value })
  }
}
