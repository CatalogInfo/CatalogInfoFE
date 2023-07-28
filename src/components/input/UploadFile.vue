<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <IconDropFIle />
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">TXT</p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" v-on:change="$emit('upload', $event)" />
    </label>
  </div>
</template>
<script setup lang="ts">
import IconDropFIle from '../icons/IconDropFIle.vue'

defineEmits(['upload'])
</script>
<style scoped></style>
