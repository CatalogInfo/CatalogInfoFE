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
          <div class="flex justify-end">
            <!-- <AddCategoryButton class @click="createBook()"></AddCategoryButton> -->
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
        </TabPanel>
      </TabView>
    </div>
    <div class="flex flex-col self-start w-1/4 " v-if="getActive() === 0">
      <AddButton class="mb-8" @click="createBook()"/>

      <BookItem v-for="book in books" :key="book.id" :item="book"/>
    </div>
    <div class="flex flex-col self-start w-1/4 " v-if="getActive() === 1">
      <AddButton class="mb-8" @click="createBook()"/>
      <YouTube 
        src="https://youtu.be/jydFemSB46s" 
        @ready="onReady"
        :width="'200px'"
        :height="'150px'"
        ref="youtube" />
      <!-- <VideoItem v-for="video in videos" :key="video.id" /> -->
    </div>
    
  </div>
</template>

<script setup lang="ts">
import TabView from 'primevue/tabview'
import 'primeicons/primeicons.css'
import TabPanel from 'primevue/tabpanel'
import AddButton from '@/components/AddButton.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BookManager from '../managers/book_manager'
import VideoManager from "../managers/video_manager";
import BookItem from '@/components/BookItem.vue'
import VideoItem from '@/components/VideoItem.vue'
import YouTube from 'vue3-youtube'

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const onReady = () => {
  YouTube.$refs.youtube.playVideo();
}

const active = ref(0);

const getActive = () => {
  return active.value;
}

const booksRef = ref(BookManager.getBooksByCategory(props.id))
const videoRef = ref(VideoManager.getVideoByCategory(props.id));

const books = computed(() => booksRef.value)
const videos = computed(() => videoRef.value)

const createBook = () => {
  router.push('/categories/' + props.id + '/book')
}
</script>