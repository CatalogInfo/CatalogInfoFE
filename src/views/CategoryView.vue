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
        :wrong-input-placeholder="'empty input'"
        :placeholder="'link'"
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
import InputSlideBar from '../components/input/InputSlideBar.vue'
import VideoManager from '../managers/video_manager'
import BookItem from '@/components/items/BookItem.vue'
import VideoItem from '@/components/items/VideoItem.vue'
import BufferManager from '@/managers/buffer_manager'
import CategoryManager from '@/managers/category_manager'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const id = Number(props.id)

const router = useRouter()

const active = ref(0)
const link = ref('')
const toggle = ref(false)

const category = computed(() => CategoryManager.getCategoryById(id))

const books = ref(computed(() => category.value?.books))
const videos = ref(computed(() => category.value?.videos))

const doToggle = () => {
  toggle.value = !toggle.value
}

const submit = async () => {
  const linkString: string = BufferManager.get()?.value as string
  console.log(books.value)

  await VideoManager.createVideo(linkString, id)

  doToggle()

  link.value = ''
}

const getActive = () => {
  return active.value
}

const goToBook = (id: number) => {
  console.log(category)
  router.push('/categories/' + props.id + '/book/' + id.toString())
}

const createBook = () => {
  router.push(`/categories/${id}/book`)
}
</script>
