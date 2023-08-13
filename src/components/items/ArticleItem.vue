<template>
  <div class="flex flex-row rounded-lg">
    <Button id="itemBut" class="w-96 bg-white">
      <div class="rounded-lg bg-[#1a1a1a]">
        <IconArticle></IconArticle>
      </div>
      <div id="text" class="flex flex-col ml-10 w-full space-y-4">
        <span class="rounded-b-xl mt-0">
          <a :href="item.link" class="text-left font-semibold text-xl text-white">Link</a>
        </span>
      </div>
    </Button>
    <Dropdown class="w-36">
      <DropdownItem @action="deleteArticle()">
        <i class="pi pi-trash"></i>
      </DropdownItem>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Article from '@/models/article'
import IconArticle from '../icons/IconArticle.vue'
import DropdownItem from '@/components/menu/dropdown/DropdownItem.vue'
import Dropdown from '@/components/menu/dropdown/Dropdown.vue'
import ArticleManager from '@/managers/article_manager'

const props = defineProps({
  item: {
    type: Article,
    required: true
  }
})

const deleteArticle = async () => {
  await ArticleManager.deleteArticle(props.item.id, props.item.categoryId)
}
</script>
<style scoped>
#itemBut {
  background-color: rgb(16, 16, 16);

  border: 2px solid #822e75;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px rgba(190, 52, 203, 0.3);
}

#itemBut:hover > .close {
  background-color: black;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px #822e75;
}

#text {
  font-family: Roboto, Arial, sans-serif;
}

.close {
  display: none;
  float: right;
}
</style>
