<template>
  <div class="flex flex-col w-full">
    <div class="mt-5 flex flex-col">
      <AddButton class="z-10 mt-2" @click="doToggle()" />
    </div>

    <SearchBarVue />

    <div class="relative ml-2 flex flex-col-reverse mt-10 space-y-3">
      <AddItem 
        @doToggle="doToggle()"
        @submit="submit()"
        :toggle="toggle"
        :valueString="categoryString"
        :wrongInputPlaceholder="'empty input'"
        :placeholder="'type name...'"
        v-if="toggle"
      ></AddItem>
      <Tree :items="categories"></Tree>

    </div>
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref, computed } from 'vue'
import SearchBarVue from '@/components/input/SearchBar.vue'
import CategoryManager from '@/managers/category_manager'
import BufferManager from '@/managers/buffer_manager'
import CategoryRequest from '@/dtos/requests/category_request'
import AddItem from '@/components/input/AddItem.vue'
import Tree from "@/components/items/Tree.vue";
import AddButton from '@/components/buttons/AddButton.vue'

const categoryString = ref('')
const toggle = ref(false)
const categories = ref(computed(() => CategoryManager.all()))

const doToggle = () => {
  toggle.value = !toggle.value;
}

const submit = async () => {
  const categoryRequest: CategoryRequest = { name: BufferManager.get()?.value as string }
  await CategoryManager.createCategory(categoryRequest, null)

  if (BufferManager.get()?.value != '') {
    doToggle()
    categoryString.value = ''
  }
}
</script>
