<template>
  <button class="w-10 h-10 bg-transparent rounded-full" @click="$emit('action')">
    <i v-if="hasChildren" :disabled="!hasChildren" :class="icon"></i>
  </button>
</template>
<script setup lang="ts">
defineEmits(['action'])
defineProps({
  icon: {
    type: String,
    required: true
  },
  hasChildren: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
