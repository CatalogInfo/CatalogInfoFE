<template>
  <input
    id="inp"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    autocomplete="off"
    class="bg-transparent py-3 px-5 rounded-md"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  }
})
</script>
<style scoped>
#inp:focus {
  outline: none;
  border-bottom: 1px solid #ae3b9d;
}
#inp {
  border-bottom: 1px solid #8b207b;
}
</style>
