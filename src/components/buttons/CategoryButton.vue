<template>
  <button class="w-10 h-10 bg-transparent rounded-full" @click="$emit('action')">
    <i :class="icon"></i>
  </button>
</template>
<script setup lang="ts">
defineEmits(['action'])
defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>
