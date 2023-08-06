<template>
  <div class="relative flex flex-row w-full">
  <Button id="itemBut" class="w-96 bg-black rounded-lg">
    <div class="flex flex-row">
      <div class="flex flex-col">
        <YouTube :src="item.link" :width="'200px'" :height="'150px'" />
      </div>
      <div class="flex flex-col justify-center ml-4 w-full bg-[#161616] rounded-lg space-y-8">
        <p id="title" class="ml-4 text-left font-semibold text-white text-lg mr-4">{{ item.title }}</p>
        <p id="author" class="ml-4 text-left font-thin font-serif">{{ item.channelTitle }}</p>
      </div>
    </div>
  </Button>
  <Dropdown class="w-36">
    <div class="">
      <div class="relative flex space-x-2">
      <DropdownItem class="" @click="deleteVideo()">
        <i class="pi pi-trash"></i>
      </DropdownItem>
      <DropdownItem class="">
        <i class="pi pi-plus"></i>
      </DropdownItem>
      </div>
      </div>
    </Dropdown>
</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Video from '@/models/video'
import YouTube from 'vue3-youtube'
import DropdownItem from '@/components/menu/DropdownItem.vue';
import Dropdown from '@/components/menu/Dropdown.vue';
import VideoManager from '@/managers/video_manager';

const props = defineProps({
  item: {
    type: Video,
    required: true
  }
})

const deleteVideo = async () => {
  await VideoManager.deleteVideo(props.item.id, props.item.categoryId)
}

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
