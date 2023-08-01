import BookData from "@/data/book_data";
import BookResponse from "@/dtos/book_response";
import BaseApiResponse from "@/response/base_api_response";
import ApiFactory from "./api_factory";

export default class BookApi {

    static baseUrl = 'http://localhost:8081'

    public static async createBook(book: BookData): Promise<BaseApiResponse<BookResponse>> {
        const res = await ApiFactory.getInstance(this.baseUrl).post<BookResponse, unknown>("/category/" + book.category.id + "/book", book);
        // console.log(res.data);
        return res;
    }

    public static async getBooks(categoryId: number) {
        const res = await ApiFactory.getInstance(this.baseUrl).get("/category/" + categoryId + "/book");
        // console.log(res);
        return res;
    }
}