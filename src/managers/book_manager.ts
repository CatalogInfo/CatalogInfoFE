import CategoryApi from '@/api/category_api'
import BookResponse from '@/dtos/book_response'
import Book from '@/models/book'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'


export default class BookManager {
  protected static get repository() {
    return useRepo(Book, store)
  }

  static all(): Collection<Book> {
    return this.repository.all()
  }

  static async loadAll(categoryId: number) {
    const response = await CategoryApi.getBooks(categoryId);
    const books = response.data;

    this.repository.save(this.getFormatedBooks(books));
  }

  static getBookById(id: number): Book | null {
    return this.repository.find(id)
  }

  static async createBook(book: any) {
    const response = await CategoryApi.createBook(book);
    const bookEntity = this.getFormatedBook(response.data);

    this.repository.save(bookEntity);
  }

  static getFormatedBooks(books: Array<BookResponse>) {
    return books.map(this.getFormatedBook);
  }

  static getFormatedBook(book: BookResponse) {
    return {
      id: book.id,
      name: book.name,
      author: book.author,
      style: book.style,
      text: book.text,
    };
  }
}
