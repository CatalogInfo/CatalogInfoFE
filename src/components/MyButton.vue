<template>
  <button
    class="bg-[#CE93C5] hover:bg-[#CE93D8] text-[#121212] px-8 py-3 font-lg font-medium font-sans rounded"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>
