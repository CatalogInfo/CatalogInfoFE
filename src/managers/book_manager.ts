import BookData from '@/data/book_data'
import Book from '@/models/book'
import Category from '@/models/category'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'

export default class BookManager {
  protected static get repository() {
    return useRepo(Book, store)
  }

  static all(): Collection<Book> {
    return this.repository.all()
  }

  static getBookById(id: string): Book | null {
    return this.repository.find(id)
  }

  static getBooksByCategory(categoryId: string): Book[] | null {
    const books = this.repository
      .where('category', (value: Category) => {
        return value.id === categoryId
      })
      .get()
    console.log(books)
    return books
  }

  static createBook(book: BookData) {
    this.repository.save(book)
  }
}
