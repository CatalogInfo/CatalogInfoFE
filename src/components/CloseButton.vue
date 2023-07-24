<template>
  <button class="m-2 justify-center" @click="$emit('toggle')">
    <i class="pi pi-times-circle" style="font-size: 1.4em; color: white"></i>
  </button>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
defineEmits(['toggle'])
</script>
