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
    <div class="ml-2 flex flex-col self-start" v-if="getActive() === 0">
      <AddButton class="mt-2" @click="createBook()" />

      <BookItem
        class="mt-4"
        v-for="book in books"
        :key="book.id"
        :item="book"
        @click="goToBook(book.id)"
      />
    </div>
    <div class="ml-2 flex flex-col self-start" v-if="getActive() === 1">
      <InputSlideBar
        @doToggle="doToggle()"
        @submit="submitVideo()"
        :toggle="toggle"
        :valueString="link"
        :wrong-input-placeholder="'empty input'"
        :placeholder="'link'"
      ></InputSlideBar>

      <VideoItem class="mt-4" v-for="video in videos" :key="video.id" :item="video" />
    </div>

    <div class="ml-2 flex flex-col self-start w-1/2" v-if="getActive() === 2">
      <InputSlideBar
        @doToggle="doToggle()"
        @submit="submitArticle()"
        :toggle="toggle"
        :valueString="link"
        :wrong-input-placeholder="'empty input'"
        :placeholder="'link'"
      ></InputSlideBar>

      <ArticleItem class="mt-4" v-for="article in articles" :key="article.id" :item="article"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabView from 'primevue/tabview'
import 'primeicons/primeicons.css'
import TabPanel from 'primevue/tabpanel'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import InputSlideBar from '@/components/input/InputSlideBar.vue'
import VideoManager from '@/managers/video_manager'
import BookItem from '@/components/items/BookItem.vue'
import VideoItem from '@/components/items/VideoItem.vue'
import BufferManager from '@/managers/buffer_manager'
import CategoryManager from '@/managers/category_manager'
import ArticleItem from '@/components/items/ArticleItem.vue'
import ArticleManager from '@/managers/article_manager'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const router = useRouter()

const active = ref(0)
const link = ref('')
const toggle = ref(false)

const category = computed(() => CategoryManager.getCategoryById(props.id))
const books = ref(computed(() => category.value?.books))
const videos = ref(computed(() => category.value?.videos))
const articles = ref(computed(() => category.value?.articles))


const doToggle = () => {
  toggle.value = !toggle.value
}

const submitVideo = async () => {
  const linkString: string = String(BufferManager.get()?.value)
  await VideoManager.createVideo(linkString, props.id)

  doToggle()
  clearInput()
}

const submitArticle = async () => {
  const linkString: string = String(BufferManager.get()?.value)
  await ArticleManager.createArticle({ title: "Ti", link: linkString }, props.id)

  doToggle()
  clearInput()
}

const clearInput = () => {
  link.value = ''
}

const getActive = () => {
  return active.value
}

const goToBook = (id: number) => {
  router.push('/categories/' + props.id + '/book/' + id.toString())
}

const createBook = () => {
  router.push(`/categories/${props.id}/book`)
}
</script>
