<template>
  <Button class="bg-[#CE93C5] m-3 h-full" icon="pi pi-chevron-left" @click="back()" text></Button>
  <div class="flex flex-col items-center">
    <p class="self-center mt-10 text-gray-500 font-semibold text-2xl">Create new book</p>
    <div class="grid grid-cols-2 grid-rows-5 mt-12">
      <div>
        <MyInputText v-model="name" :placeholder="'Name'" />
      </div>
      <div class="row-span-5 w-96 h-64 bg-[#18181b] rounded">
        <UploadFile @upload="upload($event)"/>
      </div>
      <div>
        <MyInputText v-model="style" :placeholder="'Style'" />
      </div>
      <div>
        <MyInputText v-model="author" :placeholder="'Author'" />
      </div>
    </div>
    <MyButton class="mt-96" @click="onSave()" :text="'Save'"></MyButton>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import MyButton from '@/components/MyButton.vue'
import MyInputText from '@/components/MyInputText.vue'
import 'primeicons/primeicons.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryManager from '@/managers/category_manager'
import BookManager from '@/managers/book_manager'
import Category from '@/models/category'
import UploadFile from '@/components/UploadFile.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

const fileVal = ref("");
const name = ref('')
const style = ref('')
const author = ref('')

const onSave = () => {
  const cat = CategoryManager.getCategoryById(props.id) as Category
  BookManager.createBook({
    category: cat,
    name: name.value,
    style: style.value,
    text: fileVal.value,
    description: '',
    author: author.value
  })
  back()
}

const back = () => {
  router.push('/categories/' + props.id)
}

const upload = async(e: any) => {
  const [file] = e.target.files;
  if (!file) return;
  const text = await file.text();
  console.log(text);
  fileVal.value = formatPararaphsAndSpaces(text);
}

function formatPararaphsAndSpaces (str: string) {
     return (str + '').replace(/(\r\n|\n|\r)/gm,  "<br>" + "&nbsp;&nbsp;");
} 

</script>
<style scoped></style>
