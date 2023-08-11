export default interface CategoryResponse {
  id: number
  name: string
  books: number[]
  videos: number[]
  articles: number[]
  parent: number | null
  children: CategoryResponse[] | null
  hasChildren: boolean
}
