<template>
  <Button
    id="itemBut"
    class="flex flex-col bg-black rounded-lg"
  >
  <div class="flex flex-col w-full space-y-4">
    <span class="rounded-b-xl bg-[#7c3aed] mt-0">
      <p class="text-center font-normal text-white font-serif">{{ item.name.toUpperCase() }}</p>
    </span>
    <div class="flex flex-row space-x-2">
      <IconStyle/>
      <p class="text-left font-thin font-serif ">    {{ item.style }} </p>
    </div>
    <div class="flex flex-row space-x-2">
      <IconFeather/>
      <p class="text-left font-thin font-serif ">    {{ item.author }} </p>
    </div>
</div>
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Book from '@/models/book';
import IconFeather from "../components/icons/IconFeather.vue";
import IconStyle from "../components/icons/IconStyle.vue";
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
</style>
