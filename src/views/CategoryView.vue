<template>
  <div class="flex flex-col mt-8 w-full items-center">
    <div>
      <TabView v-model:activeIndex="active">
        <TabPanel>
          <template #header>
            <div>
              <i class="pi pi-book m-2"></i>
              <span>books</span>
            </div>
          </template>
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
        </TabPanel>
      </TabView>
    </div>
    <div class="ml-2 flex flex-col self-start w-1/4" v-if="getActive() === 0">
      <AddButton class="mt-2" @click="createBook()" />

      <BookItem
        class="mt-4"
        v-for="book in books"
        :key="book.id"
        :item="book"
        @click="goToBook(book.id)"
      />
    </div>
    <div class="ml-2 flex flex-col self-start w-1/3" v-if="getActive() === 1">
      <InputSlideBar
        @doToggle="doToggle()"
        @submit="submit()"
        :toggle="toggle"
        :valueString="link"
      ></InputSlideBar>

      <VideoItem class="mt-4" v-for="video in videos" :key="video.id" :item="video" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TabView from 'primevue/tabview'
import 'primeicons/primeicons.css'
import TabPanel from 'primevue/tabpanel'
import AddButton from '@/components/buttons/AddButton.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BookManager from '../managers/book_manager'
import InputSlideBar from '../components/input/InputSlideBar.vue'
import VideoManager from '../managers/video_manager'
import BookItem from '@/components/items/BookItem.vue'
import VideoItem from '@/components/items/VideoItem.vue'
import BufferManager from '@/managers/buffer_manager'
import Category from '@/models/category'
import CategoryManager from '@/managers/category_manager'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

const active = ref(0)
const link = ref('')
const toggle = ref(false)

const books = ref(computed(() => BookManager.getBooksByCategory(props.id)))
const videos = ref(computed(() => VideoManager.getVideoByCategory(props.id)))

const doToggle = () => {
  toggle.value = !toggle.value
}

const submit = async () => {
  const category = CategoryManager.getCategoryById(props.id) as Category
  const linkString: string = BufferManager.get()?.value as string

  await VideoManager.createVideo(linkString, category)

  doToggle()

  link.value = ''
}

const getActive = () => {
  return active.value
}

const goToBook = (id: string) => {
  router.push('/categories/' + props.id + '/book/' + id)
}

const createBook = () => {
  router.push('/categories/' + props.id + '/book')
}
</script>
