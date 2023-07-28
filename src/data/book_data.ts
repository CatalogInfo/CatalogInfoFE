import Category from '@/models/category'

export default interface BookData {
  category: Category
  name: string
  style: string
  text: string
  description: string
  author: string
}
