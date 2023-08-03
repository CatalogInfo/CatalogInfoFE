import Category from "@/models/category";

export default interface CategoryResponse {
    id: number;
    name: string;
    books: number[];
}