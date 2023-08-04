<template>
  <div class="mt-5 flex w-full flex-row justify-center">
    <MyButton class="p-3" @click="tryLogout" :text="'logout'" />
  </div>
</template>

<script setup lang="ts">
import AuthManager from '@/managers/auth_manager'
import MyButton from '../../components/buttons/MyButton.vue'

const tryLogout = () => {
  AuthManager.logout()
}
</script>
