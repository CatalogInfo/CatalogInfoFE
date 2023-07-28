<template>
  <Button id="itemBut" class="flex flex-row bg-black rounded-lg">
    <div class="flex flex-row w-full">
      <div class="flex flex-col">
        <YouTube :src="item.link" :width="'200px'" :height="'150px'" />
      </div>
      <div class="flex flex-col justify-center ml-4 w-full bg-[#161616] rounded-lg space-y-8">
        <p id="title" class="ml-4 text-left font-semibold text-white text-lg">{{ item.title }}</p>
        <p id="author" class="ml-4 text-left font-thin font-serif">{{ item.channelTitle }}</p>
      </div>
    </div>
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Video from '@/models/video'
import YouTube from 'vue3-youtube'

defineProps({
  item: {
    type: Video,
    required: true
  }
})
</script>
<style scoped>
#itemBut {
  background-color: rgb(16, 16, 16);
  border: 2px solid #822e75;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px rgba(190, 52, 203, 0.3);
}

#itemBut:hover {
  background-color: black;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px #822e75;
}

#title {
  font-family: Roboto, Arial, sans-serif;
}

#author {
  font-family: Roboto, Arial, sans-serif;
  color: #aaaaaa;
}
</style>
