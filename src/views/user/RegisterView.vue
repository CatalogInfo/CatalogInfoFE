<template>
  <div class="mt-48 relative flex h-full flex-col items-center justify-center space-y-4">
    <MyInputText v-model="credentials.username" type="text" placeholder="Username" />
    <MyInputText v-model="credentials.email" type="email" placeholder="Email" />
    <MyInputText v-model="credentials.password" type="password" placeholder="Password" />
    <MyInputText
      v-model="credentials.repeatedPassword"
      type="password"
      placeholder="Repeat password"
    />
    <MyButton @click="tryRegister" :text="'register'" />
    <span class="text-gray-600">
      Already have an account?
      <a href="/auth/login"> Login </a>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import AuthManager from '@/managers/auth_manager'
import MyInputText from '../../components/input/MyInputText.vue'
import MyButton from '../../components/buttons/MyButton.vue'
const credentials = reactive({
  username: '',
  email: '',
  password: '',
  repeatedPassword: ''
})

const tryRegister = async () => {
  if (!credentials.password || credentials.password !== credentials.repeatedPassword) {
    throw new Error("Passwords aren't equal")
  }

  await AuthManager.register(credentials.username, credentials.email, credentials.password)
}
</script>
