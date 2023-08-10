import CategoryApi from '@/api/category_api'
import BookRequest from '@/dtos/requests/book_request'
import BookResponse from '@/dtos/responses/book_response'
import Book from '@/models/book'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'
import CategoryManager from './category_manager'

export default class BookManager {
  protected static get repository() {
    return useRepo(Book, store)
  }

  static all(): Collection<Book> {
    return this.repository.all()
  }

  static async loadAll(categoryId: number) {
    const response = await CategoryApi.getBooks(categoryId)
    const books = response.data
    console.log(this.getFormatedBooks(books));

    this.repository.save(this.getFormatedBooks(books))
  }

  static getBookById(id: number): Book | null {
    return this.repository.find(id)
  }

  static async createBook(book: BookRequest, categoryId: number) {
    const response = await CategoryApi.createBook(book, categoryId)
    const bookEntity = this.getFormatedBook(response.data)

    this.repository.save(bookEntity)
    await CategoryManager.loadAll();
  }

  private static getFormatedBooks(books: Array<BookResponse>) {
    return books.map(this.getFormatedBook)
  }

  private static getFormatedBook(book: BookResponse) {
    return {
      id: book.id,
      name: book.name,
      author: book.author,
      style: book.style,
      text: book.text
    }
  }

  public static async deleteBook(bookId: number, categoryId: number) {
    await CategoryApi.deleteBook(categoryId, bookId);
    await CategoryManager.loadAll();
  }
}
