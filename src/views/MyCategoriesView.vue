<template>
  <div class="flex flex-col">
    <div class="mt-5 flex flex-col">
      <InputSlideBar
        @doToggle="doToggle()"
        @submit="submit()"
        :toggle="toggle"
        :valueString="categoryString"
        :wrongInputPlaceholder="'empty input'"
        :placeholder="'name'"
      />
    </div>

    <SearchBarVue />

    <div class="relative z-10 ml-2 w-1/6 grid grid-cols-1 mt-10">
      <CategoryItem
        v-for="item in categories"
        :key="item.id"
        :item="item"
        @click="goToGategoryView(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputSlideBar from '../components/input/InputSlideBar.vue'
import 'primeicons/primeicons.css'
import { ref, computed } from 'vue'
import SearchBarVue from '@/components/input/SearchBar.vue'
import CategoryItem from '../components/items/CategoryItem.vue'
import { useRouter } from 'vue-router'
import CategoryManager from '@/managers/category_manager'
import BufferManager from '@/managers/buffer_manager'
import Category from '@/models/category'
import CategoryRequest from '@/dtos/requests/category_request'

const router = useRouter()
const categories = ref(computed(() => CategoryManager.all() as Category[]))

const categoryString = ref('')
const toggle = ref(false)

const doToggle = () => {
  toggle.value = !toggle.value
}

const goToGategoryView = (item: Category) => {
  router.push('/categories/' + item.id.toString())
}

const submit = async () => {
  const categoryRequest: CategoryRequest = { name: BufferManager.get()?.value as string }
  await CategoryManager.createCategory(categoryRequest)
  if (BufferManager.get()?.value != '') {
    doToggle()
    categoryString.value = ''
  }
}
</script>
