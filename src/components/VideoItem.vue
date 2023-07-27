<template>
  <Button id="itemBut" class="flex flex-col bg-black rounded-lg">
    <div class="flex flex-col w-full space-y-4">
      <YouTube
        :src="item.link"
        :width="'200px'"
        :height="'150px'"
      />
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

const ss = () => {
    YouTube.name;
}
</script>
<style scoped>
#itemBut {
  /* background-color: rgb(21, 21, 21); */
  background-color: rgb(16, 16, 16);

  border: 2px solid #822e75;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px rgba(190, 52, 203, 0.3);
}

#itemBut:hover {
  background-color: black;
  /* border: 1px solid #a2148d; */
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px #822e75;
}
</style>
