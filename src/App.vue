<script setup lang="ts">
import TabMenu from 'primevue/tabmenu'

import { ref } from 'vue'
import 'primevue/resources/themes/md-dark-deeppurple/theme.css'

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
</script>

<template>
  <div class="card flex flex-col">
    <div class="sticky top-0 z-20 bg-[#121212]">
      <TabMenu :model="items" />
    </div>
    <router-view />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
