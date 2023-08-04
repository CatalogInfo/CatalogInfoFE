<template>
  <div class="card flex flex-col">
    <div class="sticky top-0 z-20 bg-[#121212] flex flex-row">
      <div class="grow">
        <TabMenu :model="items" />
      </div>
      <div class="mt-3 mr-10 ml-10">
        <button @click="logout()">Logout</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TabMenu from 'primevue/tabmenu'
import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import CategoryManager from '@/managers/category_manager'
import AuthManager from '@/managers/auth_manager'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


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
  },
])

const logout = () => {
  AuthManager.logout();
  router.push("/auth/login");
}

await CategoryManager.loadAll()
</script>
