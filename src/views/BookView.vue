<template>
  <div class="flex flex-row items-center justify-center">
    <div class="self-center w-1/2 mt-10 bg-[#1e1e1e] p-4 rounded-xl">
      <div class="text-left" v-html="getText()"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BookManager from "@/managers/book_manager"
import Book from "@/models/book";


const props = defineProps({
    bookId: {
        type: String,
        required: true,
    }
})

const getText = () => {
    const book: Book = <Book>BookManager.getBookById(props.bookId);
    return book.text; 
}

</script>