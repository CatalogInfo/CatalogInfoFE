<template>
  <Button id="itemBut" class="flex flex-row bg-black rounded-lg">
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
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Book from '@/models/book'
import IconFeather from '../components/icons/IconFeather.vue'
import IconStyle from '../components/icons/IconStyle.vue'
import IconBook from '../components/icons/IconBook.vue'
defineProps({
  item: {
    type: Book,
    required: true
  }
})
</script>
<style scoped>
#itemBut {
  /* background-color: rgb(21, 21, 21); */
  background-color: rgb(16, 16, 16);

  border: 2px solid #822e75;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px rgba(190, 52, 203, 0.3);
}

#itemBut:hover {
  background-color: black;
  /* border: 1px solid #a2148d; */
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px #822e75;
}

#text {
  font-family: Roboto, Arial, sans-serif;
}
</style>
