import BookApi from '@/api/book_api'
import CategoryApi from '@/api/category_api'
import BookData from '@/data/book_data'
import BookResponse from '@/dtos/book_response'
import Book from '@/models/book'
import Category from '@/models/category'
import BaseApiResponse from '@/response/base_api_response'
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
    const response: BaseApiResponse<BookResponse> = await CategoryApi.getBooks(categoryId) as BaseApiResponse<BookResponse>;
    const books: Array<BookResponse> = JSON.parse(JSON.stringify(response.data));

    console.log(books);
    this.repository.save(this.getFormatedBooks(books));
  }

  static getBookById(id: number): Book | null {
    return this.repository.find(id)
  }

  // static async getBooksByCategory(categoryId: number): Book[] | null {
  //   const response: BaseApiResponse<BookResponse> = await CategoryApi.getBooks(categoryId);
  //   const books: Array<BookResponse> = JSON.parse(JSON.stringify(response.data));

  //   console.log(books);
  //   this.repository.save(this.getFormatedBooks(books));
  //   return books
  // }

  static async createBook(book: any) {
    const response = await CategoryApi.createBook(book);
    const bookRes: BookResponse = JSON.parse(JSON.stringify(response.data));
    const der = this.getFormatedBook(bookRes);

    this.repository.save(der);
  }

  static getFormatedBooks(books: Array<BookResponse>) {
    return books.map(this.getFormatedBook);
  }

  // static saveCategoryToBook(category: any, id: Number) {
  //   const category1: Category = this.getCategoryById(Number(id)) as Category;
  //   const books = BookManager.getBooksByCategory(category.id);
  //   const name = category.name;

  //   this.repository.save({id: id, books: books, name: name});
  // }

  static getFormatedBook(book: BookResponse) {
    // const category = CategoryManager.getCategoryById(book.category) as Category
    return {
      id: book.id,
      name: book.name,
      author: book.author,
      style: book.style,
      text: book.text,
    };
  }
}
