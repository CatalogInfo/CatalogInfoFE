<template>
  <div class="flex flex-col w-full">
    <div class="mt-5 flex flex-col">
      <AddButton class="z-10 mt-2" @click="doToggle()" />
    </div>

    <SearchBarVue />

    <div class="relative ml-2 flex flex-col-reverse mt-10 space-y-3">
      <Tree
        :categoryString="categoryString"
        :toggle="toggle"
        :items="categories"
        @doToggle="doToggle()"
      ></Tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref, computed } from 'vue'
import SearchBarVue from '@/components/input/SearchBar.vue'
import CategoryManager from '@/managers/category_manager'
import Tree from '@/components/items/Tree.vue'
import AddButton from '@/components/buttons/AddButton.vue'

const categoryString = ref('')
const toggle = ref(false)
const categories = ref(computed(() => CategoryManager.all()))

const doToggle = () => {
  toggle.value = !toggle.value
}
</script>
