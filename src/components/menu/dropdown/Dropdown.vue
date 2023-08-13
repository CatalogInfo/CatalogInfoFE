<template>
  <div class="flex flex-row self-center items-center">
    <div
      class="w-10 h-10 flex items-center justify-center hover:bg-gray-900 rounded-full"
      @click="show = !show"
    >
      <i class="pi pi-ellipsis-v"></i>
    </div>
    <slot v-if="show" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
