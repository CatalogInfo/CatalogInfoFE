<template>
  <div class="flex flex-col mt-8 w-full items-center">
    <div>
      <TabView>
        <TabPanel>
          <template #header>
            <div>
              <i class="pi pi-book m-2"></i>
              <span>books</span>
            </div>
          </template>
          <div class="flex justify-end">
            <AddCategoryButton class @click="createBook()"></AddCategoryButton>
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>
            <i class="pi pi-video m-2"></i>
            <span>videos</span>
          </template>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div>
              <i class="pi pi-pencil m-2"></i>
              <span>articles</span>
            </div>
          </template>
          <AddCategoryButton></AddCategoryButton>
        </TabPanel>
      </TabView>
    </div>
    <div class="w-3/4 h-96">
      <BookItem v-for="book in books" :key="book.id" :item="book"> </BookItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabView from 'primevue/tabview'
import 'primeicons/primeicons.css'
import TabPanel from 'primevue/tabpanel'
import AddCategoryButton from '@/components/AddCategoryButton.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BookManager from '../managers/book_manager'
import BookItem from '@/components/BookItem.vue'

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const booksRef = ref(BookManager.getBooksByCategory(props.id))

const books = computed(() => booksRef.value)

const createBook = () => {
  router.push('/categories/' + props.id + '/book')
}
</script>
