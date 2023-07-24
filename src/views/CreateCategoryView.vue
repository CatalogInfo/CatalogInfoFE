<template>
  <div class="absolute w-full flex flex-col items-center justify-center b-30">
    <div class="w-1/4 h-64 bg-[#1e293b] rounded-xl justify-center">
      <CloseButton @toggle="$emit('toggle')"></CloseButton>

      <div class="card h-full flex flex-col items-center space-y-16">
        <InputText class="mt-8" aria-labelledby="lastname" v-model="categoryLocal" />
        <Button class="bg-[#CE93C5]" label="submit" @click="submit()"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'
import CloseButton from '@/components/CloseButton.vue'

const emit = defineEmits(['submit', 'toggle'])

const categoryLocal = ref('')

const submit = () => {
  emit('submit', categoryLocal.value)
  categoryLocal.value = ''
}
</script>

<style></style>
