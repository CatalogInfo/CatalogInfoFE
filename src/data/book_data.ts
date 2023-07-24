import Category from '@/models/category'

export default interface BookData {
  category: Category
  name: string
  style: string
  description: string
  author: string
}
