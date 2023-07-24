import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'

const store = createPinia().use(createORM())

export default store
