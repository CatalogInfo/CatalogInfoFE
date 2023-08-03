import BookApi from '@/api/book_api'
import BookData from '@/data/book_data'
import BookResponse from '@/dtos/book_response'
import User from '@/models/user'
import Category from '@/models/category'
import BaseApiResponse from '@/response/base_api_response'
import { Collection, useRepo } from 'pinia-orm'
import store from '../store/store'
import CategoryManager from './category_manager'

export default class UserManager {
  protected static get repository() {
    return useRepo(User, store)
  }

  static all(): Collection<User> {
    return this.repository.all()
  }

//   static async loadAll(id: number) {
//     const response: BaseApiResponse<BookResponse> = await BookApi.getBooks(id);
//     const books: Array<BookResponse> = JSON.parse(JSON.stringify(response.data));

//     console.log(books);
//     this.repository.save(this.getFormatedBooks(books));
//   }

//   static getBookById(id: number): Book | null {
//     return this.repository.find(id)
//   }

//   static getBooksByCategory(categoryId: number): Book[] | null {
//     console.log(this.repository.all())
//     const books = this.repository
//       .where('category', (value: Category) => {
//         return value.id === categoryId
//       })
//       .get()
//       console.log(books);
//     return books
//   }

//   static async createBook(book: any) {
//     const response = await BookApi.createBook(book);
//     const bookRes: BookResponse = JSON.parse(JSON.stringify(response.data));
//     const der = this.getFormatedBook(bookRes);
//     CategoryManager.saveBookToCategory(this.getFormatedBook(bookRes), bookRes.category);

//     this.repository.save(der);
//   }

//   static getFormatedBooks(books: Array<BookResponse>) {
//     return books.map(this.getFormatedBook);
//   }

//   // static saveCategoryToBook(category: any, id: Number) {
//   //   const category1: Category = this.getCategoryById(Number(id)) as Category;
//   //   const books = BookManager.getBooksByCategory(category.id);
//   //   const name = category.name;

//   //   this.repository.save({id: id, books: books, name: name});
//   // }

//   static getFormatedBook(book: BookResponse) {
//     const category = CategoryManager.getCategoryById(book.category) as Category
//     return {
//       id: book.id,
//       name: book.name,
//       category: category,
//       author: book.author,
//       style: book.style,
//       text: book.text,
//     };
//   }
}
