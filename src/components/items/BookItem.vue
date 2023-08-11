<template>
  <div class="flex flex-row rounded-lg">
    <Button id="itemBut" class="w-96 bg-white">
      <div class="rounded-lg p-4 bg-[#1a1a1a]">
        <IconBook></IconBook>
      </div>
      <div id="text" class="flex flex-col ml-10 w-full space-y-4">
        <span class="rounded-b-xl mt-0">
          <p class="text-left font-semibold text-xl text-white">{{ item.name }}</p>
        </span>
        <div class="flex flex-row space-x-2">
          <IconStyle />
          <p class="text-left font-thin">{{ item.style }}</p>
        </div>
        <div class="flex flex-row space-x-2">
          <IconFeather />
          <p class="text-left font-thin">{{ item.author }}</p>
        </div>
      </div>
    </Button>

    <Dropdown class="w-36">
      <DropdownItem @action="deleteBook()">
        <i class="pi pi-trash"></i>
      </DropdownItem>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Book from '@/models/book'
import IconFeather from '../icons/IconFeather.vue'
import IconStyle from '../icons/IconStyle.vue'
import IconBook from '../icons/IconBook.vue'
import BookManager from '@/managers/book_manager'
import DropdownItem from '@/components/menu/DropdownItem.vue'
import Dropdown from '@/components/menu/Dropdown.vue'
import { PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<Book>,
    required: true
  }
})

const deleteBook = async () => {
  await BookManager.deleteBook(props.item.id, props.item.categoryId)
}
</script>
<style scoped>
#itemBut {
  background-color: rgb(16, 16, 16);

  border: 2px solid #822e75;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px rgba(190, 52, 203, 0.3);
}

#itemBut:hover > .close {
  background-color: black;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px #822e75;
}

#text {
  font-family: Roboto, Arial, sans-serif;
}

.close {
  display: none;
  float: right;
}
</style>
