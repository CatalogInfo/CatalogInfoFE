<template>
  <div class="card flex flex-col">
    <div class="sticky top-0 z-20 bg-[#121212]">
      <TabMenu :model="items" />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TabMenu from 'primevue/tabmenu'
import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import CategoryManager from '@/managers/category_manager'
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: '/'
  },
  {
    label: 'Categories',
    icon: 'pi pi-th-large',
    to: '/categories'
  }
])

await CategoryManager.loadAll()
</script>
