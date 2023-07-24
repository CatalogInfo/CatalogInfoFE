<template>
  <Button class="bg-[#CE93C5] m-3 h-full" icon="pi pi-chevron-left" @click="back()" text></Button>
  <div class="flex flex-col items-center">
    <p class="self-center mt-10 text-gray-500 font-semibold text-2xl">Create new book</p>
    <div class="grid grid-cols-2 grid-rows-5 mt-12">
      <div>
        <MyInputText v-model="name" :placeholder="'Name'" />
      </div>
      <div class="row-span-5 w-96 h-64 bg-[#18181b] rounded"></div>
      <div>
        <MyInputText v-model="style" :placeholder="'Style'" />
      </div>
      <div>
        <MyInputText v-model="author" :placeholder="'Author'" />
      </div>
    </div>
    <div class=""></div>
    <MyButton class="mt-96" @click="onSave()" :text="'Save'"></MyButton>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import MyButton from '@/components/MyButton.vue'
import MyInputText from '@/components/MyInputText.vue'
import 'primeicons/primeicons.css'
import { ref } from 'vue'
import { useRepo } from 'pinia-orm'
import { useRouter } from 'vue-router'
import CategoryManager from '@/managers/category_manager'
import BookManager from '@/managers/book_manager'
import Category from '@/models/category'
import CategoryData from '@/data/category_data'
import { C } from 'pinia-orm/dist/Data-77556be8'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

const name = ref('')
const style = ref('')
const author = ref('')

const onSave = () => {
  const cat = CategoryManager.getCategoryById(props.id) as Category
  BookManager.createBook({
    category: cat,
    name: name.value,
    style: style.value,
    description: '',
    author: author.value
  })
  back()
}

const back = () => {
  router.push('/categories/' + props.id)
}
</script>
<style scoped></style>
