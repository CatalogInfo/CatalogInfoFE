import User from '@/models/user'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'

export default class UserManager {
  protected static get repository() {
    return useRepo(User, store)
  }

  static all(): Collection<User> {
    return this.repository.all()
  }
}
