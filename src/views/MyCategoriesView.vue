<template>
  <div class="flex flex-col">
    <div class="card flex flex-col justify-center items-center pt-4">
      <!-- <p class="font-bold text-lg font-sans text-[#2c5e50]">Create category</p> -->
    </div>

    <AddButton @toggle="doToggle()" />

    <SearchBarVue />

    <div v-show="toggle" class="absolute z-0 w-full h-full bg-black opacity-50"></div>

    <div class="z-100 relative flex flex-col items-center justify-center">
      <CreateCategoryView
        :category="categoryString"
        @submit="submit"
        @toggle="doToggle"
        v-show="toggle"
      ></CreateCategoryView>
    </div>

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
import CreateCategoryView from './CreateCategoryView.vue'
import AddButton from '@/components/AddButton.vue'
import 'primeicons/primeicons.css'
import category from '../models/category'
import { useRepo } from 'pinia-orm'
import { watch } from 'vue'
import { ref } from 'vue'
import SearchBarVue from '@/components/SearchBar.vue'
import CategoryItem from '../components/CategoryItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const repo = useRepo(category)

const categoryString = ref('')

const data = ref()

const toggle = ref(false)

const doToggle = () => {
  toggle.value = !toggle.value
}

const submit = (category: string) => {
  repo.save({ category })
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

<style></style>
