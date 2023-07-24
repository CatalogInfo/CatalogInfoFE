<template>
  <div class="flex flex-col">
    <div class="flex flex-col bg-black rounded-xl px-8 py-2">
      <span class="font-bold text-3xl">
        {{ item.name }}
      </span>
      <span>
        {{ item.style }}
      </span>
      <span>
        {{ item.author }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Book from '@/models/book'

defineProps({
  item: {
    type: Book,
    required: true
  }
})
</script>
