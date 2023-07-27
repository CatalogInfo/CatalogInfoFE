<template>
  <div class="flex flex-col">
    <div class="mt-5 flex flex-col">
      <InputSlideBar
        @doToggle="doToggle()"
        @submit="submit()"
        :toggle="toggle"
        :valueString="categoryString"
      />
    </div>

    <SearchBarVue />

    <div class="relative z-10 w-1/6 grid grid-cols-1 mt-10">
      <CategoryItem
        v-for="item in repo.all()"
        :key="item.id"
        :item="item"
        @click="router.push(`/categories/${item.id}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputSlideBar from '../components/InputSlideBar.vue'
import 'primeicons/primeicons.css'
import category from '../models/category'
import { useRepo } from 'pinia-orm'
import { watch } from 'vue'
import { ref } from 'vue'
import SearchBarVue from '@/components/SearchBar.vue'
import CategoryItem from '../components/CategoryItem.vue'
import { useRouter } from 'vue-router'
import CategoryManager from '@/managers/category_manager'
import BufferManager from '@/managers/buffer_manager'

const router = useRouter()

const repo = useRepo(category)

const data = ref()

const categoryString = ref('')

const toggle = ref(false)

const doToggle = () => {
  toggle.value = !toggle.value
}

const submit = () => {
  CategoryManager.createCategory(BufferManager.get()?.value as string)
  doToggle()
  categoryString.value = ''
}
watch(
  () => repo.all(),
  (state) => {
    data.value = state
  }
)
</script>
