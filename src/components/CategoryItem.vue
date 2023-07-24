<template>
  <Button
    id="itemBut"
    class="text-center bg-black rounded-lg p-8 text-white shadow-xl font-bold text-xl"
  >
    {{ item.category.toUpperCase() }}
  </Button>
</template>

<script setup lang="ts">
import category from '../models/category'
import Button from 'primevue/button'

defineProps({
  item: {
    type: category,
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
